import * as i0 from '@angular/core';
import { Injector, Injectable, EventEmitter, LOCALE_ID, Optional, Inject } from '@angular/core';
import { Helpers, DateUtil, convertTokens } from 'novo-elements/utils';
import { parse, format } from 'date-fns';
import { MaskedEnum, MaskedRange } from 'imask';

// NG2
class ComponentUtils {
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    append(ComponentClass, location, providers, onTop) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
        const parent = location.injector;
        const index = onTop ? 0 : location.length;
        return location.createComponent(componentFactory, index, Injector.create({ providers, parent }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ComponentUtils, deps: [{ token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ComponentUtils }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ComponentUtils, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.ComponentFactoryResolver }] });

class CollectionEvent {
    static { this.REFRESH = 'Collection.REFRESH'; }
    static { this.ADD = 'Collection.ADD'; }
    static { this.REMOVE = 'Collection.REMOVE'; }
    static { this.REMOVE_ALL = 'Collection.REMOVE_ALL'; }
    static { this.REPLACE = 'Collection.REPLACE'; }
    static { this.INVALIDATE_ALL = 'Collection.INVALIDATE_ALL'; }
    static { this.SORT = 'Collection.SORT'; }
    static { this.FILTER = 'Collection.FILTER'; }
    static { this.CHANGE = 'Collection.CHANGE'; }
    static { this.CURRENTPAGE_CHANGE = 'Collection.CURRENTPAGE_CHANGE'; }
    static { this.PAGESIZE_CHANGE = 'Collection.PAGESIZE_CHANGE'; }
    static { this.NUMBEROFPAGES_CHANGE = 'Collection.NUMBEROFPAGES_CHANGE'; }
    constructor(type = 'Collection.REFRESH', data = []) {
        this.type = '';
        this.data = [];
        this.type = type;
        this.data = data;
    }
}

