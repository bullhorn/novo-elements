import { Injectable } from '@angular/core';

@Injectable()
export class NovoLabelService {
    filters = 'Filters';
    clear = 'Clear';
    emptyTableMessage = 'No Matching Records';
    pickerError = 'Oops! An error occurred.';
    pickerEmpty = 'No results to display...';
    quickNoteError = 'Oops! An error occurred.';
    quickNoteEmpty = 'No results to display...';
    required = 'Required';
    numberTooLarge = 'Number is too large';
}

export const NOVO_ELEMENTS_LABELS_PROVIDERS = [
    { provide: NovoLabelService, useClass: NovoLabelService }
];
