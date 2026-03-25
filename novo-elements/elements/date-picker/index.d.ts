import * as i0 from '@angular/core';
import { OnInit, EventEmitter, ElementRef, ChangeDetectorRef, OnChanges, AfterViewInit, DestroyRef, SimpleChanges } from '@angular/core';
import * as i6 from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Day } from 'date-fns';
import { NovoLabelService, DateFormatService } from 'novo-elements/services';
import { DatePickerSelectModes, modelTypes, rangeSelectModes, RangeModel } from 'novo-elements/utils';
import * as i9 from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import * as i5 from '@angular/common';
import * as i7 from 'novo-elements/elements/button';
import * as i8 from 'novo-elements/pipes';
import * as i10 from 'angular-imask';
import * as i11 from 'novo-elements/elements/icon';
import * as i12 from 'novo-elements/elements/chips';
import * as i13 from 'novo-elements/elements/calendar';

declare class NovoDatePickerElement implements ControlValueAccessor, OnInit {
    labels: NovoLabelService;
    private element;
    private cdr;
    private _sanitizer;
    /**
     * The minimum year to allow selected in year select view
     **/
    minYear: string | number;
    /**
     * The maximum year to allow selected in year select view
     **/
    maxYear: string | number;
    /**
     * The minimum date that can be selected.
     **/
    start: Date;
    /**
     * The maximum date that can be selected.
     **/
    end: Date;
    /**
     * **Deprecated** Whether the date-picker is used outside of an overlay.
     **/
    inline: boolean;
    /**
     * Day of the week the calendar should display first, Sunday=0...Saturday=6
     **/
    weekStart: Day;
    /**
     * Certain dates that are already selected.
     **/
    preselected: Date[];
    /**
     * Whether the days for the previous and next month should be hidden.
     **/
    hideOverflowDays: boolean;
    /**
     * Whether the footer should be hidden - contains `today`/`cancel`/`save` buttons
     **/
    hideFooter: boolean;
    /**
     * Whether to hide the `today` button.
     **/
    hideToday: boolean;
    disabledDateMessage: string;
    dateForInitialView?: Date;
    onSelect: EventEmitter<any>;
    _mode: DatePickerSelectModes;
    _range: boolean;
    _weekRangeSelect: boolean;
    _numberOfMonths: number[];
    /**
     * Number of months to display at once.
     * @default 1
     **/
    get numberOfMonths(): number;
    set numberOfMonths(value: number);
    /**
     * How the date selection should work.
     * @default single
     **/
    get mode(): DatePickerSelectModes;
    set mode(value: DatePickerSelectModes);
    /**
     * **deprecated** please use `mode="range"`.
     **/
    get range(): boolean;
    set range(value: boolean);
    /**
     * **deprecated** please use `mode="week"`.
     **/
    get weekRangeSelect(): boolean;
    set weekRangeSelect(value: boolean);
    model: modelTypes;
    activeDate: Date;
    _selection: Date[];
    preview: Date[];
    startDateLabel: string;
    endDateLabel: string;
    rangeSelectMode: rangeSelectModes;
    _onChange: Function;
    _onTouched: Function;
    get selection(): Date[];
    set selection(value: Date[]);
    constructor(labels: NovoLabelService, element: ElementRef, cdr: ChangeDetectorRef, _sanitizer: DomSanitizer);
    ngOnInit(): void;
    updateView(date: any): void;
    updateSelection(selected: Date[], fireEvents?: boolean): void;
    eventData(date: Date): {
        year: number;
        month: any;
        day: any;
        date: Date;
    };
    fireSelect(): void;
    fireRangeSelect(): void;
    setToday(): void;
    toggleRangeSelect(range: rangeSelectModes): void;
    modelToSelection(model: modelTypes): void;
    writeValue(model: modelTypes): void;
    setRangeSelection(): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDatePickerElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDatePickerElement, "novo-date-picker", never, { "minYear": { "alias": "minYear"; "required": false; }; "maxYear": { "alias": "maxYear"; "required": false; }; "start": { "alias": "start"; "required": false; }; "end": { "alias": "end"; "required": false; }; "inline": { "alias": "inline"; "required": false; }; "weekStart": { "alias": "weekStart"; "required": false; }; "preselected": { "alias": "preselected"; "required": false; }; "hideOverflowDays": { "alias": "hideOverflowDays"; "required": false; }; "hideFooter": { "alias": "hideFooter"; "required": false; }; "hideToday": { "alias": "hideToday"; "required": false; }; "disabledDateMessage": { "alias": "disabledDateMessage"; "required": false; }; "dateForInitialView": { "alias": "dateForInitialView"; "required": false; }; "numberOfMonths": { "alias": "numberOfMonths"; "required": false; }; "mode": { "alias": "mode"; "required": false; }; "range": { "alias": "range"; "required": false; }; "weekRangeSelect": { "alias": "weekRangeSelect"; "required": false; }; }, { "onSelect": "onSelect"; }, never, [".footer-content"], false, never>;
}

