import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export declare enum AppBridgeHandler {
    HTTP = 0,
    OPEN = 1,
    OPEN_LIST = 2,
    CLOSE = 3,
    REFRESH = 4,
    PIN = 5,
    REGISTER = 6,
    UPDATE = 7,
    REQUEST_DATA = 8,
    CALLBACK = 9,
}
export declare type NovoApps = 'record' | 'add' | 'fast-add' | 'custom';
export interface IAppBridgeOpenEvent {
    type: NovoApps;
    entityType: string;
    entityId?: string;
    tab?: string;
    data?: any;
    passthrough?: string;
}
export declare type MosaicLists = 'Candidate' | 'ClientContact' | 'ClientCorporation' | 'JobOrder' | 'JobSubmission' | 'JobPosting' | 'Placement' | 'Lead' | 'Opportunity';
export interface IAppBridgeOpenListEvent {
    type: MosaicLists;
    keywords: Array<string>;
    criteria: any;
}
export declare type NovoDataType = 'entitlements' | 'settings' | 'user';
export interface IAppBridgeRequestDataEvent {
    type: NovoDataType;
}
export declare class AppBridgeService {
    create(name: string): AppBridge;
}
export declare class DevAppBridgeService {
    private http;
    constructor(http: Http);
    create(name: string): DevAppBridge;
}
export declare class AppBridge {
    id: string;
    traceName: string;
    windowName: string;
    private _registeredFrames;
    private _handlers;
    private _tracing;
    private _eventListeners;
    constructor(traceName?: string);
    tracing: boolean;
    handle(type: AppBridgeHandler, handler: Function): void;
    private _trace(eventType, event);
    protected _setupHandlers(): void;
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
        color: string;
    }>): Promise<boolean>;
    /**
     * Fires or responds to an close event
     */
    close(packet?: object): Promise<boolean>;
    /**
     * Fires or responds to an close event
     */
    refresh(packet?: object): Promise<boolean>;
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
        color: string;
    }>): Promise<string>;
    /**
     * Fires or responds to an HTTP_GET event
     * @param packet any - packet of data to send with the event
     */
    httpGET(relativeURL: string): Promise<any>;
    /**
     * Fires or responds to an HTTP_POST event
     * @param packet any - packet of data to send with the event
     */
    httpPOST(relativeURL: string, postData: any): Promise<any>;
    /**
     * Fires or responds to an HTTP_PUT event
     * @param packet any - packet of data to send with the event
     */
    httpPUT(relativeURL: string, putData: any): Promise<any>;
    /**
     * Fires or responds to an HTTP_DELETE event
     * @param packet any - packet of data to send with the event
     */
    httpDELETE(relativeURL: string): Promise<any>;
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
     * Adds an event listener to a custom event
     * @param event string - event name to listen to
     * @param callback function - callback to be fired when an event is caught
     */
    addEventListener(event: string, callback: Function): void;
}
export declare class DevAppBridge extends AppBridge {
    private http;
    private baseURL;
    constructor(traceName: string, http: Http);
    protected _setupHandlers(): void;
    /**
    * Fires or responds to an HTTP_GET event
    * @param packet any - packet of data to send with the event
    */
    httpGET(relativeURL: string): Promise<any>;
    /**
     * Fires or responds to an HTTP_POST event
     * @param packet any - packet of data to send with the event
     */
    httpPOST(relativeURL: string, postData: any): Promise<any>;
    /**
     * Fires or responds to an HTTP_PUT event
     * @param packet any - packet of data to send with the event
     */
    httpPUT(relativeURL: string, putData: any): Promise<any>;
    /**
     * Fires or responds to an HTTP_DELETE event
     * @param packet any - packet of data to send with the event
     */
    httpDELETE(relativeURL: string): Promise<any>;
    private getCookie(cname);
}
