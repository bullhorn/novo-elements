import { Component, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES, NgModel } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NOVO_QUICK_NOTE_ELEMENTS } from './../../../quicknote';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'quick-note-input',
    inputs: [
        'name',
        'placeholder',
        'options',
        'references',
        'required'
    ],
    outputs: ['inputState'],
    directives: [COMMON_DIRECTIVES, NOVO_QUICK_NOTE_ELEMENTS, NgModel],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <novo-quick-note [config]="options" [(ngModel)]="value" (blur)="toggleInactive($event)" (focus)="toggleInactive($event)" (ngModelChange)="onChanged($event)" [placeholder]="placeholder" [references]="references"></novo-quick-note>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `
})
export class QuickNoteInput extends BaseInput {
    inactive:Boolean = false;

    constructor(labels:NovoLabelService) {
        super();
        this.labels = labels;
        this.inputState = new EventEmitter();
    }

    ngOnInit() {
        super.ngOnInit();
        this.ngOnChanges();
        setTimeout(() => {
            this.toggleInactive(null);
        }, 10);
    }

    ngOnChanges() {
        this.control.updateValue(this.value);
    }

    onChanged(event) {
        this.value = event;
        this.update.emit(this.value);
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
