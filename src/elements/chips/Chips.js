// NG2
import { Component, EventEmitter, forwardRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';
import { Helpers } from './../../utils/Helpers';
// Vendor
import { ReplaySubject } from 'rxjs/ReplaySubject';

// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoChipsElement),
    multi: true
};

@Component({
    selector: 'chip',
    inputs: ['type'],
    outputs: ['select', 'remove'],
    template: `
        <span (click)="onSelect($event)" [ngClass]="type">
            <i *ngIf="type" class="bhi-circle"></i>
            <ng-content></ng-content>
        </span>
        <i class="bhi-close" (click)="onRemove($event)"></i>
  `
})
export class NovoChipElement {
    select:EventEmitter = new EventEmitter();
    remove:EventEmitter = new EventEmitter();
    entity:string;

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
    inputs: ['source', 'placeholder', 'value', 'type'],
    outputs: ['changed', 'focus', 'blur'],
    providers: [CHIPS_VALUE_ACCESSOR],
    template: `
        <chip
            *ngFor="let item of _items | async"
            [type]="type"
            [class.selected]="item == selected"
            (remove)="remove($event, item)"
            (select)="select($event, item)">
            {{ item.label }}
        </chip>
        <div class="chip-input-container">
            <novo-picker
                clearValueOnSelect="true"
                [config]="source"
                [placeholder]="placeholder"
                [(ngModel)]="itemToAdd"
                (select)="add($event)"
                (keydown)="onKeyDown($event)"
                (focus)="onFocus($event)"
                (blur)="onTouched($event)">
            </novo-picker>
        </div>
        <i class="bhi-search"></i>
        <label class="clear-all" *ngIf="_items.length" (click)="clearValue()"><i class="bhi-times"></i> CLEAR ALL</label>
   `,
    host: {
        '[class.with-value]': 'items.length > 0'
    }
})
export class NovoChipsElement extends OutsideClick {
    changed:EventEmitter = new EventEmitter();
    focus:EventEmitter = new EventEmitter();
    blur:EventEmitter = new EventEmitter();
    items:Array = [];
    _items = new ReplaySubject(1);
    selected:any = null;
    placeholder:string = '';
    config:Object = {};
    // private data model
    _value:any = '';
    // Placeholders for the callbacks
    onModelChange:Function = () => {
    };
    onModelTouched:Function = () => {
    };

    constructor(element:ElementRef) {
        super(element);
        this.element = element;
    }

    ngOnInit() {
        this.setItems();
    }

    clearValue() {
        this.items = [];
        this._items.next(this.items);
        this.value = null;
        this.onModelChange(this.value);
    }

    setItems() {
        this.items = [];
        if (this.model && Array.isArray(this.model)) {
            let noLabels = [];
            for (let value of this.model) {
                let label;
                if (this.source && this.source.format) {
                    label = Helpers.interpolate(this.source.format, value);
                }
                if (this.source && label && label !== this.source.format) {
                    this.items.push({
                        value,
                        label
                    });
                } else if (this.source.getLabels && typeof this.source.getLabels === 'function') {
                    noLabels.push(value);
                } else {
                    this.items.push({
                        value,
                        label: value
                    });
                }
            }
            if (noLabels.length > 0 && this.source && this.source.getLabels && typeof this.source.getLabels === 'function') {
                console.log('calling getLabels for', noLabels);//eslint-disable-line
                this.source.getLabels(noLabels).then(result => {
                    this.items = this.items.concat(result);
                    this._items.next(this.items);
                });
            }
        }
        this._items.next(this.items);
    }

    deselectAll() {
        this.selected = null;
    }

    select(event, item) {
        this.blur.emit(event);
        this.deselectAll();
        this.selected = item;
    }

    onFocus(e) {
        this.deselectAll();
        this.element.nativeElement.classList.add('selected');
        this.focus.emit(e);
    }

    add(event) {
        if (event && !(event instanceof Event)) {
            this.items.push(event);
            this.value = this.items.map(i => i.value);
            // Set focus on the picker
            let input = this.element.nativeElement.querySelector('novo-picker > input');
            if (input) {
                input.focus();
            }
        }
        this._items.next(this.items);
    }

    remove(event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.items.splice(this.items.indexOf(item), 1);
        this.deselectAll();
        this.value = this.items.map(i => i.value);
        this.onModelChange(this.value.length ? this.value : '');
        this._items.next(this.items);
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

    handleOutsideClick(event) {
        // If the elements doesn't contain the target element, it is an outside click
        if (!this.element.nativeElement.contains(event.target)) {
            this.blur.emit(event);
            this.deselectAll(event, false);
        }
    }

    //get accessor
    get value() {
        return this._value;
    }

    //set accessor including call the onchange callback
    set value(selected) {
        this.itemToAdd = '';
        if (selected !== this._value) {
            this._value = selected;
            this.changed.emit(selected);
            this.onModelChange(selected);
        }
    }

    // Set touched on blur
    onTouched(e) {
        this.element.nativeElement.classList.remove('selected');
        this.onModelTouched();
        this.blur.emit(e);
    }

    writeValue(model:any):void {
        this.model = model;
        this.setItems();
    }

    registerOnChange(fn:Function):void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn:Function):void {
        this.onModelTouched = fn;
    }
}
