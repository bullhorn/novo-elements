import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from 'novo-elements/services';
import { DatePickerSelectModes, modelTypes, rangeSelectModes } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class NovoDatePickerElement implements ControlValueAccessor, OnInit {
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
