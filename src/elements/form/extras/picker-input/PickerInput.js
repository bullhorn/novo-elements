import { Component, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES, NgModel } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NOVO_PICKER_ELEMENTS } from './../../../picker';
import { NovoLabelService } from './../../../../novo-elements';


@Component({
    selector: 'picker-input',
    inputs: [
        'name',
        'placeholder',
        'options',
        'required'
    ],
    outputs: ['inputState'],
    directives: [COMMON_DIRECTIVES, NOVO_PICKER_ELEMENTS, NgModel],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <novo-picker [config]="options" [(ngModel)]="value" [placeholder]="placeholder" (select)="onSelect($event)" (blur)="toggleInactive($event)" (focus)="toggleInactive($event)"></novo-picker>
        <i class="bhi-search"></i>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `
})
export class PickerInput extends BaseInput {
    inactive:Boolean = false;
    constructor(labels:NovoLabelService) {
        super();
        this.labels = labels;
        this.inputState = new EventEmitter();
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.value && this.value instanceof Object) {
            this.value = this.value.label || this.value.name || this.value.title || this.value.id;
        }
        this.control.updateValue(this.value);
        setTimeout(() => {
            this.toggleInactive(null);
        }, 10);
    }

    onSelect(value) {
        this.update.emit(value);
        this.control.updateValue(value);

        this.toggleInactive(value);
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
