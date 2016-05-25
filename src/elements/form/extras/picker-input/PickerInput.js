import { Component } from '@angular/core';
import { COMMON_DIRECTIVES, NgModel } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NOVO_PICKER_ELEMENTS } from './../../../picker';


@Component({
    selector: 'picker-input',
    inputs: [
        'name',
        'placeholder',
        'options',
        'required'
    ],
    directives: [COMMON_DIRECTIVES, NOVO_PICKER_ELEMENTS, NgModel],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <novo-picker [config]="options" [(ngModel)]="value" [placeholder]="placeholder" (select)="onSelect($event)"></novo-picker>
        <i class="bhi-search"></i>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">Required</span>
    `
})
export class PickerInput extends BaseInput {
    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.value && this.value instanceof Object) {
            this.value = this.value.label || this.value.name || this.value.title || this.value.id;
        }
        this.control.updateValue(this.value);
    }

    onSelect(value) {
        this.update.emit(value);
        this.control.updateValue(value);
    }
}
