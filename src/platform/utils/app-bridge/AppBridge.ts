// NG2
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Vendor
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

export enum AppBridgeHandler {
  HTTP,
  OPEN,
  OPEN_LIST,
  CLOSE,
  REFRESH,
  PIN,
  REGISTER,
  UPDATE,
  REQUEST_DATA,
  CALLBACK,
}

export type NovoApps = 'record' | 'add' | 'fast-add' | 'custom';

export interface IAppBridgeOpenEvent {
  type: NovoApps;
  entityType: string;
  entityId?: string;
  tab?: string;
  data?: any;
  passthrough?: string;
}

export type MosaicLists =
  | 'Candidate'
  | 'ClientContact'
  | 'ClientCorporation'
  | 'JobOrder'
  | 'JobSubmission'
  | 'JobPosting'
  | 'Placement'
  | 'Lead'
  | 'Opportunity';

export interface IAppBridgeOpenListEvent {
  type: MosaicLists;
  keywords: Array<string>;
  criteria: any;
}

export type NovoDataType = 'entitlements' | 'settings' | 'user';

export interface IAppBridgeRequestDataEvent {
  type: NovoDataType;
}

const HTTP_VERBS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

const MESSAGE_TYPES = {
  REGISTER: 'register',
  OPEN: 'open',
  OPEN_LIST: 'openList',
  CLOSE: 'close',
  REFRESH: 'refresh',
  PIN: 'pin',
  UPDATE: 'update',
  HTTP_GET: 'httpGET',
  HTTP_POST: 'httpPOST',
  HTTP_PUT: 'httpPUT',
  HTTP_DELETE: 'httpDELETE',
  CUSTOM_EVENT: 'customEvent',
  REQUEST_DATA: 'requestData',
  CALLBACK: 'callback',
};

declare const postRobot: any;

export class AppBridgeService {
  create(name: string) {
    return new AppBridge(name);
  }
}

export class DevAppBridgeService {
  constructor(private http: HttpClient) {}
  create(name: string) {
    return new DevAppBridge(name, this.http);
  }
}

export class AppBridge {
  public id: string = `${Date.now()}`;
  public traceName: string;
  public windowName: string;

  private _registeredFrames: any[] = [];
  private _handlers = {};
  private _tracing: boolean = false;
  private _eventListeners: any = {};

  // Type?
  constructor(traceName: string = 'AppBridge') {
    this.traceName = traceName;
    if (postRobot) {
      postRobot.CONFIG.LOG_LEVEL = 'error';
      try {
        this._setupHandlers();
      } catch (error) {
        // No op
      }
    }
  }

  set tracing(tracing: boolean) {
    this._tracing = tracing;
  }

  public handle(type: AppBridgeHandler, handler: Function) {
    this._handlers[type] = handler;
  }

  private _trace(eventType, event) {
    if (this._tracing) {
      console.log(`[${this.traceName || this.id}] "${eventType}"`, event); // tslint:disable-line
    }
  }

