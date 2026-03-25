import * as i0 from '@angular/core';
import { TemplateRef, EventEmitter, OnChanges, OnInit, OnDestroy, ChangeDetectorRef, PipeTransform } from '@angular/core';
import { CalendarEvent, MonthViewDay, CalendarEventTimesChangedEvent, WeekDay, MonthView, DayViewHour, WeekViewEventRow, WeekViewEvent, DayView, DayViewEvent, DayViewHourSegment } from 'novo-elements/utils';
import { Day } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import * as i20 from '@angular/common';
import * as i21 from 'novo-elements/elements/button';
import * as i22 from 'novo-elements/elements/tooltip';
import * as i23 from 'novo-elements/pipes';

declare class NovoEventTypeLegendElement {
    events: CalendarEvent[];
    customTemplate: TemplateRef<any>;
    eventTypeClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoEventTypeLegendElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoEventTypeLegendElement, "novo-event-type-legend", never, { "events": { "alias": "events"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "eventTypeClicked": "eventTypeClicked"; }, never, never, false, never>;
}

/**
 * Shows all events on a given month. Example usage:
 *
 * ```
 * &lt;novo-agenda-month-view
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-agenda-month-view&gt;
 * ```
 */
declare class NovoAgendaMonthViewElement implements OnChanges, OnInit, OnDestroy {
    private cdr;
    /**
     * The current view date
     */
    viewDate: Date;
    /**
     * An array of events to display on view
     */
    events: CalendarEvent[];
    /**
     * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
     */
    excludeDays: number[];
    /**
     * A function that will be called before each cell is rendered. The first argument will contain the calendar cell.
     * If you add the `cssClass` property to the cell it will add that class to the cell in the template
     */
    dayModifier: Function;
    /**
     * An observable that when emitted on will re-render the current view
     */
    refresh: Subject<any>;
    /**
     * The locale used to format dates
     */
    locale: string;
    /**
     * The placement of the event tooltip
     */
    tooltipPosition: string;
    /**
     * The start number of the week
     */
    weekStartsOn: Day;
    /**
     * A custom template to use to replace the header
     */
    headerTemplate: TemplateRef<any>;
    /**
     * A custom template to use to replace the day cell
     */
    cellTemplate: TemplateRef<any>;
    /**
     * Called when the day cell is clicked
     */
    dayClicked: EventEmitter<{
        day: MonthViewDay;
    }>;
    /**
     * Called when the event title is clicked
     */
    eventClicked: EventEmitter<{
        day: any;
        event: CalendarEvent;
    }>;
    /**
     * Called when an event is dragged and dropped
     */
    eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent>;
    viewDateChange: EventEmitter<Date>;
    /**
     * @hidden
     */
    columnHeaders: WeekDay[];
    /**
     * @hidden
     */
    view: MonthView;
    /**
     * @hidden
     */
    refreshSubscription: Subscription;
    /**
     * @hidden
     */
    constructor(cdr: ChangeDetectorRef, locale: string);
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: any): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    eventDropped(day: MonthViewDay, event: CalendarEvent): void;
    private refreshHeader;
    private refreshBody;
    refreshAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaMonthViewElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaMonthViewElement, "novo-agenda-month", never, { "viewDate": { "alias": "viewDate"; "required": false; }; "events": { "alias": "events"; "required": false; }; "excludeDays": { "alias": "excludeDays"; "required": false; }; "dayModifier": { "alias": "dayModifier"; "required": false; }; "refresh": { "alias": "refresh"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; }; "weekStartsOn": { "alias": "weekStartsOn"; "required": false; }; "headerTemplate": { "alias": "headerTemplate"; "required": false; }; "cellTemplate": { "alias": "cellTemplate"; "required": false; }; }, { "dayClicked": "dayClicked"; "eventClicked": "eventClicked"; "eventTimesChanged": "eventTimesChanged"; "viewDateChange": "viewDateChange"; }, never, never, false, never>;
}

