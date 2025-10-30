import { ArrayCollection } from './ArrayCollection';
import { PagedCollection } from './PagedCollection';
export declare class PagedArrayCollection<T> extends ArrayCollection<T> implements PagedCollection<T> {
    _page: number;
    _numberOfPages: number;
    _pageSize: number;
    constructor(source?: Array<T>);
    get numberOfPages(): number;
    get page(): number;
    set page(value: number);
    get pageSize(): number;
    set pageSize(value: number);
    next(): number;
    prev(): number;
    first(): number;
    last(): number;
    refresh(): void;
}
