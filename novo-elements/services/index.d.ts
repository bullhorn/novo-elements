import * as i0 from '@angular/core';
import { Type, ViewContainerRef, StaticProvider, ComponentRef, EventEmitter } from '@angular/core';
import { Day } from 'date-fns';
import { MaskedOptions } from 'imask';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

declare class ComponentUtils<T = any> {
    append<T>(ComponentClass: Type<T>, location: ViewContainerRef, providers?: StaticProvider[], onTop?: boolean): ComponentRef<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentUtils<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ComponentUtils<any>>;
}

declare class CollectionEvent {
    static REFRESH: string;
    static ADD: string;
    static REMOVE: string;
    static REMOVE_ALL: string;
    static REPLACE: string;
    static INVALIDATE_ALL: string;
    static SORT: string;
    static FILTER: string;
    static CHANGE: string;
    static CURRENTPAGE_CHANGE: string;
    static PAGESIZE_CHANGE: string;
    static NUMBEROFPAGES_CHANGE: string;
    type: string;
    data: Array<any>;
    constructor(type?: string, data?: any[]);
}

interface Collection<T> {
    dataChange: EventEmitter<CollectionEvent>;
    length: number;
    total: number;
    source: Array<T>;
    filterData: Array<T>;
    list: Array<T>;
    filter: any;
    sort: Array<any>;
    isEmpty(): boolean;
    hasErrors(): boolean;
    isLoading(): boolean;
    isFiltered(): boolean;
    /**
     *  Adds the specified item to the end of the list.
     *  Equivalent to <code>addItemAt(item, length)</code>.
     *
     *  @param item The item to add.
     */
    addItem(item: T): void;
    /**
     *  Adds the item at the specified index.
     *  The index of any item greater than the index of the added item is increased by one.
     *  If the the specified index is less than zero or greater than the length
     *  of the list, a RangeError is thrown.
     *  @param item The item to place at the index.
     *  @param index The index at which to place the item.
     *  @throws RangeError if index is less than 0 or greater than the length of the list.
     */
    addItemAt(item: T, index: number): void;
    /**
     *  Adds all of the items to the end of the list
     *  @param items The items to place at the end of the list.
     */
    addItems(items: Array<T>): void;
    /**
     *  Gets the item at the specified index.
     *  @param index The index in the list from which to retrieve the item.
     *  @param prefetch An <code>number</code> indicating both the direction
     *  and number of items to fetch during the request if the item is
     *  not local.
     *  @return The item at that index, or <code>null</code> if there is none.
     *  @throws mx.collections.errors.ItemPendingError if the data for that index needs to be
     *  loaded from a remote location.
     *  @throws RangeError if <code>index &lt; 0</code>
     *  or <code>index >= length</code>.
     */
    getItemAt(index: number, prefetch: number): Object;
    /**
     *  Returns the index of the item if it is in the list such that
     *  getItemAt(index) == item.
     *  @param item The item to find.
     *  @return The index of the item, or -1 if the item is not in the list.
     */
    getItemIndex(item: T): number;
    removeItem(item: T): boolean;
    /**
     *  Removes all items from the list.
     */
    removeAll(): void;
    /**
     *  Removes the item at the specified index and returns it.
     *  Any items that were after this index are now one index earlier.
     *  @param index The index from which to remove the item.
     *  @return The item that was removed.
     */
    removeItemAt(index: number): Object;
    /**
     *  Returns an Array that is populated in the same order as the IList
     *  implementation.
     *  This method can throw an ItemPendingError.
     *  @return The array.
     */
    toArray(): Array<any>;
    refresh(): void;
}

/**
 * Base Class for all Collection based data providers
 *
 * @example
 *  var dp:DataProvider = new DataProvider();
 *  dp.addItem({label:"Item 1"});
 *  dp.addItem({label:"Item 2"});
 *  dp.addItem({label:"Item 3"});
 *  dp.addItem({label:"Item 4"});

 *  var myList:List = new List();
 *  myList.dataProvider = dp;
 */
