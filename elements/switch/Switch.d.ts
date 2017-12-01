import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class NovoSwitchElement implements ControlValueAccessor {
    private ref;
    theme: string;
    onChange: EventEmitter<any>;
    _disabled: boolean;
    model: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    disabled: boolean;
    constructor(ref: ChangeDetectorRef);
    onKeydown(event: any): void;
    toggle(event: any): void;
    writeValue(model: boolean): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
}
