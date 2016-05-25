import { Component } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { BaseInput } from './../FormExtras';

@Component({
    selector: 'radio-input',
    inputs: ['name', 'options', 'required'],
    directives: [COMMON_DIRECTIVES],
    properties: ['for'],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <div class="radio-button-group" *ngFor="let option of _options; let i = index" [ngClass]="{checked: option.checked}">
            <input [hidden]="true" [name]="name" type="radio" [value]="option.value||option" [attr.id]="name+i">
            <label [attr.for]="name+i" (click)="select($event, option)">
                <i [ngClass]="{'bhi-radio-empty': !option.checked, 'bhi-radio-filled': option.checked}"></i>
                <span>{{option.label||option}}</span>
            </label>
        </div>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">Required</span>
    `
})
export class RadioInput extends BaseInput {
    constructor() {
        super();
        this.value = null;
        this._options = [];
    }

    ngOnInit() {
        super.ngOnInit();
        this.control.updateValue(this.value);
        // TODO:20 @bvkimball - Make universal data provider for this
        if (this.options && this.options.length && !this.options[0].value) {
            this._options = this.options.map((x) => {
                return { value: x, label: x, checked: this.value === x };
            });
        } else {
            this._options = this.options.map((x) => {
                x.checked = this.value === x.value;
                return x;
            });
        }
    }

    select(event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        for (let option of this._options) {
            option.checked = false;
        }
        item.checked = !item.checked;

        if (this.update) this.update.emit(item.value);
        if (this.control) this.control.updateValue(item.value);
    }
}
