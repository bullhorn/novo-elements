// NG2
import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SPACE } from '@angular/cdk/keycodes';

// Value accessor for the component (supports ngModel)
const SWITCH_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSwitchComponent),
    multi: true,
};

@Component({
    selector: 'novo-switch',
    providers: [SWITCH_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./switch.component.scss'],
    template: `
        <div (click)="toggle($event)">
            <div class="novo-switch-container">
                <div class="novo-switch-bar"></div>
                <div class="novo-switch-thumb-container">
                    <div class="novo-switch-thumb"></div>
                </div>
            </div>
            <div class="novo-switch-label"><ng-content></ng-content></div>
        </div>
    `,
})
export class NovoSwitchComponent implements ControlValueAccessor {
    @HostBinding('attr.theme') @Input() public theme: string;
    @HostBinding('attr.role') public role: string = 'checkbox';
    @HostBinding('attr.disabled') public _disabled: boolean;

    @Output() public change: EventEmitter<any> = new EventEmitter();

    @HostBinding('attr.aria-checked') public model: boolean;

    public get disabled(): boolean {
        return this._disabled;
    }

    @Input('disabled')
    public set disabled(value: boolean) {
        this._disabled = (!value);
        this.ref.markForCheck();
    }

    constructor(private ref: ChangeDetectorRef) { }

    @HostListener('keydown', ['$event'])
    public onKeydown(event: KeyboardEvent): void {
        if (event.keyCode === SPACE) {
            event.preventDefault();
            this.toggle(event);
        }
    }

    public toggle(event: Event): void {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        if (this.disabled) {
            return;
        }

        this.model = !this.model;
        this.change.next(this.model);
        this.onModelChange(this.model);
        this.ref.markForCheck();
    }

    public onModelChange: Function = () => {
    }
    public onModelTouched: Function = () => {
    }

    public writeValue(model: boolean): void {
        this.model = model;
        this.ref.markForCheck();
    }

    public registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    public registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}
