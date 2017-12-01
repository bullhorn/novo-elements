import { EventEmitter } from '@angular/core';
import { NovoSimpleTableChange } from './interfaces';
export declare class NovoActivityTableState {
    id: number;
    sort: {
        id: string;
        value: string;
    };
    filter: {
        id: string;
        value: string;
    };
    page: number;
    pageSize: number;
    globalSearch: string;
    selectedRows: Map<string, object>;
    outsideFilter: any;
    updates: EventEmitter<NovoSimpleTableChange>;
    onReset: EventEmitter<boolean>;
    readonly userFiltered: boolean;
    reset(fireUpdate?: boolean, persistUserFilters?: boolean): void;
}
