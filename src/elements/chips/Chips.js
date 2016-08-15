// NG2
import { Component, EventEmitter, forwardRef, Provider, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';

// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => NovoChipsElement),
    multi: true
});

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
            *ngFor="let item of items"
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
   `
})
export class NovoChipsElement extends OutsideClick {
    changed:EventEmitter = new EventEmitter();
    focus:EventEmitter = new EventEmitter();
    blur:EventEmitter = new EventEmitter();
    items:Array = [];
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
        window.document.addEventListener('keydown', this.outsideKeyDown.bind(this));
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        window.document.removeEventListener('keydown', this.outsideKeyDown.bind(this));
    }

    deselectAll() {
        this.selected = null;
    }

    select(event, item) {
        this.deselectAll();
        this.selected = item;
    }

    onFocus(e) {
        this.deselectAll();
        this.element.nativeElement.classList.add('selected');
        this.focus.emit(e);
    }

    add(event) {
        if (event) {
            this.items.push(event);
            this.value = this.items.map(i => i.value);
        }
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
        if (Array.isArray(model)) {
            this.items = model.map(v => ({ value: v, label: v }));
        }
    }

    registerOnChange(fn:Function):void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn:Function):void {
        this.onModelTouched = fn;
    }
}
