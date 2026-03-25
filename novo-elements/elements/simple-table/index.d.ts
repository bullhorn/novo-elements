import * as i9 from '@angular/cdk/table';
import { CdkCell, CdkColumnDef, CdkCellDef, CdkHeaderCell, CdkHeaderCellDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef, DataSource, CdkTable } from '@angular/cdk/table';
import * as i0 from '@angular/core';
import { EventEmitter, OnDestroy, OnInit, ElementRef, Renderer2, ChangeDetectorRef, AfterViewInit, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import * as i14 from 'novo-elements/elements/dropdown';
import { NovoDropdownElement } from 'novo-elements/elements/dropdown';
import { Observable } from 'rxjs';
import * as i8 from 'novo-elements/elements/date-picker';
import * as i10 from '@angular/common';
import * as i11 from '@angular/forms';
import * as i12 from 'novo-elements/elements/common';
import * as i13 from 'novo-elements/elements/button';
import * as i15 from 'novo-elements/elements/form';
import * as i16 from 'novo-elements/elements/loading';
import * as i17 from 'novo-elements/elements/tiles';
import * as i18 from 'novo-elements/elements/search';
import * as i19 from 'novo-elements/elements/select';
import * as i20 from 'novo-elements/elements/checkbox';

declare class ActivityTableRenderers {
    static propertyRenderer<T>(prop: string): Function;
    static dateRenderer<T>(prop: string): Function;
}

interface SimpleTableColumn<T> {
    id: string;
    label: string;
    renderType?: 'text' | 'link';
    renderer: Function;
    customClass?: (row?: T) => string;
    onClick?(row: T): any;
    width?: number;
    config?: {
        sortable?: boolean;
        filterable?: boolean;
        transforms?: {
            filter?: Function;
            sort?: Function;
        };
        sortTransform?: Function;
        filterConfig?: SimpleTableColumnFilterConfig;
    };
}
interface SimpleTablePaginationOptions {
    page?: number;
    pageSize?: number;
    pageSizeOptions?: number[];
}
interface SimpleTableColumnFilterConfig {
    type: 'text' | 'date' | 'select';
    options?: string[] | SimpleTableColumnFilterOption[];
    allowCustomRange?: boolean;
}
interface SimpleTableColumnFilterOption {
    label: string;
    value?: any;
    min?: number;
    max?: number;
}
interface SimpleTableSearchOptions {
    placeholder?: string;
    tooltip?: string;
}
interface SimpleTableActionColumnOption<T> {
    label: string;
    onClick(row: T): string;
    disabled?: boolean;
    disabledCheck?(row: T): boolean;
}
interface SimpleTableActionColumn<T> {
    id: string;
    icon?: string;
    label?: string;
    disabled?: boolean;
    disabledCheck?(row: T): boolean;
    options?: SimpleTableActionColumnOption<T>[];
    onClick?(row: T): void;
}
interface NovoSimpleSortFilter {
    id: string;
    direction?: string;
    active?: boolean;
    filter?: string | boolean;
}
interface NovoSimpleTableChange {
    sort?: {
        id: string;
        value: string;
    };
    filter?: {
        id: string;
        value: string;
    };
    page?: number;
    pageSize?: number;
    globalSearch?: string;
}
interface NovoSimpleSelectionChange {
    selected: any[];
}
interface NovoSimplePaginationEvent {
    page: number;
    pageSize: number;
    length: number;
}

declare class NovoActivityTableState {
    id: number;
    sort: {
        id: string;
        value: string;
    };
    filter: {
        id: string;
        value: string;
    };
    page: number;
    pageSize: number;
    globalSearch: string;
    selectedRows: Map<string, object>;
    outsideFilter: any;
    updates: EventEmitter<NovoSimpleTableChange>;
    onReset: EventEmitter<boolean>;
    get userFiltered(): boolean;
    reset(fireUpdate?: boolean, persistUserFilters?: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTableState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NovoActivityTableState>;
}

declare class NovoSortFilter {
    private state;
    constructor(state: NovoActivityTableState);
    filter(id: string, value: any, transform: Function): void;
    sort(id: string, value: string, transform: Function): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSortFilter, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSortFilter, "[novoSortFilter]", never, {}, {}, never, never, false, never>;
}
declare class NovoSelection implements OnDestroy {
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

/** Workaround for https://github.com/angular/angular/issues/17849 */
declare const _NovoCellDef: typeof CdkCellDef;
declare const _NovoHeaderCellDef: typeof CdkHeaderCellDef;
declare const _NovoColumnDef: typeof CdkColumnDef;
declare const _NovoHeaderCell: typeof CdkHeaderCell;
declare const _NovoCell: typeof CdkCell;
declare class NovoSimpleCellDef extends _NovoCellDef {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleCellDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleCellDef, "[novoSimpleCellDef]", never, {}, {}, never, never, false, never>;
}
declare class NovoSimpleHeaderCellDef extends _NovoHeaderCellDef {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleHeaderCellDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleHeaderCellDef, "[novoSimpleHeaderCellDef]", never, {}, {}, never, never, false, never>;
}
declare class NovoSimpleColumnDef extends _NovoColumnDef {
    get name(): string;
    set name(name: string);
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    protected _setNameInput(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleColumnDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleColumnDef, "[novoSimpleColumnDef]", never, { "name": { "alias": "novoSimpleColumnDef"; "required": false; }; }, {}, never, never, false, never>;
}
declare class NovoSimpleHeaderCell<T> extends _NovoHeaderCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    column: SimpleTableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleHeaderCell<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleHeaderCell<any>, "novo-simple-header-cell", never, { "column": { "alias": "column"; "required": false; }; }, {}, never, never, false, never>;
}
declare class NovoSimpleEmptyHeaderCell extends _NovoHeaderCell {
    role: string;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleEmptyHeaderCell, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleEmptyHeaderCell, "novo-simple-empty-header-cell", never, {}, {}, never, never, false, never>;
}
declare class NovoSimpleCheckboxHeaderCell extends _NovoHeaderCell implements OnDestroy {
    private _selection;
    role: string;
    selectAll: boolean;
    private selectAllSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, ref: ChangeDetectorRef, _selection: NovoSelection);
    ngOnDestroy(): void;
    toggle(value: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleCheckboxHeaderCell, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleCheckboxHeaderCell, "novo-simple-checkbox-header-cell", never, {}, {}, never, never, false, never>;
}
declare class NovoSimpleCell<T> extends _NovoCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    row: any;
    column: SimpleTableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    onClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleCell<any>, "novo-simple-cell", never, { "row": { "alias": "row"; "required": false; }; "column": { "alias": "column"; "required": false; }; }, {}, never, never, false, never>;
}
declare class NovoSimpleCheckboxCell extends _NovoCell implements OnDestroy, OnInit {
    columnDef: CdkColumnDef;
    _selection: NovoSelection;
    role: string;
    row: any;
    index: any;
    selected: boolean;
    private selectAllSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, _selection: NovoSelection);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggle(value: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleCheckboxCell, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleCheckboxCell, "novo-simple-checkbox-cell", never, { "row": { "alias": "row"; "required": false; }; "index": { "alias": "index"; "required": false; }; }, {}, never, never, false, never>;
}
declare class NovoSimpleActionCell<T> extends _NovoCell implements OnInit {
    private elementRef;
    private renderer;
    labels: NovoLabelService;
    role: string;
    row: T;
    column: SimpleTableActionColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, labels: NovoLabelService);
    ngOnInit(): void;
    isDisabled(check: SimpleTableActionColumn<T> | SimpleTableActionColumnOption<T>, row: T): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleActionCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleActionCell<any>, "novo-simple-action-cell", never, { "row": { "alias": "row"; "required": false; }; "column": { "alias": "column"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoSimpleFilterFocus implements AfterViewInit {
    private element;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleFilterFocus, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleFilterFocus, "[novoSimpleFilterFocus]", never, {}, {}, never, never, false, never>;
}
declare class NovoSimpleCellHeader implements NovoSimpleSortFilter, OnInit, OnDestroy {
    private changeDetectorRef;
    labels: NovoLabelService;
    private state;
    _sort: NovoSortFilter;
    _cdkColumnDef: CdkColumnDef;
    dropdown: NovoDropdownElement;
    defaultSort: {
        id: string;
        value: string;
    };
    get config(): {
        sortable: boolean;
        filterable: boolean;
        transforms?: {
            filter?: Function;
            sort?: Function;
        };
        filterConfig: SimpleTableColumnFilterConfig;
    };
    set config(v: {
        sortable: boolean;
        filterable: boolean;
        transforms?: {
            filter?: Function;
            sort?: Function;
        };
        filterConfig: SimpleTableColumnFilterConfig;
    });
    private _config;
    private _rerenderSubscription;
    private changeTimeout;
    icon: string;
    id: string;
    filter: string | boolean;
    direction: string;
    filterActive: boolean;
    sortActive: boolean;
    showCustomRange: boolean;
    activeDateFilter: string;
    constructor(changeDetectorRef: ChangeDetectorRef, labels: NovoLabelService, state: NovoActivityTableState, _sort: NovoSortFilter, _cdkColumnDef: CdkColumnDef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    sort(): void;
    toggleCustomRange(event: Event, value: boolean): void;
    filterData(filter?: any): void;
    clearFilter(): void;
    private getNextSortDirection;
    private getDefaultDateFilterOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleCellHeader, [null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleCellHeader, "[novo-simple-cell-config]", never, { "defaultSort": { "alias": "defaultSort"; "required": false; }; "config": { "alias": "novo-simple-cell-config"; "required": false; }; }, {}, never, ["*"], false, never>;
}

declare class NovoSimpleTablePagination implements OnInit, OnDestroy {
    private changeDetectorRef;
    labels: NovoLabelService;
    private state;
    private _initialized;
    get page(): number;
    set page(page: number);
    _page: number;
    get length(): number;
    set length(length: number);
    _length: number;
    get pageSize(): number;
    set pageSize(pageSize: number);
    private _pageSize;
    get pageSizeOptions(): number[];
    set pageSizeOptions(pageSizeOptions: number[]);
    private _pageSizeOptions;
    pageChange: EventEmitter<NovoSimplePaginationEvent>;
    displayedPageSizeOptions: number[];
    longRangeLabel: string;
    shortRangeLabel: string;
    private resetSubscription;
    constructor(changeDetectorRef: ChangeDetectorRef, labels: NovoLabelService, state: NovoActivityTableState);
    ngOnInit(): void;
    ngOnDestroy(): void;
    nextPage(): void;
    previousPage(): void;
    hasPreviousPage(): boolean;
    hasNextPage(): boolean;
    changePageSize(pageSize: number): void;
    private updateDisplayedPageSizeOptions;
    private emitPageEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleTablePagination, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleTablePagination, "novo-simple-table-pagination", never, { "page": { "alias": "page"; "required": false; }; "length": { "alias": "length"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; "pageSizeOptions": { "alias": "pageSizeOptions"; "required": false; }; }, { "pageChange": "pageChange"; }, never, never, false, never>;
}

interface Page {
    num: number;
    text: string;
    active: boolean;
}
declare class Pagination implements OnInit, OnChanges {
    labels: NovoLabelService;
    page: number;
    totalItems: number;
    itemsPerPage: number;
    rowOptions: any;
    label: string;
    get disablePageSelection(): boolean;
    set disablePageSelection(val: boolean);
    pageChange: EventEmitter<any>;
    itemsPerPageChange: EventEmitter<any>;
    onPageChange: EventEmitter<any>;
    pageSelectDisabled: boolean;
    maxPagesDisplayed: number;
    totalPages: number;
    pages: Array<Page>;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    getDefaultRowOptions(): {
        value: number;
        label: string;
    }[];
    onPageSizeChanged(event: any): void;
    selectPage(page: number, event?: MouseEvent): void;
    noPrevious(): boolean;
    noNext(): boolean;
    makePage(num: number, text: string, isActive: boolean): Page;
    getPages(currentPage: number, totalPages: number): Page[];
    calculateTotalPages(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<Pagination, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Pagination, "novo-pagination", never, { "page": { "alias": "page"; "required": false; }; "totalItems": { "alias": "totalItems"; "required": false; }; "itemsPerPage": { "alias": "itemsPerPage"; "required": false; }; "rowOptions": { "alias": "rowOptions"; "required": false; }; "label": { "alias": "label"; "required": false; }; "disablePageSelection": { "alias": "disablePageSelection"; "required": false; }; }, { "pageChange": "pageChange"; "itemsPerPageChange": "itemsPerPageChange"; "onPageChange": "onPageChange"; }, never, never, false, never>;
}

/** Workaround for https://github.com/angular/angular/issues/17849 */
declare const _NovoHeaderRowDef: typeof CdkHeaderRowDef;
declare const _NovoCdkRowDef: typeof CdkRowDef;
declare const _NovoHeaderRow: typeof CdkHeaderRow;
declare const _NovoRow: typeof CdkRow;
declare class NovoSimpleHeaderRowDef extends _NovoHeaderRowDef {
    columns: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleHeaderRowDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleHeaderRowDef, "[novoSimpleHeaderRowDef]", never, { "columns": { "alias": "novoSimpleHeaderRowDef"; "required": false; }; }, {}, never, never, false, never>;
}
declare class NovoSimpleRowDef<T> extends _NovoCdkRowDef<T> {
    columns: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleRowDef<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleRowDef<any>, "[novoSimpleRowDef]", never, { "columns": { "alias": "novoSimpleRowDefColumns"; "required": false; }; }, {}, never, never, false, never>;
}
declare class NovoSimpleHeaderRow extends _NovoHeaderRow {
    rowClass: string;
    role: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleHeaderRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleHeaderRow, "novo-simple-header-row", never, {}, {}, never, never, false, never>;
}
declare class NovoSimpleRow extends _NovoRow {
    rowClass: string;
    role: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleRow, "novo-simple-row", never, {}, {}, never, never, false, never>;
}

interface ActivityTableService<T> {
    getTableResults(sort: {
        id: string;
        value: string;
        transform?: Function;
    }, filter: {
        id: string;
        value: string;
        transform?: Function;
    }, page: number, pageSize: number, globalSearch?: string, outsideFilter?: any): Observable<{
        results: T[];
        total: number;
    }>;
}
declare abstract class RemoteActivityTableService<T> implements ActivityTableService<T> {
    abstract getTableResults(sort: {
        id: string;
        value: string;
        transform?: Function;
    }, filter: {
        id: string;
        value: string;
        transform?: Function;
    }, page: number, pageSize: number, globalSearch?: string, outsideFilter?: any): Observable<{
        results: T[];
        total: number;
    }>;
}
declare class StaticActivityTableService<T> implements ActivityTableService<T> {
    private data;
    constructor(data?: T[]);
    getTableResults(sort: {
        id: string;
        value: string;
        transform?: Function;
    }, filter: {
        id: string;
        value: string;
        transform?: Function;
    }, page: number, pageSize: number, globalSearch?: string, outsideFilter?: any): Observable<{
        results: T[];
        total: number;
    }>;
}
declare class ActivityTableDataSource<T> extends DataSource<T> {
    private tableService;
    private state;
    private ref;
    total: number;
    current: number;
    loading: boolean;
    pristine: boolean;
    get totallyEmpty(): boolean;
    get currentlyEmpty(): boolean;
    constructor(tableService: ActivityTableService<T>, state: NovoActivityTableState, ref: ChangeDetectorRef);
    connect(): Observable<any[]>;
    disconnect(): void;
}

declare class NovoTable<T> extends CdkTable<T> {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTable<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTable<any>, "novo-simple-table", never, {}, {}, never, never, false, never>;
}
declare class NovoActivityTableActions {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTableActions, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoActivityTableActions, "novo-activity-table-actions", never, {}, {}, never, never, false, never>;
}
declare class NovoActivityTableCustomHeader {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTableCustomHeader, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoActivityTableCustomHeader, "novo-activity-table-custom-header", never, {}, {}, never, never, false, never>;
}
declare class NovoActivityTableCustomFilter {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTableCustomFilter, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoActivityTableCustomFilter, "novo-activity-table-custom-filter", never, {}, {}, never, never, false, never>;
}
declare class NovoActivityTableEmptyMessage {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTableEmptyMessage, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoActivityTableEmptyMessage, "novo-activity-table-empty-message", never, {}, {}, never, never, false, never>;
}
declare class NovoActivityTableNoResultsMessage {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoActivityTableNoResultsMessage, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoActivityTableNoResultsMessage, "novo-activity-table-no-results-message", never, {}, {}, never, never, false, never>;
}
declare class NovoActivityTable<T> implements AfterContentInit, OnChanges, OnDestroy {
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

declare class NovoSimpleTableModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleTableModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoSimpleTableModule, [typeof NovoTable, typeof NovoSimpleCellDef, typeof NovoSimpleHeaderCellDef, typeof NovoSimpleColumnDef, typeof NovoActivityTableEmptyMessage, typeof NovoActivityTableNoResultsMessage, typeof NovoSimpleHeaderRowDef, typeof NovoSimpleRowDef, typeof NovoSimpleCellHeader, typeof NovoSortFilter, typeof NovoSimpleActionCell, typeof NovoSimpleEmptyHeaderCell, typeof NovoSimpleHeaderCell, typeof NovoSimpleCell, typeof NovoSimpleHeaderRow, typeof NovoSimpleRow, typeof NovoSimpleFilterFocus, typeof NovoSimpleTablePagination, typeof NovoActivityTableCustomHeader, typeof NovoSimpleCheckboxCell, typeof NovoSimpleCheckboxHeaderCell, typeof NovoSelection, typeof NovoActivityTable, typeof NovoActivityTableActions, typeof NovoActivityTableCustomFilter, typeof Pagination], [typeof i8.NovoDatePickerModule, typeof i9.CdkTableModule, typeof i10.CommonModule, typeof i11.FormsModule, typeof i12.NovoCommonModule, typeof i13.NovoButtonModule, typeof i14.NovoDropdownModule, typeof i15.NovoFormExtrasModule, typeof i16.NovoLoadingModule, typeof i17.NovoTilesModule, typeof i18.NovoSearchBoxModule, typeof i19.NovoSelectModule, typeof i20.NovoCheckboxModule, typeof i12.NovoOptionModule], [typeof NovoTable, typeof NovoSimpleCellDef, typeof NovoSimpleHeaderCellDef, typeof NovoSimpleColumnDef, typeof NovoActivityTableEmptyMessage, typeof NovoActivityTableNoResultsMessage, typeof NovoSimpleHeaderRowDef, typeof NovoSimpleRowDef, typeof NovoSimpleCellHeader, typeof NovoSortFilter, typeof NovoSimpleActionCell, typeof NovoSimpleEmptyHeaderCell, typeof NovoSimpleHeaderCell, typeof NovoSimpleCell, typeof NovoSimpleHeaderRow, typeof NovoSimpleRow, typeof NovoSimpleFilterFocus, typeof NovoSimpleTablePagination, typeof NovoActivityTableCustomHeader, typeof NovoSimpleCheckboxCell, typeof NovoSimpleCheckboxHeaderCell, typeof NovoSelection, typeof NovoActivityTable, typeof NovoActivityTableActions, typeof NovoActivityTableCustomFilter, typeof Pagination]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoSimpleTableModule>;
}

export { ActivityTableDataSource, ActivityTableRenderers, NovoActivityTable, NovoActivityTableActions, NovoActivityTableCustomFilter, NovoActivityTableCustomHeader, NovoActivityTableEmptyMessage, NovoActivityTableNoResultsMessage, NovoActivityTableState, NovoSelection, NovoSimpleActionCell, NovoSimpleCell, NovoSimpleCellDef, NovoSimpleCellHeader, NovoSimpleCheckboxCell, NovoSimpleCheckboxHeaderCell, NovoSimpleColumnDef, NovoSimpleEmptyHeaderCell, NovoSimpleFilterFocus, NovoSimpleHeaderCell, NovoSimpleHeaderCellDef, NovoSimpleHeaderRow, NovoSimpleHeaderRowDef, NovoSimpleRow, NovoSimpleRowDef, NovoSimpleTableModule, NovoSimpleTablePagination, NovoSortFilter, NovoTable, Pagination, RemoteActivityTableService, StaticActivityTableService, _NovoCdkRowDef, _NovoCell, _NovoCellDef, _NovoColumnDef, _NovoHeaderCell, _NovoHeaderCellDef, _NovoHeaderRow, _NovoHeaderRowDef, _NovoRow };
export type { ActivityTableService, NovoSimplePaginationEvent, NovoSimpleSelectionChange, NovoSimpleSortFilter, NovoSimpleTableChange, SimpleTableActionColumn, SimpleTableActionColumnOption, SimpleTableColumn, SimpleTableColumnFilterConfig, SimpleTableColumnFilterOption, SimpleTablePaginationOptions, SimpleTableSearchOptions };
