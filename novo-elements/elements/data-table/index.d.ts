import * as i19 from '@angular/cdk/table';
import { DataSource, CdkHeaderCell, CdkColumnDef, CdkCell, CdkHeaderRow, CdkRow } from '@angular/cdk/table';
import * as i0 from '@angular/core';
import { EventEmitter, ChangeDetectorRef, InjectionToken, OnDestroy, ElementRef, Renderer2, OnInit, TemplateRef, ViewContainerRef, AfterContentInit, QueryList, PipeTransform } from '@angular/core';
import { NovoToastService } from 'novo-elements/elements/toast';
import { Observable, Subject } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import * as i24 from 'novo-elements/elements/dropdown';
import { NovoDropdownElement } from 'novo-elements/elements/dropdown';
import * as i30 from 'novo-elements/elements/common';
import { NovoTemplate } from 'novo-elements/elements/common';
import * as i25 from 'novo-elements/elements/drag-drop';
import { NovoDragFinishEvent } from 'novo-elements/elements/drag-drop';
import * as i18 from 'novo-elements/elements/date-picker';
import * as i20 from '@angular/common';
import * as i21 from '@angular/forms';
import * as i22 from 'novo-elements/elements/icon';
import * as i23 from 'novo-elements/elements/button';
import * as i26 from 'novo-elements/elements/form';
import * as i27 from 'novo-elements/elements/loading';
import * as i28 from 'novo-elements/elements/tiles';
import * as i29 from 'novo-elements/elements/search';
import * as i31 from 'novo-elements/elements/select';
import * as i32 from 'novo-elements/elements/tooltip';
import * as i33 from 'novo-elements/elements/checkbox';
import * as i34 from 'novo-elements/elements/flex';
import * as i35 from 'novo-elements/elements/field';
import * as i36 from '@angular/cdk/scrolling';

interface IDataTablePreferences {
    name: string;
    sort?: IDataTableSort;
    filter?: IDataTableFilter | IDataTableFilter[];
    where?: DataTableWhere;
    globalSearch?: any;
    pageSize?: number;
    displayedColumns?: string[];
    columnWidths?: {
        id: string;
        width: number;
    }[];
    savedSearchId?: number;
    savedSearchName?: string;
    savedSearchOwner?: DataTableSavedSearchOwner;
    appliedSearchType?: AppliedSearchType;
    autobuildEntity?: AutobuildEntityData;
    hasUnsavedChanges?: boolean;
    unsavedChanges?: any;
    useBooleanKeywords?: boolean;
}
interface AutobuildEntityData {
    id: number;
    searchEntity: string;
    [key: string]: any;
}
interface DataTableWhere {
    query: string;
    criteria?: AdaptiveCriteria;
    keywords?: SearchKeywords;
    booleanKeywords?: string;
    scoreByEntityId?: number;
    matchMetaData?: any;
    form: any;
}
interface DataTableSavedSearchOwner {
    id: number;
    firstName: string;
    lastName: string;
}
declare enum AppliedSearchType {
    Saved = "saved",
    Recent = "recent",
    None = "none"
}
interface IDataTableColumn<T> {
    id: string;
    label?: string;
    labelIcon?: string;
    enabled?: boolean;
    type: 'text' | 'link' | 'link:tel' | 'link:mailto' | 'date' | 'datetime' | 'time' | 'currency' | 'bigdecimal' | 'number' | 'percent' | 'action' | 'expand';
    template?: string;
    format?: string | string[];
    disabled?: boolean;
    cellClass?: (row: T) => string;
    disabledFunc?: (row: T) => boolean;
    handlers?: {
        click?(event?: any): any;
    };
    width?: number;
    sortable?: boolean | IDataTableColumnSortConfig;
    filterable?: boolean | IDataTableColumnFilterConfig;
    resizable?: boolean;
    draggable?: boolean;
    action?: {
        icon?: string;
        tooltip?: string;
        options?: {
            label: string;
            handlers: {
                click?(event?: any): any;
            };
            disabled?: boolean;
            disabledFunc?: (row: T) => boolean;
        }[];
    };
    attributes?: {
        [key: string]: any;
    };
    initialResizable?: {
        resizable: boolean;
        width: number;
    };
    rightAlignCellContent?: boolean;
    configuration?: any;
}
interface IDataTablePaginationOptions {
    theme: 'basic' | 'standard' | 'basic-wide';
    page?: number;
    pageSize: number;
    pageSizeOptions: number[] | {
        value: string;
        label: string;
    }[];
    loading?: boolean;
    errorLoading?: boolean;
    onFooter?: boolean;
}
interface IDataTableColumnSortConfig {
    transform?: Function;
}
interface IDataTableColumnFilterConfig {
    type: 'text' | 'number' | 'date' | 'select' | 'multi-select' | 'custom';
    customTemplate?: string;
    useCustomHeader?: boolean;
    options?: string[] | IDataTableColumnFilterOption[];
    allowCustomRange?: boolean;
    transform?: Function;
}
interface IDataTableColumnFilterOption {
    label: string;
    value?: any;
    min?: number;
    max?: number;
}
interface IDataTableSearchOptions {
    placeholder?: string;
    tooltip?: string;
}
interface IDataTableSortFilter {
    id: string;
    direction?: string;
    active?: boolean;
    filter?: string | boolean;
}
interface IDataTableChangeEvent {
    sort?: IDataTableSort;
    filter?: IDataTableFilter | IDataTableFilter[];
    page?: number;
    pageSize?: number;
    globalSearch?: string;
    outsideFilter?: IDataTableFilter | IDataTableFilter[];
    where?: {
        query: string;
        form: any;
    };
    savedSearchName?: string;
    displayedColumns?: string[];
    appliedSearchType?: AppliedSearchType;
}
interface IDataTableSelectionChangeEvent {
    selected: any[];
}
interface IDataTableSelectionOption {
    label: 'none' | 'page' | 'pageSize' | 'sort' | 'filter' | 'globalSearch';
}
interface IDataTablePaginationEvent {
    page: number;
    pageSize: number;
    length: number;
}
interface IDataTableSort {
    id: string;
    value: string;
    transform?: Function;
}
interface IDataTableFilter {
    id: string;
    value: any;
    transform?: Function;
    type?: string;
    selectedOption?: Object;
}
interface IDataTableService<T> {
    getTableResults(sort: IDataTableSort, filter: {
        id: string;
        value: string;
        transform?: Function;
    } | IDataTableFilter | IDataTableFilter[], page: number, pageSize: number, globalSearch?: string, outsideFilter?: any, where?: {
        query: string;
        form: any;
    }): Observable<{
        results: T[];
        total: number;
    }>;
}
interface IDataTableCell<T> {
}
/**
 * Adaptive criteria syntax is a json representation of a search or query string that supports all current and future search formats.
 */
