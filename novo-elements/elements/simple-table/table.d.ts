import { CdkTable } from '@angular/cdk/table';
import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { SimpleTableActionColumn, SimpleTableColumn, SimpleTablePaginationOptions, SimpleTableSearchOptions } from './interfaces';
import { NovoActivityTableState } from './state';
import { ActivityTableDataSource, ActivityTableService } from './table-source';
import * as i0 from "@angular/core";
export declare class NovoTable<T> extends CdkTable<T> {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTable<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTable<any>, "novo-simple-table", never, {}, {}, never, ["caption", "colgroup, col", "*"], false, never>;
}
export declare class NovoActivityTableActions {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTableActions, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoActivityTableActions, "novo-activity-table-actions", never, {}, {}, never, never, false, never>;
}
export declare class NovoActivityTableCustomHeader {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTableCustomHeader, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoActivityTableCustomHeader, "novo-activity-table-custom-header", never, {}, {}, never, never, false, never>;
}
export declare class NovoActivityTableCustomFilter {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTableCustomFilter, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoActivityTableCustomFilter, "novo-activity-table-custom-filter", never, {}, {}, never, never, false, never>;
}
export declare class NovoActivityTableEmptyMessage {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTableEmptyMessage, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoActivityTableEmptyMessage, "novo-activity-table-empty-message", never, {}, {}, never, never, false, never>;
}
export declare class NovoActivityTableNoResultsMessage {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTableNoResultsMessage, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoActivityTableNoResultsMessage, "novo-activity-table-no-results-message", never, {}, {}, never, never, false, never>;
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
    set customFilter(v: boolean);
    get customFilter(): boolean;
    private _customFilter;
    set forceShowHeader(v: boolean);
    get forceShowHeader(): boolean;
    private _forceShowHeader;
    set hideGlobalSearch(v: boolean);
    get hideGlobalSearch(): boolean;
    private _hideGlobalSearch;
    set debug(v: boolean);
    get debug(): boolean;
    private _debug;
    dataSource: ActivityTableDataSource<T>;
    loading: boolean;
    private outsideFilterSubscription;
    get empty(): boolean;
    get loadingClass(): boolean;
    constructor(labels: NovoLabelService, ref: ChangeDetectorRef, state: NovoActivityTableState);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    onSearchChange(term: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTable<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoActivityTable<any>, "novo-activity-table", never, { "activityService": { "alias": "activityService"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "displayedColumns": { "alias": "displayedColumns"; "required": false; }; "actionColumns": { "alias": "actionColumns"; "required": false; }; "paginationOptions": { "alias": "paginationOptions"; "required": false; }; "searchOptions": { "alias": "searchOptions"; "required": false; }; "defaultSort": { "alias": "defaultSort"; "required": false; }; "outsideFilter": { "alias": "outsideFilter"; "required": false; }; "customFilter": { "alias": "customFilter"; "required": false; }; "forceShowHeader": { "alias": "forceShowHeader"; "required": false; }; "hideGlobalSearch": { "alias": "hideGlobalSearch"; "required": false; }; "debug": { "alias": "debug"; "required": false; }; }, {}, never, ["[novo-activity-table-custom-header]", "[novo-activity-table-actions]", "[novo-activity-table-custom-filter]", "*", "[novo-activity-table-no-results-message]", "[novo-activity-table-empty-message]"], false, never>;
}
