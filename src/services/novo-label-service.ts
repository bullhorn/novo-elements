// NG2
import { Injectable } from '@angular/core';
// Vendor
import * as moment from 'moment';

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
    dateFormat = 'MMMM DD, YYYY';
    timeFormat = 'hh:mm a';
    dateTimeFormat = 'MMMM DD, YYYY hh:mm a';
    refresh = 'Refresh';
    close = 'Close';
    move = 'Move';

    selectedRecords(selected) {
        return `Only ${selected} records selected.`;
    }

    totalRecords(total) {
        return `Select all ${total} matching records.`;
    }

    formatDateWithFormat(value, format) {
        return moment(value).format(format);
    }

    getProperty(value) {
        return this[value];
    }
}

export const NOVO_ELEMENTS_LABELS_PROVIDERS = [
    { provide: NovoLabelService, useClass: NovoLabelService }
];
