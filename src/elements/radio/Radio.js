import { Component, EventEmitter } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { swallowEvent } from './../../utils/Helpers';

@Component({
    selector: 'novo-radio',
    inputs: ['name', 'value', 'checked', 'vertical', 'label'],
    outputs: ['change'],
    host: {
        '[class.vertical]': 'vertical'
    },
    template: `
            <input [name]="name" type="radio" [checked]="checked" [attr.id]="name" #radio>
            <label [attr.for]="name" (click)="select($event, radio)">
                <i [ngClass]="{'bhi-radio-empty': !radio.checked, 'bhi-radio-filled': radio.checked}"></i>
                {{label}}
                <ng-content></ng-content>
            </label>
    `,
    directives: [CORE_DIRECTIVES]
})
export class Radio {
    // Emitter for when the value changes
    change:EventEmitter = new EventEmitter();

    /**
     * Handles the select of the radio button, will only change if a new radio is selected
     * @param event
     * @param radio
     */
    select(event, radio) {
        swallowEvent(event);
        // Only change the checked state if this is a new radio, they are not toggle buttons
        if (!radio.checked) {
            radio.checked = !radio.checked;
            this.change.emit(this.value);
        }
    }
}

export const NOVO_RADIO_ELEMENTS = [Radio];
