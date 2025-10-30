import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CalendarEvent, CalendarEventTimesChangedEvent, DayViewHour, WeekDay, WeekViewEventRow } from 'novo-elements/utils';
import * as i0 from "@angular/core";
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
export declare class NovoAgendaWeekViewElement implements OnChanges, OnInit, OnDestroy {
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
