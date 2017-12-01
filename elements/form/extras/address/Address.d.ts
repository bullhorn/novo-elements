import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from '../../../../services/novo-label-service';
export declare class NovoAddressElement implements ControlValueAccessor, OnInit {
    labels: NovoLabelService;
    states: Array<any>;
    countries: Array<any>;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    onCountryChange(evt: any): void;
    onStateChange(evt: any): void;
    updateStates(): void;
    updateControl(): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
}
