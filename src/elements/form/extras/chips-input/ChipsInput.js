import { Component } from '@angular/core';
import { COMMON_DIRECTIVES, NgModel } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NOVO_CHIPS_ELEMENTS } from './../../../chips';
import { NOVO_PICKER_ELEMENTS } from './../../../picker';

@Component({
    selector: 'chips-input',
    inputs: [
        'name',
        'placeholder',
        'options',
        'placeholder',
        'required'
    ],
    directives: [
        COMMON_DIRECTIVES,
        NOVO_CHIPS_ELEMENTS,
        NOVO_PICKER_ELEMENTS,
        NgModel
    ],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <chips [source]="options" [ngModel]="tmp" (changed)="onChanged($event)" [placeholder]="placeholder"></chips>
        <i class="bhi-search"></i>
        <input [name]="name" type="hidden" [attr.id]="name" [(ngModel)]="value" autocomplete="off" [ngFormControl]="control"/>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">Required</span>
    `
})
export class ChipsInput extends BaseInput {
    constructor() {
        super();
    }

    onChanged(e) {
        this.value = e.value ? e.value : null;
        this.update.emit(this.value);
    }
}
