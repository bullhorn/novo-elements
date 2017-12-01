import { EventEmitter, OnDestroy } from '@angular/core';
import { NovoActivityTableState } from './state';
export declare class NovoSortFilter {
    private state;
    constructor(state: NovoActivityTableState);
    filter(id: string, value: string, transform: Function): void;
    sort(id: string, value: string, transform: Function): void;
}
export declare class NovoSelection implements OnDestroy {
    state: NovoActivityTableState;
    novoSelectAllToggle: EventEmitter<boolean>;
    allRows: Map<string, object>;
    private throttleTimeout;
    constructor(state: NovoActivityTableState);
    register(id: any, row: any): void;
    deregister(id: any): void;
    ngOnDestroy(): void;
    toggle(id: string, selected: boolean, row: any): void;
    selectAll(value: boolean): void;
}
