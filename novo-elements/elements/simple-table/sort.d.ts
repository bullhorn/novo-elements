import { EventEmitter, OnDestroy } from '@angular/core';
import { NovoActivityTableState } from './state';
import * as i0 from "@angular/core";
export declare class NovoSortFilter {
    private state;
    constructor(state: NovoActivityTableState);
    filter(id: string, value: any, transform: Function): void;
    sort(id: string, value: string, transform: Function): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSortFilter, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSortFilter, "[novoSortFilter]", never, {}, {}, never, never, false, never>;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSelection, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSelection, "[novoSelection]", never, {}, { "novoSelectAllToggle": "novoSelectAllToggle"; }, never, never, false, never>;
}
