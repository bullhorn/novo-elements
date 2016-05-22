import { Component } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { FormValidators, BaseInput } from './../FormExtras';

@Component({
    selector: 'number-input',
    inputs: ['name', 'placeholder', 'required'],
    directives: [COMMON_DIRECTIVES],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <input [class.valid-number]="required && control.touched && !control.touched && control?.errors?.maxInteger" [name]="name" type="number" step="1" min="0" [attr.id]="name" [placeholder]="placeholder" autocomplete="false" [(ngModel)]="value" [ngFormControl]="control"/>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">Required</span>
        <span class="error-message" *ngIf="control.touched && control?.errors?.maxInteger">Number is too large</span>
    `,
    host: {
        '(change)': 'updateValue(value)'
    }
})
export class NumberInput extends BaseInput {
    constructor() {
        super([FormValidators.maxInteger]);
        this.value = '';
    }

    updateValue(value) {
        const CONTROL_ERRORS = this.control.errors || {};

        // If we have control errors, set the value to undefined
        if (CONTROL_ERRORS.maxInteger) {
            // Emit undefined to signal to delete the key
            this.update.emit(undefined);
        } else {
            this.update.emit(value);
        }
    }
}
