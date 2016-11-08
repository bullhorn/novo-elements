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
    useExisting: forwardRef(() => NovoMultiPickerElement),
    multi: true
};

@Component({
    selector: 'multi-picker',
    inputs: ['source', 'placeholder', 'value', 'types'],
    outputs: ['changed', 'focus', 'blur'],
    providers: [CHIPS_VALUE_ACCESSOR],
    template: `
        <chip
            *ngFor="let item of _items | async | slice:0:4"
            [type]="type"
            [class.selected]="item == selected"
            (remove)="remove($event, item)"
            (select)="select($event, item)">
            {{ item.label }}
        </chip>
        <span *ngIf="items.length > 4">
            <span *ngFor="let type of types">
                <span *ngIf="notShown[type]" class="summary"> + {{notShown[type]}} more {{type}}</span>
            </span>
        </span>
        <div class="chip-input-container">
            <novo-picker
                clearValueOnSelect="true"
                [config]="source"
                [placeholder]="placeholder"
                [(ngModel)]="itemToAdd"
                (select)="clickOption($event)"
                (keydown)="onKeyDown($event)"
                (focus)="onFocus($event)"
                (blur)="onTouched($event)">
            </novo-picker>
        </div>
        <i class="bhi-search"></i>
        <label class="clear-all" *ngIf="items.length" (click)="clearValue()"><i class="bhi-times"></i> CLEAR ALL</label>
   `,
    host: {
        '[class.with-value]': 'items.length > 0'
    }
})
export class NovoMultiPickerElement extends OutsideClick {
    changed:EventEmitter = new EventEmitter();
    focus:EventEmitter = new EventEmitter();
    blur:EventEmitter = new EventEmitter();
    items:Array = [];
    _items = new ReplaySubject(1);
    selected:any = null;
    placeholder:string = '';
    config:Object = {};
    // private data model
    _value:Object = {};
    notShown:Object = {};
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
        this.setupOptions();
    }

    clearValue() {
        this.items = [];
        this._items.next(this.items);
        this.value = this.setInitialValue(null);
        this.onModelChange(this.value);
    }

    setItems() {
        this.items = [];
        if (this.model && this.types) {
            this.types.forEach(type => {
                if (this.model[type] && Array.isArray(this.model[type])) {
                    let noLabels = [];
                    for (let value of this.model[type]) {
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
                            this.items.push(value);
                        }
                    }
                    if (noLabels.length > 0 && this.source && this.source.getLabels && typeof this.source.getLabels === 'function') {
                        this.source.getLabels(noLabels).then(result => {
                            this.items = this.items.concat(result);
                            this._items.next(this.items);
                        });
                    }
                }
            });
        }
        this._items.next(this.items);
    }

    setupOptions() {
        this.options = this.source.options || [];
        this._options = [];
        if (this.options) {
            this.options.forEach(option => {
                let formattedOption = this.setupOptionsByType(option);
                this._options.push(formattedOption);
            });
        }
        this.source.options = this._options;
        return this._options;
    }

    setupOptionsByType(option) {
        let formattedSection = {
            type: option.type
        };
        formattedSection.data = option.data.map(item => {
            return {
                value: option.field ? item[option.field] : (item.value || item),
                label: option.format ? Helpers.interpolate(option.format, item) : item.label || String(item.value || item),
                type: option.type,
                checked: undefined
            };
        }, this);
        let selectAll = {
            value: 'ALL',
            label: `All ${option.type}`,
            type: option.type,
            checked: (this.model && this.model.length && (this.model.indexOf('ALL') !== -1))
        };
        formattedSection.data.splice(0, 0, selectAll);
        formattedSection.originalData = formattedSection.data.slice();
        return formattedSection;
    }

    setInitialOptionValues() {
        if (this.model) {
            this.types.forEach(type => {
                let optionsByType = this._options.filter(x => x.type === type)[0].data;
                this.model[type].forEach(item => {
                    let value = optionsByType.filter(x => x.value === item.value)[0];
                    value.checked = true;
                });
            });
        }
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
        this.element.nativeElement.classList.add('selected');
        this.focus.emit(e);
    }

    clickOption(event) {
        if (event && !(event instanceof Event)) {
            if (event.checked === false) {
                this.remove(null, event);
            } else {
                this.add(event);
            }
            // Set focus on the picker
            let input = this.element.nativeElement.querySelector('novo-picker > input');
            if (input) {
                input.focus();
            }
        }
    }

    add(event) {
        if (event.value === 'ALL') {
            this.modifyAllOfType(event.type, 'select');
        } else {
            this.updateItems(event, 'add');
            this.value[event.type].push({ value: event.value });
        }
        this.select(null, event);
    }

    updateItems(item, action) {
        let adding = action === 'add';
        if (adding) {
            this.items.push(item);
        } else {
            if (this.items.indexOf(item) > -1) { this.items.splice(this.items.indexOf(item), 1); }
        }
        this.updateMoreItemsText(this.items);
        this._items.next(this.items);
    }

    updateMoreItemsText(items) {
        let notShown = items.slice(4);
        if (notShown.length > 0) {
            this.types.forEach(type => {
                let count = notShown.filter(x => x.type === type).length;
                this.notShown[type] = count;
            });
        }
    }

    remove(event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        let itemToRemove = event || item;
        if (itemToRemove.value === 'ALL') {
            this.modifyAllOfType(itemToRemove.type, 'unselect');
        }
        if (this.allOfTypeSelected(itemToRemove.type)) {
            this.handleRemoveItemIfAllSelected(event, item);
        }
        this.removeItem(item);
    }

    removeItem(item) {
        item.checked = false;
        this.deselectAll();
        let updatedValues = this.value[item.type].filter(x => x.value !== item.value);
        this.value[item.type] = updatedValues;
        this.onModelChange(this.value);
        this.updateItems(item, 'remove');
    }

    onKeyDown(event) {
        if (event.keyCode === KeyCodes.BACKSPACE) {
            if (event.target && event.target.value.length === 0 && this.items.length) {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if (this.selected) {
                    this.remove(null, this.selected);
                } else {
                    this.select(event, this.items[this.items.length - 1]);
                }
            }
        }
    }

    allOfTypeSelected(type) {
        return this.items.filter(x => x.type === type && x.value === 'ALL').length > 0;
    }

    modifyAllOfType(type, action) {
        let selecting = action === 'select';
        let allOfType = this._options.filter(x => x.type === type)[0].data;
        allOfType.forEach(item => item.checked = selecting);
        let values;
        if (selecting) {
            values = allOfType.map(i => { return { value: i.value }; });
            values.splice(0, 1);
            let updatedItems = this.items.filter(x => x.type !== type);
            this.items = updatedItems;
            this.updateItems(allOfType[0], 'add');
        } else {
            values = [];
        }
        this.value[type] = values;
        let updatedObject = {};
        this.types.forEach(x => updatedObject[x] = this.value[x]);
        this.value = updatedObject;
    }

    handleRemoveItemIfAllSelected(event, item) {
        let type = item.type;
        let allOfType = this._options.filter(x => x.type === type)[0].data;
        let allItem = allOfType[0];
        this.removeItem(allItem);
        let selectedItems = allOfType.filter(i => i.checked === true);
        this.items = [...this.items, ...selectedItems];
        let values = selectedItems.map(i => { return { value: i.value }; });
        this.value[type] = [...values];
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
    set value(selectedItems) {
        if (selectedItems) {
            this.types.forEach(x => this._value[x] = selectedItems[x]);
        } else {
            this._value = {};
            this.types.forEach(x => this._value[x] = []);
        }
        this.changed.emit(selectedItems);
        this.onModelChange(selectedItems);
    }

    setInitialValue(model) {
        this.value = model || {};
        if (this.types) {
            this.types.forEach(type => {
                if (this.value[type]) {
                    this.value[type].forEach(item => {
                        item.type = type;
                    });
                } else {
                    this.value[type] = [];
                }
            });
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
        this.setInitialValue(model);
        this.setInitialOptionValues();
        this.setItems();
    }

    registerOnChange(fn:Function):void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn:Function):void {
        this.onModelTouched = fn;
    }
}
