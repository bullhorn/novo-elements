export declare class CollectionEvent {
    static REFRESH: string;
    static ADD: string;
    static REMOVE: string;
    static REMOVE_ALL: string;
    static REPLACE: string;
    static INVALIDATE_ALL: string;
    static SORT: string;
    static FILTER: string;
    static CHANGE: string;
    static CURRENTPAGE_CHANGE: string;
    static PAGESIZE_CHANGE: string;
    static NUMBEROFPAGES_CHANGE: string;
    type: string;
    data: Array<any>;
    constructor(type?: string, data?: any[]);
}
