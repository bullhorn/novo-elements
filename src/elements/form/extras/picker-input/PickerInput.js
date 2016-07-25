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
    inputState:EventEmitter = new EventEmitter();

    constructor(labels:NovoLabelService) {
        super();
        this.labels = labels;
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

    toggleInactive(ev) {
        setTimeout(() => {
            if (ev) {
                if (ev.type === 'focus' || this.value || this.placeholder) this.inactive = false;
                else this.inactive = true;
            } else {
                if (this.value || this.placeholder) this.inactive = false;
                else this.inactive = true;
            }

            this.inputState.emit({
                value: this.inactive
            });
        });
    }
}
