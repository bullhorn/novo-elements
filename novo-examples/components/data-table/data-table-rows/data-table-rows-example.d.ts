import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { IDataTableColumn, IDataTablePaginationOptions, IDataTablePreferences, IDataTableSearchOptions, IDataTableSelectionOption, NovoDataTable, NovoModalService } from 'novo-elements';
import { Subject } from 'rxjs';
import { MockData } from '../extras';
import * as i0 from "@angular/core";
/**
 * @title Rows Data Table Example
 */
export declare class DataTableRowsExample implements AfterViewInit {
    private ref;
    private modalService;
    table: NovoDataTable<MockData>;
    ngAfterViewInit(): void;
    dataSetOptions: any[];
    loadedDataSet: number;
    paginationTypeOptions: any[];
    paginationPlacementOptions: any[];
    loadedPaginationPlacement: boolean;
    selectionOptions: IDataTableSelectionOption[];
    loadedPaginationType: string;
    globalSearchOptions: any[];
    loadedGlobalSearch: boolean;
    customStatusColumnValue: string;
    customStatusColumnOptions: object[];
    retentionEnabled: boolean;
    sharedColumns: IDataTableColumn<MockData>[];
    sharedDisplayColumns: string[];
    sharedPaginationOptions: IDataTablePaginationOptions;
    widePaginationOptions: IDataTablePaginationOptions;
    sharedSearchOptions: IDataTableSearchOptions;
    sharedDefaultSort: {
        id: string;
        value: string;
    };
    globalSearchEnabled: boolean;
    refreshSubject: Subject<void>;
    basicRows: MockData[];
    private staticDataSet1;
    private staticDataSet2;
    private staticDataSet3;
    selectedRecordId: string;
    constructor(ref: ChangeDetectorRef, modalService: NovoModalService);
    getPriority(): string;
    getPriorityOptions(): any[];
    switchPaginationType(type: 'basic' | 'standard'): void;
    switchPaginationPlacement(onFooter: boolean): void;
    loadDataset(setIndex: number): void;
    toggleGlobalSearch(toggle: boolean): void;
    log(event: {
        originalEvent: MouseEvent;
        row: MockData;
    }): void;
    preview(event: {
        originalEvent: MouseEvent;
        row: MockData;
    }): void;
    checkDisabled(): boolean;
    configureColumns(): void;
    onPreferencesChanged(event: IDataTablePreferences): void;
    resized(event: any): void;
    refresh(): void;
    toggleRowDetails(expand: boolean): void;
    filterList(value: any, field?: string): void;
    processCustomFilter(columnName: string): void;
    toggle(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableRowsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataTableRowsExample, "data-table-rows-example", never, {}, {}, never, never, false, never>;
}
