import { Component } from '@angular/core';
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
    directives: [COMMON_DIRECTIVES, NOVO_QUICK_NOTE_ELEMENTS, NgModel],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <novo-quick-note [config]="options" [(ngModel)]="value" (ngModelChange)="onChanged($event)" [placeholder]="placeholder" [references]="references"></novo-quick-note>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `
})
export class QuickNoteInput extends BaseInput {
    constructor(labels:NovoLabelService) {
        super();
        this.labels = labels;
    }

    ngOnInit() {
        super.ngOnInit();
        this.ngOnChanges();
    }

    ngOnChanges() {
        this.control.updateValue(this.value);
    }

    onChanged(event) {
        this.value = event;
        this.update.emit(this.value);
    }
}
