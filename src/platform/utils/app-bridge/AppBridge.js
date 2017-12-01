"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/toPromise");
var AppBridgeHandler;
(function (AppBridgeHandler) {
    AppBridgeHandler[AppBridgeHandler["HTTP"] = 0] = "HTTP";
    AppBridgeHandler[AppBridgeHandler["OPEN"] = 1] = "OPEN";
    AppBridgeHandler[AppBridgeHandler["OPEN_LIST"] = 2] = "OPEN_LIST";
    AppBridgeHandler[AppBridgeHandler["CLOSE"] = 3] = "CLOSE";
    AppBridgeHandler[AppBridgeHandler["REFRESH"] = 4] = "REFRESH";
    AppBridgeHandler[AppBridgeHandler["PIN"] = 5] = "PIN";
    AppBridgeHandler[AppBridgeHandler["REGISTER"] = 6] = "REGISTER";
    AppBridgeHandler[AppBridgeHandler["UPDATE"] = 7] = "UPDATE";
    AppBridgeHandler[AppBridgeHandler["REQUEST_DATA"] = 8] = "REQUEST_DATA";
    AppBridgeHandler[AppBridgeHandler["CALLBACK"] = 9] = "CALLBACK";
})(AppBridgeHandler = exports.AppBridgeHandler || (exports.AppBridgeHandler = {}));
var HTTP_VERBS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};
var MESSAGE_TYPES = {
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
    CALLBACK: 'callback'
};
var AppBridgeService = (function () {
    function AppBridgeService() {
    }
    AppBridgeService.prototype.create = function (name) {
        return new AppBridge(name);
    };
    return AppBridgeService;
}());
exports.AppBridgeService = AppBridgeService;
var DevAppBridgeService = (function () {
    function DevAppBridgeService(http) {
        this.http = http;
    }
    DevAppBridgeService.prototype.create = function (name) {
        return new DevAppBridge(name, this.http);
    };
    return DevAppBridgeService;
}());
exports.DevAppBridgeService = DevAppBridgeService;
var AppBridge = (function () {
    // Type?
    function AppBridge(traceName) {
        if (traceName === void 0) { traceName = 'AppBridge'; }
        this.id = "" + Date.now();
        this._registeredFrames = [];
        this._handlers = {};
        this._tracing = false;
        this._eventListeners = {};
        this.traceName = traceName;
        if (postRobot) {
            postRobot.CONFIG.LOG_LEVEL = 'error';
            try {
                this._setupHandlers();
            }
            catch (error) {
                // No op
            }
        }
    }
    Object.defineProperty(AppBridge.prototype, "tracing", {
        set: function (tracing) {
            this._tracing = tracing;
        },
        enumerable: true,
        configurable: true
    });
    AppBridge.prototype.handle = function (type, handler) {
        this._handlers[type] = handler;
    };
    AppBridge.prototype._trace = function (eventType, event) {
        if (this._tracing) {
            console.log("[" + (this.traceName || this.id) + "] \"" + eventType + "\"", event); // tslint:disable-line
        }
    };
    AppBridge.prototype._setupHandlers = function () {
        var _this = this;
        // Register
        postRobot.on(MESSAGE_TYPES.REGISTER, function (event) {
            _this._trace(MESSAGE_TYPES.REGISTER, event);
            _this._registeredFrames.push(event);
            return _this.register(event.data).then(function (windowName) {
                _this.windowName = windowName;
                return { windowName: windowName };
            });
        });
        // Update
        postRobot.on(MESSAGE_TYPES.UPDATE, function (event) {
            _this._trace(MESSAGE_TYPES.UPDATE, event);
            return _this.update(event.data).then(function (success) {
                return { success: success };
            });
        });
        // Open
        postRobot.on(MESSAGE_TYPES.OPEN, function (event) {
            _this._trace(MESSAGE_TYPES.OPEN, event);
            return _this.open(event.data).then(function (success) {
                return { success: success };
            });
        });
        postRobot.on(MESSAGE_TYPES.OPEN_LIST, function (event) {
            _this._trace(MESSAGE_TYPES.OPEN_LIST, event);
            return _this.openList(event.data).then(function (success) {
                return { success: success };
            });
        });
        // Close
        postRobot.on(MESSAGE_TYPES.CLOSE, function (event) {
            _this._trace(MESSAGE_TYPES.CLOSE, event);
            var index = _this._registeredFrames.findIndex(function (frame) { return frame.data.id === event.data.id; });
            if (index !== -1) {
                _this._registeredFrames.splice(index, 1);
            }
            return _this.close(event.data).then(function (success) {
                return { success: success };
            });
        });
        // Refresh
        postRobot.on(MESSAGE_TYPES.REFRESH, function (event) {
            _this._trace(MESSAGE_TYPES.REFRESH, event);
            return _this.refresh(event.data).then(function (success) {
                return { success: success };
            });
        });
        // PIN
        postRobot.on(MESSAGE_TYPES.PIN, function (event) {
            _this._trace(MESSAGE_TYPES.PIN, event);
            return _this.pin(event.data).then(function (success) {
                return { success: success };
            });
        });
        // REQUEST_DATA
        postRobot.on(MESSAGE_TYPES.REQUEST_DATA, function (event) {
            _this._trace(MESSAGE_TYPES.REQUEST_DATA, event);
            return _this.requestData(event.data).then(function (result) {
                return { data: result.data, error: result.error };
            });
        });
        // CALLBACKS
        postRobot.on(MESSAGE_TYPES.CALLBACK, function (event) {
            _this._trace(MESSAGE_TYPES.CALLBACK, event);
            return _this.callback(event.data).then(function (success) {
                return { success: success };
            });
        });
        // HTTP-GET
        postRobot.on(MESSAGE_TYPES.HTTP_GET, function (event) {
            _this._trace(MESSAGE_TYPES.HTTP_GET, event);
            return _this.httpGET(event.data.relativeURL).then(function (result) {
                return { data: result.data, error: result.error };
            });
        });
        // HTTP-POST
        postRobot.on(MESSAGE_TYPES.HTTP_POST, function (event) {
            _this._trace(MESSAGE_TYPES.HTTP_POST, event);
            return _this.httpPOST(event.data.relativeURL, event.data.data).then(function (result) {
                return { data: result.data, error: result.error };
            });
        });
        // HTTP-PUT
        postRobot.on(MESSAGE_TYPES.HTTP_PUT, function (event) {
            _this._trace(MESSAGE_TYPES.HTTP_PUT, event);
            return _this.httpPUT(event.data.relativeURL, event.data.data).then(function (result) {
                return { data: result.data, error: result.error };
            });
        });
        // HTTP-DELETE
        postRobot.on(MESSAGE_TYPES.HTTP_DELETE, function (event) {
            _this._trace(MESSAGE_TYPES.HTTP_DELETE, event);
            return _this.httpDELETE(event.data.relativeURL).then(function (result) {
                return { data: result.data, error: result.error };
            });
        });
        // Custom Events
        postRobot.on(MESSAGE_TYPES.CUSTOM_EVENT, function (event) {
            _this._trace(MESSAGE_TYPES.CUSTOM_EVENT, event);
            if (_this._eventListeners[event.data.event]) {
                _this._eventListeners[event.data.event].forEach(function (listener) {
                    listener(event.data.data);
                });
            }
            if (_this._registeredFrames.length > 0) {
                _this._registeredFrames.forEach(function (frame) {
                    postRobot.send(frame.source, MESSAGE_TYPES.CUSTOM_EVENT, event.data);
                });
            }
        });
    };
    /**
     * Fires or responds to an open event
     * @param packet any - packet of data to send with the open event
     */
    AppBridge.prototype.open = function (packet) {
        var _this = this;
        Object.assign(packet, { id: this.id, windowName: this.windowName });
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.OPEN]) {
                _this._handlers[AppBridgeHandler.OPEN](packet, function (success) {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.OPEN, packet).then(function (event) {
                    _this._trace(MESSAGE_TYPES.OPEN + " (callback)", event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                }).catch(function (err) {
                    reject(false);
                });
            }
        });
    };
    /**
     * Fires or responds to an openList event
     * @param packet any - packet of data to send with the open event
     */
    AppBridge.prototype.openList = function (packet) {
        var _this = this;
        var openListPacket = {};
        Object.assign(openListPacket, { type: 'List', entityType: packet.type, keywords: packet.keywords, criteria: packet.criteria });
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.OPEN_LIST]) {
                _this._handlers[AppBridgeHandler.OPEN_LIST](packet, function (success) {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.OPEN_LIST, packet).then(function (event) {
                    _this._trace(MESSAGE_TYPES.OPEN_LIST + " (callback)", event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                }).catch(function (err) {
                    reject(false);
                });
            }
        });
    };
    /**
     * Fires or responds to an close event
     * @param packet any - packet of data to send with the close event
     */
    AppBridge.prototype.update = function (packet) {
        var _this = this;
        Object.assign(packet, { id: this.id, windowName: this.windowName });
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.UPDATE]) {
                _this._handlers[AppBridgeHandler.UPDATE](packet, function (success) {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.UPDATE, packet).then(function (event) {
                    _this._trace(MESSAGE_TYPES.UPDATE + " (callback)", event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                }).catch(function (err) {
                    reject(false);
                });
            }
        });
    };
    /**
     * Fires or responds to an close event
     */
    AppBridge.prototype.close = function (packet) {
        var _this = this;
        if (packet) {
            console.info('[AppBridge] - close(packet) is deprecated! Please just use close()!'); // tslint:disable-line
        }
        var realPacket = { id: this.id, windowName: this.windowName };
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.CLOSE]) {
                _this._handlers[AppBridgeHandler.CLOSE](realPacket, function (success) {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.CLOSE, realPacket).then(function (event) {
                    _this._trace(MESSAGE_TYPES.CLOSE + " (callback)", event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                }).catch(function (err) {
                    reject(false);
                });
            }
        });
    };
    /**
     * Fires or responds to an close event
     */
    AppBridge.prototype.refresh = function (packet) {
        var _this = this;
        if (packet) {
            console.info('[AppBridge] - refresh(packet) is deprecated! Please just use refresh()!'); // tslint:disable-line
        }
        var realPacket = { id: this.id, windowName: this.windowName };
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.REFRESH]) {
                _this._handlers[AppBridgeHandler.REFRESH](realPacket, function (success) {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.REFRESH, realPacket).then(function (event) {
                    _this._trace(MESSAGE_TYPES.REFRESH + " (callback)", event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                }).catch(function (err) {
                    reject(false);
                });
            }
        });
    };
    /**
     * Fires or responds to a pin event
     */
    AppBridge.prototype.pin = function (packet) {
        var _this = this;
        if (packet) {
            console.info('[AppBridge] - pin(packet) is deprecated! Please just use pin()!'); // tslint:disable-line
        }
        var realPacket = { id: this.id, windowName: this.windowName };
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.PIN]) {
                _this._handlers[AppBridgeHandler.PIN](realPacket, function (success) {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.PIN, realPacket).then(function (event) {
                    _this._trace(MESSAGE_TYPES.PIN + " (callback)", event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                }).catch(function (err) {
                    reject(false);
                });
            }
        });
    };
    /**
    * Fires or responds to a requestData event
    * @param packet any - packet of data to send with the requestData event
    */
    AppBridge.prototype.requestData = function (packet) {
        var _this = this;
        Object.assign(packet, { id: this.id, windowName: this.windowName });
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.REQUEST_DATA]) {
                _this._handlers[AppBridgeHandler.REQUEST_DATA](packet, function (data) {
                    if (data) {
                        resolve({ data: data });
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.REQUEST_DATA, packet).then(function (event) {
                    _this._trace(MESSAGE_TYPES.REQUEST_DATA + " (callback)", event);
                    if (event.data) {
                        resolve({ data: event.data.data });
                    }
                    else {
                        reject(false);
                    }
                }).catch(function (err) {
                    reject(false);
                });
            }
        });
    };
    /**
     * Fires a generic callback command
     * @param packet string - key: string, generic: boolean
     */
    AppBridge.prototype.callback = function (packet) {
        var _this = this;
        Object.assign(packet, { id: this.id, windowName: this.windowName });
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.CALLBACK]) {
                _this._handlers[AppBridgeHandler.CALLBACK](packet, function (success) {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.CALLBACK, packet).then(function (event) {
                    _this._trace(MESSAGE_TYPES.CALLBACK + " (callback)", event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                }).catch(function (err) {
                    reject(false);
                });
            }
        });
    };
    /**
     * Fires or responds to an register event
     * @param packet any - packet of data to send with the event
     */
    AppBridge.prototype.register = function (packet) {
        var _this = this;
        if (packet === void 0) { packet = {}; }
        Object.assign(packet, { id: this.id, windowName: this.windowName });
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.REGISTER]) {
                _this._handlers[AppBridgeHandler.REGISTER](packet, function (windowName) {
                    if (windowName) {
                        resolve(windowName);
                    }
                    else {
                        resolve(null);
                    }
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.REGISTER, packet).then(function (event) {
                    _this._trace(MESSAGE_TYPES.REGISTER + " (callback)", event);
                    if (event.data) {
                        _this.windowName = event.data.windowName;
                        resolve(event.data.windowName);
                    }
                    else {
                        resolve(null);
                    }
                }).catch(function (err) {
                    _this._trace(MESSAGE_TYPES.REGISTER + " - FAILED - (no parent)", err);
                    resolve(null);
                });
            }
        });
    };
    /**
     * Fires or responds to an HTTP_GET event
     * @param packet any - packet of data to send with the event
     */
    AppBridge.prototype.httpGET = function (relativeURL) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.HTTP]) {
                _this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.GET, relativeURL: relativeURL }, function (data, error) {
                    resolve({ data: data, error: error });
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.HTTP_GET, { relativeURL: relativeURL }).then(function (event) {
                    resolve({ data: event.data.data, error: event.data.error });
                }).catch(function (err) {
                    reject(null);
                });
            }
        });
    };
    /**
     * Fires or responds to an HTTP_POST event
     * @param packet any - packet of data to send with the event
     */
    AppBridge.prototype.httpPOST = function (relativeURL, postData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.HTTP]) {
                _this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.POST, relativeURL: relativeURL, data: postData }, function (data, error) {
                    resolve({ data: data, error: error });
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.HTTP_POST, { relativeURL: relativeURL, data: postData }).then(function (event) {
                    resolve({ data: event.data.data, error: event.data.error });
                }).catch(function (err) {
                    reject(null);
                });
            }
        });
    };
    /**
     * Fires or responds to an HTTP_PUT event
     * @param packet any - packet of data to send with the event
     */
    AppBridge.prototype.httpPUT = function (relativeURL, putData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.HTTP]) {
                _this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.PUT, relativeURL: relativeURL, data: putData }, function (data, error) {
                    resolve({ data: data, error: error });
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.HTTP_PUT, { relativeURL: relativeURL, data: putData }).then(function (event) {
                    resolve({ data: event.data.data, error: event.data.error });
                }).catch(function (err) {
                    reject(null);
                });
            }
        });
    };
    /**
     * Fires or responds to an HTTP_DELETE event
     * @param packet any - packet of data to send with the event
     */
    AppBridge.prototype.httpDELETE = function (relativeURL) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._handlers[AppBridgeHandler.HTTP]) {
                _this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.DELETE, relativeURL: relativeURL }, function (data, error) {
                    resolve({ data: data, error: error });
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.HTTP_DELETE, { relativeURL: relativeURL }).then(function (event) {
                    resolve({ data: event.data.data, error: event.data.error });
                }).catch(function (err) {
                    reject(null);
                });
            }
        });
    };
    /**
     * Fires a custom event to anywhere in the application
     * @param event string - event name to fire
     * @param data any - data to be sent along with the event
     */
    AppBridge.prototype.fireEvent = function (event, data) {
        return new Promise(function (resolve, reject) {
            postRobot.sendToParent(MESSAGE_TYPES.CUSTOM_EVENT, { event: event, data: data }).then(function (e) {
                resolve(e);
            }).catch(function (err) {
                reject(null);
            });
        });
    };
    /**
     * Fires a custom event to all registered frames
     * @param event string - event name to fire
     * @param data any - data to be sent along with the event
     */
    AppBridge.prototype.fireEventToChildren = function (event, data) {
        if (this._registeredFrames.length > 0) {
            this._registeredFrames.forEach(function (frame) {
                postRobot.send(frame.source, MESSAGE_TYPES.CUSTOM_EVENT, {
                    eventType: event,
                    data: data
                });
            });
        }
    };
    /**
     * Adds an event listener to a custom event
     * @param event string - event name to listen to
     * @param callback function - callback to be fired when an event is caught
     */
    AppBridge.prototype.addEventListener = function (event, callback) {
        if (!this._eventListeners[event]) {
            this._eventListeners[event] = [];
        }
        this._eventListeners[event].push(callback);
    };
    return AppBridge;
}());
exports.AppBridge = AppBridge;
var DevAppBridge = (function (_super) {
    __extends(DevAppBridge, _super);
    function DevAppBridge(traceName, http) {
        if (traceName === void 0) { traceName = 'DevAppBridge'; }
        var _this = _super.call(this, traceName) || this;
        _this.http = http;
        var cookie = _this.getCookie('UlEncodedIdentity');
        if (cookie && cookie.length) {
            var identity = JSON.parse(decodeURIComponent(cookie));
            var endpoints = identity.sessions.reduce(function (obj, session) {
                obj[session.name] = session.value.endpoint;
                return obj;
            }, {});
            _this.baseURL = endpoints.rest;
        }
        return _this;
    }
    DevAppBridge.prototype._setupHandlers = function () { };
    /**
    * Fires or responds to an HTTP_GET event
    * @param packet any - packet of data to send with the event
    */
    DevAppBridge.prototype.httpGET = function (relativeURL) {
        return this.http.get(this.baseURL + "/" + relativeURL, { withCredentials: true }).map(function (res) { return ({ data: res.json() }); }).toPromise();
    };
    /**
     * Fires or responds to an HTTP_POST event
     * @param packet any - packet of data to send with the event
     */
    DevAppBridge.prototype.httpPOST = function (relativeURL, postData) {
        return this.http.post(this.baseURL + "/" + relativeURL, postData, { withCredentials: true }).map(function (res) { return ({ data: res.json() }); }).toPromise();
    };
    /**
     * Fires or responds to an HTTP_PUT event
     * @param packet any - packet of data to send with the event
     */
    DevAppBridge.prototype.httpPUT = function (relativeURL, putData) {
        return this.http.put(this.baseURL + "/" + relativeURL, putData, { withCredentials: true }).map(function (res) { return ({ data: res.json() }); }).toPromise();
    };
    /**
     * Fires or responds to an HTTP_DELETE event
     * @param packet any - packet of data to send with the event
     */
    DevAppBridge.prototype.httpDELETE = function (relativeURL) {
        return this.http.delete(this.baseURL + "/" + relativeURL, { withCredentials: true }).map(function (res) { return ({ data: res.json() }); }).toPromise();
    };
    DevAppBridge.prototype.getCookie = function (cname) {
        if (document) {
            var name_1 = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name_1) === 0) {
                    return c.substring(name_1.length, c.length);
                }
            }
        }
        return false;
    };
    return DevAppBridge;
}(AppBridge));
exports.DevAppBridge = DevAppBridge;
//# sourceMappingURL=AppBridge.js.map