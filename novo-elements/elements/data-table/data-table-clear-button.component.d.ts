import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { DataTableState } from './state/data-table-state.service';
import * as i0 from "@angular/core";
export declare class NovoDataTableClearButton<T> {
    state: DataTableState<T>;
    private ref;
    labels: NovoLabelService;
    selectedClear: EventEmitter<boolean>;
    sortClear: EventEmitter<boolean>;
    filterClear: EventEmitter<boolean>;
    queryClear: EventEmitter<boolean>;
    allClear: EventEmitter<boolean>;
    emitOnly: boolean;
    constructor(state: DataTableState<T>, ref: ChangeDetectorRef, labels: NovoLabelService);
    clearSort(): void;
    clearFilter(): void;
    clearSearch(): void;
    clearSelected(): void;
    clearAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableClearButton<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableClearButton<any>, "novo-data-table-clear-button", never, {}, { "selectedClear": "selectedClear"; "sortClear": "sortClear"; "filterClear": "filterClear"; "queryClear": "queryClear"; "allClear": "allClear"; }, never, never, false, never>;
}
