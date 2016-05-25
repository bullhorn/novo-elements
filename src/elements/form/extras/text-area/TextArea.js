import { Component } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { BaseInput } from './../FormExtras';

@Component({
    selector: 'text-area',
    inputs: ['name', 'placeholder', 'required'],
    directives: [COMMON_DIRECTIVES],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <textarea [name]="name" [attr.id]="name" [placeholder]="placeholder" [(ngModel)]="value" [ngFormControl]="control" (input)="onInput($event)"></textarea>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">Required</span>
    `,
    host: {
        '(change)': 'update.emit(value)'
    }
})
export class TextArea extends BaseInput {
    constructor() {
        super();
        this.value = '';
    }

    onInput(event) {
        // Reset the height
        event.target.style.height = '';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }
}
