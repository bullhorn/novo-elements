import { ChangeDetectorRef } from '@angular/core';
import { IDataTableColumn, IDataTablePaginationOptions, IDataTablePreferences, IDataTableSearchOptions, NovoModalService, RemoteDataTableService } from 'novo-elements';
import { Subject } from 'rxjs';
import { MockData } from '../extras';
import * as i0 from "@angular/core";
/**
 * @title Remote Data Table Example
 */
export declare class DataTableRemoteExample {
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
    remoteService: RemoteDataTableService<MockData>;
    private staticDataSet1;
    constructor(ref: ChangeDetectorRef, modalService: NovoModalService);
    getPriority(): string;
    getPriorityOptions(): any[];
    switchPaginationType(type: 'basic' | 'standard'): void;
    switchPaginationPlacement(onFooter: boolean): void;
    toggleGlobalSearch(toggle: boolean): void;
    log(event: {
        originalEvent: MouseEvent;
        row: MockData;
    }): void;
    checkDisabled(row: MockData): boolean;
    configureColumns(): void;
    onPreferencesChanged(event: IDataTablePreferences): void;
    refresh(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableRemoteExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataTableRemoteExample, "data-table-remote-example", never, {}, {}, never, never, false, never>;
}
