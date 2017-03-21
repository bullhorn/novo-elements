// NG2
import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, trigger, state, style, transition, animate, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { Helpers } from '../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const TILES_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTilesElement),
    multi: true
};

@Component({
    selector: 'novo-tiles',
    providers: [TILES_VALUE_ACCESSOR],
    template: `
        <div class="tile-container">
            <div class="tile" *ngFor="let option of _options; let i = index" [ngClass]="{active: option.checked, disabled: option.disabled}" (click)="select($event, option, i)">
                <label [attr.for]="name + i">
                    {{ option.label || option}}
                </label>
                <input [hidden]="true" [name]="name" type="radio" [value]="option.checked || option" [attr.id]="name + i">
            </div>
            <span class="active-indicator" [@tileState]="state" [hidden]="(activeTile === undefined || activeTile === null)"></span>
        </div>
    `,
    animations: [
        trigger('tileState', [
            state('inactive', style({
                opacity: '0'
            })),
            state('active', style({
                opacity: '1'
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out'))
        ])
    ]
})
export class NovoTilesElement implements ControlValueAccessor, OnInit {
    @Input() name: String;
    @Input() options: any;
    @Input() required: boolean;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Output() onDisabledOptionClick: EventEmitter<any> = new EventEmitter();

    _options: Array<any> = [];
    activeTile: any = null;
    state: String = 'inactive';

    model: any;
    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        this.name = this.name || '';
        this.setupOptions();
    }

    setupOptions() {
        if (this.options && this.options.length && (this.options[0].value === undefined || this.options[0].value === null)) {
            this._options = this.options.map((x) => {
                let item = { value: x, label: x, checked: this.model === x };
                return item;
            });
        } else {
            this._options = this.options.map((x) => {
                x.checked = this.model === x.value;
                if (x.checked) {
                    this.setTile(x);
                }
                return x;
            });
        }
    }

    select(event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        if (!item.disabled) {
            for (let option of this._options) {
                option.checked = false;
            }

            item.checked = !item.checked;
            this.onChange.emit(item.value);
            this.onModelChange(item.value);
            this.setTile(item);
        } else {
            this.onDisabledOptionClick.emit(item);
        }
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

            // These style adjustments need to occur in this order.
            setTimeout(() => {
                ind.style.width = `${w + 4}px`;
                setTimeout(() => {
                    ind.style.transform = `translateX(${left}px)`;
                    setTimeout(() => {
                        this.state = 'active';
                    });
                });
            });
        });
    }

    writeValue(model: any): void {
        this.model = model;
        if (!Helpers.isBlank(model)) {
            this.setupOptions();
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}
