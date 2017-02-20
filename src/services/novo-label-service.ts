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

    selectedRecords(selected: number) {
        return `Only ${selected} records selected.`;
    }

    totalRecords(total: number) {
        return `Select all ${total} matching records.`;
    }

    formatDateWithFormat(value: any, format: Intl.DateTimeFormatOptions) {
        if (value === 'Invalid Date') {
            return '';
        }
        return new Intl.DateTimeFormat('en-US', format).format(new Date(value));
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
