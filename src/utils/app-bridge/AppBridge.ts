// NG2
import { Injectable } from '@angular/core';
// Vendor
import { Subject } from 'rxjs/Subject';

// let bridge = new AppBridge();
// bridge.on(LISTENERS.OPEN, (event) => {
// });

// TYPES FOR ALL EVENTS

// enum LISTENERS {
//     HTTP,
//     OPEN,
//     CLOSE,
//     REFRESH
// }

const HTTP_VERBS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};

export const MESSAGE_TYPES = {
    REGISTER: 'register',
    UNREGISTER: 'unregister',
    OPEN: 'open',
    HTTP_GET: 'httpGET',
    HTTP_POST: 'httpPOST',
    HTTP_PUT: 'httpPUT',
    HTTP_DELETE: 'httpDELETE',
    CUSTOM_EVENT: 'customEvent'
};

declare var postRobot: any;

export class AppBridge {
    public id: string = `${Date.now()}`;
    public name: string;
    public registeredFrameHandler: Subject<any[]> = new Subject<any[]>();
    public isMaster: boolean = false;

    private _registeredFrames: any[] = [];
    private _openHandler: Function;
    private _httpHandler: Function;
    private _tracing: boolean = false;
    private _eventListeners: any = {};

    // Type?
    constructor(name?: string) {
        this.name = name;
        if (postRobot) {
            postRobot.CONFIG.LOG_LEVEL = 'error';
            this._setupHandlers();
        }
    }

    set tracing(tracing: boolean) {
        this._tracing = tracing;
    }

    set openHandler(handler: Function) {
        this._openHandler = handler;
    }

    set httpHandler(handler: Function) {
        this._httpHandler = handler;
    }

    private _trace(eventType, event) {
        if (this._tracing) {
            console.log(`[${this.name || this.id}] "${eventType}"`, event); // tslint:disable-line
        }
    }

