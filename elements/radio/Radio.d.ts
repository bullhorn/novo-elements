import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class NovoRadioGroup {
}
export declare class NovoRadioElement implements ControlValueAccessor {
    private ref;
    name: string;
    value: any;
    checked: boolean;
    vertical: boolean;
    label: string;
    button: boolean;
    theme: string;
    icon: string;
    change: EventEmitter<any>;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(ref: ChangeDetectorRef);
    /**
     * Handles the select of the radio button, will only change if a new radio is selected
     * @param event
     * @param radio
     */
    select(event: any, radio: any): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
}
