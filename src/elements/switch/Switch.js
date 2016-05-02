import { Component, ViewEncapsulation, EventEmitter } from 'angular2/core';

import { KeyCodes } from './../../utils/key-codes/KeyCodes';

@Component({
    selector: 'novo-switch',
    inputs: ['checked', 'disabled'],
    outputs: ['checkedChange'],
    host: {
        'role': 'checkbox',
        '[attr.aria-checked]': 'checked',
        '[attr.aria-disabled]': '_disabled',
        '(keydown)': 'onKeydown($event)'
    },
    directives: [],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div (click)="toggle($event)">
            <div class="novo-switch-container">
                <div class="novo-switch-bar"></div>
                <div class="novo-switch-thumb-container">
                    <div class="novo-switch-thumb"></div>
                </div>
            </div>
            <div class="novo-switch-label"><ng-content></ng-content></div>
        </div>
    `
})
export class NovoSwitch {
    constructor() {
        this.checked = false;
        this._disabled = false;
        this.checkedChange = new EventEmitter();
    }

    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = (!value);
    }

    onKeydown(event) {
        if (event.keyCode === KeyCodes.SPACE) {
            event.preventDefault();
            this.toggle(event);
        }
    }

    toggle(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (this.disabled) {
            return;
        }

        this.checked = !this.checked;
        this.checkedChange.next(this.checked);
    }
}

export const NOVO_SWITCH_ELEMENTS = [NovoSwitch];
