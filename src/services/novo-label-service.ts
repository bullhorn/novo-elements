// NG2
import { Injectable } from '@angular/core';

@Injectable()
export class NovoLabelService {
    filters = 'Filter';
    clear = 'Clear';
    emptyTableMessage = 'No Records to display...';
    noMatchingRecordsMessage = 'No Matching Records';
    erroredTableMessage = 'Oops! An error occurred.';
    pickerError = 'Oops! An error occurred.';
    pickerEmpty = 'No results to display...';
    quickNoteError = 'Oops! An error occurred.';
    quickNoteEmpty = 'No results to display...';
    required = 'Required';
    numberTooLarge = 'Number is too large';
    save = 'Save';
    cancel = 'Cancel';
    next = 'Next';
    itemsPerPage = 'Items per page:';
    select = 'Select...';
    selected = 'Selected';
    selectAllOnPage = 'Select all on page';
    deselectAll = 'Deselect all';
    refresh = 'Refresh';
    close = 'Close';
    move = 'Move';
    startDate = 'Start Date';
    endDate = 'End Date';
    more = 'more';
    clearAll = 'CLEAR ALL';
    today = 'Today';
    now = 'Now';
    isRequired = 'is required';
    notValidYear = 'is not a valid year';
    isTooLarge = 'is too large';
    invalidAddress = 'requires at least one field filled out';
    invalidEmail = 'requires a valid email (ex. abc@123.com)';
    invalidMaxLength = 'Sorry, you have exceeded the maximum character count of for this field';
    maxLengthMet = 'Sorry, you have reached the maximum character count of for this field';
    minLength = 'is required to be a minimum length of';
    past1Day = 'Past 1 Day';
    past7Days = 'Past 7 Days';
    past30Days = 'Past 30 Days';
    past90Days = 'Past 90 Days';
    past1Year = 'Past 1 Year';
    next1Day = 'Next 1 Day';
    next7Days = 'Next 7 Days';
    next30Days = 'Next 30 Days';
    next90Days = 'Next 90 Days';
    next1Year = 'Next 1 Year';
    customDateRange = 'Custom Date Range';
    backToPresetFilters = 'Back to Preset Filters';
    okGotIt = 'Ok, Got it';
    address = 'Address';
    apt = 'Apt';
    city = 'City / Locality';
    state = 'State / Region';
    zipCode = 'Postal Code';
    country = 'Country';
    or = 'or';
    clickToBrowse = 'click to browse';
    chooseAFile = 'Choose a file';
    no = 'No';
    yes = 'Yes';
    search = 'SEARCH';
    noItems = 'There are no items';

    selectedRecords(selected: number) {
        return `Only ${selected} records selected.`;
    }

    totalRecords(total: number) {
        return `Select all ${total} matching records.`;
    }

    formatDateWithFormat(value: any, format: Intl.DateTimeFormatOptions) {
        let date = value instanceof Date ? value : new Date(value);
        if (date.getTime() !== date.getTime()) {
            return value;
        }
        return new Intl.DateTimeFormat('en-US', format).format(date);
    }

    getWeekdays(): string[] {
        function getDay(dayOfWeek) {
            let dt = new Date();
            return dt.setDate(dt.getDate() - dt.getDay() + dayOfWeek);
        };

        return [getDay(0), getDay(1), getDay(2), getDay(3), getDay(4), getDay(5), getDay(6)]
            .reduce((weekdays, dt) => {
                weekdays.push(new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dt));
                return weekdays;
            }, []);
    }

    getMonths(): string[] {
        function getMonth(month) {
            let dt = new Date();
            return dt.setMonth(month);
        };

        return [getMonth(0), getMonth(1), getMonth(2), getMonth(3), getMonth(4), getMonth(5), getMonth(6),
        getMonth(7), getMonth(8), getMonth(9), getMonth(10), getMonth(11)]
            .reduce((months, dt) => {
                months.push(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dt));
                return months;
            }, []);
    }

    getProperty(value: string) {
        return this[value];
    }
}

export const NOVO_ELEMENTS_LABELS_PROVIDERS = [
    { provide: NovoLabelService, useClass: NovoLabelService }
];
