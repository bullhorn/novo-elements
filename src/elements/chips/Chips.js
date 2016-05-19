import { Component, EventEmitter, ElementRef, Optional } from '@angular/core'; // eslint-disable-line
import { COMMON_DIRECTIVES, NgModel } from '@angular/common';
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';
import { NOVO_PICKER_ELEMENTS } from '../picker/Picker';

@Component({
    selector: 'chip',
    directives: [COMMON_DIRECTIVES],
    inputs: [
        'type'
    ],
    outputs: [
        'select',
        'remove'
    ],
    template: `
        <span (click)="onSelect($event)" [ngClass]="type">
            <i *ngIf="type" class="bhi-circle"></i>
            <ng-content></ng-content>
        </span>
        <i class="bhi-close" (click)="onRemove($event)"></i>
  `
})
export class Chip {
    select: EventEmitter = new EventEmitter();
    remove: EventEmitter = new EventEmitter();
    onChange = null;
    onTouched = null;
    entity: string;

    onRemove(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.remove.emit();
        return false;
    }

    onSelect(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.select.emit();
        return false;
    }
}

@Component({
    selector: 'chips',
    inputs: [
        'source',
        'placeholder',
        'value',
        'type'
    ],
    outputs: [
        'changed'
    ],
    directives: [
        COMMON_DIRECTIVES,
        NOVO_PICKER_ELEMENTS,
        Chip,
        NgModel
    ],
    template: `
        <chip
            *ngFor="let item of items"
            [type]="type"
            [class.selected]="item == selected"
            (remove)="remove($event, item)"
            (select)="select($event, item)">
            {{ item[field] }}
        </chip>
        <div class="chip-input-container">
            <input
                [(ngModel)]="valueToAdd"
                [placeholder]="placeholder"
                [(picker)]="source"
                (select)="add($event)"
                (keydown)="onKeyDown($event)"
                (focus)="toggleClass('focus')"
                (blur)="toggleClass('blur')"
                autocomplete="off" />
        </div>
  `
})
export class Chips extends OutsideClick {
    changed: EventEmitter = new EventEmitter();
    items: Array = [];
    value: any = null;
    selected: any = null;
    placeholder: string = '';

    constructor(@Optional() model: NgModel, element: ElementRef) {
        super(element);
        this.element = element;
        this.model = model || new NgModel();
        this.model.valueAccessor = this;
    }

    ngOnInit() {
        this.field = this.source.field || 'label';
        this.process();
        window.document.addEventListener('keydown', this.outsideKeyDown.bind(this));
    }

    process() {
        if (this.model.value && typeof this.model.value === 'string') {
            this.items = this.model.value.split(';').map(i => {
                let obj = {};
                obj[this.field] = i;
                return obj;
            });
        }
        this.writeValue(this.items);
    }

    deselectAll() {
        this.selected = null;
    }

    select(event, item) {
        this.deselectAll();
        this.selected = item;
    }

    toggleClass(focusState) {
        if (focusState === 'focus') {
            this.deselectAll();
            this.element.nativeElement.classList.add('selected');
        } else if (focusState === 'blur') {
            this.element.nativeElement.classList.remove('selected');
        }
    }

    add(event) {
        if (event) {
            this.items.push(event);
            this.valueToAdd = null;
            this.model.viewToModelUpdate(this.items);
            this.changed.emit({
                value: this.items
            });
        }
    }

    remove(event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.items.splice(this.items.indexOf(item), 1);
        this.deselectAll();
        this.model.viewToModelUpdate(this.items);
        this.changed.emit({
            value: this.items
        });
    }

    onKeyDown(event) {
        if (event.keyCode === KeyCodes.BACKSPACE) {
            if (event.target && event.target.value.length === 0 && this.items.length) {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if (this.selected) {
                    this.remove(event, this.selected);
                } else {
                    this.select(event, this.items[this.items.length - 1]);
                }
            }
        }
    }

    outsideKeyDown(event) {
        if (event.keyCode === KeyCodes.BACKSPACE) {
            if (this.selected) {
                this.remove(event, this.selected);
            }
        }
    }

    handleOutsideClick(event) {
        // If the elements doesn't contain the target element, it is an outside click
        if (!this.element.nativeElement.contains(event.target)) {
            this.deselectAll(event, false);
        }
    }

    //valueAccessor Functions
    writeValue(value) {
        this.value = value;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

}

export const NOVO_CHIPS_ELEMENTS = [Chips, Chip];
