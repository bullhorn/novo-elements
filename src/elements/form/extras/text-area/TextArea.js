import { Component, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'text-area',
    inputs: ['name', 'placeholder', 'required'],
    outputs: ['inputState'],
    directives: [COMMON_DIRECTIVES],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <textarea [name]="name" [attr.id]="name" (focus)="toggleActive($event)" (blur)="toggleActive($event)" [placeholder]="placeholder" [(ngModel)]="value" [ngFormControl]="control" (input)="onInput($event)"></textarea>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `,
    host: {
        '(change)': 'update.emit(value)'
    }
})
export class TextArea extends BaseInput {
    value:String = '';
    inactive:Boolean = false;
    constructor(labels:NovoLabelService) {
        super();
        this.labels = labels;
        this.inputState = new EventEmitter();
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => {
            this.toggleActive(null);
        }, 10);
    }

    onInput(event) {
        // Reset the height
        event.target.style.height = '';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    toggleActive(evt) {
        if (evt) {
            if (evt.type === 'focus' || this.placeholder) this.inactive = false;
            else if (evt.type === 'blur' && evt.target.value.length > 0 || this.placeholder) this.inactive = false;
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