  protected _setupHandlers(): void {
    // Register
    postRobot.on(MESSAGE_TYPES.REGISTER, (event) => {
      this._trace(MESSAGE_TYPES.REGISTER, event);
      this._registeredFrames.push(event);
      return this.register(event.data).then((windowName) => {
        return { windowName };
      });
    });
    // Update
    postRobot.on(MESSAGE_TYPES.UPDATE, (event) => {
      this._trace(MESSAGE_TYPES.UPDATE, event);
      return this.update(event.data).then((success) => {
        return { success };
      });
    });
    // Open
    postRobot.on(MESSAGE_TYPES.OPEN, (event) => {
      this._trace(MESSAGE_TYPES.OPEN, event);
      return this.open(event.data).then((success) => {
        return { success };
      });
    });
    postRobot.on(MESSAGE_TYPES.OPEN_LIST, (event) => {
      this._trace(MESSAGE_TYPES.OPEN_LIST, event);
      return this.openList(event.data).then((success) => {
        return { success };
      });
    });
    // Close
    postRobot.on(MESSAGE_TYPES.CLOSE, (event) => {
      this._trace(MESSAGE_TYPES.CLOSE, event);
      const index = this._registeredFrames.findIndex((frame) => frame.data.id === event.data.id);
      if (index !== -1) {
        this._registeredFrames.splice(index, 1);
      }
      return this.close(event.data).then((success) => {
        return { success };
      });
    });
    // Refresh
    postRobot.on(MESSAGE_TYPES.REFRESH, (event) => {
      this._trace(MESSAGE_TYPES.REFRESH, event);
      return this.refresh(event.data).then((success) => {
        return { success };
      });
    });
    // PIN
    postRobot.on(MESSAGE_TYPES.PIN, (event) => {
      this._trace(MESSAGE_TYPES.PIN, event);
      return this.pin(event.data).then((success) => {
        return { success };
      });
    });
    // REQUEST_DATA
    postRobot.on(MESSAGE_TYPES.REQUEST_DATA, (event) => {
      this._trace(MESSAGE_TYPES.REQUEST_DATA, event);
      return this.requestData(event.data).then((result) => {
        return { data: result.data, error: result.error };
      });
    });
    // CALLBACKS
    postRobot.on(MESSAGE_TYPES.CALLBACK, (event) => {
      this._trace(MESSAGE_TYPES.CALLBACK, event);
      return this.callback(event.data).then((success) => {
        return { success };
      });
    });
    // HTTP-GET
    postRobot.on(MESSAGE_TYPES.HTTP_GET, (event) => {
      this._trace(MESSAGE_TYPES.HTTP_GET, event);
      return this.httpGET(event.data.relativeURL).then((result) => {
        return { data: result.data, error: result.error };
      });
    });
    // HTTP-POST
    postRobot.on(MESSAGE_TYPES.HTTP_POST, (event) => {
      this._trace(MESSAGE_TYPES.HTTP_POST, event);
      return this.httpPOST(event.data.relativeURL, event.data.data).then((result) => {
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
      return this.httpDELETE(event.data.relativeURL).then((result) => {
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
        this._registeredFrames.forEach((frame) => {
          postRobot.send(frame.source, MESSAGE_TYPES.CUSTOM_EVENT, event.data);
        });
      }
    });
  }

  /**
   * Fires or responds to an open event
   * @param packet any - packet of data to send with the open event
   */
  public open(packet: IAppBridgeOpenEvent): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.OPEN]) {
        this._handlers[AppBridgeHandler.OPEN](packet, (success: boolean) => {
          if (success) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      } else {
        Object.assign(packet, { id: this.id, windowName: this.windowName });
        postRobot
          .sendToParent(MESSAGE_TYPES.OPEN, packet)
          .then((event) => {
            this._trace(`${MESSAGE_TYPES.OPEN} (callback)`, event);
            if (event.data) {
              resolve(true);
            } else {
              reject(false);
            }
          })
          .catch((err) => {
            reject(false);
          });
      }
    });
  }