declare class ArrayCollection<T> implements Collection<T> {
    dataChange: EventEmitter<CollectionEvent>;
    source: Array<T>;
    editData: Array<T>;
    isEditing: boolean;
    filterData: Array<T>;
    _filter: any;
    _sort: Array<any>;
    constructor(source?: Array<T>);
    get length(): number;
    get total(): number;
    get list(): Array<T>;
    isEmpty(): boolean;
    hasErrors(): boolean;
    isLoading(): boolean;
    isFiltered(): boolean;
    /**
     * Method to switch the isEditingflag for the data source
     */
    edit(): void;
    /**
     * Method to leave edit mode and reset source
     */
    undo(): void;
    /**
     * Method to leave edit mode and save editData
     */
    commit(): void;
    /**
     * Appends an item to the end of the data provider.
     *
     *
     * @memberOf ArrayCollection
     */
    addItem(item: T): void;
    /**
     * Adds a new item to the data provider at the specified index.
     *
     *
     * @memberOf ArrayCollection
     */
    addItemAt(item: T, index: number): void;
    /**
     *  Appends multiple items to the end of the DataProvider and dispatches a CollectionEvent.ADD event.
     *
     * @memberOf ArrayCollection
     */
    addItems(items: Array<T>): void;
    /**
     * Adds several items to the data provider at the specified index and dispatches a CollectionEvent.ADD event.
     *
     * @memberOf ArrayCollection
     */
    addItemsAt(items: Array<T>, index: number): void;
    /**
     * Creates a copy of the current ArrayCollection any.
     *
     * @memberOf ArrayCollection
     */
    clone(): ArrayCollection<T>;
    /**
     * Creates a copy of the current ArrayCollection any.
     *
     * @memberOf ArrayCollection
     */
    copy(array: any[]): any;
    /**
     * Concatenates the specified items to the end of the current data provider.
     *
     * @memberOf ArrayCollection
     */
    concat(items: Array<T>): void;
    /**
     * Returns the item at the specified index.
     *
     * @memberOf ArrayCollection
     */
    getItemAt(index: number): any;
    /**
     *  Returns the index of the specified item.
     *
     * @memberOf ArrayCollection
     */
    getItemIndex(item: T): number;
    /**
     * Invalidates all the data items that the DataProvider contains and dispatches a CollectionEvent.INVALIDATE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    invalidate(): void;
    /**
     * Appends the specified data into the data that the data provider contains and removes any duplicate items.
     *
     * @memberOf ArrayCollection
     */
    merge(newData: Array<T>): void;
    /**
     * Removes all items from the data provider and dispatches a CollectionEvent.REMOVE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    removeAll(): void;
    /**
     * Removes the specified item from the data provider and dispatches a CollectionEvent.REMOVE event.
     *
     * @memberOf ArrayCollection
     */
    removeItem(item: T): boolean;
    /**
     * Removes the item at the specified index and dispatches a CollectionEvent.REMOVE event.
     *
     * @memberOf ArrayCollection
     */
    removeItemAt(index: number): boolean;
    /**
     * Replaces an existing item with a new item and dispatches a CollectionEvent.REPLACE event.
     *
     * @memberOf ArrayCollection
     */
    replaceItem(newItem: any, oldItem: any): any;
    /**
     * Replaces the item at the specified index and dispatches a CollectionEvent.REPLACE event.
     *
     * @memberOf ArrayCollection
     */
    replaceItemAt(newItem: any, index: number): any;
    /**
     * Sorts the items that the data provider contains and dispatches a CollectionEvent.SORT event.
     *
     * @memberOf ArrayCollection
     */
    get sort(): Array<any>;
    set sort(value: Array<any>);
    /**
     * Sorts the items that the data provider contains by the specified field and dispatches a CollectionEvent.SORT event.
     *
     * @memberOf ArrayCollection
     */
    sortOn(fieldName: any, reverse?: boolean): Array<T>;
    get filter(): any;
    set filter(value: any);
    filterOn(fieldName: any, value?: any): Array<T>;
    onDataChange(event: CollectionEvent): void;
    refresh(): void;
    /**
     * Creates an Array any representation of the data that the data provider contains.
     *
     * @memberOf ArrayCollection
     */
    toArray(): Array<T>;
    toJSON(): T[];
}

interface PagedCollection<T> extends Collection<T> {
    /**
     * The current page number that the paginated collection is "showing".
     */
    page: number;
    /**
     * The total number of pages in the paginated collection.
     */
    numberOfPages: number;
    /**
     * The page size to use when paginating the collection.
     */
    pageSize: number;
}

declare class PagedArrayCollection<T> extends ArrayCollection<T> implements PagedCollection<T> {
    _page: number;
    _numberOfPages: number;
    _pageSize: number;
    constructor(source?: Array<T>);
    get numberOfPages(): number;
    get page(): number;
    set page(value: number);
    get pageSize(): number;
    set pageSize(value: number);
    next(): number;
    prev(): number;
    first(): number;
    last(): number;
    refresh(): void;
}

