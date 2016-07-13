import { Component, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'text-input',
    inputs: ['name', 'placeholder', 'required'],
    outputs: ['inputState'],
    directives: [COMMON_DIRECTIVES],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <input [name]="name" type="text" (focus)="toggleInactive($event)" (blur)="toggleInactive($event)" [attr.id]="name" [placeholder]="placeholder" autocomplete="false" [(ngModel)]="value" [ngFormControl]="control"/>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `,
    host: {
        '(change)': 'update.emit(value)'
    }
})
export class TextInput extends BaseInput {
    value:String = '';
    inactive:Boolean = false;
    inputState:EventEmitter = new EventEmitter();

    constructor(labels:NovoLabelService) {
        super();
        this.labels = labels;
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => {
            this.toggleInactive(null);
        }, 10);
    }

    toggleInactive(evt) {
        if (evt) {
            if (evt.type === 'focus' || this.value || this.placeholder) this.inactive = false;
            else if (evt.type === 'blur' && this.value || this.placeholder) this.inactive = false;
            else this.inactive = true;
        } else {
            if (this.value || this.placeholder) this.inactive = false;
            else this.inactive = true;
        }
        this.inputState.emit({
            value: this.inactive
        });
    }
}
