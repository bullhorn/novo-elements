import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class NovoMultiDateInputElement implements OnInit, ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    private cdr;
    dateFormatService: DateFormatService;
    formattedStartDate: string;
    formattedEndDate: string;
    private userDefinedFormat;
    name: string;
    start: Date;
    end: Date;
    placeholder: string;
    format: string;
    allowInvalidDate: boolean;
    weekStart: number;
    chipsCount: number;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    change: EventEmitter<any>;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    private _value;
    private _disabled;
    private notShown;
    get value(): Date[];
    set value(value: Date[]);
    get disabled(): boolean;
    set disabled(value: boolean);
    constructor(element: ElementRef, labels: NovoLabelService, cdr: ChangeDetectorRef, dateFormatService: DateFormatService);
    ngOnInit(): void;
    formatter(value: any): string;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    /** END: Convenient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleBlur(event: FocusEvent): void;
    _handleFocus(event: FocusEvent): void;
    remove(event: any, date: Date): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onChangeCallback;
    private onTouchedCallback;
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event?: Date[]): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(): void;
    get hasValue(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoMultiDateInputElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoMultiDateInputElement, "novo-multi-date-input", never, { "name": { "alias": "name"; "required": false; }; "start": { "alias": "start"; "required": false; }; "end": { "alias": "end"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "format": { "alias": "format"; "required": false; }; "allowInvalidDate": { "alias": "allowInvalidDate"; "required": false; }; "weekStart": { "alias": "weekStart"; "required": false; }; "chipsCount": { "alias": "chipsCount"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "change": "change"; "blur": "blur"; "focus": "focus"; }, never, never, false, never>;
}
