import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class NovoDatePickerInputElement implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    private _changeDetectorRef;
    dateFormatService: DateFormatService;
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
    constructor(element: ElementRef, labels: NovoLabelService, _changeDetectorRef: ChangeDetectorRef, dateFormatService: DateFormatService);
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
