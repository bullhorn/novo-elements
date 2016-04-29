import { Component, EventEmitter, ElementRef } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';

@Component({
    selector: 'novo-select',
    directives: [COMMON_DIRECTIVES],
    inputs: ['items', 'placeholder', 'value'],
    outputs: ['valueChange'],
    template: `
        <button (click)="open($event)" tabIndex="-1" type="button" [ngClass]="{empty: empty}">{{selectedItem.label}}<i class="bhi-collapse"></i></button>
        <ul class="novo-select-list" [class.active]="active" tabIndex="-1">
            <ng-content></ng-content>
            <li *ngFor="#item of items; #i = index" [ngClass]="{active: item.active}" (click)="click(item, i)" [attr.data-automation-value]="item.label">
              <span>{{item.label}}</span>
              <i *ngIf="item.active" class="bhi-check"></i>
            </li>
        </ul>
    `,
    host: {
        '[class.active]': 'active'
    }
})
export class Select extends OutsideClick {
    constructor(element:ElementRef) {
        super(element);

        // Defaults
        this.selectedItemIndex = -1;
        this.selectedItem = {
            label: 'Select...',
            value: null,
            active: false
        };
        this.placeholder = 'Select...';
        this.empty = true;
        this.valueChange = new EventEmitter();
    }

    ngOnInit() {
        this.ngOnChanges();
    }

    ngOnChanges() {
        if (this.items && this.items.length) {
            if (typeof this.items[0] === 'string') {
                this.items = this.items.map((item) => {
                    return { value: item, label: item }; //esfmt-ignore-line
                });
            }
        }

        if (this.value) {
            this.empty = false;
            for (let item of this.items) {
                if (String(item.value) === String(this.value)) {
                    this.selectedItem = item;
                    this.selectedItem.active = true;
                }
            }
        } else {
            this.selectedItem = {
                label: this.placeholder,
                value: null,
                active: false
            };
            this.empty = true;
        }
    }

    open(event) {
        this.toggleActive(event);
        let native = this.element.nativeElement;
        let rect = native.getBoundingClientRect();
        let list = native.querySelector('.novo-select-list')
        list.style.top = `${rect.top}px`;
        list.style.left = `${rect.left}px`;
        //list.style.right = `${rect.right}px`;
    }

    click(item, i) {
        this.selectedItem.active = false;
        this.selectedItemIndex = i;
        this.selectedItem = item;
        this.selectedItem.active = true;
        this.empty = false;
        this.toggleActive();
        this.value = this.selectedItem.value;
        this.valueChange.next(this.value); //esfmt-ignore-line
    }

    // TODO - needs to be reworked - jgodi
    // TODO: Add key listener to jump to items starting with that letter.
    onKeyUp(event) {
        // Close popup on escape key
        if (event.keyCode === KeyCodes.ESC) {
            this.toggleActive();
        }
        // Up or down arrow keys
        if (event.keyCode === KeyCodes.UP || event.keyCode === KeyCodes.DOWN) {
            event.preventDefault();

            if (event.keyCode === KeyCodes.UP && this.selectedItemIndex > 0) {
                this.selectedItemIndex--;
            }
            if (event.keyCode === KeyCodes.DOWN && this.selectedItemIndex < this.numChildItems - 1) {
                this.selectedItemIndex++;
            }
            if (event.keyCode === KeyCodes.ENTER) {
                // selectButton.focus();
                //this.toggleActive();
            }
        }
    }
}

export const NOVO_SELECT_ELEMENTS = [Select];
