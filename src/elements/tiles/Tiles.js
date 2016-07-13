import { Component, EventEmitter, ElementRef, Optional } from '@angular/core'; //eslint-disable-line
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
        <div class="tile-container">
            <div class="tile" *ngFor="let option of _options; let i = index" [ngClass]="{active: option.checked}" (click)="select($event, option, i)">
                <label [attr.for]="name + i">
                    {{ option.label || option}}
                </label>
                <input [hidden]="true" [name]="name" type="radio" [value]="option.checked || option" [attr.id]="name + i">
            </div>
            <span class="active-indicator" *ngIf="activeTile"></span>
        </div>
    `
})
export class Tiles {
    validators:Array = [];
    _options:Array = [];
    value:any = null;
    activeTile:any = null;
    changed:EventEmitter = new EventEmitter;

    constructor(@Optional() model:NgControl, element:ElementRef) {
        this.element = element;
        this.model = model || new NgModel();
        this.model.valueAccessor = this;
    }

    ngOnInit() {
        this.name = this.name || '';

        if (this.control) {
            this.control.updateValue(this.value);
        }
        if (this.options && this.options.length && !this.options[0].value) {
            this._options = this.options.map((x) => {
                let item = { value: x, label: x, checked: this.value === x };
                return item;
            });
        } else {
            this._options = this.options.map((x) => {
                x.checked = this.value === x.value;
                if (x.checked) {
                    this.setTile(x);
                }
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
        this.setTile(item);
    }

    setTile(item) {
        if (item) {
            this.activeTile = item.value;
            this.moveTile();
        }
    }

    moveTile() {
        setTimeout(() => {
            let ind = this.element.nativeElement.querySelector('.active-indicator');
            let el = this.element.nativeElement.querySelector('.tile.active');
            let w = el.clientWidth;
            let left = el.offsetLeft;

            // These style adjustments need to occur in this order. TODO: Remove this and use ngAnimate2 - @asibilia
            setTimeout(() => {
                ind.style.width = `${w + 4}px`;
                setTimeout(() => {
                    ind.style.transform = `translateX(${left}px)`;
                    setTimeout(() => {
                        ind.style.opacity = '1';
                    });
                });
            });
        });
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
