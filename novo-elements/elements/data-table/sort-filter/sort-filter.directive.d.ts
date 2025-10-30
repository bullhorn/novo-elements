import { DataTableState } from '../state/data-table-state.service';
import * as i0 from "@angular/core";
export declare class NovoDataTableSortFilter<T> {
    private state;
    constructor(state: DataTableState<T>);
    filter(id: string, type: string, value: any, transform: Function, allowMultipleFilters?: boolean, selectedOption?: Object): void;
    sort(id: string, value: string, transform: Function): void;
    resolveMultiFilter(id: string, type: string, value: any, transform: Function, selectedOption: Object): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableSortFilter<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDataTableSortFilter<any>, "[novoDataTableSortFilter]", never, {}, {}, never, never, false, never>;
}