interface BigDecimalFormatOptions extends Intl.NumberFormatOptions {
    useAccountingFormat?: boolean;
}
declare class NovoLabelService {
    userLocale: string;
    and: string;
    not: string;
    filters: string;
    filterss: string;
    clear: string;
    sort: string;
    distributionListOwner: string;
    dateAdded: string;
    emptyTableMessage: string;
    noMatchingRecordsMessage: string;
    noMoreRecordsMessage: string;
    erroredTableMessage: string;
    pickerError: string;
    pickerTextFieldEmpty: string;
    pickerEmpty: string;
    tabbedGroupPickerEmpty: string;
    quickNoteError: string;
    quickNoteEmpty: string;
    required: string;
    numberTooLarge: string;
    apply: string;
    save: string;
    cancel: string;
    next: string;
    itemsPerPage: string;
    chooseAField: string;
    operator: string;
    select: string;
    value: string;
    selectDateRange: string;
    typeToAddChips: string;
    selected: string;
    selectAllOnPage: string;
    deselectAll: string;
    refresh: string;
    close: string;
    move: string;
    startDate: string;
    endDate: string;
    rate: string;
    more: string;
    clearAll: string;
    clearAllNormalCase: string;
    clearSort: string;
    clearFilter: string;
    clearSearch: string;
    clearSelected: string;
    today: string;
    now: string;
    isRequired: string;
    notValidYear: string;
    isTooLarge: string;
    invalidAddress: string;
    invalidEmail: string;
    minLength: string;
    past1Day: string;
    past7Days: string;
    past14Days: string;
    past21Days: string;
    past30Days: string;
    past60Days: string;
    past90Days: string;
    past180Days: string;
    past270Days: string;
    past1Year: string;
    next1Day: string;
    next7Days: string;
    next14Days: string;
    next21Days: string;
    next30Days: string;
    next60Days: string;
    next90Days: string;
    next180Days: string;
    next270Days: string;
    next1Year: string;
    future: string;
    customDateRange: string;
    backToPresetFilters: string;
    okGotIt: string;
    address: string;
    address1: string;
    apt: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    zipCode: string;
    country: string;
    or: string;
    clickToBrowse: string;
    chooseAFile: string;
    no: string;
    yes: string;
    search: string;
    noItems: string;
    dateFormat: string;
    dateFormatPlaceholder: string;
    localDatePlaceholder: string;
    timeFormatPlaceholderAM: string;
    timeFormatPlaceholder24Hour: string;
    timeFormatAM: string;
    timeFormatPM: string;
    confirmChangesModalMessage: string;
    promptModalMessage: string;
    asyncFailure: string;
    previous: string;
    actions: string;
    all: string;
    groupedMultiPickerEmpty: string;
    groupedMultiPickerSelectCategory: string;
    add: string;
    encryptedFieldTooltip: string;
    noStatesForCountry: string;
    selectCountryFirst: string;
    invalidIntegerInput: string;
    maxRecordsReached: string;
    selectFilterOptions: string;
    addCondition: string;
    includeAny: string;
    includeAll: string;
    exclude: string;
    excludeAny: string;
    radius: string;
    insideRadius: string;
    outsideRadius: string;
    equals: string;
    equalTo: string;
    greaterThan: string;
    lessThan: string;
    doesNotEqual: string;
    beginsWith: string;
    true: string;
    false: string;
    before: string;
    after: string;
    within: string;
    isNull: string;
    isEmpty: string;
    between: string;
    refreshPagination: string;
    location: string;
    showLess: string;
    miles: string;
    km: string;
    minimumPlaceholder: string;
    maximumPlaceholder: string;
    minGreaterThanMax: string;
    constructor(userLocale?: string);
    maxlengthMetWithField(field: string, maxlength: number): string;
    maxlengthMet(maxlength: number): string;
    invalidMaxlengthWithField(field: string, maxlength: number): string;
    invalidMaxlength(maxlength: number): string;
    getToManyPlusMore(toMany: {
        quantity: number;
    }): string;
    selectedRecords(selected: number): string;
    showingXofXResults(shown: number, total: number): string;
    ofXAmount(amount: number): string;
    totalRecords(total: number, select?: boolean): string;
    dateFormatString(): string;
    localizedDatePlaceholder(): string;
    tabbedGroupClearSuggestion(tabLabelPlural: string): string;
    formatDateWithFormat(value: any, format: Intl.DateTimeFormatOptions): any;
    formatToTimeOnly(param: any): void;
    formatToDateOnly(param: any): void;
    formatTimeWithFormat(value: any, format: Intl.DateTimeFormatOptions): string;
    getWeekdays(weekStartsOn?: Day): string[];
    getMonths(): string[];
    getProperty(value: string): any;
    getRangeText(page: number, pageSize: number, length: number, short: boolean): string;
    formatCurrency(value: number): string;
    /**
     * Extends the Intl.numberFormat capability with two extra features:
     *  - Does NOT round values, but instead truncates to maximumFractionDigits
     *  - By default uses accounting format for negative numbers: (3.14) instead of -3.14.
     *
     * @param value           The number value to convert to string
     * @param overrideOptions Allows for overriding options used and passed to Intl.NumberFormat()
     */
    formatBigDecimal(value: number, overrideOptions?: BigDecimalFormatOptions): string;
    /**
     * Performs a string-based truncating of a number with no rounding
     */
    truncateToPrecision(value: number, precision: number): number;
    formatNumber(value: any, options?: Intl.NumberFormatOptions): string;
    formatDateShort(value: string | number | Date): string;
    formatTime(value: string | number | Date): string;
    formatDate(value: string | number | Date): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoLabelService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NovoLabelService>;
}
declare const NOVO_ELEMENTS_LABELS_PROVIDERS: {
    provide: typeof NovoLabelService;
    useClass: typeof NovoLabelService;
}[];

