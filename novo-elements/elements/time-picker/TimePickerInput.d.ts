import { ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class NovoTimePickerInputElement implements OnInit, OnChanges, ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    dateFormatService: DateFormatService;
    protected _changeDetectorRef: ChangeDetectorRef;
    value: any;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when autocomplete has been touched */
    _onTouched: () => void;
    name: string;
    placeholder: string;
    military: boolean;
    maskOptions: any;
    disabled: boolean;
    hasButtons: boolean;
    saveDisabled: boolean;
    overlayOnElement: ElementRef;
    /**
     * @deprecated don't use
     */
    analog: boolean;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    changeEvent: EventEmitter<FocusEvent>;
    onSave: EventEmitter<any>;
    onCancel: EventEmitter<any>;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    input: HTMLInputElement;
    constructor(element: ElementRef, labels: NovoLabelService, dateFormatService: DateFormatService, _changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    initFormatOptions(): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    get overlayElement(): ElementRef;
    /** END: Convenient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleInput(event: KeyboardEvent): void;
    _handleChange(event: Event): void;
    _handleBlur(event: FocusEvent): void;
    _handleFocus(event: FocusEvent): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(disabled: boolean): void;
    dispatchOnChange(newValue?: any, skip?: boolean): void;
    private _setTriggerValue;
    setValueAndClose(event: any | null): void;
    setValue(event: any | null): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(): void;
    get hasValue(): boolean;
    scrollToIndex(index: number): void;
    hourOneFormatRequired(hourInput: string): boolean;
    protected formatTime(value: string): void;
    save(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTimePickerInputElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTimePickerInputElement, "novo-time-picker-input", never, { "name": { "alias": "name"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "military": { "alias": "military"; "required": false; }; "maskOptions": { "alias": "maskOptions"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "hasButtons": { "alias": "hasButtons"; "required": false; }; "saveDisabled": { "alias": "saveDisabled"; "required": false; }; "overlayOnElement": { "alias": "overlayOnElement"; "required": false; }; "analog": { "alias": "analog"; "required": false; }; }, { "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "changeEvent": "changeEvent"; "onSave": "onSave"; "onCancel": "onCancel"; }, never, never, false, never>;
}
