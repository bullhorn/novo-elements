import { Component, ElementRef, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES, Control, Validators } from '@angular/common';
import moment from 'moment/moment';

import { NOVO_DATE_PICKER_ELEMENTS } from './../../../datepicker';
import { OutsideClick } from './../../../../utils/outside-click/OutsideClick';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'date-input',
    inputs: ['name', 'placeholder', 'inline', 'required'],
    outputs: ['inputState'],
    properties: ['placeholder', 'inline'],
    directives: [NOVO_DATE_PICKER_ELEMENTS, COMMON_DIRECTIVES],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <input [name]="name" type="text" [attr.id]="name" [placeholder]="placeholder" (focus)="toggleInactive($event)" (blur)="toggleInactive($event)" (click)="toggleActive($event)" [ngModel]="value" [ngFormControl]="control" readonly/>
        <i (click)="toggleActive($event)" class="bhi-calendar"></i>
        <novo-date-picker [inline]="inline" [hidden]="!active" (onSelect)="onSelect($event); toggleInactive($event)"></novo-date-picker>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `
})
export class DateInput extends OutsideClick {
    inactive:Boolean = false;
    validators:Array = [];

    constructor(element:ElementRef, labels:NovoLabelService) {
        super(element);
        this.labels = labels;
        this.inputState = new EventEmitter();
    }

    ngOnInit() {
        if (this.value) {
            this.value = moment(this.value).format('MMMM DD, YYYY');
        }
        if (this.required) {
            this.validators.push(Validators.required);
        }
        this.control = new Control('', Validators.compose(this.validators));

        setTimeout(() => {
            this.toggleInactive(null);
        }, 10);
    }

    onSelect(evt) {
        this.value = moment(evt.date).format('MMMM DD, YYYY');
        this.toggleActive(null, false);
        this.update.emit(evt.date);
    }

    toggleInactive(evt) {
        if (evt) {
            if (evt.type === 'focus' || this.placeholder) this.inactive = false;
            else if (evt.type === 'blur' && evt.target.value.length > 0 || this.placeholder) this.inactive = false;
            else if (evt.date || this.placeholder) this.inactive = false;
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