// Ng
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
class ArrayCollection {
    constructor(source = []) {
        this.dataChange = new EventEmitter();
        this.source = [];
        this.editData = [];
        this.isEditing = false;
        this.filterData = [];
        this._filter = {};
        this._sort = [];
        this.source = source;
        this.editData = this.copy(this.source);
        this.filterData = this.source.slice();
    }
    get length() {
        return this.filterData.length;
    }
    get total() {
        return this.filterData.length;
    }
    get list() {
        return this.filterData;
    }
    isEmpty() {
        return this.length <= 0 && !this.isLoading() && !this.hasErrors();
    }
    hasErrors() {
        return false;
    }
    isLoading() {
        return false;
    }
    isFiltered() {
        return Object.keys(this._filter).length > 0;
    }
    /**
     * Method to switch the isEditingflag for the data source
     */
    edit() {
        this.isEditing = true;
        this.editData = this.copy(this.source);
    }
    /**
     * Method to leave edit mode and reset source
     */
    undo() {
        this.isEditing = false;
        this.source = this.copy(this.editData);
        this.refresh();
    }
    /**
     * Method to leave edit mode and save editData
     */
    commit() {
        this.isEditing = false;
        this.source = this.filterData.slice();
        this.refresh();
    }
    /**
     * Appends an item to the end of the data provider.
     *
     *
     * @memberOf ArrayCollection
     */
    addItem(item) {
        this.isEditing ? this.editData.push(item) : this.source.push(item);
        this.onDataChange(new CollectionEvent(CollectionEvent.ADD, [item]));
        this.refresh();
    }
    /**
     * Adds a new item to the data provider at the specified index.
     *
     *
     * @memberOf ArrayCollection
     */
    addItemAt(item, index) {
        this.isEditing ? this.editData.splice(index, 0, item) : this.source.splice(index, 0, item);
        this.onDataChange(new CollectionEvent(CollectionEvent.ADD, [item]));
        this.refresh();
    }
    /**
     *  Appends multiple items to the end of the DataProvider and dispatches a CollectionEvent.ADD event.
     *
     * @memberOf ArrayCollection
     */
    addItems(items) {
        this.isEditing ? this.editData.push(...items) : this.source.push(...items);
        this.onDataChange(new CollectionEvent(CollectionEvent.ADD, items));
        this.refresh();
    }
    /**
     * Adds several items to the data provider at the specified index and dispatches a CollectionEvent.ADD event.
     *
     * @memberOf ArrayCollection
     */
    addItemsAt(items, index) {
        this.isEditing ? this.editData.splice(index, 0, ...items) : this.source.splice(index, 0, ...items);
    }
    /**
     * Creates a copy of the current ArrayCollection any.
     *
     * @memberOf ArrayCollection
     */
    clone() {
        return new ArrayCollection(this.isEditing ? this.copy(this.editData) : this.copy(this.source));
    }
    /**
     * Creates a copy of the current ArrayCollection any.
     *
     * @memberOf ArrayCollection
     */
    copy(array) {
        return Helpers.deepClone(array);
    }
    /**
     * Concatenates the specified items to the end of the current data provider.
     *
     * @memberOf ArrayCollection
     */
    concat(items) {
        this.addItems(items);
    }
    /**
     * Returns the item at the specified index.
     *
     * @memberOf ArrayCollection
     */
    getItemAt(index) {
        return this.isEditing ? this.editData[index] : this.source[index];
    }
    /**
     *  Returns the index of the specified item.
     *
     * @memberOf ArrayCollection
     */
    getItemIndex(item) {
        return this.isEditing ? this.editData.indexOf(item) : this.source.indexOf(item);
    }
    /**
     * Invalidates all the data items that the DataProvider contains and dispatches a CollectionEvent.INVALIDATE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    invalidate() {
        this.onDataChange(new CollectionEvent(CollectionEvent.INVALIDATE_ALL));
    }
    /**
     * Appends the specified data into the data that the data provider contains and removes any duplicate items.
     *
     * @memberOf ArrayCollection
     */
    merge(newData) {
        for (const obj of newData) {
            const existing = ~this.getItemIndex(obj);
            if (existing) {
                this.replaceItem(obj, existing);
            }
            else {
                this.addItem(obj);
            }
        }
    }
    /**
     * Removes all items from the data provider and dispatches a CollectionEvent.REMOVE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    removeAll() {
        this.source = [];
        this.editData = [];
        this.filterData = [];
        this.onDataChange(new CollectionEvent(CollectionEvent.REMOVE_ALL, []));
        this.refresh();
    }
    /**
     * Removes the specified item from the data provider and dispatches a CollectionEvent.REMOVE event.
     *
     * @memberOf ArrayCollection
     */
    removeItem(item) {
        const index = this.getItemIndex(item);
        return this.removeItemAt(index);
    }
    /**
     * Removes the item at the specified index and dispatches a CollectionEvent.REMOVE event.
     *
     * @memberOf ArrayCollection
     */
    removeItemAt(index) {
        const success = !!this.source.splice(index, 1);
        this.refresh();
        return success;
    }
    /**
     * Replaces an existing item with a new item and dispatches a CollectionEvent.REPLACE event.
     *
     * @memberOf ArrayCollection
     */
    replaceItem(newItem, oldItem) {
        const index = this.getItemIndex(oldItem);
        if (index >= 0) {
            this.replaceItemAt(newItem, index);
        }
    }
    /**
     * Replaces the item at the specified index and dispatches a CollectionEvent.REPLACE event.
     *
     * @memberOf ArrayCollection
     */
    replaceItemAt(newItem, index) {
        this.filterData.splice(index, 1, newItem);
    }
    /**
     * Sorts the items that the data provider contains and dispatches a CollectionEvent.SORT event.
     *
     * @memberOf ArrayCollection
     */
    get sort() {
        return this._sort;
    }
    set sort(value) {
        this._sort = value;
        this.refresh();
    }
    /**
     * Sorts the items that the data provider contains by the specified field and dispatches a CollectionEvent.SORT event.
     *
     * @memberOf ArrayCollection
     */
    sortOn(fieldName, reverse = false) {
        this.filterData = this.filterData.sort(Helpers.sortByField(fieldName, reverse));
        this.onDataChange(new CollectionEvent(CollectionEvent.SORT));
        return this.filterData;
    }
    get filter() {
        return this._filter;
    }
    set filter(value) {
        this._filter = value;
        this.refresh();
    }
    filterOn(fieldName, value = null) {
        this.filterData = this.filterData.filter(Helpers.filterByField(fieldName, value));
        return this.filterData;
    }
    onDataChange(event) {
        this.dataChange.emit(event);
    }
    refresh() {
        this.filterData = this.isEditing ? this.editData.slice() : this.source.slice();
        for (const item of this._sort.reverse()) {
            this.sortOn(item.field, item.reverse);
        }
        for (const key in this._filter) {
            if (key) {
                this.filterOn(key, this._filter[key]);
            }
        }
        this.onDataChange(new CollectionEvent(CollectionEvent.CHANGE, this.filterData));
    }
    /**
     * Creates an Array any representation of the data that the data provider contains.
     *
     * @memberOf ArrayCollection
     */
    toArray() {
        return this.isEditing ? this.editData : this.source;
    }
    toJSON() {
        return this.isEditing ? this.editData : this.source;
    }
}