interface AdaptiveQuery {
    criteria: AdaptiveCriteria;
    fields?: string;
    orderBy?: string | string[];
    pagination?: PaginationObject;
}
interface PaginationObject {
    page: number;
    pageSize: number;
}
type AdaptiveCriteria = AdaptiveCondition | AdaptiveConjunction;
/**
 * Only a single field is valid.
 * Combine multiple fields with conjunctions, not sibling properties.
 * If multiple sibling properties are used in a condition, errors may occur in translation.
 */
interface AdaptiveCondition {
    [fieldName: string]: AdaptiveConditionOperatorObject;
}
/**
 * Only a single operator for a condition is valid.
 * Combine multiple operators with conjunctions, not sibling properties.
 * If multiple sibling operators are used in a condition, only the first will be used.
 */
type AdaptiveConditionOperatorObject = {
    [K in AdaptiveOperator as `${K}`]?: AdaptiveValue;
};
type AdaptiveValue = string | string[] | boolean | boolean[] | number | number[];
type AdaptiveConjunction = AdaptiveAnd | AdaptiveOr | AdaptiveNot;
interface AdaptiveAnd {
    and: Array<AdaptiveCriteria>;
}
interface AdaptiveOr {
    or: Array<AdaptiveCriteria>;
}
interface AdaptiveNot {
    not: AdaptiveCriteria;
}
declare enum AdaptiveConjunctionNames {
    AND = "and",
    OR = "or",
    NOT = "not"
}
declare enum AdaptiveOperator {
    BeginsWith = "beginsWith",
    EqualTo = "equalTo",
    In = "in",
    IncludeAny = "includeAny",
    IncludeAll = "includeAll",
    Is = "is",
    LessThan = "lt",
    LessThanEquals = "lte",
    GreaterThan = "gt",
    GreaterThanEquals = "gte",
    Like = "like",
    StartsWith = "startsWith",
    EndsWith = "endsWith",
    Radius = "radius"
}
interface IKeywordSearchResponse {
    items: IKeywordGroup[];
    meta: {
        currentPage: number;
        itemCount: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
    };
}
interface IKeyword {
    id: number;
    name: string;
}
interface IKeywordGroup {
    id: number;
    name: string;
    uniqueName?: string;
    keywords?: IKeyword[];
}
interface IKeywordBlock {
    operator?: 'and' | 'or';
    exclude?: boolean;
    keywordGroups: IKeywordGroup[];
}
type NestedKeywordGroups = IKeywordBlock[];
type SearchKeywords = string[] | NestedKeywordGroups;

