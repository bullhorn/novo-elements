import { Component, ElementRef, EventEmitter } from '@angular/core';
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
        this.clickHandler = this.toggleActive.bind(this);
    }

    ngOnInit() {
        let button = this.element.nativeElement.querySelector('button');
        button.addEventListener('click', this.clickHandler);
    }

    ngOnDestroy() {
        let button = this.element.nativeElement.querySelector('button');
        button.removeEventListener('click', this.clickHandler);
    }

    onKeyDown(event) {
        if (this.active && (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.ENTER)) {
            this.toggleActive();
        }
    }
}

@Component({
    selector: 'item',
    inputs: ['disabled', 'showAfterSelect'],
    outputs: ['action'],
    template: '<ng-content></ng-content>',
    host: {
        '(click)': 'onClick()',
        '[class.disabled]': 'disabled'
    }
})
export class Item {
    action = new EventEmitter();

    constructor(dropdown:Dropdown) {
        this.dropdown = dropdown;
    }

    onClick() {
        if (!this.disabled) {
            if (!this.showAfterSelect) this.dropdown.toggleActive();
            this.action.emit();
        }
    }
}


export const NOVO_DROPDOWN_ELEMENTS = [Dropdown, Item];