class PagedArrayCollection extends ArrayCollection {
    constructor(source = []) {
        super(source);
        this._page = 1;
        this._numberOfPages = 1;
        this._pageSize = 10;
    }
    get numberOfPages() {
        let result = this.source.length / this.pageSize;
        result = Math.ceil(result);
        return result;
    }
    get page() {
        return this._page;
    }
    set page(value) {
        this._page = value;
        this.refresh();
    }
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value) {
        this._pageSize = value;
        this.refresh();
    }
    next() {
        if (this.page === this.numberOfPages) {
            return this.page;
        }
        this.page++;
        return this.page;
    }
    prev() {
        if (this._page === 1) {
            return this.page;
        }
        this.page--;
        return this.page;
    }
    first() {
        if (this.page === 1) {
            return this.page;
        }
        this.page = 1;
        return this.page;
    }
    last() {
        if (this.page === this.numberOfPages) {
            return this.page;
        }
        this.page = this.numberOfPages;
        return this.page;
    }
    refresh() {
        this.filterData = this.isEditing ? this.editData.slice() : this.source.slice();
        for (const item of this._sort.reverse()) {
            this.sortOn(item.field, item.reverse);
        }
        for (const key in this._filter) {
            if (key) {
                this.filterOn(key, this._filter[key]);
            }
        }
        if (this.page >= 0) {
            const start = (this.page - 1) * this.pageSize;
            const end = start + this.pageSize;
            const result = this.filterData.slice(start, end);
            this.onDataChange(new CollectionEvent(CollectionEvent.CHANGE, result));
        }
        else {
            this.onDataChange(new CollectionEvent(CollectionEvent.CHANGE, this.filterData));
        }
    }
}