declare class NovoAgendaMonthHeaderElement {
    viewDate: Date;
    days: WeekDay[];
    locale: string;
    customTemplate: TemplateRef<any>;
    /**
     * Called when the view date is changed
     */
    viewDateChange: EventEmitter<Date>;
    prevMonth(event: Event): void;
    nextMonth(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaMonthHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaMonthHeaderElement, "novo-agenda-month-header", never, { "viewDate": { "alias": "viewDate"; "required": false; }; "days": { "alias": "days"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "viewDateChange": "viewDateChange"; }, never, never, false, never>;
}

declare class NovoAgendaMonthDayElement {
    day: MonthViewDay;
    locale: string;
    tooltipPosition: string;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<{
        event: CalendarEvent;
    }>;
    get accepted(): Array<CalendarEvent>;
    get rejected(): Array<CalendarEvent>;
    get maybes(): Array<CalendarEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaMonthDayElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaMonthDayElement, "novo-agenda-month-day", never, { "day": { "alias": "day"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "eventClicked": "eventClicked"; }, never, never, false, never>;
}

/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * &lt;novo-agenda-week
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-agenda-week&gt;
 * ```
 */
declare class NovoAgendaWeekViewElement implements OnChanges, OnInit, OnDestroy {
    private cdr;
    /**
     * The current view date
     */
    viewDate: Date;
    /**
     * An array of events to display on view
     */
    events: CalendarEvent[];
    /**
     * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
     */
    excludeDays: number[];
    /**
     * An observable that when emitted on will re-render the current view
     */
    refresh: Subject<any>;
    /**
     * The locale used to format dates
     */
    locale: string;
    /**
     * The placement of the event tooltip
     */
    tooltipPosition: string;
    /**
     * The start number of the week
     */
    weekStartsOn: Day;
    /**
     * A custom template to use to replace the header
     */
    headerTemplate: TemplateRef<any>;
    /**
     * A custom template to use for week view events
     */
    eventTemplate: TemplateRef<any>;
    /**
     * The precision to display events.
     * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
     */
    precision: 'days' | 'minutes';
    /**
     * The number of segments in an hour. Must be <= 6
     */
    hourSegments: number;
    /**
     * The day start hours in 24 hour time. Must be 0-23
     */
    dayStartHour: number;
    /**
     * The day start minutes. Must be 0-59
     */
    dayStartMinute: number;
    /**
     * The day end hours in 24 hour time. Must be 0-23
     */
    dayEndHour: number;
    /**
     * The day end minutes. Must be 0-59
     */
    dayEndMinute: number;
    /**
     * A custom template to use to replace the hour segment
     */
    hourSegmentTemplate: TemplateRef<any>;
    /**
     * Called when an hour segment is clicked
     */
    hourSegmentClicked: EventEmitter<{
        date: Date;
    }>;
    /**
     * Called when a header week day is clicked
     */
    dayClicked: EventEmitter<{
        date: Date;
    }>;
    /**
     * Called when the event title is clicked
     */
    eventClicked: EventEmitter<{
        event: CalendarEvent;
    }>;
    /**
     * Called when an event is resized or dragged and dropped
     */
    eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent>;
    /**
     * @hidden
     */
    days: WeekDay[];
    /**
     * @hidden
     */
    hours: DayViewHour[];
    /**
     * @hidden
     */
    eventRows: WeekViewEventRow[];
    /**
     * @hidden
     */
    refreshSubscription: Subscription;
    /**
     * @hidden
     */
    currentResize: {
        originalOffset: number;
        originalSpan: number;
        edge: string;
    };
    /**
     * @hidden
     */
    validateDrag: Function;
    /**
     * @hidden
     */
    validateResize: Function;
    /**
     * @hidden
     */
    constructor(cdr: ChangeDetectorRef, locale: string);
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: any): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    getDayColumnWidth(eventRowContainer: HTMLElement): number;
    private refreshHeader;
    private refreshBody;
    private refreshHourGrid;
    private refreshAll;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaWeekViewElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaWeekViewElement, "novo-agenda-week", never, { "viewDate": { "alias": "viewDate"; "required": false; }; "events": { "alias": "events"; "required": false; }; "excludeDays": { "alias": "excludeDays"; "required": false; }; "refresh": { "alias": "refresh"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; }; "weekStartsOn": { "alias": "weekStartsOn"; "required": false; }; "headerTemplate": { "alias": "headerTemplate"; "required": false; }; "eventTemplate": { "alias": "eventTemplate"; "required": false; }; "precision": { "alias": "precision"; "required": false; }; "hourSegments": { "alias": "hourSegments"; "required": false; }; "dayStartHour": { "alias": "dayStartHour"; "required": false; }; "dayStartMinute": { "alias": "dayStartMinute"; "required": false; }; "dayEndHour": { "alias": "dayEndHour"; "required": false; }; "dayEndMinute": { "alias": "dayEndMinute"; "required": false; }; "hourSegmentTemplate": { "alias": "hourSegmentTemplate"; "required": false; }; }, { "hourSegmentClicked": "hourSegmentClicked"; "dayClicked": "dayClicked"; "eventClicked": "eventClicked"; "eventTimesChanged": "eventTimesChanged"; }, never, never, false, never>;
}

declare class NovoAgendaWeekHeaderElement {
    days: WeekDay[];
    locale: string;
    customTemplate: TemplateRef<any>;
    dayClicked: EventEmitter<{
        date: Date;
    }>;
    eventDropped: EventEmitter<{
        event: CalendarEvent;
        newStart: Date;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaWeekHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaWeekHeaderElement, "novo-agenda-week-header", never, { "days": { "alias": "days"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "dayClicked": "dayClicked"; "eventDropped": "eventDropped"; }, never, never, false, never>;
}

declare class NovoAgendaWeekEventElement {
    weekEvent: WeekViewEvent;
    tooltipPosition: string;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaWeekEventElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaWeekEventElement, "novo-agenda-week-event", never, { "weekEvent": { "alias": "weekEvent"; "required": false; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "eventClicked": "eventClicked"; }, never, never, false, never>;
}

/**
 * Shows all events on a given day. Example usage:
 *
 * ```typescript
 * &lt;novo-agenda-day
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-agenda-day&gt;
 * ```
 */
declare class NovoAgendaDayViewElement implements OnChanges, OnInit, OnDestroy {
    private cdr;
    /**
     * The current view date
     */
    viewDate: Date;
    /**
     * An array of events to display on view
     */
    events: CalendarEvent[];
    /**
     * The number of segments in an hour. Must be <= 6
     */
    hourSegments: number;
    /**
     * The day start hours in 24 hour time. Must be 0-23
     */
    dayStartHour: number;
    /**
     * The day start minutes. Must be 0-59
     */
    dayStartMinute: number;
    /**
     * The day end hours in 24 hour time. Must be 0-23
     */
    dayEndHour: number;
    /**
     * The day end minutes. Must be 0-59
     */
    dayEndMinute: number;
    /**
     * The width in pixels of each event on the view
     */
    eventWidth: number;
    /**
     * An observable that when emitted on will re-render the current view
     */
    refresh: Subject<any>;
    /**
     * The locale used to format dates
     */
    locale: string;
    /**
     * A function that will be called before each hour segment is called. The first argument will contain the hour segment.
     * If you add the `cssClass` property to the segment it will add that class to the hour segment in the template
     */
    hourSegmentModifier: Function;
    /**
     * The grid size to snap resizing and dragging of events to
     */
    eventSnapSize: number;
    /**
     * The placement of the event tooltip
     */
    tooltipPosition: string;
    /**
     * A custom template to use to replace the hour segment
     */
    hourSegmentTemplate: TemplateRef<any>;
    /**
     * A custom template to use for all day events
     */
    allDayEventTemplate: TemplateRef<any>;
    /**
     * A custom template to use for day view events
     */
    eventTemplate: TemplateRef<any>;
    /**
     * Called when an event title is clicked
     */
    eventClicked: EventEmitter<{
        event: CalendarEvent;
    }>;
    /**
     * Called when an hour segment is clicked
     */
    hourSegmentClicked: EventEmitter<{
        date: Date;
    }>;
    /**
     * Called when an event is resized or dragged and dropped
     */
    eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent>;
    /**
     * @hidden
     */
    hours: DayViewHour[];
    /**
     * @hidden
     */
    view: DayView;
    /**
     * @hidden
     */
    width: number;
    /**
     * @hidden
     */
    refreshSubscription: Subscription;
    /**
     * @hidden
     */
    currentResize: {
        originalTop: number;
        originalHeight: number;
        edge: string;
    };
    /**
     * @hidden
     */
    validateDrag: Function;
    /**
     * @hidden
     */
    validateResize: Function;
    /**
     * @hidden
     */
    constructor(cdr: ChangeDetectorRef, locale: string);
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: any): void;
    private refreshHourGrid;
    private refreshView;
    private refreshAll;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaDayViewElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaDayViewElement, "novo-agenda-day", never, { "viewDate": { "alias": "viewDate"; "required": false; }; "events": { "alias": "events"; "required": false; }; "hourSegments": { "alias": "hourSegments"; "required": false; }; "dayStartHour": { "alias": "dayStartHour"; "required": false; }; "dayStartMinute": { "alias": "dayStartMinute"; "required": false; }; "dayEndHour": { "alias": "dayEndHour"; "required": false; }; "dayEndMinute": { "alias": "dayEndMinute"; "required": false; }; "eventWidth": { "alias": "eventWidth"; "required": false; }; "refresh": { "alias": "refresh"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "hourSegmentModifier": { "alias": "hourSegmentModifier"; "required": false; }; "eventSnapSize": { "alias": "eventSnapSize"; "required": false; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; }; "hourSegmentTemplate": { "alias": "hourSegmentTemplate"; "required": false; }; "allDayEventTemplate": { "alias": "allDayEventTemplate"; "required": false; }; "eventTemplate": { "alias": "eventTemplate"; "required": false; }; }, { "eventClicked": "eventClicked"; "hourSegmentClicked": "hourSegmentClicked"; "eventTimesChanged": "eventTimesChanged"; }, never, never, false, never>;
}

declare class NovoAgendaDayEventElement {
    dayEvent: DayViewEvent;
    tooltipPosition: string;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaDayEventElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaDayEventElement, "novo-agenda-day-event", never, { "dayEvent": { "alias": "dayEvent"; "required": false; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "eventClicked": "eventClicked"; }, never, never, false, never>;
}

declare class NovoAgendaHourSegmentElement {
    segment: DayViewHourSegment;
    locale: string;
    customTemplate: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaHourSegmentElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaHourSegmentElement, "novo-agenda-day-hour-segment", never, { "segment": { "alias": "segment"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoAgendaAllDayEventElement {
    event: CalendarEvent;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaAllDayEventElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaAllDayEventElement, "novo-agenda-all-day-event", never, { "event": { "alias": "event"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "eventClicked": "eventClicked"; }, never, never, false, never>;
}

declare class NovoAgendaDateChangeElement {
    /**
     * The current view
     */
    view: string;
    /**
     * The current view date
     */
    viewDate: Date;
    locale: string;
    /**
     * Called when the view date is changed
     */
    viewDateChange: EventEmitter<Date>;
    constructor(locale: string);
    /**
     * @hidden
     */
    subtractDate(): void;
    addDate(): void;
    changeDate(unit: number): void;
    get startOfWeek(): Date;
    get endOfWeek(): Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaDateChangeElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaDateChangeElement, "novo-agenda-date-change", never, { "view": { "alias": "view"; "required": false; }; "viewDate": { "alias": "viewDate"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; }, { "viewDateChange": "viewDateChange"; }, never, never, false, never>;
}

declare class WeekdayPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: 'long' | 'short' | 'narrow'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<WeekdayPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<WeekdayPipe, "weekday", false>;
}

declare class DayOfMonthPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: 'numeric' | '2-digit'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DayOfMonthPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DayOfMonthPipe, "dayofmonth", false>;
}

declare class MonthPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MonthPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<MonthPipe, "month", false>;
}

declare class MonthDayPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MonthDayPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<MonthDayPipe, "monthday", false>;
}

declare class YearPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: 'numeric' | '2-digit'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<YearPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<YearPipe, "year", false>;
}

declare class HoursPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: 'numeric' | '2-digit'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<HoursPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<HoursPipe, "hours", false>;
}

declare class EndOfWeekDisplayPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(endOfWeek: Date, startOfWeek: Date, locale?: string, method?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'): String;
    static ɵfac: i0.ɵɵFactoryDeclaration<EndOfWeekDisplayPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<EndOfWeekDisplayPipe, "endofweekdisplay", false>;
}

declare class NovoAgendaModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoAgendaModule, [typeof NovoEventTypeLegendElement, typeof NovoAgendaMonthViewElement, typeof NovoAgendaMonthHeaderElement, typeof NovoAgendaMonthDayElement, typeof NovoAgendaWeekViewElement, typeof NovoAgendaWeekHeaderElement, typeof NovoAgendaWeekEventElement, typeof NovoAgendaDayViewElement, typeof NovoAgendaDayEventElement, typeof NovoAgendaHourSegmentElement, typeof NovoAgendaAllDayEventElement, typeof NovoAgendaDateChangeElement, typeof WeekdayPipe, typeof DayOfMonthPipe, typeof MonthPipe, typeof MonthDayPipe, typeof YearPipe, typeof HoursPipe, typeof EndOfWeekDisplayPipe], [typeof i20.CommonModule, typeof i21.NovoButtonModule, typeof i22.NovoTooltipModule, typeof i23.NovoPipesModule], [typeof NovoEventTypeLegendElement, typeof NovoAgendaMonthViewElement, typeof NovoAgendaMonthHeaderElement, typeof NovoAgendaMonthDayElement, typeof NovoAgendaWeekViewElement, typeof NovoAgendaWeekHeaderElement, typeof NovoAgendaWeekEventElement, typeof NovoAgendaDayViewElement, typeof NovoAgendaDayEventElement, typeof NovoAgendaHourSegmentElement, typeof NovoAgendaAllDayEventElement, typeof NovoAgendaDateChangeElement, typeof WeekdayPipe, typeof DayOfMonthPipe, typeof MonthPipe, typeof MonthDayPipe, typeof YearPipe, typeof HoursPipe, typeof EndOfWeekDisplayPipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoAgendaModule>;
}

export { DayOfMonthPipe, EndOfWeekDisplayPipe, HoursPipe, MonthDayPipe, MonthPipe, NovoAgendaAllDayEventElement, NovoAgendaDateChangeElement, NovoAgendaDayEventElement, NovoAgendaDayViewElement, NovoAgendaHourSegmentElement, NovoAgendaModule, NovoAgendaMonthDayElement, NovoAgendaMonthHeaderElement, NovoAgendaMonthViewElement, NovoAgendaWeekEventElement, NovoAgendaWeekHeaderElement, NovoAgendaWeekViewElement, NovoEventTypeLegendElement, WeekdayPipe, YearPipe };
