import { Component } from '@angular/core';
import { COMMON_DIRECTIVES, NgModel } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NOVO_TILES_ELEMENTS } from './../../../tiles';
import { NOVO_PICKER_ELEMENTS } from './../../../picker';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'tiles-input',
    inputs: [
        'name',
        'placeholder',
        'options',
        'placeholder',
        'required'
    ],
    directives: [
        COMMON_DIRECTIVES,
        NOVO_TILES_ELEMENTS,
        NOVO_PICKER_ELEMENTS,
        NgModel
    ],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <novo-tiles [options]="options" (changed)="onChanged($event)" [value]="value"></novo-tiles>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `
})
export class TilesInput extends BaseInput {
    constructor(labels:NovoLabelService) {
        super();
        this.labels = labels;
    }

    onChanged(e) {
        this.value = e.value ? e.value : null;
        this.update.emit(this.value);
    }
}
