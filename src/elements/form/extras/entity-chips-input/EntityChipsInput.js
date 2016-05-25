import { Component } from '@angular/core';
import { COMMON_DIRECTIVES, NgModel } from '@angular/common';

import { BaseInput, EntityPickerResults } from './../FormExtras';
import { NOVO_CHIPS_ELEMENTS } from './../../../chips';
import { NOVO_PICKER_ELEMENTS } from './../../../picker';

@Component({
    selector: 'entity-chips-input',
    inputs: [
        'name',
        'placeholder',
        'options',
        'required'
    ],
    directives: [COMMON_DIRECTIVES, NOVO_CHIPS_ELEMENTS, NOVO_PICKER_ELEMENTS, NgModel],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <chips
            [type]="options.type"
            [source]="options"
            [ngModel]="tmp"
            (changed)="onChanged($event)"
            [placeholder]="placeholder">
        </chips>
        <i class="bhi-search"></i>
        <input [name]="name" type="hidden" [attr.id]="name" [(ngModel)]="value" autocomplete="off" [ngFormControl]="control" />
        <span class="error-message" *ngIf="required && control.touched && !control.valid">Required</span>
    `
})
export class EntityChipsInput extends BaseInput {
    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.ngOnChanges();
    }

    ngOnChanges() {
        this.options = Object.assign(this.options, {
            resultsTemplate: EntityPickerResults
        });
    }

    onChanged(e) {
        this.value = e;
        this.update.emit(this.value);
    }
}
