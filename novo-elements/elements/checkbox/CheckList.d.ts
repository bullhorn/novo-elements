import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class NovoCheckListElement implements ControlValueAccessor, OnInit {
    name: string;
    options: Array<any>;
    disabled: boolean;
    onSelect: EventEmitter<any>;
    _options: Array<any>;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    ngOnInit(): void;
    select(event: any, item: any): void;
    setupOptions(): void;
    setModel(): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCheckListElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoCheckListElement, "novo-check-list", never, { "name": { "alias": "name"; "required": false; }; "options": { "alias": "options"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, false, never>;
}
