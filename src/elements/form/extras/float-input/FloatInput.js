import { Component, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { FormValidators, BaseInput } from './../FormExtras';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'float-input',
    inputs: ['name', 'placeholder', 'required'],
    outputs: ['inputState'],
    directives: [COMMON_DIRECTIVES],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <input [class.valid-number]="required && control.touched && !control.touched && control?.errors?.maxDouble" (focus)="toggleInactive($event)" (blur)="toggleInactive($event)" [name]="name" type="number" step="0.01" [attr.id]="name" [placeholder]="placeholder" autocomplete="false" [(ngModel)]="value" [ngFormControl]="control"/>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
        <span class="error-message" *ngIf="control.touched && control?.errors?.maxDouble">{{labels.numberTooLarge}}</span>
    `,
    host: {
        '(change)': 'updateValue(value)'
    }
})
export class FloatInput extends BaseInput {
    value:String = '';
    inactive:Boolean = false;
    inputState:EventEmitter = new EventEmitter();

    constructor(labels:NovoLabelService) {
        super([FormValidators.maxDouble]);
        this.labels = labels;
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => {
            this.toggleInactive(null);
        }, 10);
    }

    updateValue(value) {
        const CONTROL_ERRORS = this.control.errors || {};

        // If we have control errors, set the value to undefined
        if (CONTROL_ERRORS.maxDouble) {
            // Emit undefined to signal to delete the key
            this.update.emit(undefined);
        } else {
            this.update.emit(value);
        }
        this.toggleInactive();
    }

    toggleInactive(evt) {
        if (evt) {
            if (evt.type === 'focus' || this.value || this.placeholder) this.inactive = false;
            else if (evt.type === 'blur' && this.value) this.inactive = false;
            else this.inactive = true;
        } else {
            if (this.value >= 0.01 || this.placeholder) this.inactive = false;
            else this.inactive = true;
        }
        this.inputState.emit({
            value: this.inactive
        });
    }
}
