import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class NovoSwitchElement implements ControlValueAccessor {
    private ref;
    theme: string;
    icons: [string, string];
    disabled: boolean;
    onChange: EventEmitter<any>;
    private _value;
    get value(): boolean;
    set value(value: boolean);
    onModelChange: Function;
    onModelTouched: Function;
    constructor(ref: ChangeDetectorRef);
    onKeydown(event: KeyboardEvent): void;
    toggle(event: any): void;
    writeValue(model: boolean): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSwitchElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSwitchElement, "novo-switch", never, { "theme": { "alias": "theme"; "required": false; }; "icons": { "alias": "icons"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "onChange": "onChange"; }, never, ["*"], false, never>;
}
