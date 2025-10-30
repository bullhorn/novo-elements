import { EventEmitter } from '@angular/core';
import { NovoSimpleTableChange } from './interfaces';
import * as i0 from "@angular/core";
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
    get userFiltered(): boolean;
    reset(fireUpdate?: boolean, persistUserFilters?: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTableState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NovoActivityTableState>;
}
