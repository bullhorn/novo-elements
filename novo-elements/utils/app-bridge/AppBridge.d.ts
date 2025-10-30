import { HttpClient } from '@angular/common/http';
import { AppBridgeHandler, AlleyLinkColors, IAppBridgeOpenEvent, IAppBridgeOpenListEvent, MESSAGE_TYPES } from './interfaces';
type ValueOf<T> = T[keyof T];
type MessageType = ValueOf<typeof MESSAGE_TYPES>;
export interface PostRobotEvent<T> {
    data: T;
    origin: string;
    source: Window;
}
export declare class AppBridgeService {
    create(name: string): AppBridge;
}
export declare class DevAppBridgeService {
    private http;
    constructor(http: HttpClient);
    create(name: string, postRobotRef?: any): DevAppBridge;
}
export declare class AppBridge {
    id: string;
    traceName: string;
    windowName: string;
    private _registeredFrames;
    private _handlers;
    private _tracing;
    private _eventListeners;
    private postRobot;
    constructor(traceName?: string, postRobotRef?: any);
    set tracing(tracing: boolean);
    handle(type: AppBridgeHandler, handler: Function): void;
    private _trace;
    protected _setupHandlers(): void;
    protected windowOrigin(): string;
    handleMessage<T>({ msgType, handler, packet, echoPacket, resolveEventData }: {
        msgType: MessageType;
        handler: AppBridgeHandler;
        packet: T;
        echoPacket: any;
        resolveEventData: (any: any) => boolean;
    }): Promise<boolean>;
    /**
     * Fires or responds to an open event
     * @param packet any - packet of data to send with the open event
     */
    open(packet: IAppBridgeOpenEvent): Promise<boolean>;
    /**
     * Fires or responds to an openList event
     * @param packet any - packet of data to send with the open event
     */
    openList(packet: Partial<IAppBridgeOpenListEvent>): Promise<boolean>;
    /**
     * Fires or responds to an close event
     * @param packet any - packet of data to send with the close event
     */
    update(packet: Partial<{
        entityType: string;
        entityId: string;
        title: string;
        titleKey: string;
        color: AlleyLinkColors;
    }>): Promise<boolean>;
    /**
     * Fires or responds to an close event
     */
    close(packet?: object): Promise<boolean>;
    /**
     * Fires or responds to an close event
     */
    refresh(packet?: object): Promise<boolean>;
    ping(): Promise<boolean>;
    /**
     * Fires or responds to a pin event
     */
    pin(packet?: object): Promise<boolean>;
    /**
     * Fires or responds to a requestData event
     * @param packet any - packet of data to send with the requestData event
     */
    requestData(packet: {
        type: string;
    }): Promise<any>;
    /**
     * Fires a generic callback command
     * @param packet string - key: string, generic: boolean
     */
    callback(packet: {
        key: string;
        generic: boolean;
        options: object;
    }): Promise<any>;
    /**
     * Fires or responds to an register event
     * @param packet any - packet of data to send with the event
     */
    register(packet?: Partial<{
        title: string;
        url: string;
        color: AlleyLinkColors;
    }>): Promise<string>;
    /**
     * Fires or responds to an HTTP_GET event
     * @param relativeURL string - URL to fetch, relative to the mainframe URL
     * @param timeout - how long to attempt the request before reporting an error
     * @param originStack - the domain of the previous frame(s) the request originated from
     */
    httpGET(relativeURL: string, timeout?: number, originStack?: string[]): Promise<any>;
    /**
     * Fires or responds to an HTTP_POST event
     * @param relativeURL string - URL to fetch, relative to the mainframe URL
     * @param postData any - packet of data to send with the event
     * @param timeout - how long to attempt the request before reporting an error
     * @param originStack - the domain of the previous frame(s) the request originated from
     */
    httpPOST(relativeURL: string, postData: any, timeout?: number, originStack?: string[]): Promise<any>;
    /**
     * Fires or responds to an HTTP_PUT event
     * @param relativeURL string - URL to fetch, relative to the mainframe URL
     * @param packet any - packet of data to send with the event
     * @param timeout - how long to attempt the request before reporting an error
     * @param originStack - the domain of the previous frame(s) the request originated from
     */
    httpPUT(relativeURL: string, putData: any, timeout?: number, originStack?: string[]): Promise<any>;
    /**
     * Fires or responds to an HTTP_DELETE event
     * @param relativeURL string - URL to fetch, relative to the mainframe URL
     * @param timeout - how long to attempt the request before reporting an error
     * @param originStack - the domain of the previous frame(s) the request originated from
     */
    httpDELETE(relativeURL: string, timeout?: number, originStack?: string[]): Promise<any>;
    /**
     * Fires a custom event to anywhere in the application
     * @param event string - event name to fire
     * @param data any - data to be sent along with the event
     */
    fireEvent(event: string, data: any): Promise<any>;
    /**
     * Fires a custom event to all registered frames
     * @param event string - event name to fire
     * @param data any - data to be sent along with the event
     */
    fireEventToChildren(event: string, data: any): void;
    /**
     * Fires a custom event to specified frames
     * @param source Window - specific iframe contentWindow
     * @param event string - event name to fire
     * @param data any - data to be sent along with the event
     */
    fireEventToChild(source: Window | HTMLIFrameElement, event: string, data: any): void;
    /**
     * Adds an event listener to a custom event
     * @param event string - event name to listen to
     * @param callback function - callback to be fired when an event is caught
     */
    addEventListener(event: string, callback: Function): void;
}
export declare class DevAppBridge extends AppBridge {
    private http;
    private baseURL;
    constructor(traceName: string, http: HttpClient, postRobotRef?: any);
    protected _setupHandlers(): void;
    /**
     * Fires or responds to an HTTP_GET event
     */
    httpGET(relativeURL: string): Promise<any>;
    /**
     * Fires or responds to an HTTP_POST event
     */
    httpPOST(relativeURL: string, postData: any): Promise<any>;
    /**
     * Fires or responds to an HTTP_PUT event
     */
    httpPUT(relativeURL: string, putData: any): Promise<any>;
    /**
     * Fires or responds to an HTTP_DELETE event
     */
    httpDELETE(relativeURL: string): Promise<any>;
    private getCookie;
}
export {};
