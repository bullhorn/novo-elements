import { ElementRef, EventEmitter, OnInit, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
export interface RangeModal {
    startDate: Date;
    endDate: Date;
}
export declare type modelTypes = Date | RangeModal;
export interface Day {
    date: Date;
    isCurrentMonth?: boolean;
    isToday?: boolean;
    name?: string;
    number?: string | number;
}
export declare type rangeSelectModes = 'startDate' | 'endDate';
export declare class NovoDatePickerElement implements ControlValueAccessor, OnInit, OnChanges {
    labels: NovoLabelService;
    private element;
    minYear: string | number;
    maxYear: string | number;
    start: Date;
    end: Date;
    inline: boolean;
    range: boolean;
    weekRangeSelect: boolean;
    weekStart: number;
    onSelect: EventEmitter<any>;
    template: TemplateRef<any>;
    weekdays: string[];
    months: string[];
    years: Array<any>;
    view: string;
    heading: any;
    model: modelTypes;
    month: Date;
    monthLabel: string;
    weeks: any;
    selected: Date;
    selectedLabel: string;
    selected2: Date;
    selected2Label: string;
    hoverDay: any;
    rangeSelectMode: rangeSelectModes;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(labels: NovoLabelService, element: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    setupWeekdays(): string[];
    isSelectingRange(range: any, day: any, selected: any, selected2: any, hoverDay: any, rangeSelectMode: any, weekRangeSelect: any): boolean;
    isEndFill(range: any, day: any, selected: any, selected2: any): boolean;
    isStartFill(range: any, day: any, selected: any, selected2: any): boolean;
    isFiller(range: any, day: any, selected: any, selected2: any): boolean;
    isSelected(range: any, day: any, selected: any, selected2: any): boolean;
    isDisabled(day: any, start: any, end: any): boolean;
    updateView(date: any, fireEvents: boolean, markedSelected: boolean): void;
    setToday(): void;
    clearRange(): void;
    setMonth(month: number): void;
    setYear(year: number): void;
    select(event: Event, day: Day, fireEvents: boolean): void;
    fireRangeSelect(): void;
    open(event: Event, type: string): void;
    prevMonth(event: Event): void;
    nextMonth(event: Event): void;
    updateHeading(): void;
    /**
     * Remove the time aspect of the date
     * @param date
     * @returns with time stripped out
     */
    removeTime(date: any): Date;
    buildMonth(start: Date, month: Date): void;
    buildWeek(date: Date, month: Date): Array<Object>;
    toggleRangeSelect(range: rangeSelectModes): void;
    rangeHover(event: Event, day: Day): void;
    writeValue(model: modelTypes): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
}
