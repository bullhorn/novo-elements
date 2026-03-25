import * as _angular_platform_browser from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from '@angular/core';
import { OnInit, EventEmitter, ElementRef, ChangeDetectorRef, InjectionToken, FactoryProvider } from '@angular/core';
import { Day } from 'date-fns';
import { NovoLabelService } from 'novo-elements/services';
import { OverlayDate, DatePickerSelectModes, NovoDateSelectionStrategy, NovoMonthSelectEvent, NovoYearSelectEvent, NovoDateSelectEvent, DateLike, Day as Day$1 } from 'novo-elements/utils';
import * as i5 from '@angular/common';
import * as i6 from '@angular/forms';
import * as i7 from 'novo-elements/elements/button';
import * as i8 from 'novo-elements/pipes';
import * as i9 from 'novo-elements/elements/icon';

declare class NovoCalendarElement implements OnInit {
    labels: NovoLabelService;
    private element;
    private cdr;
    private _sanitizer;
    minYear: string | number;
    maxYear: string | number;
    minDate: string | number;
    maxDate: string | number;
    activeView: string;
    layout: string;
    _selected: Date[];
    get selected(): Date[];
    set selected(value: Date[]);
    selectedChange: EventEmitter<Date[]>;
    preview: Date[];
    previewChange: EventEmitter<Date[]>;
    activeDateChange: EventEmitter<Date>;
    overlays: OverlayDate[];
    disabledDateMessage: string;
    _activeDate: Date;
    _mode: DatePickerSelectModes;
    _numberOfMonths: number[];
    _weekStartsOn: Day;
    _strategy: NovoDateSelectionStrategy<any>;
    months: any;
    get activeDate(): Date;
    set activeDate(value: Date);
    get weekStartsOn(): Day;
    set weekStartsOn(value: Day);
    get numberOfMonths(): number;
    set numberOfMonths(value: number);
    get mode(): DatePickerSelectModes;
    set mode(value: DatePickerSelectModes);
    get hb_width(): _angular_platform_browser.SafeStyle;
    get hb_horiztonal(): boolean;
    get hb_vertical(): boolean;
    constructor(labels: NovoLabelService, element: ElementRef, cdr: ChangeDetectorRef, _sanitizer: DomSanitizer);
    ngOnInit(): void;
    updateView(activeDate: Date): void;
    setToday(): void;
    monthSelected({ event, month }: NovoMonthSelectEvent): void;
    yearSelected({ event, year }: NovoYearSelectEvent): void;
    dateSelected({ event, day }: NovoDateSelectEvent): void;
    updatePreview({ event, day }: NovoDateSelectEvent): void;
    prevMonth(event: Event): void;
    nextMonth(event: Event): void;
    openView(event: Event, type: string): void;
    _isRange(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCalendarElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoCalendarElement, "novo-calendar", never, { "minYear": { "alias": "minYear"; "required": false; }; "maxYear": { "alias": "maxYear"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "activeView": { "alias": "activeView"; "required": false; }; "layout": { "alias": "layout"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "preview": { "alias": "preview"; "required": false; }; "overlays": { "alias": "overlays"; "required": false; }; "disabledDateMessage": { "alias": "disabledDateMessage"; "required": false; }; "activeDate": { "alias": "activeDate"; "required": false; }; "weekStartsOn": { "alias": "weekStartsOn"; "required": false; }; "numberOfMonths": { "alias": "numberOfMonths"; "required": false; }; "mode": { "alias": "mode"; "required": false; }; }, { "selectedChange": "selectedChange"; "previewChange": "previewChange"; "activeDateChange": "activeDateChange"; }, never, never, false, never>;
}

declare class NovoMonthViewElement implements OnInit {
    labels: NovoLabelService;
    private element;
    private cdr;
    private _sanitizer;
    minDate: Date;
    maxDate: Date;
    activeDate: Date;
    selected: DateLike[];
    preview: DateLike[];
    overlays: OverlayDate[];
    disabledDateMessage: string;
    isRange: boolean;
    hideOverflowDays: boolean;
    _weekStartsOn: Day;
    get weekStartsOn(): Day;
    set weekStartsOn(value: Day);
    select: EventEmitter<any>;
    hover: EventEmitter<any>;
    weekdays: string[];
    monthNames: string[];
    monthLabel: string;
    weeks: any;
    constructor(labels: NovoLabelService, element: ElementRef, cdr: ChangeDetectorRef, _sanitizer: DomSanitizer);
    ngOnInit(): void;
    updateView(date: Date): void;
    onSelect(event: Event, day: Day$1): void;
    onHover(event: Event, day: Day$1): void;
    buildMonth(month: Date): void;
    buildWeek(date: Date, month: Date): Array<Object>;
    isDisabled(day: DateLike): boolean;
    /** Returns whether a cell should be marked as selected. */
    _isSelected(value: DateLike): DateLike;
    /** Returns whether a cell should be marked as preview. */
    _isPreview(value: DateLike): DateLike;
    /** Returns whether a cell should be marked as an overlay. */
    _isOverlay(value: DateLike): OverlayDate;
    /** Returns whether a cell should be marked as an overlay. */
    _hasOverlayType(value: DateLike): string;
    /** Gets whether a value is the start of the main range. */
    _isRangeStart(value: DateLike): boolean;
    /** Gets whether a value is the end of the main range. */
    _isRangeEnd(value: DateLike): boolean;
    /** Gets whether a value is within the currently-selected range. */
    _isInRange(value: DateLike): boolean;
    /** Gets whether a value is the start of the preview range. */
    _isPreviewStart(value: DateLike): boolean;
    /** Gets whether a value is the end of the preview range. */
    _isPreviewEnd(value: DateLike): boolean;
    /** Gets whether a value is inside the preview range. */
    _isInPreview(value: DateLike): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoMonthViewElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoMonthViewElement, "novo-month-view", never, { "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "activeDate": { "alias": "activeDate"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "preview": { "alias": "preview"; "required": false; }; "overlays": { "alias": "overlays"; "required": false; }; "disabledDateMessage": { "alias": "disabledDateMessage"; "required": false; }; "isRange": { "alias": "isRange"; "required": false; }; "hideOverflowDays": { "alias": "hideOverflowDays"; "required": false; }; "weekStartsOn": { "alias": "weekStartsOn"; "required": false; }; }, { "select": "select"; "hover": "hover"; }, never, never, false, never>;
}

declare class NovoMonthSelectElement implements OnInit {
    labels: NovoLabelService;
    activeDate: DateLike;
    selected: DateLike[];
    select: EventEmitter<any>;
    monthNames: string[];
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    onSelect(event: Event, month: number): void;
    _isActive(month: number): boolean;
    _isSelected(month: number): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoMonthSelectElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoMonthSelectElement, "novo-month-select", never, { "activeDate": { "alias": "activeDate"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "select": "select"; }, never, never, false, never>;
}

declare class NovoYearSelectElement implements OnInit {
    labels: NovoLabelService;
    minYear: string | number;
    maxYear: string | number;
    activeDate: DateLike;
    selected: DateLike[];
    select: EventEmitter<any>;
    years: Array<any>;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    onSelect(event: Event, year: number): void;
    _isActive(year: number): boolean;
    _isSelected(year: number): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoYearSelectElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoYearSelectElement, "novo-year-select", never, { "minYear": { "alias": "minYear"; "required": false; }; "maxYear": { "alias": "maxYear"; "required": false; }; "activeDate": { "alias": "activeDate"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "select": "select"; }, never, never, false, never>;
}

declare class NovoCalendarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCalendarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoCalendarModule, [typeof NovoMonthViewElement, typeof NovoMonthSelectElement, typeof NovoYearSelectElement, typeof NovoCalendarElement], [typeof i5.CommonModule, typeof i6.FormsModule, typeof i7.NovoButtonModule, typeof i8.NovoPipesModule, typeof i9.NovoIconModule], [typeof NovoMonthViewElement, typeof NovoMonthSelectElement, typeof NovoYearSelectElement, typeof NovoCalendarElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoCalendarModule>;
}

/** Injection token used to customize the date range selection behavior. */
declare const NOVO_DATE_SELECTION_STRATEGY: InjectionToken<NovoDateSelectionStrategy<DateLike>>;
/** Provides the default date selection behavior. Single Date */
declare class DefaultDateSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    selectionFinished(date: DateLike | null, currentValue: DateLike[], event: Event): DateLike[];
    createPreview(activeDate: DateLike | null, [currentDate]: DateLike[]): DateLike[];
    isSelected(activeDate: DateLike | null, [currentDate]: DateLike[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultDateSelectionStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DefaultDateSelectionStrategy>;
}
/** @docs-private */
declare function NOVO_DATE_SELECTION_STRATEGY_PROVIDER_FACTORY(parent: NovoDateSelectionStrategy<unknown>): NovoDateSelectionStrategy<unknown>;
/** @docs-private */
declare const NOVO_DATE_SELECTION_STRATEGY_PROVIDER: FactoryProvider;

declare class MultiDateSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    selectionFinished(dateLike: DateLike | null, currentValue: DateLike[], event: Event): DateLike[];
    createPreview(activeDate: DateLike | null, currentValue: DateLike[]): DateLike[];
    isSelected(activeDate: DateLike | null, currentValue: DateLike[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiDateSelectionStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MultiDateSelectionStrategy>;
}

declare class RangeSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    selectionFinished(date: DateLike, currentRange: DateLike[]): DateLike[];
    createPreview(activeDate: DateLike | null, currentRange: DateLike[]): DateLike[];
    isSelected(activeDate: DateLike | null, currentRange: DateLike[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RangeSelectionStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RangeSelectionStrategy>;
}

declare class WeekSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    private weekStartsOn;
    constructor(weekStartsOn?: Day);
    selectionFinished(date: DateLike | null): DateLike[];
    createPreview(activeDate: DateLike | null): DateLike[];
    private _createWeekRange;
    isSelected(activeDate: DateLike | null, currentRange: DateLike[]): boolean;
}

export { DefaultDateSelectionStrategy, MultiDateSelectionStrategy, NOVO_DATE_SELECTION_STRATEGY, NOVO_DATE_SELECTION_STRATEGY_PROVIDER, NOVO_DATE_SELECTION_STRATEGY_PROVIDER_FACTORY, NovoCalendarElement, NovoCalendarModule, NovoMonthSelectElement, NovoMonthViewElement, NovoYearSelectElement, RangeSelectionStrategy, WeekSelectionStrategy };
