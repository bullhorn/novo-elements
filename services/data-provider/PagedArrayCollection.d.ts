import { ArrayCollection } from './ArrayCollection';
import { PagedCollection } from './PagedCollection';
export declare class PagedArrayCollection<T> extends ArrayCollection<T> implements PagedCollection<T> {
    _page: number;
    _numberOfPages: number;
    _pageSize: number;
    constructor(source?: Array<T>);
    readonly numberOfPages: number;
    page: number;
    pageSize: number;
    next(): number;
    prev(): number;
    first(): number;
    last(): number;
    refresh(): void;
}
