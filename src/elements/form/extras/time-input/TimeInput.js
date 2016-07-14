import { Component, ElementRef, EventEmitter } from '@angular/core';
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
    outputs: ['inputState'],
    directives: [NOVO_TIME_PICKER_ELEMENTS, COMMON_DIRECTIVES, NgModel],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <input [name]="name" type="text" [attr.id]="name" [placeholder]="placeholder" (focus)="toggleInactive($event)" (blur)="toggleInactive($event)" (click)="toggleActive($event)" [ngModel]="value" [ngFormControl]="control" readonly/>
        <i (click)="toggleActive($event)" class="bhi-clock"></i>
        <novo-time-picker [hidden]="!active" (onSelect)="onSelect($event); toggleInactive($event)" [inline]="inline"></novo-time-picker>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `
})
export class TimeInput extends OutsideClick {
    inactive:Boolean = false;
    validators:Array = [];
    inputState:EventEmitter = new EventEmitter();

    constructor(element:ElementRef, labels:NovoLabelService) {
        super(element);
        this.labels = labels;
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

        setTimeout(() => {
            this.toggleInactive(null);
        }, 10);
    }

    onSelect(evt) {
        this.value = moment(evt.date).format('hh:mm a');
        this.toggleActive(null, false);
        this.update.emit(evt.date);
    }

    toggleInactive(evt) {
        setTimeout(() => {
            if (evt) {
                if (evt.type === 'focus' || evt.date || this.placeholder) this.inactive = false;
                else if (evt.type === 'blur' && this.value) this.inactive = false;
                else if (evt.date && this.value) this.inactive = false;
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