    private _setupHandlers(): void {
        // Register
        postRobot.on(MESSAGE_TYPES.REGISTER, (event) => {
            this._trace(MESSAGE_TYPES.REGISTER, event);
            this._registeredFrames.push(event);
            this.registeredFrameHandler.next(this._registeredFrames);
            return {
                store: {}
            };
        });
        // Un-Register
        postRobot.on(MESSAGE_TYPES.UNREGISTER, (event) => {
            this._trace(MESSAGE_TYPES.UNREGISTER, event);
            const index = this._registeredFrames.findIndex(frame => frame.data.id === event.data.id);
            if (index !== -1) {
                this._registeredFrames.splice(index, 1);
                this.registeredFrameHandler.next(this._registeredFrames);
            }
            return true;
        });
        // Open
        postRobot.on(MESSAGE_TYPES.OPEN, (event) => {
            this._trace(MESSAGE_TYPES.OPEN, event);
            return this.open(event.data).then(success => {
                return { success };
            });
        });
        // HTTP-GET
        postRobot.on(MESSAGE_TYPES.HTTP_GET, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_GET, event);
            return this.httpGET(event.data.relativeURL).then(result => {
                return { data: result.data, error: result.error };
            });
        });
        // HTTP-POST
        postRobot.on(MESSAGE_TYPES.HTTP_POST, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_POST, event);
            return this.httpPOST(event.data.relativeURL, event.data.data).then(result => {
                return { data: result.data, error: result.error };
            });
        });
        // HTTP-PUT
        postRobot.on(MESSAGE_TYPES.HTTP_PUT, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_PUT, event);
            return this.httpPUT(event.data.relativeURL, event.data.data).then((result) => {
                return { data: result.data, error: result.error };
            });
        });
        // HTTP-DELETE
        postRobot.on(MESSAGE_TYPES.HTTP_DELETE, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_DELETE, event);
            return this.httpDELETE(event.data.relativeURL).then(result => {
                return { data: result.data, error: result.error };
            });
        });
        // Custom Events
        postRobot.on(MESSAGE_TYPES.CUSTOM_EVENT, (event) => {
            this._trace(MESSAGE_TYPES.CUSTOM_EVENT, event);
            if (this._eventListeners[event.data.event]) {
                this._eventListeners[event.data.event].forEach((listener) => {
                    listener(event.data.data);
                });
            }
            if (this._registeredFrames.length > 0) {
                this._registeredFrames.forEach(frame => {
                    postRobot.send(frame.source, MESSAGE_TYPES.CUSTOM_EVENT, event.data);
                });
            }
        });
    }

    /**
     * Fires or responds to an open event
     * @param packet any - packet of data to send with the open event
     */
    public open(packet: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this._openHandler) {
                this._openHandler(packet, (success: boolean) => {
                    if (success) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            } else {
                postRobot.sendToParent(MESSAGE_TYPES.OPEN, packet).then((event) => {
                    this._trace(`${MESSAGE_TYPES.OPEN} (callback)`, event);
                    if (event.data) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                }).catch((err) => {
                    reject(false);
                });
            }
        });
    }

    /**
     * Fires or responds to an register event
     * @param packet any - packet of data to send with the event
     */
    public register(packet: any = {}): void {
        Object.assign(packet, { id: this.id });
        postRobot.sendToParent(MESSAGE_TYPES.REGISTER, packet).then((event) => {
            this._trace(`${MESSAGE_TYPES.REGISTER} (callback)`, event);
        }).catch((err) => {
            this.isMaster = true;
            this._trace(`${MESSAGE_TYPES.REGISTER} - FAILED - (no parent)`, err);
        });
    }

    /**
     * Fires or responds to an unregister event
     * @param packet any - packet of data to send with the event
     */
    public unregister(): void {
        const packet: any = { id: this.id };
        postRobot.sendToParent(MESSAGE_TYPES.UNREGISTER, packet).then((event: any) => {
            this._trace(`${MESSAGE_TYPES.UNREGISTER} (callback)`, event);
        }).catch((err: any) => {
            this._trace(`${MESSAGE_TYPES.UNREGISTER} - FAILED - (no parent)`, err);
        });
    }

    /**
     * Fires or responds to an HTTP_GET event
     * @param packet any - packet of data to send with the event
     */
    public httpGET(relativeURL: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this._httpHandler) {
                this._httpHandler({ verb: HTTP_VERBS.GET, relativeURL: relativeURL }, (data: any, error: any) => {
                    resolve({ data, error });
                });
            } else {
                postRobot.sendToParent(MESSAGE_TYPES.HTTP_GET, { relativeURL }).then((event: any) => {
                    resolve({ data: event.data.data, error: event.data.error });
                }).catch((err) => {
                    reject(null);
                });
            }
        });
    }

    /**
     * Fires or responds to an HTTP_POST event
     * @param packet any - packet of data to send with the event
     */
    public httpPOST(relativeURL: string, postData: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this._httpHandler) {
                this._httpHandler({ verb: HTTP_VERBS.POST, relativeURL: relativeURL, data: postData }, (data: any, error: any) => {
                    resolve({ data, error });
                });
            } else {
                postRobot.sendToParent(MESSAGE_TYPES.HTTP_POST, { relativeURL: relativeURL, data: postData }).then((event: any) => {
                    resolve({ data: event.data.data, error: event.data.error });
                }).catch((err) => {
                    reject(null);
                });
            }
        });
    }

    /**
     * Fires or responds to an HTTP_PUT event
     * @param packet any - packet of data to send with the event
     */
    public httpPUT(relativeURL: string, putData: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this._httpHandler) {
                this._httpHandler({ verb: HTTP_VERBS.PUT, relativeURL: relativeURL, data: putData }, (data: any, error: any) => {
                    resolve({ data, error });
                });
            } else {
                postRobot.sendToParent(MESSAGE_TYPES.HTTP_PUT, { relativeURL: relativeURL, data: putData }).then((event: any) => {
                    resolve({ data: event.data.data, error: event.data.error });
                }).catch((err) => {
                    reject(null);
                });
            }
        });
    }

    /**
     * Fires or responds to an HTTP_DELETE event
     * @param packet any - packet of data to send with the event
     */
    public httpDELETE(relativeURL: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this._httpHandler) {
                this._httpHandler({ verb: HTTP_VERBS.DELETE, relativeURL: relativeURL }, (data: any, error: any) => {
                    resolve({ data, error });
                });
            } else {
                postRobot.sendToParent(MESSAGE_TYPES.HTTP_DELETE, { relativeURL }).then((event: any) => {
                    resolve({ data: event.data.data, error: event.data.error });
                }).catch((err) => {
                    reject(null);
                });
            }
        });
    }

    /**
     * Fires a custom event to anywhere in the application
     * @param event string - event name to fire
     * @param data any - data to be sent along with the event
     */
    public fireEvent(event: string, data: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            postRobot.sendToParent(MESSAGE_TYPES.CUSTOM_EVENT, { event, data }).then((e: any) => {
                resolve(e);
            }).catch((err) => {
                reject(null);
            });
        });
    }

    /**
     * Adds an event listener to a custom event
     * @param event string - event name to listen to
     * @param callback function - callback to be fired when an event is caught
     */
    public addEventListener(event: string, callback: Function): void {
        if (!this._eventListeners[event]) {
            this._eventListeners[event] = [];
        }
        this._eventListeners[event].push(callback);
    }
}
