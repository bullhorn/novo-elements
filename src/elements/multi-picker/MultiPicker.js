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
        <div *ngIf="items.length > 4">
            <ul class="summary">
                <li *ngFor="let type of notShown">+ {{type.count}} more {{type.type}}</li>
            </ul>
        </div>
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
        <label class="clear-all" *ngIf="items.length" (click)="clearValue()">CLEAR ALL <i class="bhi-times"></i></label>
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
        this.setupOptions();
    }

    clearValue() {
        this.types.forEach(type => this.modifyAllOfType(type.value, 'unselect'));
        this.items = [];
        this._items.next(this.items);
        this.value = this.setInitialValue(null);
        this.onModelChange(this.value);
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
    }

    setupOptionsByType(section) {
        let formattedSection = {
            type: section.type
        };
        formattedSection.data = section.data.map(item => {
            return this.formatOption(section, item);
        }, this);
        let selectAll = this.createSelectAllOption(section);
        formattedSection.data.splice(0, 0, selectAll);
        formattedSection.originalData = formattedSection.data.slice();
        return formattedSection;
    }

    formatOption(section, item) {
        let obj = {
            value: section.field ? item[section.field] : (item.value || item),
            label: section.format ? Helpers.interpolate(section.format, item) : item.label || String(item.value || item),
            type: section.type,
            checked: undefined,
            isParent: section.isParent,
            isChild: section.isChild
        };
        if (obj.isChild) {
            obj[section.isChild.parentType] = item[section.isChild.parentType];
        }
        return obj;
    }

    createSelectAllOption(section) {
        let selectAll = {
            value: 'ALL',
            label: `All ${section.type}`,
            type: section.type,
            checked: (this.model && this.model.length && (this.model.indexOf('ALL') !== -1)),
            isParent: section.isParent,
            isChild: section.isChild
        };
        if (section.isChild) {
            let allParents = section.data.reduce((accum, next) => {
                return accum.concat(next[section.isChild.parentType]);
            }, []);
            selectAll[section.isChild.parentType] = allParents;
        }
        return selectAll;
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
            this.updateDisplayItems(event, 'add');
            this.value[event.type].push(event.value);
            this.updateAllItemState(event.type, true);
            this.triggerValueUpdate();
        }
        this.updateParentOrChildren(event, 'select');
        this.select(null, event);
    }

    updateAllItemState(type, addingItem) {
        let allOfType = this.getAllOfType(type);
        let allOfTypeSelected = this.allItemsSelected(allOfType, type);
        if (allOfTypeSelected) {
            this.selectAll(allOfType, type);
        }
        if (addingItem) {
            this.updateIndeterminateState(type, !allOfTypeSelected);
        }
        return { allOfType, allOfTypeSelected };
    }

    updateIndeterminateState(type, status) {
        let allOfType = this.getAllOfType(type);
        let allItem = allOfType[0];
        allItem.indeterminate = status;
    }

    updateDisplayItems(item, action) {
        let adding = action === 'add';
        if (adding) {
            this.items.push(item);
        } else {
            if (this.items.indexOf(item) > -1) { this.items.splice(this.items.indexOf(item), 1); }
        }
        this.updateDisplayText(this.items);
        this._items.next(this.items);
    }

    updateDisplayText(items) {
        this.notShown = [];
        let notShown = items.slice(4);
        if (notShown.length > 0) {
            this.types.forEach(type => {
                let count;
                let selectedOfType = notShown.filter(x => x.type === type.value);
                if (selectedOfType.length === 1 && selectedOfType[0].value === 'ALL') {
                    count = this.getAllOfType(type.value).length - 1;
                } else {
                    count = selectedOfType.length;
                }
                let displayType = count === 1 ? type.singular : type.value;
                if (count > 0) { this.notShown.push({ type: displayType, count: count }); }
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
        } else if (this.allOfTypeSelected(itemToRemove.type)) {
            this.handleRemoveItemIfAllSelected(itemToRemove);
        }
        this.removeItem(item);
    }

    removeItem(item) {
        item.checked = false;
        this.deselectAll();
        this.removeValue(item);
        this.updateParentOrChildren(item, 'unselect');
    }

    removeValue(item) {
        let updatedValues = this.value[item.type].filter(x => x !== item.value);
        this.value[item.type] = updatedValues;
        this.triggerValueUpdate();
        this.updateDisplayItems(item, 'remove');
        if (this.value[item.type].length === 0) { this.updateIndeterminateState(item.type, false); }
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
        let allOfType = this.getAllOfType(type);
        allOfType.forEach(item => {
            item.checked = selecting;
            item.indeterminate = false;
            this.updateParentOrChildren(item, action);
        });
        if (selecting) {
            this.selectAll(allOfType, type);
        } else {
            this.value[type] = [];
        }
        this.triggerValueUpdate();
    }

    triggerValueUpdate() {
        let updatedObject = {};
        this.types.forEach(x => updatedObject[x.value] = this.value[x.value]);
        this.value = updatedObject;
    }

    selectAll(allOfType, type) {
        allOfType[0].checked = true;
        let values = allOfType.map(i => { return i.value; });
        //remove 'ALL' value
        values.splice(0, 1);
        this.value[type] = values;
        let updatedItems = this.items.filter(x => x.type !== type);
        this.items = updatedItems;
        this.updateDisplayItems(allOfType[0], 'add');
    }

    handleRemoveItemIfAllSelected(item) {
        let type = item.type;
        let allOfType = this.getAllOfType(type);
        let allItem = allOfType[0];
        this.removeItem(allItem);

        allItem.indeterminate = true;
        let selectedItems = allOfType.filter(i => i.checked === true);
        this.items = [...this.items, ...selectedItems];
        let values = selectedItems.map(i => { return i.value; });
        this.value[type] = [...values];
    }

    handleOutsideClick(event) {
        // If the elements doesn't contain the target element, it is an outside click
        if (!this.element.nativeElement.contains(event.target)) {
            this.blur.emit(event);
            this.deselectAll(event, false);
        }
    }

    getAllOfType(type) {
        return this._options.filter(x => x.type === type)[0].data;
    }

    //get accessor
    get value() {
        return this._value;
    }

    //set accessor including call the onchange callback
    set value(selectedItems) {
        if (selectedItems) {
            this.types.forEach(x => this._value[x.value] = selectedItems[x.value]);
        } else {
            this._value = {};
            this.types.forEach(x => this._value[x.value] = []);
        }
        this.changed.emit(selectedItems);
        this.onModelChange(selectedItems);
    }

    updateParentOrChildren(item, action) {
        if (item.isParent) {
            this.updateChildrenValue(item, action);
        } else if (item.isChild) {
            this.updateParentValue(item, action);
        }
    }


    updateChildrenValue(parent, action) {
        let selecting = action === 'select';
        let childType = parent.isParent.childType;
        let potentialChildren = this.getAllOfType(childType);
        let allParentType;
        potentialChildren.forEach(x => {
            if (x.isChild && x[parent.type] && x.value !== 'ALL') {
                if (x[parent.type].filter(y => y.id === parent.value).length > 0) {
                    if (x.checked) { this.removeValue(x); }
                    //if x has another parent, need to figure out how its state is affected
                    if (x[parent.type].length > 1) {
                        let affectedParents = x[parent.type].filter(y => y.id !== parent.value);
                        allParentType = this.getAllOfType(parent.type);
                        affectedParents.forEach(obj => {
                            let parentObj = allParentType.filter(par => par.value === obj.id)[0];
                            this.determineIndeterminateState(parentObj, selecting);
                        });
                    }
                    x.checked = selecting;
                    if (selecting) {
                        this.updateIndeterminateState(x.type, true);
                    }
                }
            }
        });
    }

    updateParentValue(child, action) {
        let selecting = action === 'select';
        let parentType = child.isChild.parentType;
        let potentialParents = this.getAllOfType(parentType);
        child[parentType].forEach(parent => {
            let item = potentialParents.filter(x => x.value === parent.id)[0];
            this.determineIndeterminateState(item, selecting);
        }, this);
    }

    determineIndeterminateState(parent, selecting) {
        if (parent.checked) { parent.checked = false; }
        if (selecting) {
            parent.indeterminate = true;
            this.updateIndeterminateState(parent.type, true);
        } else {
            let potentialChildren = this.getAllOfType(parent.isParent.childType);
            let selectedChildren = potentialChildren.filter(x => {
                if (!x[parent.type]) { return false; }
                return x.checked && x[parent.type].filter(y => y.id === parent.value).length > 0;
            });
            if (selectedChildren.length > 0) {
                parent.indeterminate = true;
                this.addIndividualChildren(selectedChildren);
                this.removeValue(parent);
            } else {
                this.remove(null, parent);
                parent.indeterminate = false;
                this.updateIndeterminateState(parent.type, false);
            }
        }
    }

    addIndividualChildren(children) {
        children.forEach(x => {
            if (this.value[x.type].filter(item => item === x.value).length === 0) {
                this.add(x);
            }
        });
    }

    setInitialValue(model) {
        this.items = [];
        this.value = model || {};
        if (this.types) {
            let simpleTypes = this.types.map(x => x.value);
            simpleTypes.forEach(type => {
                if (this.value[type]) {
                    let indeterminateIsSet = false;
                    let options = this.updateAllItemState(type, false);
                    let optionsByType = options.allOfType;
                    let allSelected = options.allOfTypeSelected;
                    this.value[type].forEach(item => {
                        if (!allSelected && !indeterminateIsSet) {
                            indeterminateIsSet = true;
                            this.updateIndeterminateState(type, true);
                        }
                        let value = optionsByType.filter(x => x.value === item)[0];
                        value.checked = true;
                        if (!allSelected) { this.updateDisplayItems(value, 'add'); }
                    });
                } else {
                    this.value[type] = [];
                }
            });
        }
    }

    allItemsSelected(optionsByType, type) {
        return this.value[type].length === optionsByType.length - 1;
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
    }

    registerOnChange(fn:Function):void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn:Function):void {
        this.onModelTouched = fn;
    }
}
