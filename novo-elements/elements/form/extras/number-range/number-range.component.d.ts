import { OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class NumberRangeComponent implements OnInit, OnDestroy, ControlValueAccessor {
    labels: NovoLabelService;
    private formBuilder;
    rangeForm: FormGroup;
    _onChange: (value: any) => void;
    _onTouched: () => void;
    private _destroyed;
    constructor(labels: NovoLabelService, formBuilder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    minLessThanMaxValidator(group: FormGroup): {
        [key: string]: boolean;
    } | null;
    writeValue(value: {
        min: number;
        max: number;
    }): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumberRangeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NumberRangeComponent, "novo-number-range", never, {}, {}, never, never, false, never>;
}
