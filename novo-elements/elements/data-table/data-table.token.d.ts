import { EventEmitter, InjectionToken } from '@angular/core';
import { DataTableSource } from './data-table.source';
import { DataTableState } from './state';
/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * @docs-private
 */
export interface NovoDataTableRef<T = any> {
    isExpanded(row: T): boolean;
    expandRow(row: T): void;
    isSelected(row: T): boolean;
    selectRow(row: T, evt: string): void;
    selectRows(selected: boolean): void;
    expandRows(expanded: boolean): void;
    allCurrentRowsSelected(): boolean;
    allCurrentRowsExpanded(): boolean;
    allSelected: EventEmitter<any>;
    canSelectAll: boolean;
    allMatchingSelected: boolean;
    state: DataTableState<T>;
    dataSource: DataTableSource<T>;
}
/**
 * Injection token used to provide the parent component to options.
 */
export declare const NOVO_DATA_TABLE_REF: InjectionToken<NovoDataTableRef<any>>;
