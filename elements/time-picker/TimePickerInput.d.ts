import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoOverlayTemplate } from '../overlay/Overlay';
import { NovoLabelService } from '../../services/novo-label-service';
import { DateFormatService } from '../../services/date-format/DateFormat';
export declare class NovoTimePickerInputElement implements ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    private dateFormatService;
    protected _changeDetectorRef: ChangeDetectorRef;
    value: any;
    formattedValue: any;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when autocomplete has been touched */
    _onTouched: () => void;
    name: string;
    placeholder: string;
    military: boolean;
    maskOptions: any;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplate;
    constructor(element: ElementRef, labels: NovoLabelService, dateFormatService: DateFormatService, _changeDetectorRef: ChangeDetectorRef);
    /** BEGIN: Convienient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    readonly panelOpen: boolean;
    /** END: Convienient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleInput(event: KeyboardEvent): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    private _setTriggerValue(value);
    setValue(event: any | null): void;
    setValueAndClose(event: any | null): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(skip: any): void;
    formatDateValue(value: any): any;
    readonly hasValue: boolean;
}
