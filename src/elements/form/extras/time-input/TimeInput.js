import { Component, ElementRef } from '@angular/core';
import { COMMON_DIRECTIVES, NgModel, Control, Validators } from '@angular/common';
import moment from 'moment/moment';

import { NOVO_TIME_PICKER_ELEMENTS } from './../../../timepicker';
import { OutsideClick } from './../../../../utils/outside-click/OutsideClick';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'time-input',
    inputs: [
        'name',
        'placeholder',
        'inline',
        'required'
    ],
    directives: [NOVO_TIME_PICKER_ELEMENTS, COMMON_DIRECTIVES, NgModel],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <input [name]="name" type="text" [attr.id]="name" [placeholder]="placeholder" (click)="toggleActive($event)" [ngModel]="value" [ngFormControl]="control" readonly/>
        <i class="bhi-clock"></i>
        <novo-time-picker [hidden]="!active" (onSelect)="onSelect($event)" [inline]="inline"></novo-time-picker>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `
})
export class TimeInput extends OutsideClick {
    constructor(element:ElementRef, labels:NovoLabelService) {
        super(element);
        this.labels = labels;
        this.validators = [];
    }

    // TODO - rethink this
    ngOnInit() {
        if (this.value) {
            this.value = moment(this.value).format('hh:mm a');
        }
        if (this.required) {
            this.validators.push(Validators.required);
        }
        this.control = new Control('', Validators.compose(this.validators));
    }

    onSelect(evt) {
        this.value = moment(evt.date).format('hh:mm a');
        this.toggleActive(null, false);
        this.update.emit(evt.date);
    }
}
