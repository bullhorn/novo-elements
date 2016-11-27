// NG2
import { Component, ElementRef, EventEmitter, OnInit, OnDestroy, Input, Output } from '@angular/core';
// APP
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
export class NovoDropdownElement extends OutsideClick implements OnInit, OnDestroy {
    clickHandler:any;

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
    selector: 'list',
    template: `
        <ng-content></ng-content>
    `
})
export class NovoListElement {
}

@Component({
    selector: 'item',
    template: '<ng-content></ng-content>',
    host: {
        '(click)': 'onClick()',
        '[class.disabled]': 'disabled'
    }
})
export class NovoItemElement {
    @Input() disabled:boolean;
    @Input() showAfterSelect:boolean;
    @Output() action:EventEmitter<any> = new EventEmitter();

    constructor(private dropdown:NovoDropdownElement) {
    }

    onClick() {
        if (!this.disabled) {
            if (!this.showAfterSelect) {
                this.dropdown.toggleActive();
            }
            this.action.emit();
        }
    }
}
