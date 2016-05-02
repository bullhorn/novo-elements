import { Component, ElementRef } from 'angular2/core';
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';

@Component({
    selector: 'novo-dropdown',
    template: `
        <ng-content select="button"></ng-content>
        <div class="dropdown-container">
            <ng-content></ng-content>
        </div>
    `,
    host: {
        '(keydown)': 'onKeyDown($event)',
        '[class.active]': 'active'
    }
})
export class Dropdown extends OutsideClick {
    constructor(element:ElementRef) {
        super(element);
    }

    ngOnInit() {
        let button = this.element.nativeElement.querySelector('button');
        button.addEventListener('click', this.toggleActive.bind(this));
    }

    onKeyDown(event) {
        if (this.active && (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.ENTER)) {
            this.toggleActive();
        }
    }
}

export const NOVO_DROPDOWN_ELEMENTS = [Dropdown];
