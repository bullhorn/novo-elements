import { ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoInputFormat } from './formats/base-format';
import * as i0 from "@angular/core";
/** Directive used to connect an input to a MatDatepicker. */
export declare class NovoPickerDirective {
    private _elementRef;
    private formatter;
    /** The datepicker that this input is associated with. */
    set picker(picker: ControlValueAccessor);
    _picker: ControlValueAccessor;
    /**
     * `autocomplete` attribute to be set on the input element.
     * @docs-private
     */
    autocompleteAttribute: string;
    constructor(_elementRef: ElementRef<HTMLInputElement>, formatter: NovoInputFormat<any>);
    updateValue(value: any): void;
    updatePicker(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoPickerDirective, [null, { optional: true; self: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoPickerDirective, "input[picker]", never, { "picker": { "alias": "picker"; "required": false; }; "autocompleteAttribute": { "alias": "autocomplete"; "required": false; }; }, {}, never, never, false, never>;
}
