// NG2
import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, trigger, state, style, transition, animate, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { Helpers } from '../../utils/helpers/helpers.service';

export interface IItem {
    value: any;
    label: string;
    checked?: boolean;
    disabled?: boolean;
}

@Component({
    selector: 'novo-tiles',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NovoTilesComponent),
        multi: true,
    }],
    template: `
        <div class="tile-container" [class.active]="focused">
            <div class="tile" *ngFor="let option of _options; let i = index" [ngClass]="{active: option.checked, disabled: option.disabled}" (click)="select($event, option, i)" [attr.data-automation-id]="option.label || option">
                <input class="tiles-input" [name]="name" type="radio" [value]="option.checked || option" [attr.id]="name + i" (change)="select($event, option, i)" (focus)="setFocus(true)" (blur)="setFocus(false)">
                <label [attr.for]="name + i" [attr.data-automation-id]="option.label || option">
                    {{ option.label || option }}
                </label>
            </div>
            <span class="active-indicator" [@tileState]="state" [hidden]="(activeTile === undefined || activeTile === null)"></span>
        </div>
    `,
    animations: [
        trigger('tileState', [
            state('inactive', style({
                opacity: '0',
            })),
            state('active', style({
                opacity: '1',
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out')),
        ]),
    ],
})
export class NovoTilesComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() public name: string;
    @Input() public options: IItem[] | string[];
    @Input() public required: boolean;
    @Output() public onChange: EventEmitter<any> = new EventEmitter();
    @Output() public onDisabledOptionClick: EventEmitter<any> = new EventEmitter();

    public _options: IItem[] = [];
    public activeTile: any = undefined;
    public state: String = 'inactive';
    public focused: boolean = false;

    public model: any;
    constructor(public element: ElementRef) {
    }

    public onModelChange: Function = () => {
    }
    public onModelTouched: Function = () => {
    }

    public setFocus(focus: boolean): void {
        this.focused = focus;
    }

    public ngOnInit(): void {
        this.name = this.name || '';
        this.setupOptions();
    }

    public ngOnChanges(change?: SimpleChanges): void {
        if (change.options && change.options.previousValue && change.options.previousValue.length > 0) {
            this._options = [];
            this.setupOptions();
        }
    }

    public registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    public registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    public writeValue(model: any): void {
        this.model = model;
        if (!Helpers.isBlank(model)) {
            this.setupOptions();
        }
    }

    public setupOptions(): void {
        if (this.options && this.options.length && (typeof this.options[0] === 'string')) {
            this._options = (this.options as (string)[]).map((x: string) => {
                let item: IItem = { value: x, label: x, checked: this.model === x };
                return item;
            });
        } else {
            this._options = (this.options as (IItem)[]).map((x: IItem) => {
                x.checked = this.model === x.value;
                if (x.checked) {
                    this.setTile(x);
                }
                return x;
            });
        }
    }

    public select(event: Event, item: IItem): void {
        event.stopPropagation();
        event.preventDefault();

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

    public setTile(item: IItem): void {
        if (item) {
            this.activeTile = item.value;
            this.moveTile();
        }
    }

    public moveTile(): void {
        setTimeout(() => {
            let ind: HTMLElement = this.element.nativeElement.querySelector('.active-indicator');
            let el: HTMLElement = this.element.nativeElement.querySelector('.tile.active');
            let w: number = el.clientWidth;
            let left: number = el.offsetLeft;

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
}