declare class DataTableState<T> {
    selectionSource: Subject<void>;
    paginationSource: Subject<unknown>;
    sortFilterSource: Subject<unknown>;
    resetSource: Subject<void>;
    expandSource: Subject<unknown>;
    allMatchingSelectedSource: Subject<unknown>;
    dataLoaded: Subject<void>;
    dataLoadingSource: Subject<unknown>;
    sort: IDataTableSort;
    filter: IDataTableFilter | IDataTableFilter[];
    where: {
        query: string;
        criteria?: AdaptiveCriteria;
        form: any;
    };
    page: number;
    pageSize: number;
    globalSearch: string;
    selectedRows: Map<string, T>;
    expandedRows: Set<string>;
    outsideFilter: any;
    isForceRefresh: boolean;
    selectionOptions: IDataTableSelectionOption[];
    updates: EventEmitter<IDataTableChangeEvent>;
    retainSelected: boolean;
    savedSearchName: string;
    appliedSearchType: AppliedSearchType;
    displayedColumns: string[];
    get userFiltered(): boolean;
    get userFilteredInternal(): boolean;
    get selected(): T[];
    reset(fireUpdate?: boolean, persistUserFilters?: any): void;
    clearSort(fireUpdate?: boolean): void;
    clearFilter(fireUpdate?: boolean): void;
    clearQuery(fireUpdate?: boolean): void;
    clearSelected(fireUpdate?: boolean): void;
    onSelectionChange(): void;
    onExpandChange(targetId?: number): void;
    onPaginationChange(isPageSizeChange: boolean, pageSize: number): void;
    onSortFilterChange(): void;
    setInitialSortFilter(preferences: any): void;
    setState(preferences: IDataTablePreferences, fireUpdate?: boolean, persistUserFilters?: boolean): void;
    checkRetainment(caller: string, allMatchingSelected?: boolean): void;
    private transformFilters;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableState<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DataTableState<any>>;
}

declare class DataTableSource<T> extends DataSource<T> {
    private tableService;
    private state;
    private ref;
    total: number;
    currentTotal: number;
    current: number;
    loading: boolean;
    pristine: boolean;
    data: T[];
    private totalSet;
    get totallyEmpty(): boolean;
    get currentlyEmpty(): boolean;
    constructor(tableService: IDataTableService<T>, state: DataTableState<T>, ref: ChangeDetectorRef);
    connect(): Observable<any>;
    disconnect(): void;
}

/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * @docs-private
 */
