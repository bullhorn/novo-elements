// NG2
import { HttpClient } from '@angular/common/http';
import { AppBridgeHandler, AlleyLinkColors, IAppBridgeOpenEvent, IAppBridgeOpenListEvent, MESSAGE_TYPES, HTTP_VERBS } from './interfaces';

type ValueOf<T> = T[keyof T];

type MessageType = ValueOf<typeof MESSAGE_TYPES>;
type HttpVerb = ValueOf<typeof HTTP_VERBS>;

declare const postRobot: any;

export interface PostRobotEvent<T> {
  data: T;
  // the URL of the origin window
  origin: string;
  // the Window object this event was sent from (be warned, you may not be able to access its properties)
  source: Window;
}

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

  private _registeredFrames = [];
  private _handlers = {};
  private _tracing: boolean = false;
  private _eventListeners: any = {};

  private postRobot: any;

  // Type?
  constructor(traceName: string = 'AppBridge', postRobotRef?: any) {
    this.traceName = traceName;
    this.postRobot = postRobotRef || /* global */ postRobot;
    if (this.postRobot) {
      this.postRobot.CONFIG.LOG_LEVEL = 'error';
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

    // map an object for all handlers, so that we can run some other actions before each of them
    // @ts-ignore
    const defaultMsgHandlers: { [msgType in MessageType]?: (evt: PostRobotEvent<any>) => Promise<unknown> } = {
      // Register
      [MESSAGE_TYPES.REGISTER]: async (event) => {
        this._registeredFrames.push(event);
        const windowName = await this.register(event.data);
        return {windowName};
      },

      // Update
      [MESSAGE_TYPES.UPDATE]: (event: PostRobotEvent<any>) => {
        return this.update(event.data).then((success) => {
          return { success };
        });
      },
      // Open
      [MESSAGE_TYPES.OPEN]: (event: PostRobotEvent<any>) => {
        return this.open(event.data).then((success) => {
          return { success };
        });
      },
      [MESSAGE_TYPES.OPEN_LIST]: (event: PostRobotEvent<any>) => {
        return this.openList(event.data).then((success) => {
          return { success };
        });
      },
      // Close
      [MESSAGE_TYPES.CLOSE]: (event: PostRobotEvent<any>) => {
        const index = this._registeredFrames.findIndex((frame) => frame.data.id === event.data.id);
        if (index !== -1) {
          this._registeredFrames.splice(index, 1);
        }
        return this.close(event.data).then(success => ({ success }));
      },
      // Refresh
      [MESSAGE_TYPES.REFRESH]: (event: PostRobotEvent<any>) => {
        return this.refresh(event.data).then((success) => {
          return { success };
        });
      },
      // PIN
      [MESSAGE_TYPES.PIN]: (event: PostRobotEvent<any>) => {
        return this.pin(event.data).then((success) => {
          return { success };
        });
      },
      // PING
      [MESSAGE_TYPES.PING]: (event: PostRobotEvent<any>) => {
        return this.httpGET('ping', undefined, event.data.origin).then((result) => {
          return { data: result.data, error: result.error };
        });
      },
      // REQUEST_DATA
      [MESSAGE_TYPES.REQUEST_DATA]: (event: PostRobotEvent<any>) => {
        return this.requestData(event.data).then((result) => {
          return { data: result.data, error: result.error };
        });
      },
      // CALLBACKS
      [MESSAGE_TYPES.CALLBACK]: (event: PostRobotEvent<any>) => {
        return this.callback(event.data).then((success) => {
          return { success };
        });
      },
      // HTTP-GET
      [MESSAGE_TYPES.HTTP_GET]: (event: PostRobotEvent<any>) => {
        return this.httpGET(event.data.relativeURL, undefined, event.data.origin).then((result) => {
          return { data: result.data, error: result.error };
        });
      },
      // HTTP-POST
      [MESSAGE_TYPES.HTTP_POST]: (event: PostRobotEvent<any>) => {
        return this.httpPOST(event.data.relativeURL, event.data.data, undefined, event.data.origin).then((result) => {
          return { data: result.data, error: result.error };
        });
      },
      // HTTP-PUT
      [MESSAGE_TYPES.HTTP_PUT]: (event: PostRobotEvent<any>) => {
        return this.httpPUT(event.data.relativeURL, event.data.data, undefined, event.data.origin).then((result) => {
          return { data: result.data, error: result.error };
        });
      },
      // HTTP-DELETE
      [MESSAGE_TYPES.HTTP_DELETE]: (event: PostRobotEvent<any>) => {
        return this.httpDELETE(event.data.relativeURL, undefined, event.data.origin).then((result) => {
          return { data: result.data, error: result.error };
        });
      },
      // Custom Events
      [MESSAGE_TYPES.CUSTOM_EVENT]: (event: PostRobotEvent<any>) => {
        if (this._eventListeners[event.data.event]) {
          this._eventListeners[event.data.event].forEach((listener) => {
            listener(event.data.data);
          });
        }
        if (this._registeredFrames.length > 0) {
          this._registeredFrames.forEach((frame) => {
            this.postRobot.send(frame.source, MESSAGE_TYPES.CUSTOM_EVENT, event.data);
          });
        }
      }
    };

    Object.keys(defaultMsgHandlers).forEach(msgType => {
      this.postRobot.on(msgType, event => {
        this._trace(msgType, event);
        const origin: string[] = Array.isArray(event.data.origin) ? event.data.origin : [];
        if (event.origin !== this.windowOrigin()) {
          origin.unshift(event.origin);
        } else if (origin.indexOf(event.data.originTraceName) === -1)  {
          origin.unshift(event.data.originTraceName);
        }
        event.data.origin = origin;
        event.data.source = event.source;
        return defaultMsgHandlers[msgType](event);
      })
    });
  }

  protected windowOrigin() {
    return window.location.origin;
  }

  handleMessage<T>({ msgType, handler, packet, echoPacket, resolveEventData }: {
    msgType: MessageType,
    handler: AppBridgeHandler,
    packet: T,
    echoPacket: any,
    resolveEventData: (any) => boolean,
  }): Promise<boolean> {
    let returnPromise: Promise<any>;
    if (this._handlers[handler]) {
      // Should be directly returning a promise. However, as a fallback, provide callback arguments
      let callbackSuccess, callbackFail;
      returnPromise = new Promise((s, f) => {
        callbackSuccess = s;
        callbackFail = f;
      });
      const handlerResult = this._handlers[handler](packet, callbackArg => {
        if (callbackArg) {
          callbackSuccess(true);
        } else {
          callbackFail(false);
        }
      });
      if (handlerResult && 'then' in handlerResult) {
        returnPromise = handlerResult;
      }
      return returnPromise.then(result => true, () => false);
    } else {
      return this.postRobot.sendToParent(msgType, echoPacket || packet);
    }

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
        this.postRobot
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
        const openListPacket = {};
        Object.assign(openListPacket, { type: 'List', entityType: packet.type, keywords: packet.keywords, criteria: packet.criteria });
        this.postRobot
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
    packet: Partial<{ entityType: string; entityId: string; title: string; titleKey: string; color: AlleyLinkColors }>,
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
        this.postRobot
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
        const realPacket = { id: this.id, windowName: this.windowName };
        this.postRobot
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
        const realPacket = { id: this.id, windowName: this.windowName };
        this.postRobot
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

  public ping(): Promise<boolean> {
    return new Promise<any>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.PING]) {
        this._handlers[AppBridgeHandler.PING]({}, (data: any, error: any) => {
          resolve({ data, error });
        });
      } else {
        this.postRobot
          .sendToParent(MESSAGE_TYPES.PING, {})
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
        const realPacket = { id: this.id, windowName: this.windowName };
        this.postRobot
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
        this.postRobot
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
        this.postRobot
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
  public register(packet: Partial<{ title: string; url: string; color: AlleyLinkColors }> = {}): Promise<string> {
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
        this.postRobot
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
            reject(err);
          });
      }
    });
  }

  /**
   * Fires or responds to an HTTP_GET event
   * @param relativeURL string - URL to fetch, relative to the mainframe URL
   * @param timeout - how long to attempt the request before reporting an error
   * @param originStack - the domain of the previous frame(s) the request originated from
   */
  public httpGET(relativeURL: string, timeout: number = 10000, originStack?: string[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.HTTP]) {
        this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.GET, relativeURL, origin: originStack || [this.traceName] }, (data: any, error: any) => {
          resolve({ data, error });
        });
      } else {
        this.postRobot
          .sendToParent(MESSAGE_TYPES.HTTP_GET, { relativeURL, origin: originStack, originTraceName: this.traceName }, { timeout })
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
   * @param relativeURL string - URL to fetch, relative to the mainframe URL
   * @param postData any - packet of data to send with the event
   * @param timeout - how long to attempt the request before reporting an error
   * @param originStack - the domain of the previous frame(s) the request originated from
   */
  public httpPOST(relativeURL: string, postData: any, timeout: number = 10000, originStack?: string[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.HTTP]) {
        this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.POST, relativeURL, data: postData, origin: originStack || [this.traceName] }, (data: any, error: any) => {
          resolve({ data, error });
        });
      } else {
        this.postRobot
          .sendToParent(MESSAGE_TYPES.HTTP_POST, { relativeURL, data: postData, origin: originStack, originTraceName: this.traceName }, { timeout })
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
   * @param relativeURL string - URL to fetch, relative to the mainframe URL
   * @param packet any - packet of data to send with the event
   * @param timeout - how long to attempt the request before reporting an error
   * @param originStack - the domain of the previous frame(s) the request originated from
   */
  public httpPUT(relativeURL: string, putData: any, timeout: number = 10000, originStack?: string[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.HTTP]) {
        this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.PUT, relativeURL, data: putData, origin: originStack || [this.traceName] }, (data: any, error: any) => {
          resolve({ data, error });
        });
      } else {
        this.postRobot
          .sendToParent(MESSAGE_TYPES.HTTP_PUT, { relativeURL, data: putData, origin: originStack, originTraceName: this.traceName }, { timeout })
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
   * @param relativeURL string - URL to fetch, relative to the mainframe URL
   * @param timeout - how long to attempt the request before reporting an error
   * @param originStack - the domain of the previous frame(s) the request originated from
   */
  public httpDELETE(relativeURL: string, timeout: number = 10000, originStack?: string[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this._handlers[AppBridgeHandler.HTTP]) {
        this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.DELETE, relativeURL, origin: originStack || [this.traceName] }, (data: any, error: any) => {
          resolve({ data, error });
        });
      } else {
        this.postRobot
          .sendToParent(MESSAGE_TYPES.HTTP_DELETE, { relativeURL, origin: originStack, originTraceName: this.traceName }, { timeout })
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
      this.postRobot
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
        this.postRobot.send(frame.source, MESSAGE_TYPES.CUSTOM_EVENT, {
          event,
          eventType: event,
          data,
        });
      });
    }
  }

  /**
   * Fires a custom event to specified frames
   * @param source Window - specific iframe contentWindow
   * @param event string - event name to fire
   * @param data any - data to be sent along with the event
   */
  public fireEventToChild(source: Window | HTMLIFrameElement, event: string, data: any): void {
    if (source instanceof HTMLIFrameElement) {
      source = source.contentWindow;
    }
    this.postRobot.send(source, MESSAGE_TYPES.CUSTOM_EVENT, { event, data });
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
    const cookie = this.getCookie('UlEncodedIdentity');
    if (cookie && cookie.length) {
      const identity = JSON.parse(decodeURIComponent(cookie));
      const endpoints = identity.sessions.reduce((obj, session) => {
        obj[session.name] = session.value.endpoint;
        return obj;
      }, {});
      this.baseURL = endpoints.rest;
    }
  }
  protected _setupHandlers(): void {}

  /**
   * Fires or responds to an HTTP_GET event
   */
  public httpGET(relativeURL: string): Promise<any> {
    return this.http.get(`${this.baseURL}/${relativeURL}`, { withCredentials: true }).toPromise();
  }

  /**
   * Fires or responds to an HTTP_POST event
   */
  public httpPOST(relativeURL: string, postData: any): Promise<any> {
    return this.http.post(`${this.baseURL}/${relativeURL}`, postData, { withCredentials: true }).toPromise();
  }

  /**
   * Fires or responds to an HTTP_PUT event
   */
  public httpPUT(relativeURL: string, putData: any): Promise<any> {
    return this.http.put(`${this.baseURL}/${relativeURL}`, putData, { withCredentials: true }).toPromise();
  }

  /**
   * Fires or responds to an HTTP_DELETE event
   */
  public httpDELETE(relativeURL: string): Promise<any> {
    return this.http.delete(`${this.baseURL}/${relativeURL}`, { withCredentials: true }).toPromise();
  }

  private getCookie(cname: string): any {
    if (document) {
      const name = `${cname}=`;
      const ca = document.cookie.split(';');
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
