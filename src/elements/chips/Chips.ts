// NG2
import { Component, EventEmitter, Input, Output, forwardRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
// APP
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoChipsElement),
    multi: true
};

@Component({
    selector: 'chip',
    template: `
        <span (click)="onSelect($event)" (mouseover)="onSelect($event)" [ngClass]="_type">
            <i *ngIf="_type" class="bhi-circle"></i>
            <span><ng-content></ng-content></span>
        </span>
        <i class="bhi-close" (click)="onRemove($event)"></i>
    `
})
export class NovoChipElement {
    @Input()
    set type(type: string) {
        this._type = type ? type.toLowerCase() : null;
    }

    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() remove: EventEmitter<any> = new EventEmitter();

    entity: string;
    _type: string;

    onRemove(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.remove.emit(e);
        return false;
    }

    onSelect(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.select.emit(e);
        return false;
    }
}

@Component({
    selector: 'chips',
    providers: [CHIPS_VALUE_ACCESSOR],
    template: `
        <chip
            *ngFor="let item of _items | async"
            [type]="type || item?.value?.searchEntity"
            [class.selected]="item == selected"
            (remove)="remove($event, item)"
            (select)="select($event, item)">
            {{ item.label }}
        </chip>
        <div class="chip-input-container">
            <novo-picker
                clearValueOnSelect="true"
                [closeOnSelect]="closeOnSelect"
                [config]="source"
                [placeholder]="placeholder"
                [(ngModel)]="itemToAdd"
                (select)="add($event)"
                (keydown)="onKeyDown($event)"
                (focus)="onFocus($event)"
                (typing)="onTyping($event)"
                (blur)="onTouched($event)"
                [selected]="items">
            </novo-picker>
        </div>
        <div class="preview-container">
            <span #preview></span>
        </div>
        <i class="bhi-search"></i>
        <label class="clear-all" *ngIf="items.length" (click)="clearValue()">{{ labels.clearAll }} <i class="bhi-times"></i></label>
   `,
    host: {
        '[class.with-value]': 'items.length > 0'
    }
})
export class NovoChipsElement extends OutsideClick implements OnInit {
    @Input() closeOnSelect: boolean = false;
    @Input() placeholder: string = '';
    @Input() source: any;
    @Input() type: any;

    @Output() changed: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();
    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() typing: EventEmitter<any> = new EventEmitter();

    @ViewChild('preview', { read: ViewContainerRef }) preview: ViewContainerRef;

    items: Array<any> = [];
    selected: any = null;
    config: any = {};
    model: any;
    itemToAdd: any;
    popup: any;
    // private data model
    _value: any = '';
    _items = new ReplaySubject(1);
    // Placeholders for the callbacks
    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };

    constructor(element: ElementRef, private componentUtils: ComponentUtils, public labels: NovoLabelService) {
        super(element);
        this.element = element;

        // Listen for an outside click to hide the preview
        this.onActiveChange.subscribe((active) => {
            if (!active) {
                this.blur.emit();
                this.deselectAll();
            }
        });
    }

    ngOnInit() {
        this.setItems();
    }

    //get accessor
    get value() {
        return this._value;
    }

    //set accessor including call the onchange callback
    @Input()
    set value(selected) {
        this.itemToAdd = '';
        if (selected !== this._value) {
            this._value = selected;
            this.changed.emit(selected);
            this.onModelChange(selected);
        }
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
                if (this.source && this.source.format && Helpers.validateInterpolationProps(this.source.format, value)) {
                    label = Helpers.interpolate(this.source.format, value);
                }
                if (this.source && label && label !== this.source.format) {
                    this.items.push({
                        value,
                        label
                    });
                } else if (this.source.getLabels && typeof this.source.getLabels === 'function') {
                    noLabels.push(value);
                } else if (this.source.options && Array.isArray(this.source.options)) {
                    this.items.push(this.getLabelFromOptions(value));
                } else {
                    this.items.push({
                        value,
                        label: value
                    });
                }
            }
            if (noLabels.length > 0 && this.source && this.source.getLabels && typeof this.source.getLabels === 'function') {
                this.source.getLabels(noLabels).then(result => {
                    for (let value of result) {
                        if (value.hasOwnProperty('label')) {
                            this.items.push({
                                value,
                                label: value.label
                            });
                        } else if (this.source.options && Array.isArray(this.source.options)) {
                            this.items.push(this.getLabelFromOptions(value));
                        } else {
                            this.items.push(value);
                        }
                    }
                    this._items.next(this.items);
                });
            }
        }
        this._items.next(this.items);
    }

    getLabelFromOptions(value) {
        let optLabel = this.source.options.find(val => val.value === value);
        return {
            value,
            label: optLabel ? optLabel.label : value
        };
    }

    deselectAll(event?) {
        this.selected = null;
        this.hidePreview();
    }

    select(event?, item?) {
        this.blur.emit(event);
        this.deselectAll();
        this.selected = item;
        this.showPreview();
        // Start listening for an outside click to hide the preview
        this.toggleActive(null, true);
    }

    onTyping(event?) {
        this.typing.emit(event);
    }

    onFocus(event?) {
        this.deselectAll();
        this.element.nativeElement.classList.add('selected');
        this.focus.emit(event);
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

    // Set touched on blur
    onTouched(e) {
        this.element.nativeElement.classList.remove('selected');
        this.onModelTouched();
        this.blur.emit(e);
    }

    writeValue(model: any): void {
        this.model = model;
        this.setItems();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    /**
     * @name showPreview
     *
     * @description This method creates an instance of the preview (called popup) and adds all the bindings to that
     * instance. Will reuse the popup or create a new one if it does not already exist. Will only work if there is
     * a previewTemplate given in the config.
     */
    showPreview() {
        if (this.source.previewTemplate) {
            if (!this.popup) {
                this.popup = this.componentUtils.appendNextToLocation(this.source.previewTemplate, this.preview);
            }
            this.popup.instance.match = this.selected;
        }
    }

    /**
     * @name hidePreview
     *
     * @description - This method deletes the preview popup from the DOM.
     */
    hidePreview() {
        if (this.popup) {
            this.popup.destroy();
            this.popup = null;
        }
    }
}
