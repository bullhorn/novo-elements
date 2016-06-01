import { Injectable } from '@angular/core';

@Injectable()
export class NovoLabelService {
    get filters() {
        return 'Filters';
    }

    get clear() {
        return 'Clear';
    }

    get emptyTableMessage() {
        return 'No Matching Records';
    }

    get pickerError() {
        return 'Oops! An error occurred.';
    }

    get pickerEmpty() {
        return 'No results to display...';
    }

    get quickNoteError() {
        return this.pickerError;
    }

    get quickNoteEmpty() {
        return this.pickerEmpty;
    }

    get required() {
        return 'Required';
    }

    get numberTooLarge() {
        return 'Number is too large';
    }
}

export const NOVO_ELEMENTS_LABELS_PROVIDERS = [
    { provide: NovoLabelService, useClass: NovoLabelService }
];
