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
    PING = 10
}
export type NovoApps = 'record' | 'add' | 'fast-add' | 'slide-out-add' | 'custom' | 'preview';
export type AlleyLinkColors = 'purple' | 'green' | 'blue' | 'lead' | 'candidate' | 'contact' | 'company' | 'opportunity' | 'job' | 'billable-charge' | 'earn-code' | 'invoice-statement' | 'job-code' | 'payable-charge' | 'sales-tax-rate' | 'tax-rules' | 'submission' | 'placement' | 'navigation' | 'canvas' | 'neutral' | 'neutral-italic' | 'initial' | 'distributionList' | 'contract';
export interface IAppBridgeOpenEvent {
    type: NovoApps;
    entityType: string;
    entityId?: string;
    tab?: string;
    data?: any;
    passthrough?: string;
}
export type MosaicLists = 'Candidate' | 'ClientContact' | 'ClientCorporation' | 'JobOrder' | 'JobSubmission' | 'JobPosting' | 'Placement' | 'Lead' | 'Opportunity';
export interface IAppBridgeOpenListEvent {
    type: MosaicLists;
    keywords: Array<string>;
    criteria: any;
}
export type NovoDataType = 'entitlements' | 'settings' | 'user';
export interface IAppBridgeRequestDataEvent {
    type: NovoDataType;
}
export type HttpVerb = 'get' | 'post' | 'put' | 'delete';
export declare const HTTP_VERBS: {
    GET: string;
    POST: string;
    PUT: string;
    DELETE: string;
};
export type MessageType = 'register' | 'open' | 'openList' | 'close' | 'refresh' | 'pin' | 'ping' | 'update' | 'httpGET' | 'httpPOST' | 'httpPUT' | 'httpDELETE' | 'customEvent' | 'requestData' | 'callback';
export declare const MESSAGE_TYPES: {
    REGISTER: string;
    OPEN: string;
    OPEN_LIST: string;
    CLOSE: string;
    REFRESH: string;
    PIN: string;
    PING: string;
    UPDATE: string;
    HTTP_GET: string;
    HTTP_POST: string;
    HTTP_PUT: string;
    HTTP_DELETE: string;
    CUSTOM_EVENT: string;
    REQUEST_DATA: string;
    CALLBACK: string;
};
