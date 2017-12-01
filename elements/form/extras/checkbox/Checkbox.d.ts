import { OnInit, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class NovoCheckboxElement implements ControlValueAccessor, OnInit {
    private ref;
    name: string;
    label: string;
    indeterminate: boolean;
    disabled: boolean;
    layoutOptions: {
        iconStyle?: string;
    };
    boxIcon: boolean;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(ref: ChangeDetectorRef);
    ngOnInit(): void;
    select(event: any): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
}
