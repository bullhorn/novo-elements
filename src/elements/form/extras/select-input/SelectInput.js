import { Component, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NOVO_SELECT_ELEMENTS } from './../../../select';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'select-input',
    inputs: ['name', 'options', 'required', 'headerConfig'],
    outputs: ['inputState'],
    directives: [COMMON_DIRECTIVES, NOVO_SELECT_ELEMENTS],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <novo-select [(options)]="options" [headerConfig]="headerConfig" [placeholder]="placeholder" [(ngModel)]="value" (onSelect)="select($event)" (click)="toggleInactive($event)" [class.error]="control.touched && !control.valid"></novo-select>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `
})
export class SelectInput extends BaseInput {
    inactive:Boolean = false;

    constructor(labels:NovoLabelService) {
        super();
        this.labels = labels;
        this.value = null;
        this.inputState = new EventEmitter();
    }

    ngOnInit() {
        super.ngOnInit();
        this.control.updateValue(this.value);

        setTimeout(() => {
            this.toggleInactive(null);
        }, 10);
    }

    select(val) {
        this.update.emit(val.selected);
        this.control.updateValue(val.selected);

        this.toggleInactive(val);
    }

    toggleInactive(val) {
        if (val) {
            if (val.type === 'click') this.inactive = false;
            else if (val.selected || this.placeholder) this.inactive = false;
            else this.inactive = true;
        } else {
            if (this.placeholder) this.inactive = false;
            else this.inactive = true;
        }

        this.inputState.emit({
            value: this.inactive
        });
    }
}