// NG2
class NovoLabelService {
    constructor(userLocale = 'en-US') {
        this.userLocale = userLocale;
        this.and = 'and';
        this.not = 'not';
        this.filters = 'Filter';
        this.filterss = 'Filters';
        this.clear = 'Clear';
        this.sort = 'Sort';
        this.distributionListOwner = 'Owner';
        this.dateAdded = 'Date Added';
        this.emptyTableMessage = 'No Records to display...';
        this.noMatchingRecordsMessage = 'No Matching Records';
        this.noMoreRecordsMessage = 'No More Records';
        this.erroredTableMessage = 'Oops! An error occurred.';
        this.pickerError = 'Oops! An error occurred.';
        this.pickerTextFieldEmpty = 'Begin typing to see results.';
        this.pickerEmpty = 'No results to display...';
        this.tabbedGroupPickerEmpty = 'No results found';
        this.quickNoteError = 'Oops! An error occurred.';
        this.quickNoteEmpty = 'No results to display...';
        this.required = 'Required';
        this.numberTooLarge = 'Number is too large';
        this.apply = 'Apply';
        this.save = 'Save';
        this.cancel = 'Cancel';
        this.next = 'Next';
        this.itemsPerPage = 'Items per page:';
        this.chooseAField = 'Choose a field...';
        this.operator = 'Operator...';
        this.select = 'Select...';
        this.value = 'Value...';
        this.selectDateRange = 'Select Date Range...';
        this.typeToAddChips = 'Type and press Enter to add...';
        this.selected = 'Selected';
        this.selectAllOnPage = 'Select all on page';
        this.deselectAll = 'Deselect all';
        this.refresh = 'Refresh';
        this.close = 'Close';
        this.move = 'Move';
        this.startDate = 'Start Date';
        this.endDate = 'End Date';
        this.rate = 'Rate';
        this.more = 'more';
        this.clearAll = 'CLEAR ALL';
        this.clearAllNormalCase = 'Clear All';
        this.clearSort = 'Clear Sort';
        this.clearFilter = 'Clear Filter';
        this.clearSearch = 'Clear Search';
        this.clearSelected = 'Clear Selected';
        this.today = 'Today';
        this.now = 'Now';
        this.isRequired = 'is required';
        this.notValidYear = 'is not a valid year';
        this.isTooLarge = 'is too large';
        this.invalidAddress = 'requires at least one field filled out';
        this.invalidEmail = 'requires a valid email (ex. abc@123.com)';
        this.minLength = 'is required to be a minimum length of';
        this.past1Day = 'Past 1 Day';
        this.past7Days = 'Past 7 Days';
        this.past14Days = 'Past 14 Days';
        this.past21Days = 'Past 21 Days';
        this.past30Days = 'Past 30 Days';
        this.past60Days = 'Past 60 Days';
        this.past90Days = 'Past 90 Days';
        this.past180Days = 'Past 180 Days';
        this.past270Days = 'Past 270 Days';
        this.past1Year = 'Past 1 Year';
        this.next1Day = 'Next 1 Day';
        this.next7Days = 'Next 7 Days';
        this.next14Days = 'Next 14 Days';
        this.next21Days = 'Next 21 Days';
        this.next30Days = 'Next 30 Days';
        this.next60Days = 'Next 60 Days';
        this.next90Days = 'Next 90 Days';
        this.next180Days = 'Next 180 Days';
        this.next270Days = 'Next 270 Days';
        this.next1Year = 'Next 1 Year';
        this.future = 'Future';
        this.customDateRange = 'Custom Date Range';
        this.backToPresetFilters = 'Back to Preset Filters';
        this.okGotIt = 'Ok, Got it';
        this.address = 'Address';
        this.address1 = 'Address';
        this.apt = 'Apt'; // TODO delete
        this.address2 = 'Apt';
        this.city = 'City / Locality';
        this.state = 'State / Region';
        this.zip = 'Postal Code';
        this.zipCode = 'Postal Code'; // TODO delete
        this.country = 'Country';
        this.or = 'or';
        this.clickToBrowse = 'click to browse';
        this.chooseAFile = 'Choose a file';
        this.no = 'No';
        this.yes = 'Yes';
        this.search = 'SEARCH';
        this.noItems = 'There are no items';
        this.dateFormat = 'MM/dd/yyyy';
        this.dateFormatPlaceholder = 'MM/DD/YYYY';
        this.localDatePlaceholder = 'mm/dd/yyyy';
        this.timeFormatPlaceholderAM = 'hh:mm AM';
        this.timeFormatPlaceholder24Hour = 'HH:mm';
        this.timeFormatAM = 'AM';
        this.timeFormatPM = 'PM';
        this.confirmChangesModalMessage = 'Are you sure you want to change this field?';
        this.promptModalMessage = 'Do you want to perform the following changes?';
        this.asyncFailure = 'Async validation was not called within the 10s threshold, you might want to reload the page to try again';
        this.previous = 'Previous';
        this.actions = 'Actions';
        this.all = 'All';
        this.groupedMultiPickerEmpty = 'No items to display';
        this.groupedMultiPickerSelectCategory = 'Select a category from the left to get started';
        this.add = 'Add';
        this.encryptedFieldTooltip = 'This data has been stored at the highest level of security';
        this.noStatesForCountry = 'No states available for the selected country';
        this.selectCountryFirst = 'Please select a country before selecting a state';
        this.invalidIntegerInput = 'Special characters are not allowed for';
        this.maxRecordsReached = 'Sorry, you have reached the maximum number of records allowed for this field';
        this.selectFilterOptions = 'Please select one or more filter options below.';
        this.addCondition = 'Add Condition';
        this.includeAny = 'Include Any';
        this.includeAll = 'Include All';
        this.exclude = 'Exclude';
        this.excludeAny = 'Exclude Any';
        this.radius = 'Radius';
        this.insideRadius = 'Radius (Inside)';
        this.outsideRadius = 'Radius (Outside)';
        this.equals = 'Equals';
        this.equalTo = 'Equal To';
        this.greaterThan = 'Greater Than';
        this.lessThan = 'Less Than';
        this.doesNotEqual = 'Does Not Equal';
        this.beginsWith = 'Begins With';
        this.true = 'True';
        this.false = 'False';
        this.before = 'Before';
        this.after = 'After';
        this.within = 'Within';
        this.isNull = 'Is Empty';
        this.isEmpty = 'Is Empty?';
        this.between = 'Is Between';
        this.refreshPagination = 'Refresh Pagination';
        this.location = 'Location';
        this.showLess = 'Show Less';
        this.miles = 'Miles';
        this.km = 'Km';
        this.minimumPlaceholder = 'Minimum';
        this.maximumPlaceholder = 'Maximum';
        this.minGreaterThanMax = 'The minimum is greater than the maximum value';
    }
    maxlengthMetWithField(field, maxlength) {
        return `Sorry, you have reached the maximum character count of ${maxlength} for ${field}.`;
    }
    maxlengthMet(maxlength) {
        return `Sorry, you have reached the maximum character count of ${maxlength} for this field.`;
    }
    invalidMaxlengthWithField(field, maxlength) {
        return `Sorry, you have exceeded the maximum character count of ${maxlength} for ${field}.`;
    }
    invalidMaxlength(maxlength) {
        return `Sorry, you have exceeded the maximum character count of ${maxlength} for this field.`;
    }
    getToManyPlusMore(toMany) {
        return `+${toMany.quantity} more`;
    }
    selectedRecords(selected) {
        return `${selected} records are selected.`;
    }
    showingXofXResults(shown, total) {
        return `Showing ${shown} of ${total} Results.`;
    }
    ofXAmount(amount) {
        return `of ${amount}`;
    }
    totalRecords(total, select = false) {
        return select ? `Select all ${total} records.` : `De-select remaining ${total} records.`;
    }
    dateFormatString() {
        return this.dateFormat;
    }
    localizedDatePlaceholder() {
        return this.localDatePlaceholder;
    }
    tabbedGroupClearSuggestion(tabLabelPlural) {
        return `Clear your search to see all ${tabLabelPlural}.`;
    }
    formatDateWithFormat(value, format) {
        const date = value instanceof Date ? value : new Date(value);
        if (date.getTime() !== date.getTime()) {
            return value;
        }
        return new Intl.DateTimeFormat(this.userLocale, format).format(date);
    }
    formatToTimeOnly(param) { }
    formatToDateOnly(param) { }
    formatTimeWithFormat(value, format) {
        const date = value instanceof Date ? value : new Date(value);
        if (date.getTime() !== date.getTime()) {
            return value;
        }
        const timeParts = Intl.DateTimeFormat(this.userLocale, format)
            .formatToParts(date)
            .reduce((obj, part) => {
            obj[part.type] = part.value;
            return obj;
        }, {});
        const dayPeriod = timeParts.dayPeriod ? timeParts.dayPeriod : '';
        const res = `${timeParts.hour}:${timeParts.minute} ${dayPeriod}`;
        return res;
    }
    getWeekdays(weekStartsOn = 0) {
        function getDay(dayOfWeek) {
            const dt = new Date();
            return dt.setDate(dt.getDate() - dt.getDay() + dayOfWeek);
        }
        let weekdays = [getDay(0), getDay(1), getDay(2), getDay(3), getDay(4), getDay(5), getDay(6)].reduce((weekdays, dt) => {
            weekdays.push(new Intl.DateTimeFormat(this.userLocale, { weekday: 'long' }).format(dt));
            return weekdays;
        }, []);
        if (weekStartsOn > 0 && weekStartsOn <= 6) {
            const newStart = weekdays.splice(weekStartsOn);
            weekdays = [...newStart, ...weekdays];
        }
        return weekdays;
    }
    getMonths() {
        function getMonth(month) {
            const dt = new Date();
            return dt.setMonth(month, 1);
        }
        return [
            getMonth(0),
            getMonth(1),
            getMonth(2),
            getMonth(3),
            getMonth(4),
            getMonth(5),
            getMonth(6),
            getMonth(7),
            getMonth(8),
            getMonth(9),
            getMonth(10),
            getMonth(11),
        ].reduce((months, dt) => {
            months.push(new Intl.DateTimeFormat(this.userLocale, { month: 'long' }).format(dt));
            return months;
        }, []);
    }
    getProperty(value) {
        return this[value];
    }
    getRangeText(page, pageSize, length, short) {
        if (length === 0 || pageSize === 0) {
            return `Displaying 0 of ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return short ? `${startIndex + 1} - ${endIndex}/${length}` : `Displaying ${startIndex + 1} - ${endIndex} of ${length}`;
    }
    formatCurrency(value) {
        const options = { style: 'currency', currency: 'USD' };
        return new Intl.NumberFormat(this.userLocale, options).format(value);
    }
    /**
     * Extends the Intl.numberFormat capability with two extra features:
     *  - Does NOT round values, but instead truncates to maximumFractionDigits
     *  - By default uses accounting format for negative numbers: (3.14) instead of -3.14.
     *
     * @param value           The number value to convert to string
     * @param overrideOptions Allows for overriding options used and passed to Intl.NumberFormat()
     */
    formatBigDecimal(value, overrideOptions) {
        const defaultOptions = {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useAccountingFormat: true,
        };
        const options = Object.assign(defaultOptions, overrideOptions);
        const truncatedValue = this.truncateToPrecision(value, options.maximumFractionDigits);
        let _value = new Intl.NumberFormat(this.userLocale, options).format(truncatedValue);
        if (value < 0) {
            _value = options.useAccountingFormat ? `(${_value.slice(1)})` : `-${_value.slice(1)}`;
        }
        return _value;
    }
    /**
     * Performs a string-based truncating of a number with no rounding
     */
    truncateToPrecision(value, precision) {
        let valueAsString = value ? value.toString() : '0';
        const decimalIndex = valueAsString.indexOf('.');
        if (decimalIndex > -1 && decimalIndex + precision + 1 < valueAsString.length) {
            valueAsString = valueAsString.substring(0, valueAsString.indexOf('.') + precision + 1);
        }
        return Number(valueAsString);
    }
    formatNumber(value, options) {
        return new Intl.NumberFormat(this.userLocale, options).format(value);
    }
    formatDateShort(value) {
        const options = {
            // DD/MM/YYYY, HH:MM A - 02/14/2017, 1:17 PM
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        };
        const _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
        return new Intl.DateTimeFormat(this.userLocale, options).format(_value);
    }
    formatTime(value) {
        const options = {
            // HH:MM A - 1:17 PM
            hour: 'numeric',
            minute: '2-digit',
        };
        const _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
        return new Intl.DateTimeFormat(this.userLocale, options).format(_value);
    }
    formatDate(value) {
        const options = {
            // DD/MM/YYYY - 02/14/2017
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        };
        const _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
        return new Intl.DateTimeFormat(this.userLocale, options).format(_value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLabelService, deps: [{ token: LOCALE_ID, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLabelService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLabelService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LOCALE_ID]
                }] }] });
const NOVO_ELEMENTS_LABELS_PROVIDERS = [{ provide: NovoLabelService, useClass: NovoLabelService }];

// NG2
class DateFormatService {
    constructor(labels) {
        this.labels = labels;
        this.dateFormatAsImaskPattern = this.dateFormatToImaskPattern(this.labels.dateFormatString());
    }
    getTimeMask(militaryTime) {
        const amFormat = this.labels.timeFormatAM.toUpperCase();
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        const mask = {
            mask: Date,
            pattern: militaryTime ? 'HH:mm' : 'hh:mm aa',
            overwrite: true,
            autofix: true,
            lazy: false,
            min: new Date(1970, 0, 1),
            max: new Date(2100, 0, 1),
            prepare(str) {
                return str.toUpperCase();
            },
            format(date) {
                return DateUtil.format(date, militaryTime ? 'HH:mm' : 'hh:mm A');
            },
            parse: (str) => {
                const time = militaryTime ? str : this.convertTime12to24(str);
                return DateUtil.parse(`${DateUtil.format(Date.now(), 'YYYY-MM-DD')}T${time}`);
            },
            blocks: {
                HH: {
                    mask: MaskedRange,
                    placeholderChar: 'H',
                    maxLength: 2,
                    from: 0,
                    to: 23,
                },
                hh: {
                    mask: MaskedRange,
                    placeholderChar: 'h',
                    maxLength: 2,
                    from: 1,
                    to: 12,
                },
                mm: {
                    mask: MaskedRange,
                    placeholderChar: 'm',
                    maxLength: 2,
                    from: 0,
                    to: 59,
                },
                aa: {
                    mask: MaskedEnum,
                    placeholderChar: 'x',
                    enum: ['AM', 'PM', 'am', 'pm', amFormat, pmFormat],
                },
            },
        };
        return mask;
    }
    getDateMask() {
        return {
            mask: /^((\d)(\d|\/|\.|\-){0,7})?(\d){0,2}$/
        };
    }
    getDateTimeMask(militaryTime = false) {
        return [this.getDateMask(), /\,?/, /\s/, this.getTimeMask(militaryTime)];
    }
    getTimePlaceHolder(militaryTime) {
        if (militaryTime) {
            return this.labels.timeFormatPlaceholder24Hour;
        }
        return this.labels.timeFormatPlaceholderAM;
    }
    parseCustomDateString(dateString, customFormat) {
        let isInvalidDate = true;
        let date = null;
        if (!customFormat) {
            customFormat = this.labels.dateFormatString();
        }
        customFormat = convertTokens(customFormat);
        const [cleanDateString, cleanFormat] = this.removeNonstandardFormatCharacters(dateString, customFormat);
        try {
            date = parse(cleanDateString, cleanFormat, new Date(), {
                useAdditionalWeekYearTokens: false
            });
            if (isNaN(date.getTime())) {
                date = null;
            }
            else if (cleanDateString !== dateString) {
                // Verify that this parse matches the original dateString through this format. If not, then something may have mismatched -
                // in which case we consider the date to be invalid.
                // For instance, if we parsed "Fri Oct 18, 2023" as " Oct 18 2023" (removing the duplicative day-of-week) then it
                // would re-format as "Wed Oct 18 2023" and is an invalid date.
                const reformattedDate = format(date, customFormat);
                if (reformattedDate !== dateString) {
                    date = null;
                }
                else {
                    isInvalidDate = false;
                }
            }
            else {
                isInvalidDate = false;
            }
        }
        catch (err) {
            // ignore error - keep isInvalidDate true and date null
        }
        return [date, dateString, isInvalidDate];
    }
    dateFormatToImaskPattern(format) {
        const partsReg = /(\w)\1+|([\.\\/-])/g;
        let output = '';
        let match;
        while ((match = partsReg.exec(format)) != null) {
            if (match[1]) {
                const matchLow = match[1].toLowerCase();
                if (matchLow === 'y') {
                    output += 'Y';
                }
                else {
                    output += matchLow;
                }
            }
            else {
                output += `{${match[2]}}\``;
            }
        }
        return output;
    }
    /**
     * Certain date format characters are considered nonstandard. We can still use them, but remove them for date parsing to avoid errors
     * @param dateString
     * @param format
     * @returns date string and format in array, both having had their
     */
    removeNonstandardFormatCharacters(dateString, format) {
        const bannedChars = /[iIRoPp]+/;
        // remove quotes
        format = format.replace(/['"]/g, '');
        let match = null;
        while ((match = bannedChars.exec(format)) != null) {
            format = format.substring(0, match.index) + format.substring(match.index + match[0].length);
            dateString = dateString.substring(0, match.index) + dateString.substring(match.index + match[0].length);
        }
        return [dateString, format];
    }
    parseDateString(dateString) {
        let dateFormat = this.labels.dateFormatString();
        const dateFormatRegex = /(\w+)[\/|\.|\-](\w+)[\/|\.|\-](\w+)/gi;
        const dateValueRegex = /(\d+)[\/|\.|\-](\d+)[\/|\.|\-](\d+)/gi;
        let dateFormatTokens;
        let dateValueTokens;
        let year;
        let month;
        let day;
        let date = null;
        let isInvalidDate = true;
        if (Helpers.isEmpty(dateFormat)) {
            // Default to MM/dd/yyyy
            dateFormat = 'mm/dd/yyyy';
        }
        else {
            dateFormat = dateFormat.toLowerCase();
        }
        dateFormatTokens = dateFormatRegex.exec(dateFormat);
        dateValueTokens = dateValueRegex.exec(dateString);
        if (dateFormatTokens && dateFormatTokens.length === 4 && dateValueTokens && dateValueTokens.length === 4) {
            for (let i = 1; i < 4; i++) {
                if (dateFormatTokens[i].includes('m')) {
                    month = parseInt(dateValueTokens[i], 10) - 1;
                }
                else if (dateFormatTokens[i].includes('d')) {
                    day = parseInt(dateValueTokens[i], 10);
                }
                else {
                    year = parseInt(dateValueTokens[i], 10);
                }
            }
            if (month >= 0 && month <= 11 && year > 1900 && day > 0 && day <= 31) {
                date = new Date(year, month, day);
                isInvalidDate = false;
            }
        }
        else if (dateFormatTokens && dateFormatTokens.length === 4 && dateString.length >= 1) {
            const twoTokens = /\d{1,4}(\/|\.|\-)(\d{1,2})/.exec(dateString);
            const oneToken = /^(\d{1,4})$/.exec(dateString);
            const delimiter = /\w+(\/|\.|\-)\w+[\/|\.|\-]\w+/gi.exec(dateFormat);
            const dateStringWithDelimiter = dateString[dateString.length - 1].match(/\/|\.|\-/);
            if ((twoTokens && twoTokens.length === 3 && this.isValidDatePart(twoTokens[2], dateFormatTokens[2]) && !dateStringWithDelimiter) ||
                (oneToken && oneToken.length === 2 && this.isValidDatePart(oneToken[1], dateFormatTokens[1]) && !dateStringWithDelimiter)) {
                dateString = `${dateString}${delimiter[1]}`;
            }
        }
        return [date, dateString, isInvalidDate];
    }
    parseTimeString(timeString, militaryTime) {
        const value = new Date();
        let timeStringParts;
        let amFormat = this.labels.timeFormatAM;
        let pmFormat = this.labels.timeFormatPM;
        if (!(timeString?.includes(':'))) {
            return [value, timeString];
        }
        if (!militaryTime && amFormat && pmFormat) {
            let splits = [];
            let pm = false;
            amFormat = this.labels.timeFormatAM.toLowerCase();
            pmFormat = this.labels.timeFormatPM.toLowerCase();
            timeString = timeString.toLowerCase();
            if (timeString.includes(amFormat)) {
                splits = timeString.split(amFormat);
            }
            else if (timeString.includes(pmFormat)) {
                splits = timeString.split(pmFormat);
                pm = true;
            }
            if (splits?.length) {
                for (const item of splits) {
                    if (item?.trim().includes(':')) {
                        timeStringParts = item.trim().split(':');
                    }
                }
            }
            if (timeStringParts?.length && timeStringParts.length === 2) {
                let hours = parseInt(timeStringParts[0], 10);
                if (hours === 12 && pm) {
                    hours = 12;
                }
                else if (pm) {
                    hours = hours + 12;
                }
                else if (hours === 12) {
                    hours = 0;
                }
                value.setHours(hours);
                value.setMinutes(parseInt(timeStringParts[1], 10));
                value.setSeconds(0);
            }
        }
        else {
            timeStringParts = /(\d{1,2}):(\d{2})/.exec(timeString);
            if (timeStringParts?.length && timeStringParts.length === 3) {
                value.setHours(parseInt(timeStringParts[1], 10));
                value.setMinutes(parseInt(timeStringParts[2], 10));
                value.setSeconds(0);
            }
        }
        return [value, timeString];
    }
    parseString(dateTimeString, militaryTime, type) {
        if (!(dateTimeString?.length)) {
            return null;
        }
        switch (type) {
            case 'datetime':
                const str = dateTimeString.replace(/-/g, '/');
                const parts = str.split(' ');
                const [dt, dts] = this.parseDateString(parts[0]);
                if (parts.length > 1) {
                    const [tm, tms] = this.parseTimeString(parts[1], militaryTime);
                    return [new Date(dt.setHours(tm.getHours(), tm.getMinutes())), `${dts} ${tms}`];
                }
                return [dt, dts];
            case 'date':
                return this.parseDateString(dateTimeString);
            case 'time':
                return this.parseTimeString(dateTimeString, militaryTime);
            default:
                return;
        }
    }
    convertTime12to24(time12h) {
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (['PM', pmFormat].includes(modifier)) {
            hours = `${parseInt(hours, 10) + 12}`.padStart(2, '0');
        }
        return `${hours}:${minutes}`;
    }
    isValidDatePart(value, format) {
        const datePart = parseInt(value, 10);
        return ((format.includes('m') && (datePart >= 2 || value.length === 2)) ||
            (format.includes('d') && (datePart >= 4 || value.length === 2)) ||
            (format.includes('y') && datePart >= 1000));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateFormatService, deps: [{ token: NovoLabelService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateFormatService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateFormatService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: NovoLabelService }] });

class GlobalRef {
}
class BrowserGlobalRef extends GlobalRef {
    get nativeGlobal() {
        return window;
    }
    get nativeWindow() {
        return window;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BrowserGlobalRef, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BrowserGlobalRef }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BrowserGlobalRef, decorators: [{
            type: Injectable
        }] });
