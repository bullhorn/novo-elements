import { Component } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NOVO_SELECT_ELEMENTS } from './../../../select';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'select-input',
    inputs: ['name', 'options', 'required'],
    directives: [COMMON_DIRECTIVES, NOVO_SELECT_ELEMENTS],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <novo-select [options]="options" [placeholder]="placeholder" [(ngModel)]="value" (onSelect)="select($event)" [class.error]="control.touched && !control.valid"></novo-select>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `
})
export class SelectInput extends BaseInput {
    constructor(labels:NovoLabelService) {
        super();
        this.labels = labels;
        this.value = null;
    }

    ngOnInit() {
        super.ngOnInit();
        this.control.updateValue(this.value);
    }

    select(val) {
        this.update.emit(val.selected);
        this.control.updateValue(val.selected);
    }
}
