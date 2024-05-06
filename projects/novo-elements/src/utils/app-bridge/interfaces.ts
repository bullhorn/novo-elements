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
  PING,
}

// record       - an individual entity record
// add/fast-add - the add page for a new record
// custom       - custom action that opens the url provided in data.url
// preview      - the preview slideout available only in Novo
export type NovoApps = 'record' | 'add' | 'fast-add' | 'slide-out-add' | 'custom' | 'preview';

export type AlleyLinkColors =
  | 'purple'
  | 'green'
  | 'blue'
  | 'lead'
  | 'candidate'
  | 'contact'
  | 'company'
  | 'opportunity'
  | 'job'
  | 'billable-charge'
  | 'earn-code'
  | 'invoice-statement'
  | 'job-code'
  | 'payable-charge'
  | 'sales-tax-rate'
  | 'tax-rules'
  | 'submission'
  | 'placement'
  | 'navigation'
  | 'canvas'
  | 'neutral'
  | 'neutral-italic'
  | 'initial'
  | 'distributionList'
  | 'contract';

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

export type HttpVerb = 'get' | 'post' | 'put' | 'delete';

export const HTTP_VERBS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

export type MessageType = 'register' | 'open' | 'openList' | 'close' | 'refresh' | 'pin' | 'ping' | 'update' | 'httpGET' | 'httpPOST' | 'httpPUT' | 'httpDELETE' | 'customEvent' | 'requestData' | 'callback';

export const MESSAGE_TYPES = {
  REGISTER: 'register',
  OPEN: 'open',
  OPEN_LIST: 'openList',
  CLOSE: 'close',
  REFRESH: 'refresh',
  PIN: 'pin',
  PING: 'ping',
  UPDATE: 'update',
  HTTP_GET: 'httpGET',
  HTTP_POST: 'httpPOST',
  HTTP_PUT: 'httpPUT',
  HTTP_DELETE: 'httpDELETE',
  CUSTOM_EVENT: 'customEvent',
  REQUEST_DATA: 'requestData',
  CALLBACK: 'callback',
};