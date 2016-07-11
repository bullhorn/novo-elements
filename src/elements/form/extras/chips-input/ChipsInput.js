import { Component, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES, NgModel } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NOVO_CHIPS_ELEMENTS } from './../../../chips';
import { NOVO_PICKER_ELEMENTS } from './../../../picker';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'chips-input',
    inputs: [
        'name',
        'placeholder',
        'options',
        'placeholder',
        'required'
    ],
    outputs: ['inputState'],
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
        <input [name]="name" type="hidden" [attr.id]="name" (blur)="toggleInactive($event)" (focus)="toggleInactive($event)" [(ngModel)]="value" autocomplete="off" [ngFormControl]="control"/>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `
})
export class ChipsInput extends BaseInput {
    inactive:Boolean = false;
    constructor(labels:NovoLabelService) {
        super();
        this.labels = labels;
        this.inputState = new EventEmitter();
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => {
            this.toggleInactive(null);
        }, 10);
    }

    onChanged(e) {
        this.value = e.value ? e.value : null;
        this.update.emit(this.value);
        this.toggleInactive({ value: e });
    }

    toggleInactive(val) {
        if (val) {
            if (val.type === 'focus' || val.type === 'select' || this.placeholder) this.inactive = false;
            else if (val.type === 'blur' && val.target.value.length > 0 || this.placeholder) this.inactive = false;
            else if (val.value || this.placeholder) this.inactive = false;
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
