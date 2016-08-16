import { Component, EventEmitter, ElementRef, Optional } from '@angular/core'; // eslint-disable-line
import { COMMON_DIRECTIVES, NgModel } from '@angular/common';
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';
import { NOVO_PICKER_ELEMENTS } from '../picker/Picker';
import { interpolate } from './../../utils/Helpers';

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
    directives: [COMMON_DIRECTIVES, NOVO_PICKER_ELEMENTS, Chip, NgModel],
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
   `,
    host: {
        '[class.ng-untouched]': 'model.control?.untouched == true',
        '[class.ng-touched]': 'model.control?.touched == true',
        '[class.ng-pristine]': 'model.control?.pristine == true',
        '[class.ng-dirty]': 'model.control?.dirty == true',
        '[class.ng-valid]': 'model.control?.valid == true',
        '[class.ng-invalid]': 'model.control?.valid == false'
    }
})
export class Chips extends OutsideClick {
    changed:EventEmitter = new EventEmitter();
    focus:EventEmitter = new EventEmitter();
    blur:EventEmitter = new EventEmitter();
    items:Array = [];
    selected:any = null;
    placeholder:string = '';
    config:Object = {};
    // private data model
    _value:any = '';
    //Placeholders for the callbacks
    _onTouchedCallback = () => false;
    _onChangeCallback = () => false;

    constructor(@Optional() model:NgModel, element:ElementRef) {
        super(element);
        this.element = element;
        this.model = model || new NgModel();
        this.model.valueAccessor = this;
    }

    ngOnInit() {
        window.document.addEventListener('keydown', this.outsideKeyDown.bind(this));

        if (Array.isArray(this._value)) {
            this.items = this._value.map(v => {
                if (this.source && this.source.format) {
                    return { value: v, label: interpolate(this.source.format, v) };
                }
                return { value: v, label: v };
            });
        }
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
    get value():any {
        return this._value;
    }

    //set accessor including call the onchange callback
    set value(selected:any) {
        this.itemToAdd = '';
        if (selected !== this._value) {
            this._value = selected;
            this.changed.emit(selected);
            this._onChangeCallback(selected);
        }
    }

    //From ControlValueAccessor interface
    writeValue(value) {
        this._value = value;
    }

    //Set touched on blur
    onTouched(e) {
        this.element.nativeElement.classList.remove('selected');
        this._onTouchedCallback();
        this.blur.emit(e);
    }

    //From ControlValueAccessor interface
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
}

export const NOVO_CHIPS_ELEMENTS = [Chips, Chip];
