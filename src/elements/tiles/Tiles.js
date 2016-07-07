import { Component, EventEmitter, Optional } from '@angular/core'; // eslint-disable-line
import { CORE_DIRECTIVES, NgControl, NgModel } from '@angular/common';

@Component({
    selector: 'novo-tiles',
    inputs: [
        'name',
        'options',
        'required'
    ],
    outputs: [
        'changed'
    ],
    directives: [
        CORE_DIRECTIVES
    ],
    template: `
        <div class="tile" *ngFor="let option of _options; let i = index" [ngClass]="{active: option.checked}" (click)="select($event, option, i)">
            <label [attr.for]="name + i">
                <span>{{ option.label || option}}</span>
            </label>
            <input [hidden]="true" [name]="name" type="radio" [value]="option.checked || option" [attr.id]="name + i">
        </div>
    `
})
export class Tiles {
    changed:EventEmitter = new EventEmitter;
    constructor(@Optional() model:NgControl) {
        this.model = model || new NgModel();
        this.model.valueAccessor = this;
        this._options = [];
    }

    ngOnInit() {
        this.name = this.name || '';

        if (this.control) {
            this.control.updateValue(this.value);
        }
        if (this.options && this.options.length && !this.options[0].value) {
            this._options = this.options.map((x) => {
                return { value: x, label: x, checked: this.value === x };
            });
        } else {
            this._options = this.options.map((x) => {
                x.checked = this.value === x.value;
                return x;
            });
        }
    }

	/**
     * @name select
     *
     * @param event
     * @param item
     */
    select(event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        for (let option of this._options) {
            option.checked = false;
        }
        item.checked = !item.checked;
        this.changed.emit(item.value);
        this.model.viewToModelUpdate(item.value);
    }

    // ValueAccessor Functions
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

export const NOVO_TILES_ELEMENTS = [Tiles];
