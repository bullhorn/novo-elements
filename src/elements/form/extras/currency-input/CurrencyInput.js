import { Component, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { FormValidators, BaseInput } from './../FormExtras';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'currency-input',
    inputs: ['name', 'placeholder', 'required', 'currencyFormat'],
    outputs: ['inputState'],
    directives: [COMMON_DIRECTIVES],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <div>
            <input [class.valid-number]="required && control.touched && !control.touched && control?.errors?.maxInteger" [name]="name" type="number" step="0.01" [attr.id]="name" [placeholder]="placeholder" autocomplete="false" (focus)="toggleActive($event)" (blur)="toggleActive($event)" [(ngModel)]="value" [ngFormControl]="control"/>
            <label class="left-label">{{getCurrencyLabel()}}</label>
        </div>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
        <span class="error-message" *ngIf="control.touched && control?.errors?.maxInteger">{{labels.numberTooLarge}}</span>
    `,
    host: {
        '(change)': 'updateValue(value)'
    }
})
export class CurrencyInput extends BaseInput {
    value:String = '';
    inactive:Boolean = false;
    inputState:EventEmitter = new EventEmitter();

    constructor(labels:NovoLabelService) {
        super([FormValidators.maxInteger]);
        this.labels = labels;
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => {
            this.toggleActive(null);
        }, 10);
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

    getCurrencyLabel() {
        let moneySymbol;
        switch (this.currencyFormat) {
            case 'USD':
            case 'CAD':
            case 'AUD':
            case 'HKD':
            case 'NZD':
                moneySymbol = '$';
                break;
            case 'GBP':
                moneySymbol = '£';
                break;
            case 'EUR':
                moneySymbol = '€';
                break;
            case 'JPY':
                moneySymbol = '¥';
                break;
            default:
                moneySymbol = '';
                break;
        }
        return `${moneySymbol} ${this.currencyFormat || ''}`.trim();
    }

    toggleActive(evt) {
        if (evt) {
            if (evt.type === 'focus' || evt.target.value.length > 0 || this.placeholder) this.inactive = false;
            else this.inactive = true;
        } else {
            if (this.value || this.placeholder) this.inactive = false;
            else this.inactive = true;
        }

        this.inputState.emit({
            value: this.inactive
        });
    }
}
