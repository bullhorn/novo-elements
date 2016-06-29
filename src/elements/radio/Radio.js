import { Component, EventEmitter } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { swallowEvent } from './../../utils/Helpers';

@Component({
    selector: 'novo-radio',
    inputs: ['name', 'value', 'checked', 'vertical'],
    outputs: ['change'],
    host: {
        '[class.vertical]': 'vertical'
    },
    template: `
            <input [name]="name" type="radio" [checked]="checked" [attr.id]="name" #radio>
            <label [attr.for]="name" (click)="select($event, radio)">
                <i [ngClass]="{'bhi-radio-empty': !radio.checked, 'bhi-radio-filled': radio.checked}"></i>
                <ng-content></ng-content>
            </label>
    `,
    directives: [CORE_DIRECTIVES]
})
export class Radio {
    change:EventEmitter = new EventEmitter();

    select(event, radio) {
        swallowEvent(event);
        radio.checked = !radio.checked;
        this.change.emit(this.value);
    }
}

export const NOVO_RADIO_ELEMENTS = [Radio];
