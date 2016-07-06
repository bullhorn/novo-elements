import { Component, EventEmitter } from '@angular/core';
import { CORE_DIRECTIVES, Validators, Control } from '@angular/common';

@Component({
    selector: 'novo-tiles',
    inputs: [
        'name',
        'options',
        'required',
        'value'
    ],
    directives: [
        CORE_DIRECTIVES
    ],
    outputs: [
        'update'
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
    update:EventEmitter = new EventEmitter();

    constructor() {
        this.validators = [];
        this.value = null;
        this._options = [];
    }

    ngOnInit() {
        this.name = this.name || '';
        if (this.required) {
            this.validators.push(Validators.required);
        }
        this.control = new Control('', Validators.compose(this.validators));
        this.control.updateValue(this.value);
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
        if (this.update) this.update.emit(item.value);
        if (this.control) this.control.updateValue(item.value);
    }
}

export const NOVO_TILES_ELEMENTS = [Tiles];
