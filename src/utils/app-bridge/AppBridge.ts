// NG2
import { Injectable } from '@angular/core';
// Vendor
import { Subject } from 'rxjs/Subject';

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

@Injectable()
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
            return this.httpGET(event.data.relativeURL).then(data => {
                return { data };
            });
        });
        // HTTP-POST
        postRobot.on(MESSAGE_TYPES.HTTP_POST, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_POST, event);
            return this.httpPOST(event.data.relativeURL).then(data => {
                return { data };
            });
        });
        // HTTP-PUT
        postRobot.on(MESSAGE_TYPES.HTTP_PUT, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_PUT, event);
            return this.httpPUT(event.data.relativeURL).then(data => {
                return { data };
            });
        });
        // HTTP-DELETE
        postRobot.on(MESSAGE_TYPES.HTTP_DELETE, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_DELETE, event);
            return this.httpDELETE(event.data.relativeURL).then(data => {
                return { data };
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
        return new Promise<boolean>((resolve, reject) => {
            if (this._httpHandler) {
                this._httpHandler(HTTP_VERBS.GET, relativeURL, (data: any) => {
                    resolve(data);
                });
            } else {
                postRobot.sendToParent(MESSAGE_TYPES.HTTP_GET, { relativeURL }).then((event: any) => {
                    resolve(event.data.data);
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
    public httpPOST(relativeURL: string): Promise<any> {
        return new Promise<boolean>((resolve, reject) => {
            if (this._httpHandler) {
                this._httpHandler(HTTP_VERBS.POST, relativeURL, (data: any) => {
                    resolve(data);
                });
            } else {
                postRobot.sendToParent(MESSAGE_TYPES.HTTP_POST, { relativeURL }).then((event: any) => {
                    resolve(event.data.data);
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
    public httpPUT(relativeURL: string): Promise<any> {
        return new Promise<boolean>((resolve, reject) => {
            if (this._httpHandler) {
                this._httpHandler(HTTP_VERBS.PUT, relativeURL, (data: any) => {
                    resolve(data);
                });
            } else {
                postRobot.sendToParent(MESSAGE_TYPES.HTTP_PUT, { relativeURL }).then((event: any) => {
                    resolve(event.data.data);
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
        return new Promise<boolean>((resolve, reject) => {
            if (this._httpHandler) {
                this._httpHandler(HTTP_VERBS.DELETE, relativeURL, (data: any) => {
                    resolve(data);
                });
            } else {
                postRobot.sendToParent(MESSAGE_TYPES.HTTP_DELETE, { relativeURL }).then((event: any) => {
                    resolve(event.data.data);
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