interface NovoDataTableRef<T = any> {
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
declare const NOVO_DATA_TABLE_REF: InjectionToken<NovoDataTableRef<any>>;

declare class NovoDataTableCheckboxHeaderCell<T> extends CdkHeaderCell implements OnDestroy {
    private dataTable;
    private ref;
    private toaster;
    role: string;
    maxSelected: number;
    checked: boolean;
    private selectionSubscription;
    private paginationSubscription;
    private resetSubscription;
    get isAtLimit(): boolean;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTableRef, ref: ChangeDetectorRef, toaster: NovoToastService);
    ngOnDestroy(): void;
    onClick(): void;
    private resetAllMatchingSelected;
    selectAllChanged(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableCheckboxHeaderCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableCheckboxHeaderCell<any>, "novo-data-table-checkbox-header-cell", never, { "maxSelected": { "alias": "maxSelected"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoDataTableExpandHeaderCell<T> extends CdkHeaderCell implements OnDestroy {
    private dataTable;
    private ref;
    role: string;
    expanded: boolean;
    private expandSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTableRef, ref: ChangeDetectorRef);
    ngOnDestroy(): void;
    expandAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableExpandHeaderCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableExpandHeaderCell<any>, "novo-data-table-expand-header-cell", never, {}, {}, never, never, false, never>;
}

declare enum SortDirection {
    ASC = "ascending",
    DESC = "descending",
    NONE = "none"
}

declare class NovoDataTableSortButton<T> {
    state: DataTableState<T>;
    private ref;
    labels: NovoLabelService;
    sortChange: EventEmitter<SortDirection>;
    SortDirection: typeof SortDirection;
    get value(): SortDirection;
    set value(value: SortDirection);
    get isActive(): boolean;
    private _value;
    constructor(state: DataTableState<T>, ref: ChangeDetectorRef, labels: NovoLabelService);
    changeSort(dir: SortDirection): void;
    clearSort(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableSortButton<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableSortButton<any>, "novo-sort-button", never, { "value": { "alias": "value"; "required": false; }; }, { "sortChange": "sortChange"; }, never, never, false, never>;
}

declare class NovoDataTableSortFilter<T> {
    private state;
    constructor(state: DataTableState<T>);
    filter(id: string, type: string, value: any, transform: Function, allowMultipleFilters?: boolean, selectedOption?: Object): void;
    sort(id: string, value: string, transform: Function): void;
    resolveMultiFilter(id: string, type: string, value: any, transform: Function, selectedOption: Object): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableSortFilter<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDataTableSortFilter<any>, "[novoDataTableSortFilter]", never, {}, {}, never, never, false, never>;
}

declare class NovoDataTableCellHeader<T> implements IDataTableSortFilter, OnInit, OnDestroy {
    changeDetectorRef: ChangeDetectorRef;
    labels: NovoLabelService;
    private state;
    private renderer;
    private elementRef;
    _sort: NovoDataTableSortFilter<T>;
    _cdkColumnDef: CdkColumnDef;
    filterInput: ElementRef;
    dropdown: NovoDropdownElement;
    optionFilterInput: ElementRef;
    defaultSort: {
        id: string;
        value: string;
    };
    allowMultipleFilters: boolean;
    resized: EventEmitter<IDataTableColumn<T>>;
    filterTemplate: TemplateRef<any>;
    toggledFilter: EventEmitter<string>;
    resizable: boolean;
    set column(column: IDataTableColumn<T>);
    get column(): IDataTableColumn<T>;
    private _column;
    private _rerenderSubscription;
    private changeTimeout;
    label: string;
    icon: string;
    labelIcon: string;
    id: string;
    filter: any;
    direction: string;
    filterActive: boolean;
    sortActive: boolean;
    sortValue: SortDirection;
    showCustomRange: boolean;
    activeDateFilter: string;
    config: {
        sortable: boolean;
        filterable: boolean;
        resizable: boolean;
        transforms?: {
            filter?: Function;
            sort?: Function;
        };
        filterConfig?: IDataTableColumnFilterConfig;
    };
    multiSelect: boolean;
    multiSelectedOptions: Array<any>;
    private multiSelectedOptionIsHidden;
    optionFilter: string;
    error: boolean;
    private subscriptions;
    constructor(changeDetectorRef: ChangeDetectorRef, labels: NovoLabelService, state: DataTableState<T>, renderer: Renderer2, elementRef: ElementRef, _sort: NovoDataTableSortFilter<T>, _cdkColumnDef: CdkColumnDef);
    ngOnInit(): void;
    setupFilterOptions(): void;
    ngOnDestroy(): void;
    checkSortFilterState(sortFilterState: IDataTableChangeEvent, initialConfig?: boolean): void;
    isSelected(option: any, optionsList: any): boolean;
    toggleSelection(option: any): void;
    optionPresentCheck(item: any, optionValue: any): boolean;
    cancel(): void;
    filterMultiSelect(): void;
    multiSelectOptionFilter(optionFilter: string): void;
    multiSelectOptionIsHidden(option: string | IDataTableColumnFilterOption): boolean;
    multiSelectHasVisibleOptions(): boolean;
    private getOptionText;
    multiSelectOptionFilterHandleKeydown(event: KeyboardEvent): void;
    handleEscapeKeydown(event: KeyboardEvent): void;
    private clearOptionFilter;
    startResize(mouseDownEvent: MouseEvent): void;
    setWidth(width: number): void;
    toggleCustomRange(event: Event, value: boolean): void;
    clickedFilter(clickEvt: MouseEvent): void;
    focusInput(): void;
    sort(): void;
    filterData(filter?: any): void;
    clearFilter(): void;
    private getNextSortDirection;
    private getDefaultDateFilterOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableCellHeader<any>, [null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableCellHeader<any>, "[novo-data-table-cell-config]", never, { "defaultSort": { "alias": "defaultSort"; "required": false; }; "allowMultipleFilters": { "alias": "allowMultipleFilters"; "required": false; }; "resized": { "alias": "resized"; "required": false; }; "filterTemplate": { "alias": "filterTemplate"; "required": false; }; "column": { "alias": "novo-data-table-cell-config"; "required": false; }; }, { "toggledFilter": "toggledFilter"; }, never, never, false, never>;
}

declare class NovoDataTableHeaderCell<T> extends CdkHeaderCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    column: IDataTableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableHeaderCell<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDataTableHeaderCell<any>, "novo-data-table-header-cell", never, { "column": { "alias": "column"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoDataTableCellFilterHeader {
    changeDetectorRef: ChangeDetectorRef;
    labels: NovoLabelService;
    label: string | number;
    set filter(filter: any);
    get filter(): any;
    private _filter;
    hasFilter: boolean;
    clearFilter: EventEmitter<void>;
    constructor(changeDetectorRef: ChangeDetectorRef, labels: NovoLabelService);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableCellFilterHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableCellFilterHeader, "novo-data-table-cell-filter-header", never, { "label": { "alias": "label"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; }, { "clearFilter": "clearFilter"; }, never, never, false, never>;
}

declare class NovoDataTableCell<T> extends CdkCell implements OnInit, OnDestroy {
    private elementRef;
    private renderer;
    role: string;
    row: T;
    template: TemplateRef<any>;
    column: IDataTableColumn<T>;
    resized: EventEmitter<IDataTableColumn<T>>;
    private subscriptions;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private calculateWidths;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableCell<any>, "novo-data-table-cell", never, { "row": { "alias": "row"; "required": false; }; "template": { "alias": "template"; "required": false; }; "column": { "alias": "column"; "required": false; }; "resized": { "alias": "resized"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoDataTableCheckboxCell<T> extends CdkCell implements OnInit, OnDestroy {
    columnDef: CdkColumnDef;
    private dataTable;
    private ref;
    role: string;
    row: T;
    maxSelected: number;
    checked: boolean;
    private selectionSubscription;
    private resetSubscription;
    get isAtLimit(): boolean;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTableRef, ref: ChangeDetectorRef);
    ngOnInit(): void;
    onClick(): void;
    getTooltip(): string;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableCheckboxCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableCheckboxCell<any>, "novo-data-table-checkbox-cell", never, { "row": { "alias": "row"; "required": false; }; "maxSelected": { "alias": "maxSelected"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoDataTableExpandCell<T> extends CdkCell implements OnInit, OnDestroy {
    columnDef: CdkColumnDef;
    private dataTable;
    private ref;
    role: string;
    row: T;
    expanded: boolean;
    private expandSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTableRef, ref: ChangeDetectorRef);
    ngOnInit(): void;
    onClick(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableExpandCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableExpandCell<any>, "novo-data-table-expand-cell", never, { "row": { "alias": "row"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoDataTableClearButton<T> {
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

declare class NovoDataTableExpandDirective<T> implements OnDestroy {
    vcRef: ViewContainerRef;
    private state;
    private dataTable;
    row: T;
    template: TemplateRef<any>;
    private subscription;
    constructor(vcRef: ViewContainerRef, state: DataTableState<T>, dataTable: NovoDataTableRef);
    shouldExpandAllRows: (targetId: number) => boolean;
    shouldExpandOneRow: (targetId: number) => boolean;
    ngOnDestroy(): void;
    onClick(event: MouseEvent): void;
    private clear;
    private render;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableExpandDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDataTableExpandDirective<any>, "[novoDataTableExpand]", never, { "row": { "alias": "row"; "required": false; }; "template": { "alias": "novoDataTableExpand"; "required": false; }; }, {}, never, never, false, never>;
}

type ListInteractionEvent = 'init' | 'change';
type ListInteraction = {
    script: (novoDataTable: NovoDataTable<any>, columnId: string) => void;
    action: string;
    event: ListInteractionEvent[];
};
type ListInteractionDictionary = {
    [key: string]: ListInteraction[];
};

type DataTablePreferenceUpdateSrc = 'columndrag' | 'input' | 'statesortchange' | 'pagination';
interface IDataTablePreferencesChangeEvent extends IDataTablePreferences {
    eventSrc: DataTablePreferenceUpdateSrc;
}
declare class NovoDataTable<T> implements AfterContentInit, OnDestroy {
    labels: NovoLabelService;
    private ref;
    state: DataTableState<T>;
    globalSearchHiddenClassToggle: boolean;
    customTemplates: QueryList<NovoTemplate>;
    defaultTemplates: QueryList<NovoTemplate>;
    cellHeaders: QueryList<NovoDataTableCellHeader<T>>;
    novoDataTableContainer: ElementRef;
    resized: EventEmitter<IDataTableColumn<T>>;
    set displayedColumns(displayedColumns: string[]);
    get displayedColumns(): string[];
    private _disabledColumns;
    paginationOptions: IDataTablePaginationOptions;
    searchOptions: IDataTableSearchOptions;
    selectionOptions: IDataTableSelectionOption[];
    defaultSort: {
        id: string;
        value: string;
    };
    name: string;
    allowMultipleFilters: boolean;
    rowIdentifier: string;
    activeRowIdentifier: string;
    trackByFn: (index: any, item: any) => any;
    templates: {
        [key: string]: TemplateRef<any>;
    };
    fixedHeader: boolean;
    paginatorDataFeatureId: string;
    maxSelected: number;
    canSelectAll: boolean;
    allMatchingSelected: boolean;
    overrideTotal: number;
    paginationRefreshSubject: Subject<void>;
    enableColumnDragging: boolean;
    private dragEnabledByColumn;
    set dataTableService(service: IDataTableService<T>);
    set rows(rows: T[]);
    set outsideFilter(outsideFilter: EventEmitter<any>);
    set refreshSubject(refreshSubject: EventEmitter<void>);
    set columns(columns: IDataTableColumn<T>[]);
    get columns(): IDataTableColumn<T>[];
    set customFilter(v: boolean);
    get customFilter(): boolean;
    private _customFilter;
    set hasExandedRows(v: boolean);
    get hasExandedRows(): boolean;
    private _hasExandedRows;
    set forceShowHeader(v: boolean);
    get forceShowHeader(): boolean;
    private _forceShowHeader;
    set hideGlobalSearch(v: boolean);
    get hideGlobalSearch(): boolean;
    private _hideGlobalSearch;
    preferencesChanged: EventEmitter<IDataTablePreferencesChangeEvent>;
    allSelected: EventEmitter<{
        allSelected: boolean;
        selectedCount: number;
    }>;
    toggledFilter: EventEmitter<string>;
    dataSource: DataTableSource<T>;
    loading: boolean;
    columnToTemplate: {
        [key: string]: TemplateRef<any>;
    };
    columnsLoaded: boolean;
    selection: Set<string>;
    scrollLeft: number;
    expandable: boolean;
    private outsideFilterSubscription;
    private refreshSubscription;
    private resetSubscription;
    private paginationSubscription;
    private sortFilterSubscription;
    private allMatchingSelectedSubscription;
    private _columns;
    private scrollListenerHandler;
    private initialized;
    get empty(): boolean;
    get loadingClass(): boolean;
    get useOverrideTotal(): boolean;
    listInteractions: ListInteractionDictionary;
    constructor(labels: NovoLabelService, ref: ChangeDetectorRef, state: DataTableState<T>);
    modifyCellHeaderMultiSelectFilterOptions(column: string, newOptions: {
        value: any;
        label: string;
    }[]): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    onSearchChange(term: string): void;
    trackColumnsBy(index: number, item: IDataTableColumn<T>): string;
    isDisabled(check: any, row: T): boolean;
    isExpanded(row: T): boolean;
    expandRow(row: T): void;
    expandRows(expand: boolean): void;
    allCurrentRowsExpanded(): boolean;
    isSelected(row: T): boolean;
    selectRow(row: T, origin?: string): void;
    selectRows(selected: boolean): void;
    allCurrentRowsSelected(): boolean;
    columnDragFilter: (columnName: string) => boolean;
    columnDragged(event: NovoDragFinishEvent<string>): void;
    private configureLastDisplayedColumn;
    private configureColumns;
    private updateDisplayedColumns;
    private scrollListener;
    performInteractions(event: ListInteractionEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTable<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTable<any>, "novo-data-table", never, { "displayedColumns": { "alias": "displayedColumns"; "required": false; }; "paginationOptions": { "alias": "paginationOptions"; "required": false; }; "searchOptions": { "alias": "searchOptions"; "required": false; }; "selectionOptions": { "alias": "selectionOptions"; "required": false; }; "defaultSort": { "alias": "defaultSort"; "required": false; }; "name": { "alias": "name"; "required": false; }; "allowMultipleFilters": { "alias": "allowMultipleFilters"; "required": false; }; "rowIdentifier": { "alias": "rowIdentifier"; "required": false; }; "activeRowIdentifier": { "alias": "activeRowIdentifier"; "required": false; }; "trackByFn": { "alias": "trackByFn"; "required": false; }; "templates": { "alias": "templates"; "required": false; }; "fixedHeader": { "alias": "fixedHeader"; "required": false; }; "paginatorDataFeatureId": { "alias": "paginatorDataFeatureId"; "required": false; }; "maxSelected": { "alias": "maxSelected"; "required": false; }; "canSelectAll": { "alias": "canSelectAll"; "required": false; }; "allMatchingSelected": { "alias": "allMatchingSelected"; "required": false; }; "overrideTotal": { "alias": "overrideTotal"; "required": false; }; "paginationRefreshSubject": { "alias": "paginationRefreshSubject"; "required": false; }; "enableColumnDragging": { "alias": "enableColumnDragging"; "required": false; }; "dataTableService": { "alias": "dataTableService"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "outsideFilter": { "alias": "outsideFilter"; "required": false; }; "refreshSubject": { "alias": "refreshSubject"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "customFilter": { "alias": "customFilter"; "required": false; }; "hasExandedRows": { "alias": "hasExandedRows"; "required": false; }; "forceShowHeader": { "alias": "forceShowHeader"; "required": false; }; "hideGlobalSearch": { "alias": "hideGlobalSearch"; "required": false; }; "listInteractions": { "alias": "listInteractions"; "required": false; }; }, { "resized": "resized"; "preferencesChanged": "preferencesChanged"; "allSelected": "allSelected"; "toggledFilter": "toggledFilter"; }, ["customTemplates"], ["*"], false, never>;
}

declare function interpolateCell<T>(value: any, col: IDataTableColumn<T>): string;
declare class DataTableInterpolatePipe<T> implements PipeTransform {
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableInterpolatePipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DataTableInterpolatePipe<any>, "dataTableInterpolate", false>;
}
declare class DateTableDateRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTableDateRendererPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DateTableDateRendererPipe<any>, "dataTableDateRenderer", false>;
}
declare class DateTableDateTimeRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTableDateTimeRendererPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DateTableDateTimeRendererPipe<any>, "dataTableDateTimeRenderer", false>;
}
declare class DateTableTimeRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTableTimeRendererPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DateTableTimeRendererPipe<any>, "dataTableTimeRenderer", false>;
}
declare class DateTableNumberRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>, isPercent?: boolean): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTableNumberRendererPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DateTableNumberRendererPipe<any>, "dataTableNumberRenderer", false>;
}
declare class DataTableBigDecimalRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableBigDecimalRendererPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DataTableBigDecimalRendererPipe<any>, "dataTableBigDecimalRenderer", false>;
}
declare class DateTableCurrencyRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTableCurrencyRendererPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DateTableCurrencyRendererPipe<any>, "dataTableCurrencyRenderer", false>;
}

declare class NovoDataTableHeaderRow extends CdkHeaderRow {
    rowClass: string;
    fixedHeader: boolean;
    role: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableHeaderRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableHeaderRow, "novo-data-table-header-row", never, { "fixedHeader": { "alias": "fixedHeader"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoDataTableRow extends CdkRow {
    rowClass: string;
    role: string;
    id: any;
    dataAutomationId: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableRow, "novo-data-table-row", never, { "id": { "alias": "id"; "required": false; }; "dataAutomationId": { "alias": "dataAutomationId"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoDataTablePagination<T> implements OnInit, OnDestroy {
    private changeDetectorRef;
    labels: NovoLabelService;
    private state;
    theme: string;
    get page(): number;
    set page(page: number);
    _page: number;
    get pageSize(): number;
    set pageSize(pageSize: number);
    private _pageSize;
    dataFeatureId: string;
    get pageSizeOptions(): any[];
    set pageSizeOptions(pageSizeOptions: any[]);
    private _pageSizeOptions;
    canSelectAll: boolean;
    allMatchingSelected: boolean;
    loading: boolean;
    errorLoading: boolean;
    paginationRefreshSubject: Subject<void>;
    showPaginationTotalRecordCount: boolean;
    get length(): number;
    set length(length: number);
    _length: number;
    pageChange: EventEmitter<IDataTablePaginationEvent>;
    displayedPageSizeOptions: {
        value: string;
        label: string;
    }[];
    longRangeLabel: string;
    shortRangeLabel: string;
    pages: {
        number: number;
        text: string;
        active: boolean;
    }[];
    private resetSubscription;
    totalPages: number;
    private _initialized;
    constructor(changeDetectorRef: ChangeDetectorRef, labels: NovoLabelService, state: DataTableState<T>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    selectPage(page: any): void;
    nextPage(): void;
    previousPage(): void;
    hasPreviousPage(): boolean;
    hasNextPage(): boolean;
    changePageSize(pageSize: number): void;
    private updateDisplayedPageSizeOptions;
    private emitPageEvent;
    private calculateTotalPages;
    private makePage;
    private getPages;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTablePagination<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTablePagination<any>, "novo-data-table-pagination", never, { "theme": { "alias": "theme"; "required": false; }; "page": { "alias": "page"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; "dataFeatureId": { "alias": "dataFeatureId"; "required": false; }; "pageSizeOptions": { "alias": "pageSizeOptions"; "required": false; }; "canSelectAll": { "alias": "canSelectAll"; "required": false; }; "allMatchingSelected": { "alias": "allMatchingSelected"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "errorLoading": { "alias": "errorLoading"; "required": false; }; "paginationRefreshSubject": { "alias": "paginationRefreshSubject"; "required": false; }; "showPaginationTotalRecordCount": { "alias": "showPaginationTotalRecordCount"; "required": false; }; "length": { "alias": "length"; "required": false; }; }, { "pageChange": "pageChange"; }, never, never, false, never>;
}

declare class NovoDataTableModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoDataTableModule, [typeof DataTableInterpolatePipe, typeof DateTableDateRendererPipe, typeof DateTableCurrencyRendererPipe, typeof DateTableDateTimeRendererPipe, typeof DateTableNumberRendererPipe, typeof DateTableTimeRendererPipe, typeof DataTableBigDecimalRendererPipe, typeof NovoDataTableCellHeader, typeof NovoDataTableSortFilter, typeof NovoDataTableHeaderCell, typeof NovoDataTableCellFilterHeader, typeof NovoDataTableCell, typeof NovoDataTableHeaderRow, typeof NovoDataTableRow, typeof NovoDataTablePagination, typeof NovoDataTableCheckboxCell, typeof NovoDataTableCheckboxHeaderCell, typeof NovoDataTableExpandCell, typeof NovoDataTableExpandHeaderCell, typeof NovoDataTable, typeof NovoDataTableExpandDirective, typeof NovoDataTableClearButton, typeof NovoDataTableSortButton], [typeof i18.NovoDatePickerModule, typeof i19.CdkTableModule, typeof i20.CommonModule, typeof i21.FormsModule, typeof i22.NovoIconModule, typeof i23.NovoButtonModule, typeof i24.NovoDropdownModule, typeof i25.NovoDragDropModule, typeof i26.NovoFormExtrasModule, typeof i27.NovoLoadingModule, typeof i28.NovoTilesModule, typeof i29.NovoSearchBoxModule, typeof i30.NovoOptionModule, typeof i30.NovoCommonModule, typeof i31.NovoSelectModule, typeof i32.NovoTooltipModule, typeof i33.NovoCheckboxModule, typeof i34.NovoFlexModule, typeof i35.NovoFieldModule, typeof i36.ScrollingModule], [typeof NovoDataTable, typeof DataTableInterpolatePipe, typeof DateTableDateRendererPipe, typeof DateTableCurrencyRendererPipe, typeof DateTableDateTimeRendererPipe, typeof DateTableNumberRendererPipe, typeof DateTableTimeRendererPipe, typeof DataTableBigDecimalRendererPipe, typeof NovoDataTableCellFilterHeader, typeof NovoDataTableClearButton, typeof NovoDataTableSortButton]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoDataTableModule>;
}

declare class NovoDataTableFilterUtils {
    static constructFilter(filter?: any, type?: any, multiSelect?: boolean): any;
}

declare abstract class RemoteDataTableService<T> implements IDataTableService<T> {
    abstract getTableResults(sort: IDataTableSort, filter: IDataTableFilter | IDataTableFilter[], page: number, pageSize: number, globalSearch?: string, outsideFilter?: any, where?: {
        query: string;
        form: any;
    }): Observable<{
        results: T[];
        total: number;
    }>;
}

declare class StaticDataTableService<T> implements IDataTableService<T> {
    private currentData;
    originalData: T[];
    constructor(currentData?: T[]);
    getTableResults(sort: IDataTableSort, filter: IDataTableFilter | IDataTableFilter[], page: number, pageSize: number, globalSearch?: string, outsideFilter?: any, where?: {
        query: string;
        form: any;
    }): Observable<{
        results: T[];
        total: number;
    }>;
    filterData(currentData: T[], filter: IDataTableFilter | IDataTableFilter[]): T[];
}

export { AdaptiveConjunctionNames, AdaptiveOperator, AppliedSearchType, DataTableBigDecimalRendererPipe, DataTableInterpolatePipe, DataTableSource, DataTableState, DateTableCurrencyRendererPipe, DateTableDateRendererPipe, DateTableDateTimeRendererPipe, DateTableNumberRendererPipe, DateTableTimeRendererPipe, NOVO_DATA_TABLE_REF, NovoDataTable, NovoDataTableCell, NovoDataTableCellFilterHeader, NovoDataTableCellHeader, NovoDataTableCheckboxCell, NovoDataTableCheckboxHeaderCell, NovoDataTableClearButton, NovoDataTableExpandCell, NovoDataTableExpandDirective, NovoDataTableExpandHeaderCell, NovoDataTableFilterUtils, NovoDataTableHeaderCell, NovoDataTableHeaderRow, NovoDataTableModule, NovoDataTablePagination, NovoDataTableRow, NovoDataTableSortButton, NovoDataTableSortFilter, RemoteDataTableService, SortDirection, StaticDataTableService, interpolateCell };
export type { AdaptiveAnd, AdaptiveCondition, AdaptiveConditionOperatorObject, AdaptiveConjunction, AdaptiveCriteria, AdaptiveNot, AdaptiveOr, AdaptiveQuery, AdaptiveValue, AutobuildEntityData, DataTablePreferenceUpdateSrc, DataTableSavedSearchOwner, DataTableWhere, IDataTableCell, IDataTableChangeEvent, IDataTableColumn, IDataTableColumnFilterConfig, IDataTableColumnFilterOption, IDataTableColumnSortConfig, IDataTableFilter, IDataTablePaginationEvent, IDataTablePaginationOptions, IDataTablePreferences, IDataTablePreferencesChangeEvent, IDataTableSearchOptions, IDataTableSelectionChangeEvent, IDataTableSelectionOption, IDataTableService, IDataTableSort, IDataTableSortFilter, IKeyword, IKeywordBlock, IKeywordGroup, IKeywordSearchResponse, NestedKeywordGroups, NovoDataTableRef, PaginationObject, SearchKeywords };
