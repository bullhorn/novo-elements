import { Component } from '@angular/core';
import { COMMON_DIRECTIVES, Control } from '@angular/common';

@Component({
    selector: 'hidden-input',
    inputs: ['name', 'placeholder', 'required'],
    directives: [COMMON_DIRECTIVES],
    template: `
        <input [name]="name" type="hidden" [attr.id]="name" [(ngModel)]="value" [ngFormControl]="control"/>
    `
})
export class HiddenInput {
    constructor() {
        this.value = '';
        this.control = new Control('');
    }

    ngOnInit() {
        this.update.emit(this.value);
    }
}
