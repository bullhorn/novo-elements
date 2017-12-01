import { ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
export declare class NovoDateTimePickerElement implements ControlValueAccessor {
    labels: NovoLabelService;
    private element;
    minYear: any;
    maxYear: any;
    start: any;
    end: any;
    military: any;
    onSelect: EventEmitter<any>;
    componentTabState: string;
    selectedLabel: string;
    hours: string;
    minutes: string;
    meridian: string;
    datePickerValue: Date;
    timePickerValue: Date;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(labels: NovoLabelService, element: ElementRef);
    toggleView(tab: string): void;
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
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
}
