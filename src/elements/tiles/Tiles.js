import { Component, EventEmitter, ElementRef } from '@angular/core';
import { CORE_DIRECTIVES, Validators, Control } from '@angular/common';

import { NovoLabelService } from '../../services/novo-label-service';

@Component({
    selector: 'novo-tiles',
    inputs: [
        'name',
        'options',
        'required'
    ],
    directives: [
        CORE_DIRECTIVES
    ],
    outputs: [
        'update'
    ],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <div class="tile-container">
            <div class="tile" *ngFor="let option of _options; let i = index" [ngClass]="{active: option.checked}" (click)="select($event, option, i)">
                <label [attr.for]="name + i">
                    {{ option.label || option}}
                </label>
                <input [hidden]="true" [name]="name" type="radio" [value]="option.checked || option" [attr.id]="name + i">
            </div>
            <span class="active-indicator" *ngIf="activeTile.value"></span>
        </div>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{ labels.required }}</span>
    `
})
export class Tiles {
    update:EventEmitter = new EventEmitter();
    validators:Array = [];
    _options:Array = [];
    value:any = null;
    activeTile:Object = {};

    constructor(element:ElementRef, labels: NovoLabelService) {
        this.element = element;
        this.labels = labels;
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
    select(event, item, idx) {
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

        this.moveTile(idx, item);
    }

    moveTile(idx, item) {
        this.activeTile = {
            idx: idx,
            value: item.value
        };

        setTimeout(() => {
            let ind = this.element.nativeElement.querySelector('.active-indicator');
            let el = this.element.nativeElement.querySelector('.tile.active');
            let w = el.clientWidth;
            let left = el.offsetLeft;

            ind.style.width = `${w + 4}px`;
            ind.style.transform = `translateX(${left}px)`;
        });
    }
}

export const NOVO_TILES_ELEMENTS = [Tiles];
