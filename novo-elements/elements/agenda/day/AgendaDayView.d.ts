import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CalendarEvent, CalendarEventTimesChangedEvent, DayView, DayViewHour } from 'novo-elements/utils';
import * as i0 from "@angular/core";
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
export declare class NovoAgendaDayViewElement implements OnChanges, OnInit, OnDestroy {
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