declare class DateFormatService {
    private labels;
    readonly dateFormatAsImaskPattern: string;
    constructor(labels: NovoLabelService);
    getTimeMask(militaryTime: boolean): MaskedOptions;
    getDateMask(): MaskedOptions;
    getDateTimeMask(militaryTime?: boolean): Array<any>;
    getTimePlaceHolder(militaryTime: boolean): string;
    parseCustomDateString(dateString: string, customFormat?: string): [Date, string, boolean];
    private dateFormatToImaskPattern;
    /**
     * Certain date format characters are considered nonstandard. We can still use them, but remove them for date parsing to avoid errors
     * @param dateString
     * @param formatString
     * @returns date string and format in array, both having had their
     */
    private removeNonstandardFormatCharacters;
    parseDateString(dateString: string): [Date, string, boolean];
    parseTimeString(timeString: string, militaryTime: boolean): [Date, string];
    parseString(dateTimeString: string, militaryTime: boolean, type: string): [Date, string, boolean?];
    convertTime12to24(time12h: string): string;
    isValidDatePart(value: string, formatString: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateFormatService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DateFormatService>;
}

interface Global {
}
declare abstract class GlobalRef {
    abstract get nativeGlobal(): Global;
    abstract get nativeWindow(): Window;
}
declare class BrowserGlobalRef extends GlobalRef {
    get nativeGlobal(): Global;
    get nativeWindow(): Window;
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserGlobalRef, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BrowserGlobalRef>;
}
declare class NodeGlobalRef extends GlobalRef {
    get nativeGlobal(): Global;
    get nativeWindow(): Window;
}

declare class OptionsService {
    constructor();
    getOptionsConfig(http: HttpClient, field: any, config: {
        token?: string;
        restUrl?: string;
        military?: boolean;
    }): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<OptionsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OptionsService>;
}

declare class Security {
    credentials: string[];
    change: EventEmitter<any>;
    grant(data: any[] | Object): void;
    has(value: any): boolean;
    revoke(value: any): void;
    clear(): void;
    subscribe(fn: any): Subscription;
    checkRoutes(routes: {
        entities?: any[];
        permissions?: any[] | Function;
        path?: string;
        label?: string;
        canDisable?: Boolean;
    }[], options: {
        entityType?: string;
    }): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<Security, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Security>;
}

declare class LocalStorageService {
    setItem(key: any, value: any): any;
    getItem(key: any): any;
    removeItem(key: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalStorageService>;
}

declare class NovoTemplateService {
    templates: any;
    constructor();
    getAll(): any;
    addDefault(key: string, template: any): void;
    addCustom(key: string, template: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTemplateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NovoTemplateService>;
}

export { ArrayCollection, BrowserGlobalRef, CollectionEvent, ComponentUtils, DateFormatService, GlobalRef, LocalStorageService, NOVO_ELEMENTS_LABELS_PROVIDERS, NodeGlobalRef, NovoLabelService, NovoTemplateService, OptionsService, PagedArrayCollection, Security };
export type { BigDecimalFormatOptions, Collection, Global, PagedCollection };