declare class NovoDatePickerInputElement implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    private _changeDetectorRef;
    dateFormatService: DateFormatService;
    private destroyRef;
    value: any;
    formattedValue: string;
    showInvalidDateError: boolean;
    invalidDateErrorMessage: string;
    private userDefinedFormat;
    private isInvalidDate;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when autocomplete has been touched */
    _onTouched: () => void;
    /**
     * The name of the form field, get passed to the native `input` element
     **/
    name: string;
    /**
     * The minimum date that can be selected.
     **/
    start: Date;
    /**
     * The maximum date that can be selected.
     **/
    end: Date;
    /**
     * Placeholder text to display in the input when it is empty.
     **/
    placeholder: string;
    /**
     * MaskOptions to pass to the angular-imask plugin
     **/
    maskOptions: any;
    /**
     * The format to use to parse and render dates: DD/MM/YYYY or MM/DD/YYYY
     **/
    format: string;
    /**
     * Whether to apply a text mask to the date (see `maskOptions`). Only enabled if allowInvalidDate is false.
     */
    textMaskEnabled: boolean;
    /**
     * Whether the input should emit values when the field does not yet constitute a valid date
     */
    allowInvalidDate: boolean;
    /**
     * The element to use as the parent for the date picker's overlay (to determine bounds sizing). By default,
     * this refers to the input element itself, but may be a container if it has a padded border.
     */
    overlayOnElement: ElementRef;
    /**
     * Whether the footer in the date picker which contains `today` button and cancel/save buttons should be hidden.
     **/
    hideFooter: boolean;
    /**
     * Whether to hide the 'today' button
     */
    hideToday: boolean;
    /**
     * Whether to display the picker together with 'cancel'/'save' buttons
     */
    hasButtons: boolean;
    /**
     * Sets the field as to appear disabled, users will not be able to interact with the text field.
     **/
    disabled: boolean;
    /**
     * A message to display in the picker overlay when a given date is disabled through minimum/maximum
     */
    disabledDateMessage: string;
    /**
     * An optional date/month to show in the DatePicker initially besides the current date/month
     */
    dateForInitialView?: Date;
    /**
     * Day of the week the calendar should display first, Sunday=0...Saturday=6
     **/
    weekStart: Day;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    changeEvent: EventEmitter<FocusEvent>;
    onSave: EventEmitter<any>;
    onCancel: EventEmitter<any>;
    valueCleared: EventEmitter<any>;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    constructor(element: ElementRef, labels: NovoLabelService, _changeDetectorRef: ChangeDetectorRef, dateFormatService: DateFormatService, destroyRef: DestroyRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    _initFormatOptions(): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    get overlayElement(): ElementRef;
    /** END: Convenient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleInput(event: KeyboardEvent): void;
    _handleBlur(event: FocusEvent): void;
    _handleOverlayClickout(): void;
    _handleFocus(event: FocusEvent): void;
    _handleValueUpdate(value: string, blur: boolean): void;
    handleMaskAccept(maskValue: string): void;
    protected formatDate(value: string, blur: boolean): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(disabled: boolean): void;
    handleInvalidDate(fromPanelClose?: boolean): void;
    setupInvalidDateErrorMessage(): void;
    dispatchOnChange(newValue?: any, blur?: boolean, skip?: boolean): void;
    private _setTriggerValue;
    private _setCalendarValue;
    private _setFormValue;
    onSelected(event: any): void;
    private setValue;
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event: any | null): void;
    /**
     * Respond to clicking the X button within the input
     */
    clearAction(): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(): void;
    formatDateValue(value: any): any;
    get hasValue(): boolean;
    save(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDatePickerInputElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDatePickerInputElement, "novo-date-picker-input", never, { "name": { "alias": "name"; "required": false; }; "start": { "alias": "start"; "required": false; }; "end": { "alias": "end"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "maskOptions": { "alias": "maskOptions"; "required": false; }; "format": { "alias": "format"; "required": false; }; "textMaskEnabled": { "alias": "textMaskEnabled"; "required": false; }; "allowInvalidDate": { "alias": "allowInvalidDate"; "required": false; }; "overlayOnElement": { "alias": "overlayOnElement"; "required": false; }; "hideFooter": { "alias": "hideFooter"; "required": false; }; "hideToday": { "alias": "hideToday"; "required": false; }; "hasButtons": { "alias": "hasButtons"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "disabledDateMessage": { "alias": "disabledDateMessage"; "required": false; }; "dateForInitialView": { "alias": "dateForInitialView"; "required": false; }; "weekStart": { "alias": "weekStart"; "required": false; }; }, { "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "changeEvent": "changeEvent"; "onSave": "onSave"; "onCancel": "onCancel"; "valueCleared": "valueCleared"; }, never, never, false, never>;
}

declare class NovoDateRangeInputElement implements OnInit, OnChanges, ControlValueAccessor {
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
    weekRangeSelect: boolean;
    mode: string;
    placeholder: string;
    maskOptions: any;
    format: string;
    textMaskEnabled: boolean;
    allowInvalidDate: boolean;
    weekStart: number;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    change: EventEmitter<any>;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    private _value;
    private _disabled;
    get value(): RangeModel;
    set value(value: RangeModel);
    get disabled(): boolean;
    set disabled(value: boolean);
    constructor(element: ElementRef, labels: NovoLabelService, cdr: ChangeDetectorRef, dateFormatService: DateFormatService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _initFormatOptions(): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    /** END: Convenient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleBlur(event: FocusEvent): void;
    _handleFocus(event: FocusEvent): void;
    protected formatDate(value: string): Date;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onChangeCallback;
    private onTouchedCallback;
    _onStartInputChange(event: KeyboardEvent): void;
    _onEndInputChange(event: KeyboardEvent): void;
    private _setFormValue;
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event: any | null): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearStartValue(): void;
    clearEndValue(): void;
    formatDateValue(value: any): any;
    get hasStartValue(): boolean;
    get hasEndValue(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateRangeInputElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDateRangeInputElement, "novo-date-range-input", never, { "name": { "alias": "name"; "required": false; }; "start": { "alias": "start"; "required": false; }; "end": { "alias": "end"; "required": false; }; "weekRangeSelect": { "alias": "weekRangeSelect"; "required": false; }; "mode": { "alias": "mode"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "maskOptions": { "alias": "maskOptions"; "required": false; }; "format": { "alias": "format"; "required": false; }; "textMaskEnabled": { "alias": "textMaskEnabled"; "required": false; }; "allowInvalidDate": { "alias": "allowInvalidDate"; "required": false; }; "weekStart": { "alias": "weekStart"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "change": "change"; "blur": "blur"; "focus": "focus"; }, never, never, false, never>;
}

declare class NovoMultiDateInputElement implements OnInit, ControlValueAccessor {
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

declare class NovoDatePickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDatePickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoDatePickerModule, [typeof NovoDatePickerElement, typeof NovoDatePickerInputElement, typeof NovoDateRangeInputElement, typeof NovoMultiDateInputElement], [typeof i5.CommonModule, typeof i6.FormsModule, typeof i7.NovoButtonModule, typeof i8.NovoPipesModule, typeof i9.NovoOverlayModule, typeof i10.IMaskModule, typeof i11.NovoIconModule, typeof i12.NovoChipsModule, typeof i13.NovoCalendarModule], [typeof NovoDatePickerElement, typeof NovoDatePickerInputElement, typeof NovoDateRangeInputElement, typeof NovoMultiDateInputElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoDatePickerModule>;
}

export { NovoDatePickerElement, NovoDatePickerInputElement, NovoDatePickerModule, NovoDateRangeInputElement, NovoMultiDateInputElement };
