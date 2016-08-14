// NG2
import { Component, EventEmitter, Provider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { swallowEvent } from './../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const RADIO_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => NovoRadioElement),
    multi: true
});

@Component({
    selector: 'novo-radio',
    providers: [RADIO_VALUE_ACCESSOR],
    inputs: ['name', 'value', 'checked', 'vertical', 'label'],
    outputs: ['change'],
    template: `
            <input [name]="name" type="radio" [checked]="checked" [attr.id]="name" #radio>
            <label [attr.for]="name" (click)="select($event, radio)">
                <i [ngClass]="{'bhi-radio-empty': !radio.checked, 'bhi-radio-filled': radio.checked}"></i>
                {{label}}
                <ng-content></ng-content>
            </label>
    `,
    host: {
        '[class.vertical]': 'vertical'
    }
})
export class NovoRadioElement implements ControlValueAccessor {
    // Emitter for when the value changes
    change:EventEmitter = new EventEmitter();

    model:any;
    onModelChange:Function = () => {
    };
    onModelTouched:Function = () => {
    };

    /**
     * Handles the select of the radio button, will only change if a new radio is selected
     * @param event
     * @param radio
     */
    select(event, radio) {
        swallowEvent(event);
        // Only change the checked state if this is a new radio, they are not toggle buttons
        if (!radio.checked) {
            radio.checked = !radio.checked;
            this.change.emit(this.value);
            this.onModelChange(this.value);
        }
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
