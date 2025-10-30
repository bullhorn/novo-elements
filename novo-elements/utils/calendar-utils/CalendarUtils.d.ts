import { Day } from 'date-fns';
export declare enum CalendarEventResponse {
    Maybe = 0,
    Accepted = 1,
    Rejected = 2
}
export interface CalendarEventTimesChangedEvent {
    event: CalendarEvent;
    newStart: Date;
    newEnd?: Date;
}
export interface WeekDay {
    date: Date;
    isPast: boolean;
    isToday: boolean;
    isFuture: boolean;
    isWeekend: boolean;
}
export interface EventColor {
    primary: string;
    secondary: string;
}
export interface EventAction {
    label: string;
    cssClass?: string;
    onClick({ event }: {
        event: CalendarEvent;
    }): any;
}
export interface CalendarEvent {
    id?: number;
    start: Date;
    end?: Date;
    title: string;
    description?: string;
    color: EventColor;
    type?: string;
    response?: CalendarEventResponse;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
}
export interface WeekViewEvent {
    event: CalendarEvent;
    offset: number;
    span: number;
    startsBeforeWeek: boolean;
    endsAfterWeek: boolean;
    top?: number;
    height?: number;
}
export interface WeekViewEventRow {
    row: WeekViewEvent[];
}
export interface MonthViewDay extends WeekDay {
    inMonth: boolean;
    events: CalendarEvent[];
    backgroundColor?: string;
    cssClass?: string;
    badgeTotal: number;
}
export interface MonthView {
    rowOffsets: number[];
    days: MonthViewDay[];
    totalDaysVisibleInWeek: number;
}
export interface DayViewEvent {
    event: CalendarEvent;
    height: number;
    width: number;
    top: number;
    left: number;
    startsBeforeDay: boolean;
    endsAfterDay: boolean;
}
export interface DayView {
    events: DayViewEvent[];
    width: number;
    allDayEvents: CalendarEvent[];
}
export interface DayViewHourSegment {
    isStart: boolean;
    date: Date;
    cssClass?: string;
}
export interface DayViewHour {
    segments: DayViewHourSegment[];
}
export interface IsEventInPeriodArgs {
    event: CalendarEvent;
    periodStart: Date;
    periodEnd: Date;
}
export interface GetEventsInPeriodArgs {
    events: CalendarEvent[];
    periodStart: Date;
    periodEnd: Date;
}
export interface GetDayViewArgs {
    events?: CalendarEvent[];
    viewDate: Date;
    hourSegments: number;
    dayStart: {
        hour: number;
        minute: number;
    };
    dayEnd: {
        hour: number;
        minute: number;
    };
    eventWidth: number;
    segmentHeight: number;
}
export declare function getWeekViewEventOffset({ event, startOfWeek, excluded, }: {
    event: CalendarEvent;
    startOfWeek: Date;
    excluded?: number[];
}): number;
export declare function getWeekViewHeader({ viewDate, weekStartsOn, excluded, }: {
    viewDate: Date;
    weekStartsOn: Day;
    excluded?: number[];
}): WeekDay[];
export declare function getWeekView({ events, viewDate, weekStartsOn, excluded, hourSegments, segmentHeight, dayStart, dayEnd, }: {
    events?: CalendarEvent[];
    viewDate: Date;
    weekStartsOn: Day;
    excluded?: number[];
    hourSegments: number;
    segmentHeight: number;
    dayStart: any;
    dayEnd: any;
}): WeekViewEventRow[];
export declare function getMonthView({ events, viewDate, weekStartsOn, excluded, }: {
    events?: CalendarEvent[];
    viewDate: Date;
    weekStartsOn: Day;
    excluded?: number[];
}): MonthView;
export declare function getDayView({ events, viewDate, hourSegments, dayStart, dayEnd, eventWidth, segmentHeight }: GetDayViewArgs): DayView;
export declare function getDayViewHourGrid({ viewDate, hourSegments, dayStart, dayEnd, }: {
    viewDate: Date;
    hourSegments: number;
    dayStart: any;
    dayEnd: any;
}): DayViewHour[];
