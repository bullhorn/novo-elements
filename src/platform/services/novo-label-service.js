"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var NovoLabelService = (function () {
    function NovoLabelService() {
        this.filters = 'Filter';
        this.clear = 'Clear';
        this.sort = 'Sort';
        this.emptyTableMessage = 'No Records to display...';
        this.noMatchingRecordsMessage = 'No Matching Records';
        this.erroredTableMessage = 'Oops! An error occurred.';
        this.pickerError = 'Oops! An error occurred.';
        this.pickerEmpty = 'No results to display...';
        this.quickNoteError = 'Oops! An error occurred.';
        this.quickNoteEmpty = 'No results to display...';
        this.required = 'Required';
        this.numberTooLarge = 'Number is too large';
        this.save = 'Save';
        this.cancel = 'Cancel';
        this.next = 'Next';
        this.itemsPerPage = 'Items per page:';
        this.select = 'Select...';
        this.selected = 'Selected';
        this.selectAllOnPage = 'Select all on page';
        this.deselectAll = 'Deselect all';
        this.refresh = 'Refresh';
        this.close = 'Close';
        this.move = 'Move';
        this.startDate = 'Start Date';
        this.endDate = 'End Date';
        this.more = 'more';
        this.clearAll = 'CLEAR ALL';
        this.today = 'Today';
        this.now = 'Now';
        this.isRequired = 'is required';
        this.notValidYear = 'is not a valid year';
        this.isTooLarge = 'is too large';
        this.invalidAddress = 'requires at least one field filled out';
        this.invalidEmail = 'requires a valid email (ex. abc@123.com)';
        this.invalidMaxLength = 'Sorry, you have exceeded the maximum character count of for this field';
        this.maxLengthMet = 'Sorry, you have reached the maximum character count of for this field';
        this.minLength = 'is required to be a minimum length of';
        this.past1Day = 'Past 1 Day';
        this.past7Days = 'Past 7 Days';
        this.past30Days = 'Past 30 Days';
        this.past90Days = 'Past 90 Days';
        this.past1Year = 'Past 1 Year';
        this.next1Day = 'Next 1 Day';
        this.next7Days = 'Next 7 Days';
        this.next30Days = 'Next 30 Days';
        this.next90Days = 'Next 90 Days';
        this.next1Year = 'Next 1 Year';
        this.customDateRange = 'Custom Date Range';
        this.backToPresetFilters = 'Back to Preset Filters';
        this.okGotIt = 'Ok, Got it';
        this.address = 'Address';
        this.apt = 'Apt';
        this.city = 'City / Locality';
        this.state = 'State / Region';
        this.zipCode = 'Postal Code';
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
        this.groupedMultiPickerSelectCategory = 'Select a category from the right to get started';
        this.add = 'Add';
        this.encryptedFieldTooltip = 'This data has been stored at the highest level of security';
    }
    NovoLabelService.prototype.getToManyPlusMore = function (toMany) {
        return "+" + toMany.quantity + " more";
    };
    NovoLabelService.prototype.selectedRecords = function (selected) {
        return "Only " + selected + " records selected.";
    };
    NovoLabelService.prototype.totalRecords = function (total) {
        return "Select all " + total + " matching records.";
    };
    NovoLabelService.prototype.formatDateWithFormat = function (value, format) {
        var date = value instanceof Date ? value : new Date(value);
        if (date.getTime() !== date.getTime()) {
            return value;
        }
        return new Intl.DateTimeFormat('en-US', format).format(date);
    };
    NovoLabelService.prototype.getWeekdays = function () {
        function getDay(dayOfWeek) {
            var dt = new Date();
            return dt.setDate(dt.getDate() - dt.getDay() + dayOfWeek);
        }
        ;
        return [getDay(0), getDay(1), getDay(2), getDay(3), getDay(4), getDay(5), getDay(6)]
            .reduce(function (weekdays, dt) {
            weekdays.push(new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dt));
            return weekdays;
        }, []);
    };
    NovoLabelService.prototype.getMonths = function () {
        function getMonth(month) {
            var dt = new Date();
            return dt.setMonth(month, 1);
        }
        ;
        return [getMonth(0), getMonth(1), getMonth(2), getMonth(3), getMonth(4), getMonth(5), getMonth(6),
            getMonth(7), getMonth(8), getMonth(9), getMonth(10), getMonth(11)]
            .reduce(function (months, dt) {
            months.push(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dt));
            return months;
        }, []);
    };
    NovoLabelService.prototype.getProperty = function (value) {
        return this[value];
    };
    NovoLabelService.prototype.getRangeText = function (page, pageSize, length, short) {
        if (length === 0 || pageSize === 0) {
            return "Displaying 0 of " + length;
        }
        length = Math.max(length, 0);
        var startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        var endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return short ? startIndex + 1 + " - " + endIndex + "/" + length : "Displaying " + (startIndex + 1) + " - " + endIndex + " of " + length;
    };
    NovoLabelService.prototype.formatCurrency = function (value) {
        var options = { style: 'currency', currency: 'USD' };
        return new Intl.NumberFormat('en-US', options).format(value);
    };
    NovoLabelService.prototype.formatNumber = function (value, options) {
        return new Intl.NumberFormat('en-US', options).format(value);
    };
    NovoLabelService.prototype.formatDateShort = function (value) {
        var options = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        var _value = value === null || value === undefined || value === '' ? new Date() : new Date(value);
        return new Intl.DateTimeFormat('en-US', options).format(_value);
    };
    return NovoLabelService;
}());
NovoLabelService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
NovoLabelService.ctorParameters = function () { return []; };
exports.NovoLabelService = NovoLabelService;
exports.NOVO_ELEMENTS_LABELS_PROVIDERS = [
    { provide: NovoLabelService, useClass: NovoLabelService }
];
//# sourceMappingURL=novo-label-service.js.map