  /**
   * Fires or responds to an openList event
   * @param packet any - packet of data to send with the open event
   */
  public openList(packet: Partial<IAppBridgeOpenListEvent>): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.OPEN_LIST]) {
        this._handlers[AppBridgeHandler.OPEN_LIST](packet, (success: boolean) => {
          if (success) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      } else {
        let openListPacket = {};
        Object.assign(openListPacket, { type: 'List', entityType: packet.type, keywords: packet.keywords, criteria: packet.criteria });
        postRobot
          .sendToParent(MESSAGE_TYPES.OPEN_LIST, packet)
          .then((event) => {
            this._trace(`${MESSAGE_TYPES.OPEN_LIST} (callback)`, event);
            if (event.data) {
              resolve(true);
            } else {
              reject(false);
            }
          })
          .catch((err) => {
            reject(false);
          });
      }
    });
  }

  /**
   * Fires or responds to an close event
   * @param packet any - packet of data to send with the close event
   */
  public update(
    packet: Partial<{ entityType: string; entityId: string; title: string; titleKey: string; color: string }>,
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.UPDATE]) {
        this._handlers[AppBridgeHandler.UPDATE](packet, (success: boolean) => {
          if (success) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      } else {
        Object.assign(packet, { id: this.id, windowName: this.windowName });
        postRobot
          .sendToParent(MESSAGE_TYPES.UPDATE, packet)
          .then((event) => {
            this._trace(`${MESSAGE_TYPES.UPDATE} (callback)`, event);
            if (event.data) {
              resolve(true);
            } else {
              reject(false);
            }
          })
          .catch((err) => {
            reject(false);
          });
      }
    });
  }

  /**
   * Fires or responds to an close event
   */
  public close(packet?: object): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.CLOSE]) {
        this._handlers[AppBridgeHandler.CLOSE](packet, (success: boolean) => {
          if (success) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      } else {
        if (packet) {
          console.info('[AppBridge] - close(packet) is deprecated! Please just use close()!'); // tslint:disable-line
        }
        let realPacket = { id: this.id, windowName: this.windowName };
        postRobot
          .sendToParent(MESSAGE_TYPES.CLOSE, realPacket)
          .then((event) => {
            this._trace(`${MESSAGE_TYPES.CLOSE} (callback)`, event);
            if (event.data) {
              resolve(true);
            } else {
              reject(false);
            }
          })
          .catch((err) => {
            reject(false);
          });
      }
    });
  }

  /**
   * Fires or responds to an close event
   */
  public refresh(packet?: object): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.REFRESH]) {
        this._handlers[AppBridgeHandler.REFRESH](packet, (success: boolean) => {
          if (success) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      } else {
        if (packet) {
          console.info('[AppBridge] - refresh(packet) is deprecated! Please just use refresh()!'); // tslint:disable-line
        }
        let realPacket = { id: this.id, windowName: this.windowName };
        postRobot
          .sendToParent(MESSAGE_TYPES.REFRESH, realPacket)
          .then((event) => {
            this._trace(`${MESSAGE_TYPES.REFRESH} (callback)`, event);
            if (event.data) {
              resolve(true);
            } else {
              reject(false);
            }
          })
          .catch((err) => {
            reject(false);
          });
      }
    });
  }

  /**
   * Fires or responds to a pin event
   */
  public pin(packet?: object): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.PIN]) {
        this._handlers[AppBridgeHandler.PIN](packet, (success: boolean) => {
          if (success) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      } else {
        if (packet) {
          console.info('[AppBridge] - pin(packet) is deprecated! Please just use pin()!'); // tslint:disable-line
        }
        let realPacket = { id: this.id, windowName: this.windowName };
        postRobot
          .sendToParent(MESSAGE_TYPES.PIN, realPacket)
          .then((event) => {
            this._trace(`${MESSAGE_TYPES.PIN} (callback)`, event);
            if (event.data) {
              resolve(true);
            } else {
              reject(false);
            }
          })
          .catch((err) => {
            reject(false);
          });
      }
    });
  }

  /**
   * Fires or responds to a requestData event
   * @param packet any - packet of data to send with the requestData event
   */
  public requestData(packet: { type: string }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.REQUEST_DATA]) {
        this._handlers[AppBridgeHandler.REQUEST_DATA](packet, (data: any) => {
          if (data) {
            resolve({ data });
          } else {
            reject(false);
          }
        });
      } else {
        Object.assign(packet, { id: this.id, windowName: this.windowName });
        postRobot
          .sendToParent(MESSAGE_TYPES.REQUEST_DATA, packet)
          .then((event) => {
            this._trace(`${MESSAGE_TYPES.REQUEST_DATA} (callback)`, event);
            if (event.data) {
              resolve({ data: event.data.data });
            } else {
              reject(false);
            }
          })
          .catch((err) => {
            reject(false);
          });
      }
    });
  }

  /**
   * Fires a generic callback command
   * @param packet string - key: string, generic: boolean
   */
  public callback(packet: { key: string; generic: boolean; options: object }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.CALLBACK]) {
        this._handlers[AppBridgeHandler.CALLBACK](packet, (success: boolean) => {
          if (success) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      } else {
        Object.assign(packet, { id: this.id, windowName: this.windowName });
        postRobot
          .sendToParent(MESSAGE_TYPES.CALLBACK, packet)
          .then((event) => {
            this._trace(`${MESSAGE_TYPES.CALLBACK} (callback)`, event);
            if (event.data) {
              resolve(true);
            } else {
              reject(false);
            }
          })
          .catch((err) => {
            reject(false);
          });
      }
    });
  }

  /**
   * Fires or responds to an register event
   * @param packet any - packet of data to send with the event
   */
  public register(packet: Partial<{ title: string; url: string; color: string }> = {}): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.REGISTER]) {
        this._handlers[AppBridgeHandler.REGISTER](packet, (windowName: string) => {
          if (windowName) {
            resolve(windowName);
          } else {
            resolve(null);
          }
        });
      } else {
        Object.assign(packet, { id: this.id });
        postRobot
          .sendToParent(MESSAGE_TYPES.REGISTER, packet)
          .then((event) => {
            this._trace(`${MESSAGE_TYPES.REGISTER} (callback)`, event);
            if (event.data) {
              this.windowName = event.data.windowName;
              resolve(event.data.windowName);
            } else {
              resolve(null);
            }
          })
          .catch((err) => {
            this._trace(`${MESSAGE_TYPES.REGISTER} - FAILED - (no parent)`, err);
            resolve(null);
          });
      }
    });
  }

  /**
   * Fires or responds to an HTTP_GET event
   * @param packet any - packet of data to send with the event
   */
  public httpGET(relativeURL: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.HTTP]) {
        this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.GET, relativeURL: relativeURL }, (data: any, error: any) => {
          resolve({ data, error });
        });
      } else {
        postRobot
          .sendToParent(MESSAGE_TYPES.HTTP_GET, { relativeURL })
          .then((event: any) => {
            resolve({ data: event.data.data, error: event.data.error });
          })
          .catch((err) => {
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
      if (this._handlers[AppBridgeHandler.HTTP]) {
        this._handlers[AppBridgeHandler.HTTP](
          { verb: HTTP_VERBS.POST, relativeURL: relativeURL, data: postData },
          (data: any, error: any) => {
            resolve({ data, error });
          },
        );
      } else {
        postRobot
          .sendToParent(MESSAGE_TYPES.HTTP_POST, { relativeURL: relativeURL, data: postData })
          .then((event: any) => {
            resolve({ data: event.data.data, error: event.data.error });
          })
          .catch((err) => {
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
      if (this._handlers[AppBridgeHandler.HTTP]) {
        this._handlers[AppBridgeHandler.HTTP](
          { verb: HTTP_VERBS.PUT, relativeURL: relativeURL, data: putData },
          (data: any, error: any) => {
            resolve({ data, error });
          },
        );
      } else {
        postRobot
          .sendToParent(MESSAGE_TYPES.HTTP_PUT, { relativeURL: relativeURL, data: putData })
          .then((event: any) => {
            resolve({ data: event.data.data, error: event.data.error });
          })
          .catch((err) => {
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
      if (this._handlers[AppBridgeHandler.HTTP]) {
        this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.DELETE, relativeURL: relativeURL }, (data: any, error: any) => {
          resolve({ data, error });
        });
      } else {
        postRobot
          .sendToParent(MESSAGE_TYPES.HTTP_DELETE, { relativeURL })
          .then((event: any) => {
            resolve({ data: event.data.data, error: event.data.error });
          })
          .catch((err) => {
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
      postRobot
        .sendToParent(MESSAGE_TYPES.CUSTOM_EVENT, { event, data })
        .then((e: any) => {
          resolve(e);
        })
        .catch((err) => {
          reject(null);
        });
    });
  }

  /**
   * Fires a custom event to all registered frames
   * @param event string - event name to fire
   * @param data any - data to be sent along with the event
   */
  public fireEventToChildren(event: string, data: any): void {
    if (this._registeredFrames.length > 0) {
      this._registeredFrames.forEach((frame) => {
        postRobot.send(frame.source, MESSAGE_TYPES.CUSTOM_EVENT, {
          eventType: event,
          data: data,
        });
      });
    }
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

export class DevAppBridge extends AppBridge {
  private baseURL: string;

  constructor(traceName: string = 'DevAppBridge', private http: HttpClient) {
    super(traceName);
    let cookie = this.getCookie('UlEncodedIdentity');
    if (cookie && cookie.length) {
      let identity = JSON.parse(decodeURIComponent(cookie));
      let endpoints = identity.sessions.reduce((obj, session) => {
        obj[session.name] = session.value.endpoint;
        return obj;
      }, {});
      this.baseURL = endpoints.rest;
    }
  }
  protected _setupHandlers(): void {}

  /**
   * Fires or responds to an HTTP_GET event
   * @param packet any - packet of data to send with the event
   */
  public httpGET(relativeURL: string): Promise<any> {
    return this.http
      .get(`${this.baseURL}/${relativeURL}`, { withCredentials: true })
      .map((res) => ({ data: res }))
      .toPromise();
  }

  /**
   * Fires or responds to an HTTP_POST event
   * @param packet any - packet of data to send with the event
   */
  public httpPOST(relativeURL: string, postData: any): Promise<any> {
    return this.http
      .post(`${this.baseURL}/${relativeURL}`, postData, { withCredentials: true })
      .map((res) => ({ data: res }))
      .toPromise();
  }

  /**
   * Fires or responds to an HTTP_PUT event
   * @param packet any - packet of data to send with the event
   */
  public httpPUT(relativeURL: string, putData: any): Promise<any> {
    return this.http
      .put(`${this.baseURL}/${relativeURL}`, putData, { withCredentials: true })
      .map((res) => ({ data: res }))
      .toPromise();
  }

  /**
   * Fires or responds to an HTTP_DELETE event
   * @param packet any - packet of data to send with the event
   */
  public httpDELETE(relativeURL: string): Promise<any> {
    return this.http
      .delete(`${this.baseURL}/${relativeURL}`, { withCredentials: true })
      .map((res) => ({ data: res }))
      .toPromise();
  }

  private getCookie(cname: string): any {
    if (document) {
      let name = `${cname}=`;
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
    }
    return false;
  }
}
