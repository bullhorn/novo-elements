import * as i0 from '@angular/core';
import { EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import * as i4 from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import * as i3 from '@angular/common';
import * as i5 from 'novo-elements/elements/date-picker';
import * as i6 from 'novo-elements/elements/time-picker';
import * as i7 from 'angular-imask';
import * as i8 from 'novo-elements/elements/common';

declare class NovoDateTimePickerElement implements ControlValueAccessor {
    labels: NovoLabelService;
    private element;
    defaultTime: string;
    minYear: any;
    maxYear: any;
    start: any;
    end: any;
    military: any;
    weekStart: number;
    disabledDateMessage: string;
    onSelect: EventEmitter<any>;
    componentTabState: string;
    selectedLabel: string;
    hours: string;
    minutes: string;
    meridian: string;
    datePickerValue: Date;
    timePickerValue: Date;
    model: any;
    _onChange: Function;
    _onTouched: Function;
    constructor(labels: NovoLabelService, element: ElementRef);
    toggleView(tab: string): void;
    onModelChange(event: any): void;
    setDateLabels(value: Date): void;
    setTimeLabels(value: Date): void;
    onDateSelected(event: {
        month?: any;
        year?: any;
        day?: any;
        date?: Date;
    }): void;
    onTimeSelected(event: {
        hours?: number;
        minutes?: number;
        meridian?: string;
        date?: Date;
        text?: string;
    }): void;
    createFullDateValue(datePickerValue: Date, timePickerValue: Date): Date;
    writeValue(modelArg: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateTimePickerElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDateTimePickerElement, "novo-date-time-picker", never, { "defaultTime": { "alias": "defaultTime"; "required": false; }; "minYear": { "alias": "minYear"; "required": false; }; "maxYear": { "alias": "maxYear"; "required": false; }; "start": { "alias": "start"; "required": false; }; "end": { "alias": "end"; "required": false; }; "military": { "alias": "military"; "required": false; }; "weekStart": { "alias": "weekStart"; "required": false; }; "disabledDateMessage": { "alias": "disabledDateMessage"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, false, never>;
}

declare class NovoDateTimePickerInputElement implements ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    private _changeDetectorRef;
    value: any;
    datePart: any;
    timePart: any;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when autocomplete has been touched */
    _onTouched: () => void;
    name: string;
    start: Date;
    end: Date;
    placeholder: string;
    maskOptions: any;
    military: boolean;
    disabled: boolean;
    format: string;
    weekStart: number;
    disabledDateMessage: string;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    changeEvent: EventEmitter<FocusEvent>;
    constructor(element: ElementRef, labels: NovoLabelService, _changeDetectorRef: ChangeDetectorRef);
    writeValue(value: any): void;
    updateDate(event: any): void;
    updateTime(event: any): void;
    handleBlur(event: any): void;
    handleFocus(event: any): void;
    checkParts(): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(disabled: boolean): void;
    dispatchOnChange(newValue?: any): void;
    private _setTriggerValue;
    setValue(event: any | null): void;
    setValueAndClose(event: any | null): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(): void;
    get hasValue(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateTimePickerInputElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDateTimePickerInputElement, "novo-date-time-picker-input", never, { "name": { "alias": "name"; "required": false; }; "start": { "alias": "start"; "required": false; }; "end": { "alias": "end"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "maskOptions": { "alias": "maskOptions"; "required": false; }; "military": { "alias": "military"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "format": { "alias": "format"; "required": false; }; "weekStart": { "alias": "weekStart"; "required": false; }; "disabledDateMessage": { "alias": "disabledDateMessage"; "required": false; }; }, { "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "changeEvent": "changeEvent"; }, never, never, false, never>;
}

declare class NovoDateTimePickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateTimePickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoDateTimePickerModule, [typeof NovoDateTimePickerElement, typeof NovoDateTimePickerInputElement], [typeof i3.CommonModule, typeof i4.FormsModule, typeof i5.NovoDatePickerModule, typeof i6.NovoTimePickerModule, typeof i7.IMaskModule, typeof i8.NovoOverlayModule], [typeof NovoDateTimePickerElement, typeof NovoDateTimePickerInputElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoDateTimePickerModule>;
}

export { NovoDateTimePickerElement, NovoDateTimePickerInputElement, NovoDateTimePickerModule };