class NodeGlobalRef extends GlobalRef {
    get nativeGlobal() {
        throw new Error(`global doesn't compile for some reason`);
    }
    get nativeWindow() {
        throw new Error('Node does not have a window object');
    }
}

// App
class OptionsService {
    constructor() { }
    getOptionsConfig(http, field, config) {
        return {
            field: 'value',
            format: '$label',
            options: (query) => {
                return new Promise((resolve, reject) => {
                    if (query && query.length) {
                        const exp = new RegExp('^(?:[a-z]+:)?//', 'i');
                        let endpoint;
                        if (exp.test(field.optionsUrl)) {
                            const url = new URL(field.optionsUrl);
                            url.searchParams.set('filter', query || '');
                            endpoint = url.toString();
                        }
                        else {
                            // Construct relative url (host will not be used but is required for construction)
                            const url = new URL(`http://placeholder.com/${field.optionsUrl}`);
                            url.searchParams.set('filter', query || '');
                            endpoint = `${url.pathname}${url.search}`;
                        }
                        http.get(endpoint).subscribe(resolve, reject);
                    }
                    else {
                        resolve([]);
                    }
                });
            },
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: OptionsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: OptionsService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: OptionsService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });

// NG2
class Security {
    constructor() {
        this.credentials = [];
        this.change = new EventEmitter();
    }
    grant(data) {
        const parsed = [];
        if (data instanceof Array) {
            for (const permission of data) {
                parsed.push(permission.replace(/\s/gi, ''));
            }
        }
        else if (typeof data === 'object') {
            for (const key in data) {
                if (data[key] instanceof Array) {
                    for (const permission of data[key]) {
                        parsed.push(`${key}.${permission}`);
                    }
                }
            }
        }
        this.credentials = [].concat(this.credentials, parsed);
        this.change.emit(this.credentials);
    }
    has(value) {
        return this.credentials.indexOf(value) > -1;
    }
    revoke(value) {
        const i = this.credentials.indexOf(value);
        this.credentials.splice(i, 1);
        this.change.emit(this.credentials);
    }
    clear() {
        this.credentials = [];
        this.change.emit(this.credentials);
    }
    subscribe(fn) {
        this.change.subscribe(fn);
    }
    checkRoutes(routes, options) {
        const filtered = [];
        for (const route of routes) {
            if (route.entities && ~route.entities.indexOf(options.entityType)) {
                if (route.permissions instanceof Function) {
                    if (route.permissions(options, this)) {
                        filtered.push(route);
                    }
                }
                else if (route.permissions && route.permissions.length) {
                    if (route.permissions.every((perm) => this.has(perm))) {
                        filtered.push(route);
                    }
                }
                else {
                    filtered.push(route);
                }
            }
        }
        return filtered;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: Security, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: Security, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: Security, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class LocalStorageService {
    setItem(key, value) {
        localStorage.setItem(key, value);
    }
    getItem(key) {
        return localStorage.getItem(key);
    }
    removeItem(key) {
        localStorage.removeItem(key);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: LocalStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: LocalStorageService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: LocalStorageService, decorators: [{
            type: Injectable
        }] });

// NG2
class NovoTemplateService {
    constructor() {
        this.templates = {
            default: {},
            custom: {},
        };
    }
    getAll() {
        const templates = {};
        const customTemplateTypes = Object.keys(this.templates.custom);
        const defaultTemplateTypes = Object.keys(this.templates.default);
        defaultTemplateTypes.forEach((type) => {
            templates[type] = this.templates.default[type];
        });
        customTemplateTypes.forEach((type) => {
            templates[type] = this.templates.custom[type];
        });
        return templates;
    }
    addDefault(key, template) {
        this.templates.default[key] = template;
    }
    addCustom(key, template) {
        this.templates.custom[key] = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTemplateService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTemplateService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTemplateService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });

/**
 * Generated bundle index. Do not edit.
 */

export { ArrayCollection, BrowserGlobalRef, CollectionEvent, ComponentUtils, DateFormatService, GlobalRef, LocalStorageService, NOVO_ELEMENTS_LABELS_PROVIDERS, NodeGlobalRef, NovoLabelService, NovoTemplateService, OptionsService, PagedArrayCollection, Security };
//# sourceMappingURL=novo-elements-services.mjs.map
