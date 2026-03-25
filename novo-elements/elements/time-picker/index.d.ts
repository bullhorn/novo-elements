import * as i0 from '@angular/core';
import { OnInit, OnChanges, ElementRef, ChangeDetectorRef, EventEmitter, SimpleChanges } from '@angular/core';
import * as i4 from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService, DateFormatService } from 'novo-elements/services';
import * as i6 from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import * as i3 from '@angular/common';
import * as i5 from 'angular-imask';
import * as i7 from 'novo-elements/elements/list';
import * as i8 from 'novo-elements/elements/button';

declare enum TIME_VALUE_FORMATS {
    iso8601 = "iso8601",
    Date = "Date"
}
declare class NovoTimePickerElement implements ControlValueAccessor, OnInit, OnChanges {
    element: ElementRef;
    labels: NovoLabelService;
    protected cdr: ChangeDetectorRef;
    military: boolean;
    analog: boolean;
    inline: boolean;
    step: number;
    hasButtons: boolean;
    saveDisabled: boolean;
    onSelect: EventEmitter<any>;
    onSave: EventEmitter<any>;
    onCancel: EventEmitter<any>;
    hours: number;
    minutes: number;
    value: any;
    meridian: string;
    inBetween: boolean;
    hoursClass: string;
    activeHour: any;
    minutesClass: string;
    activeMinute: any;
    increments: string[];
    selected: string;
    MERIDIANS: Array<string>;
    MINUTES: Array<string>;
    HOURS: Array<string>;
    model: any;
    _onChange: Function;
    _onTouched: Function;
    flatten(arr: any): any[];
    constructor(element: ElementRef, labels: NovoLabelService, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    init(value: any, dispatch: any): void;
    checkBetween(value: any): void;
    setValue(event: any, value: any): void;
    setHours(event: any, hours: any, dispatch: any): void;
    setMinutes(event: any, minutes: any, dispatch: any): void;
    setPeriod(event: any, period: any, dispatch: any): void;
    dispatchChange(): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    convertTime12to24(time12h: string): string;
    save(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTimePickerElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTimePickerElement, "novo-time-picker", never, { "military": { "alias": "military"; "required": false; }; "analog": { "alias": "analog"; "required": false; }; "inline": { "alias": "inline"; "required": false; }; "step": { "alias": "step"; "required": false; }; "hasButtons": { "alias": "hasButtons"; "required": false; }; "saveDisabled": { "alias": "saveDisabled"; "required": false; }; }, { "onSelect": "onSelect"; "onSave": "onSave"; "onCancel": "onCancel"; }, never, never, false, never>;
}

declare class NovoTimePickerInputElement implements OnInit, OnChanges, ControlValueAccessor {
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

declare class NovoTimePickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTimePickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoTimePickerModule, [typeof NovoTimePickerElement, typeof NovoTimePickerInputElement], [typeof i3.CommonModule, typeof i4.FormsModule, typeof i5.IMaskModule, typeof i6.NovoOverlayModule, typeof i7.NovoListModule, typeof i8.NovoButtonModule], [typeof NovoTimePickerElement, typeof NovoTimePickerInputElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoTimePickerModule>;
}

export { NovoTimePickerElement, NovoTimePickerInputElement, NovoTimePickerModule, TIME_VALUE_FORMATS };
