import { Component, ElementRef } from '@angular/core';
import { COMMON_DIRECTIVES, Control, Validators, NgModel } from '@angular/common';
import moment from 'moment/moment';

import { NOVO_DATE_PICKER_ELEMENTS } from './../../../datepicker';
import { NOVO_TIME_PICKER_ELEMENTS } from './../../../timepicker';
import { OutsideClick } from './../../../../utils/outside-click/OutsideClick';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'date-time-input',
    inputs: [
        'name',
        'placeholder',
        'inline',
        'required'
    ],
    directives: [NOVO_DATE_PICKER_ELEMENTS, NOVO_TIME_PICKER_ELEMENTS, COMMON_DIRECTIVES, NgModel],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <input [name]="name" type="text" [attr.id]="name" [placeholder]="placeholder" (click)="toggleActive($event)" [ngModel]="value" [ngFormControl]="control" readonly/>
        <i (click)="toggleActive($event)" class="bhi-calendar"></i>
        <div class="datetime-container">
            <novo-date-picker [hidden]="!active" (onSelect)="onChangeDatePart($event)" [inline]="inline"></novo-date-picker>
            <novo-time-picker [hidden]="!active" (onSelect)="onChangeTimePart($event)" [inline]="inline"></novo-time-picker>
        </div>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `
})
export class DateTimeInput extends OutsideClick {
    constructor(element:ElementRef, labels:NovoLabelService) {
        super(element);
        this.validators = [];
        this.labels = labels;
        this.date = null;
    }

    // TODO - rethink this
    ngOnInit() {
        if (this.value) {
            this.value = moment(this.value).format('MMMM DD, YYYY hh:mm a');
        }
        if (this.required) {
            this.validators.push(Validators.required);
        }
        this.control = new Control('', Validators.compose(this.validators));
    }

    onChangeDatePart(evt) {
        if (!this.date) this.date = new Date();
        this.date.setFullYear(evt.year, evt.month, evt.day);
        this.value = moment(this.date).format('MMMM DD, YYYY hh:mm a');
        this.update.emit(this.date);
    }

    onChangeTimePart(evt) {
        if (!this.date) this.date = new Date();
        this.date.setHours(evt.hours, evt.minutes, 0);
        this.value = moment(this.date).format('MMMM DD, YYYY hh:mm a');
        this.update.emit(this.date);
    }
}
