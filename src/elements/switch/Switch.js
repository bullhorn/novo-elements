// NG2
import { Component, Input, Output, EventEmitter, forwardRef, Provider } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { KeyCodes } from './../../utils/key-codes/KeyCodes';

// Value accessor for the component (supports ngModel)
const SWITCH_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => NovoSwitchElement),
    multi: true
});

@Component({
    selector: 'novo-switch',
    providers: [SWITCH_VALUE_ACCESSOR],
    inputs: ['theme'],
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
    host: {
        'role': 'checkbox',
        '[attr.aria-checked]': 'model',
        '[attr.aria-disabled]': 'disabled',
        '(keydown)': 'onKeydown($event)',
        '[class]': 'theme'
    }
})
export class NovoSwitchElement implements ControlValueAccessor {
    @Output() onChange:EventEmitter<any> = new EventEmitter();

    _disabled:boolean = false;
    model:any;
    onModelChange:Function = () => {
    };
    onModelTouched:Function = () => {
    };

    get disabled() {
        return this._disabled;
    }

    @Input('disabled')
    set disabled(value) {
        this._disabled = (!value);
    }

    onKeydown(event) {
        if (event.keyCode === KeyCodes.SPACE) {
            event.preventDefault();
            this.toggle(event);
        }
    }

    toggle(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        if (this.disabled) {
            return;
        }

        this.model = !this.model;
        this.onChange.next(this.model);
        this.onModelChange(this.model);
    }

    writeValue(model:any):void {
        this.model = model;
    }

    registerOnChange(fn:Function):void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn:Function):void {
        this.onModelTouched = fn;
    }
}
