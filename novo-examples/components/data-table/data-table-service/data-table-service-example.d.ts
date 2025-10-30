import { ChangeDetectorRef } from '@angular/core';
import { IDataTableColumn, IDataTablePaginationOptions, IDataTablePreferences, IDataTableSearchOptions, IDataTableService, NovoModalService } from 'novo-elements';
import { Subject } from 'rxjs';
import { MockData } from '../extras';
import * as i0 from "@angular/core";
/**
 * @title Data Table Service Example
 */
export declare class DataTableServiceExample {
    private ref;
    private modalService;
    dataSetOptions: any[];
    loadedDataSet: number;
    paginationTypeOptions: any[];
    loadedPaginationType: string;
    paginationPlacementOptions: any[];
    loadedPaginationPlacement: boolean;
    globalSearchOptions: any[];
    loadedGlobalSearch: boolean;
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
    basicService: IDataTableService<MockData>;
    private staticDataSet1;
    private staticDataSet2;
    private staticDataSet3;
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
    checkDisabled(): boolean;
    configureColumns(): void;
    onPreferencesChanged(event: IDataTablePreferences): void;
    refresh(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableServiceExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataTableServiceExample, "data-table-service-example", never, {}, {}, never, never, false, never>;
}
