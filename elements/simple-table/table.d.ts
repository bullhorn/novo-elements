import { EventEmitter, AfterContentInit, SimpleChanges, ChangeDetectorRef, OnChanges, OnDestroy } from '@angular/core';
import { CdkTable } from '@angular/cdk/table';
import { SimpleTableColumn, SimpleTableActionColumn, SimpleTablePaginationOptions, SimpleTableSearchOptions } from './interfaces';
import { ActivityTableService, ActivityTableDataSource } from './table-source';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoActivityTableState } from './state';
/** Workaround for https://github.com/angular/angular/issues/17849 */
export declare const _NovoTable: typeof CdkTable;
export declare class NovoTable<T> extends _NovoTable<T> {
}
export declare class NovoActivityTableActions {
}
export declare class NovoActivityTableCustomHeader {
}
export declare class NovoActivityTableCustomFilter {
}
export declare class NovoActivityTableEmptyMessage {
}
export declare class NovoActivityTableNoResultsMessage {
}
export declare class NovoActivityTable<T> implements AfterContentInit, OnChanges, OnDestroy {
    labels: NovoLabelService;
    private ref;
    state: NovoActivityTableState;
    globalSearchHiddenClassToggle: boolean;
    activityService: ActivityTableService<T>;
    columns: SimpleTableColumn<T>[];
    displayedColumns: string[];
    actionColumns: SimpleTableActionColumn<T>[];
    paginationOptions: SimpleTablePaginationOptions;
    searchOptions: SimpleTableSearchOptions;
    defaultSort: {
        id: string;
        value: string;
    };
    outsideFilter: EventEmitter<any>;
    customFilter: boolean;
    private _customFilter;
    forceShowHeader: boolean;
    private _forceShowHeader;
    hideGlobalSearch: boolean;
    private _hideGlobalSearch;
    debug: boolean;
    private _debug;
    dataSource: ActivityTableDataSource<T>;
    loading: boolean;
    private outsideFilterSubscription;
    readonly empty: boolean;
    readonly loadingClass: boolean;
    constructor(labels: NovoLabelService, ref: ChangeDetectorRef, state: NovoActivityTableState);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    onSearchChange(term: string): void;
}
