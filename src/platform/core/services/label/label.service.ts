// NG2
import { Injectable, ClassProvider } from '@angular/core';

@Injectable()
export class NovoLabelService {
    public filters: string = 'Filter';
    public clear: string = 'Clear';
    public sort: string = 'Sort';
    public emptyTableMessage: string = 'No Records to display...';
    public noMatchingRecordsMessage: string = 'No Matching Records';
    public erroredTableMessage: string = 'Oops! An error occurred.';
    public pickerError: string = 'Oops! An error occurred.';
    public pickerEmpty: string = 'No results to display...';
    public quickNoteError: string = 'Oops! An error occurred.';
    public quickNoteEmpty: string = 'No results to display...';
    public required: string = 'Required';
    public numberTooLarge: string = 'Number is too large';
    public save: string = 'Save';
    public cancel: string = 'Cancel';
    public next: string = 'Next';
    public previous: string = 'Previous';
    public itemsPerPage: string = 'Items per page:';
    public select: string = 'Select...';
    public selected: string = 'Selected';
    public selectAllOnPage: string = 'Select all on page';
    public deselectAll: string = 'Deselect all';
    public refresh: string = 'Refresh';
    public close: string = 'Close';
    public move: string = 'Move';
    public startDate: string = 'Start Date';
    public endDate: string = 'End Date';
    public more: string = 'more';
    public clearAll: string = 'CLEAR ALL';
    public today: string = 'Today';
    public now: string = 'Now';
    public isRequired: string = 'is required';
    public notValidYear: string = 'is not a valid year';
    public isTooLarge: string = 'is too large';
    public invalidAddress: string = 'requires at least one field filled out';
    public invalidEmail: string = 'requires a valid email (ex. abc@123.com)';
    public invalidMaxLength: string = 'Sorry, you have exceeded the maximum character count of for this field';
    public maxLengthMet: string = 'Sorry, you have reached the maximum character count of for this field';
    public minLength: string = 'is required to be a minimum length of';
    public past1Day: string = 'Past 1 Day';
    public past7Days: string = 'Past 7 Days';
    public past30Days: string = 'Past 30 Days';
    public past90Days: string = 'Past 90 Days';
    public past1Year: string = 'Past 1 Year';
    public next1Day: string = 'Next 1 Day';
    public next7Days: string = 'Next 7 Days';
    public next30Days: string = 'Next 30 Days';
    public next90Days: string = 'Next 90 Days';
    public next1Year: string = 'Next 1 Year';
    public customDateRange: string = 'Custom Date Range';
    public backToPresetFilters: string = 'Back to Preset Filters';
    public okGotIt: string = 'Ok, Got it';
    public address: string = 'Address';
    public apt: string = 'Apt';
    public city: string = 'City / Locality';
    public state: string = 'State / Region';
    public zipCode: string = 'Postal Code';
    public country: string = 'Country';
    public or: string = 'or';
    public clickToBrowse: string = 'click to browse';
    public chooseAFile: string = 'Choose a file';
    public no: string = 'No';
    public yes: string = 'Yes';
    public search: string = 'SEARCH';
    public noItems: string = 'There are no items';
    public dateFormat: string = 'MM/dd/yyyy';
    public dateFormatPlaceholder: string = 'MM/DD/YYYY';
    public timeFormatPlaceholderAM: string = 'hh:mm AM';
    public timeFormatPlaceholder24Hour: string = 'HH:mm';
    public timeFormatAM: string = 'AM';
    public timeFormatPM: string = 'PM';
    public confirmChangesModalMessage: string = 'Are you sure you want to change this field?';
    public asyncFailure: string = 'Async validation was not called within the 10s threshold, you might want to reload the page to try again';

    public selectedRecords(selected: number): string {
        return `Only ${selected} records selected.`;
    }

    public totalRecords(total: number): string {
        return `Select all ${total} matching records.`;
    }

    public formatDateWithFormat(value: any, format: Intl.DateTimeFormatOptions): string {
        let date: Date = value instanceof Date ? value : new Date(value);
        if (date.getTime() !== date.getTime()) {
            return value;
        }
        return new Intl.DateTimeFormat('en-US', format).format(date);
    }

    public getWeekdays(): string[] {
        function getDay(dayOfWeek: number): number {
            let dt: Date = new Date();
            return dt.setDate(dt.getDate() - dt.getDay() + dayOfWeek);
        }

        return [getDay(0), getDay(1), getDay(2), getDay(3), getDay(4), getDay(5), getDay(6)]
            .reduce((weekdays: string[], dt: number) => {
                weekdays.push(new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dt));
                return weekdays;
            }, []);
    }

    public getMonths(): string[] {
        function getMonth(month: number): number {
            let dt: Date = new Date();
            return dt.setMonth(month, 1);
        }

        return [getMonth(0), getMonth(1), getMonth(2), getMonth(3), getMonth(4), getMonth(5), getMonth(6),
        getMonth(7), getMonth(8), getMonth(9), getMonth(10), getMonth(11)]
            .reduce((months: string[], dt: number) => {
                months.push(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dt));
                return months;
            }, []);
    }

    public getProperty(value: string): string {
        return this[value];
    }

    public getToManyPlusMore(toMany: { quantity: number }): string {
        return `+${toMany.quantity} more`;
    }

    public formatCurrency(value: number): string {
        let options: any = { style: 'currency', currency: 'USD' };
        return new Intl.NumberFormat('en-US', options).format(value);
    }

    public formatNumber(value: any, options: Intl.NumberFormatOptions): string { // TODO use interface for options
        return new Intl.NumberFormat('en-US', options).format(value);
    }

    public formatDateShort(value: any): string {
        let options: Intl.DateTimeFormatOptions = { // DD/MM/YYYY, HH:MM A - 02/14/2017, 1:17 PM
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        };
        let _value: Date = value === null || value === undefined || value === '' ? new Date() : new Date(value);
        return new Intl.DateTimeFormat('en-US', options).format(_value);
    }

    public formatDateTime(value: any): string {
        let options: Intl.DateTimeFormatOptions = { // DD/MM/YYYY, HH:MM A - 02/14/2017, 1:17 PM
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        let _value: Date = value === null || value === undefined || value === '' ? new Date() : new Date(value);
        return new Intl.DateTimeFormat('en-US', options).format(_value);
    }
}

export const NOVO_ELEMENTS_LABELS_PROVIDERS: ClassProvider[] = [
    { provide: NovoLabelService, useClass: NovoLabelService },
];
