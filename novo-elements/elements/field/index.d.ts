import * as i0 from '@angular/core';
import { OnInit, InjectionToken, AfterContentInit, OnDestroy, ElementRef, QueryList, EventEmitter, ChangeDetectorRef, OnChanges, AfterViewInit, DoCheck, NgZone, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as _angular_forms from '@angular/forms';
import { NgControl, NgForm, FormGroupDirective, ControlValueAccessor } from '@angular/forms';
import * as i14 from 'novo-elements/elements/common';
import { NovoLabel, HasOverlay, NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { Observable, Subject } from 'rxjs';
import { BooleanInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { IMaskDirective } from 'angular-imask';
import { NovoLabelService, DateFormatService } from 'novo-elements/services';
import { DateParseOptions } from 'novo-elements/utils';
import * as i13 from 'novo-elements/elements/button';
import { NovoButtonElement } from 'novo-elements/elements/button';
import * as i12 from '@angular/common';

declare class NovoErrorElement implements OnInit {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoErrorElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoErrorElement, "novo-error", never, {}, {}, never, ["*"], false, never>;
}

/** An interface which allows a control to work inside of a `NovoField`. */
declare abstract class NovoFieldControl<T> {
    /** The value of the control. */
    value: T | null;
    /** The last key pressed. */
    lastKeyValue: string | null;
    /** The last cursor position. */
    lastCaretPosition: number | null;
    /**
     * Stream that emits whenever the state of the control changes such that the parent `NovoField`
     * needs to run change detection.
     */
    readonly stateChanges: Observable<void>;
    /** The element ID for this control. */
    readonly id: string;
    /** The placeholder for this control. */
    readonly placeholder: string;
    /** Gets the NgControl for this control. */
    readonly ngControl: NgControl | null;
    /** Whether the control is focused. */
    readonly focused: boolean;
    /** Whether the control is empty. */
    readonly empty: boolean;
    /** Whether the `NovoField` label should try to float. */
    /** Whether the control is required. */
    readonly required: boolean;
    /** Whether the control is disabled. */
    readonly disabled: boolean;
    /** Whether the control is in an error state. */
    readonly errorState: boolean;
    /** Whether the control can have multiple values. */
    readonly multiple?: boolean;
    /**
     * An optional name for the control type that can be used to distinguish `novo-form-field` elements
     * based on their control type. The form field will add a class,
     * `novo-form-field-type-{{controlType}}` to its root element.
     */
    readonly controlType?: string;
    /**
     * Whether the input is currently in an autofilled state. If property is not present on the
     * control it is assumed to be false.
     */
    readonly autofilled?: boolean;
    /** Sets the list of element IDs that currently describe this control. */
    abstract setDescribedByIds(ids: string[]): void;
    /** Handles a click on the control's container. */
    abstract onContainerClick(event: MouseEvent): void;
    abstract focus(options?: FocusOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldControl<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoFieldControl<any>, never, never, {}, {}, never, never, true, never>;
}

declare class NovoHintElement implements OnInit {
    /** Whether to align the hint label at the start or end of the line. */
    align: 'start' | 'end';
    /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
    id: string;
    ngOnInit(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHintElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoHintElement, "novo-hint", never, { "align": { "alias": "align"; "required": false; }; "id": { "alias": "id"; "required": false; }; }, {}, never, ["*"], false, never>;
}

declare class NovoFieldPrefixDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldPrefixDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoFieldPrefixDirective, "[novoPrefix]", never, {}, {}, never, never, false, never>;
}
declare class NovoFieldSuffixDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldSuffixDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoFieldSuffixDirective, "[novoSuffix]", never, {}, {}, never, never, false, never>;
}
declare const NOVO_FORM_FIELD: InjectionToken<NovoFieldElement>;
declare class NovoFieldElement implements AfterContentInit, OnDestroy {
    _elementRef: ElementRef;
    private _changeDetectorRef;
    private _labelClicks;
    _inputContainerRef: ElementRef;
    _labelElement: NovoLabel;
    _hintElements: QueryList<NovoHintElement>;
    _errorElements: QueryList<NovoErrorElement>;
    _prefixElements: QueryList<NovoFieldPrefixDirective>;
    _suffixElements: QueryList<NovoFieldSuffixDirective>;
    _overlayElements: QueryList<HasOverlay>;
    _control: NovoFieldControl<any>;
    layout: 'horizontal' | 'vertical';
    appearance: 'standard' | 'outline' | 'fill' | 'list';
    /**
     * When this field has a picker element, express which element it should be parented to
     */
    customOverlayOrigin: ElementRef;
    width: string;
    private _destroyed;
    valueChanges: EventEmitter<any>;
    stateChanges: EventEmitter<void>;
    constructor(_elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef);
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field should be
     * positioned relative to.
     */
    getConnectedOverlayOrigin(): ElementRef;
    ngAfterContentInit(): any;
    ngOnDestroy(): void;
    /** Throws an error if the form field's control is missing. */
    protected _validateControlChild(): void;
    blurEventIsInField(blurEvt: FocusEvent): boolean;
    _handleContainerClick(evt: MouseEvent): void;
    _isUnderlinedInput(): boolean;
    /** Determines whether to display hints or errors. */
    _getDisplayedMessages(): 'error' | 'hint';
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    _shouldForward(prop: keyof NgControl): boolean;
    _hasLabel(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFieldElement, "novo-field", never, { "layout": { "alias": "layout"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "customOverlayOrigin": { "alias": "customOverlayOrigin"; "required": false; }; "width": { "alias": "width"; "required": false; }; }, { "valueChanges": "valueChanges"; "stateChanges": "stateChanges"; }, ["_labelElement", "_control", "_hintElements", "_errorElements", "_prefixElements", "_suffixElements", "_overlayElements"], ["novo-label", "[novoPrefix]", "*", "[novoSuffix]", "novo-error", "novo-hint", "novo-hint[align=end]"], false, never>;
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * This token is used to inject the object whose value should be set into `NovoInput`. If none is
 * provided, the native `HTMLInputElement` is used. Directives like `MatDatepickerInput` can provide
 * themselves for this token, in order to make `NovoInput` delegate the getting and setting of the
 * value to them.
 */
declare const NOVO_INPUT_VALUE_ACCESSOR: InjectionToken<{
    value: any;
}>;
declare class NovoInputBase {
    _parentForm: NgForm;
    _parentFormGroup: FormGroupDirective;
    /** @docs-private */
    ngControl: NgControl;
    constructor(_parentForm: NgForm, _parentFormGroup: FormGroupDirective, 
    /** @docs-private */
    ngControl: NgControl);
}
/** Directive that allows a native input to work inside a `NovoField`. */
declare class NovoInput extends NovoInputBase implements NovoFieldControl<any>, OnChanges, OnDestroy, AfterViewInit, DoCheck {
    protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    protected _platform: Platform;
    /** @docs-private */
    ngControl: NgControl;
    private _autofillMonitor;
    protected _uid: string;
    protected _previousNativeValue: any;
    private _inputValueAccessor;
    /** The aria-describedby attribute on the input for improved a11y. */
    _ariaDescribedby: string;
    /** Whether the component is being rendered on the server. */
    readonly _isServer: boolean;
    /** Whether the component is a native html select. */
    readonly _isNativeSelect: boolean;
    /** Whether the component is a textarea. */
    readonly _isTextarea: boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    focused: boolean;
    errorState: boolean;
    /** @docs-private Implemented as part of NovoFieldControl. */
    lastKeyValue: string;
    /** @docs-private Implemented as part of NovoFieldControl.*/
    lastCaretPosition: number | null;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    readonly stateChanges: Subject<void>;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    controlType: string;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    autofilled: boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    protected _disabled: boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get id(): string;
    set id(value: string);
    protected _id: string;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    placeholder: string;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required(): boolean;
    set required(value: boolean);
    protected _required: boolean;
    /** Input type of the element. */
    get type(): string;
    set type(value: string);
    protected _type: string;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get value(): string;
    set value(value: string);
    /** Whether the element is readonly. */
    get readonly(): boolean;
    set readonly(value: boolean);
    private _readonly;
    protected _neverEmptyInputTypes: string[];
    constructor(_elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, _platform: Platform, 
    /** @docs-private */
    ngControl: NgControl, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, inputValueAccessor: any, _autofillMonitor: AutofillMonitor, ngZone: NgZone);
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    /** Focuses the input. */
    focus(options?: FocusOptions): void;
    _focusChanged(isFocused: boolean): void;
    _onInput(event: InputEvent): void;
    /** Does some manual dirty checking on the native input `value` property. */
    protected _dirtyCheckNativeValue(): void;
    /** Make sure the input is a supported type. */
    protected _validateType(): void;
    /** Checks whether the input type is one of the types that are never empty. */
    protected _isNeverEmpty(): boolean;
    /** Checks whether the input is invalid based on the native validation. */
    protected _isBadInput(): boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get empty(): boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get shouldLabelFloat(): boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    setDescribedByIds(ids: string[]): void;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    onContainerClick(): void;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_readonly: BooleanInput;
    static ngAcceptInputType_required: BooleanInput;
    static ngAcceptInputType_value: any;
    onSelect: EventEmitter<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoInput, [null, null, { optional: true; self: true; }, { optional: true; }, { optional: true; }, { optional: true; self: true; }, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoInput, "input[novoInput], textarea[novoInput], select[novoInput]", never, { "disabled": { "alias": "disabled"; "required": false; }; "id": { "alias": "id"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "required": { "alias": "required"; "required": false; }; "type": { "alias": "type"; "required": false; }; "value": { "alias": "value"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, false, never>;
}

declare class NovoFieldsElement implements AfterContentInit {
    _fields: QueryList<NovoFieldElement>;
    _layout: 'horizontal' | 'vertical';
    get layout(): any;
    set layout(value: any);
    _appearance: 'standard' | 'outline' | 'fill' | 'list';
    get appearance(): any;
    set appearance(value: any);
    fullWidth: boolean;
    ngAfterContentInit(): any;
    private _updateFieldLayout;
    private _updateFieldAppearance;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldsElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFieldsElement, "novo-fields", never, { "layout": { "alias": "layout"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "fullWidth": { "alias": "fullWidth"; "required": false; }; }, {}, ["_fields"], ["*"], false, never>;
}

declare const NOVO_INPUT_FORMAT: InjectionToken<NovoInputFormat<any>>;
interface NovoInputFormat<T = any> extends ControlValueAccessor {
    valueChange: EventEmitter<any>;
    formatValue(value: T): string;
}
declare enum DATE_FORMATS {
    DATE = "date",
    ISO8601 = "iso8601",
    STRING = "string",
    YEAR_MONTH_DAY = "yyyy-mm-dd"
}

declare const TIMEFORMAT_VALUE_ACCESSOR: {
    provide: i0.InjectionToken<readonly _angular_forms.ControlValueAccessor[]>;
    useExisting: i0.Type<any>;
    multi: boolean;
};
declare enum TIME_FORMATS {
    DATE = "date",
    ISO8601 = "iso8601",
    STRING = "string"
}
declare class NovoTimeFormatDirective extends IMaskDirective<any> implements NovoInputFormat, AfterViewInit, OnChanges {
    private labels;
    private cdr;
    valueChange: EventEmitter<any>;
    military: boolean;
    timeFormat: TIME_FORMATS;
    constructor(labels: NovoLabelService, cdr: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    initFormatOptions(): void;
    _checkInput(event: InputEvent): void;
    _handleBlur(event: FocusEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    normalize(value: string): string;
    formatValue(value: any): string;
    formatAsIso(date: Date): string;
    convertTime12to24(time12h: string): string;
    convertTime24to12(time24h: string): string;
    writeValue(value: any): void;
    registerOnChange(fn: (date: any) => void): void;
    hourOneFormatRequired(hourInput: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTimeFormatDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoTimeFormatDirective, "input[timeFormat]", never, { "military": { "alias": "military"; "required": false; }; "timeFormat": { "alias": "timeFormat"; "required": false; }; }, {}, never, never, false, never>;
}

declare const DATEFORMAT_VALUE_ACCESSOR: {
    provide: i0.InjectionToken<readonly _angular_forms.ControlValueAccessor[]>;
    useExisting: i0.Type<any>;
    multi: boolean;
};
declare class NovoDateFormatDirective extends IMaskDirective<any> {
    private labels;
    private dateFormatService;
    valueChange: EventEmitter<any>;
    dateFormat: DATE_FORMATS;
    constructor(labels: NovoLabelService, dateFormatService: DateFormatService);
    normalize(value: string): string;
    formatAsIso(date: Date): string;
    formatYearMonthDay(date: Date): string;
    formatValue(value: any, options?: DateParseOptions): string;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateFormatDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDateFormatDirective, "input[dateFormat]", never, { "dateFormat": { "alias": "dateFormat"; "required": false; }; }, {}, never, never, false, never>;
}

declare const DATETIMEFORMAT_VALUE_ACCESSOR: {
    provide: i0.InjectionToken<readonly _angular_forms.ControlValueAccessor[]>;
    useExisting: i0.Type<any>;
    multi: boolean;
};
declare class NovoDateTimeFormatDirective extends IMaskDirective<any> implements NovoInputFormat, OnChanges {
    private labels;
    private dateFormat;
    valueChange: EventEmitter<any>;
    military: boolean;
    dateTimeFormat: DATE_FORMATS;
    constructor(labels: NovoLabelService, dateFormat: DateFormatService);
    initFormatOptions(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _checkInput(event: InputEvent): void;
    _handleBlur(event: FocusEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    normalize(value: string, options?: DateParseOptions): string;
    formatAsIso(date: Date): string;
    convertTime12to24(time12h: string): string;
    convertTime24to12(time24h: string): string;
    formatValue(value: Date | string, options?: DateParseOptions): string;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    hourOneFormatRequired(hourInput: string): boolean;
    get initialValue(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateTimeFormatDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDateTimeFormatDirective, "input[dateTimeFormat]", never, { "military": { "alias": "military"; "required": false; }; "dateTimeFormat": { "alias": "dateTimeFormat"; "required": false; }; }, {}, never, never, false, never>;
}

declare const DATERANGEFORMAT_VALUE_ACCESSOR: {
    provide: i0.InjectionToken<readonly _angular_forms.ControlValueAccessor[]>;
    useExisting: i0.Type<any>;
    multi: boolean;
};
type DateRange = {
    startDate: Date;
    endDate: Date;
};
declare class NovoDateRangeFormatDirective extends IMaskDirective<any> {
    private labels;
    private dateFormat;
    valueChange: EventEmitter<any>;
    dateRangeFormat: DATE_FORMATS;
    constructor(labels: NovoLabelService, dateFormat: DateFormatService);
    normalize(value: string | Date, options?: DateParseOptions): string;
    formatAsIso(value: DateRange): string;
    formatValue(value: DateRange): string;
    formatDate(source: Date | string): string;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    extractDatesFromInput(value: any): {
        startDate: Date;
        endDate: Date;
    };
    validate(dateStr: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateRangeFormatDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDateRangeFormatDirective, "input[dateRangeFormat]", never, { "dateRangeFormat": { "alias": "dateRangeFormat"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoPickerToggleElement<T = any> implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
    private _elementRef;
    private cdr;
    private _formField;
    private _stateChanges;
    private _onDestroy;
    /** Datepicker instance that the button will toggle. */
    picker: T;
    icon: string;
    /** Tabindex for the toggle. */
    tabIndex: number | null;
    /** Screenreader label for the button. */
    ariaLabel: string;
    /** Determines whether the overlay is triggered on input focus or solely button click. */
    triggerOnFocus: boolean;
    /** An id to select the correct overlay.*/
    overlayId: string;
    /** Width to pass to overlay.*/
    width: string;
    /** Whether the toggle button is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /** Underlying button element. */
    _button: NovoButtonElement;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    element: ElementRef;
    constructor(_elementRef: ElementRef, cdr: ChangeDetectorRef, defaultTabIndex: string, _formField: NovoFieldElement);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    checkPanel(): void;
    togglePanel(event?: Event): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(event?: Event): void;
    closePanel(event?: Event): void;
    get panelOpen(): boolean;
    private _watchStateChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoPickerToggleElement<any>, [null, null, { attribute: "tabindex"; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoPickerToggleElement<any>, "novo-picker-toggle", ["novoPickerToggle"], { "picker": { "alias": "for"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "tabIndex": { "alias": "tabIndex"; "required": false; }; "ariaLabel": { "alias": "aria-label"; "required": false; }; "triggerOnFocus": { "alias": "triggerOnFocus"; "required": false; }; "overlayId": { "alias": "overlayId"; "required": false; }; "width": { "alias": "width"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], false, never>;
}

/** Directive used to connect an input to a MatDatepicker. */
declare class NovoPickerDirective {
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

declare class NovoFieldModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoFieldModule, [typeof NovoFieldElement, typeof NovoHintElement, typeof NovoErrorElement, typeof NovoInput, typeof NovoFieldPrefixDirective, typeof NovoFieldSuffixDirective, typeof NovoFieldsElement, typeof NovoTimeFormatDirective, typeof NovoDateFormatDirective, typeof NovoDateTimeFormatDirective, typeof NovoDateRangeFormatDirective, typeof NovoPickerToggleElement, typeof NovoPickerDirective], [typeof i12.CommonModule, typeof i13.NovoButtonModule, typeof i14.NovoOverlayModule, typeof i14.NovoOptionModule, typeof i14.NovoCommonModule], [typeof NovoFieldElement, typeof NovoHintElement, typeof NovoErrorElement, typeof NovoInput, typeof NovoFieldPrefixDirective, typeof NovoFieldSuffixDirective, typeof NovoFieldsElement, typeof NovoTimeFormatDirective, typeof NovoDateFormatDirective, typeof NovoDateRangeFormatDirective, typeof NovoDateTimeFormatDirective, typeof NovoPickerToggleElement, typeof NovoPickerDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoFieldModule>;
}

export { DATEFORMAT_VALUE_ACCESSOR, DATERANGEFORMAT_VALUE_ACCESSOR, DATETIMEFORMAT_VALUE_ACCESSOR, DATE_FORMATS, NOVO_FORM_FIELD, NOVO_INPUT_FORMAT, NOVO_INPUT_VALUE_ACCESSOR, NovoDateFormatDirective, NovoDateRangeFormatDirective, NovoDateTimeFormatDirective, NovoErrorElement, NovoFieldControl, NovoFieldElement, NovoFieldModule, NovoFieldPrefixDirective, NovoFieldSuffixDirective, NovoFieldsElement, NovoHintElement, NovoInput, NovoPickerDirective, NovoPickerToggleElement, NovoTimeFormatDirective, TIMEFORMAT_VALUE_ACCESSOR, TIME_FORMATS };
export type { NovoInputFormat };
