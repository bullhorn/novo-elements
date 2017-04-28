import endOfDay from 'date-fns/end_of_day';
import addMinutes from 'date-fns/add_minutes';
import differenceInDays from 'date-fns/difference_in_days';
import startOfDay from 'date-fns/start_of_day';
import isSameDay from 'date-fns/is_same_day';
import getDay from 'date-fns/get_day';
import startOfWeek from 'date-fns/start_of_week';
import addDays from 'date-fns/add_days';
import endOfWeek from 'date-fns/end_of_week';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import isSameMonth from 'date-fns/is_same_month';
import isSameSecond from 'date-fns/is_same_second';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import startOfMinute from 'date-fns/start_of_minute';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import addHours from 'date-fns/add_hours';

const WEEKEND_DAY_NUMBERS: number[] = [0, 6];
const DAYS_IN_WEEK: number = 7;
const HOURS_IN_DAY: number = 24;
const MINUTES_IN_HOUR: number = 60;

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
  onClick({event}: {event: CalendarEvent}): any;
}

export enum CalendarEventResponse {
  Maybe, Accepted, Rejected
}

export interface CalendarEvent {
  start: Date;
  end?: Date;
  title: string;
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

function getExcludedDays({startDate, days, excluded}: {startDate: Date, days: number, excluded: number[]}): number {
  if (excluded.length < 1) {
    return 0;
  }
  let day: number = startDate.getDay();
  let reduce: number = 0;
  for (let i: number = 0; i < days; i++) {
    if (day === DAYS_IN_WEEK) {
      day = 0;
    }
    if (excluded.some(e => e === day)) {
      reduce++;
    }
    day++;
  }
  return reduce;
}

function getWeekViewEventSpan(
  {event, offset, startOfWeek, excluded}: {event: CalendarEvent, offset: number, startOfWeek: Date, excluded: number[]}): number {
  const begin: Date = event.start < startOfWeek ? startOfWeek : event.start;
  let span: number = 1;
  if (event.end) {
    span = differenceInDays(addMinutes(endOfDay(event.end), 1), startOfDay(begin));
  }
  const totalLength: number = offset + span;
  if (totalLength > DAYS_IN_WEEK) {
    span = DAYS_IN_WEEK - offset;
  }
  return span - getExcludedDays({startDate: begin, days: span, excluded});
}

export function getWeekViewEventOffset(
  {event, startOfWeek, excluded = []}: {event: CalendarEvent, startOfWeek: Date, excluded?: number[]}): number {
  if (event.start < startOfWeek) {
    return 0;
  }
  const distance: number = differenceInDays(event.start, startOfWeek);
  return distance - getExcludedDays({startDate: startOfWeek, days: distance, excluded});
}

interface IsEventInPeriodArgs {
  event: CalendarEvent;
  periodStart: Date;
  periodEnd: Date;
}

function isEventIsPeriod({event, periodStart, periodEnd}: IsEventInPeriodArgs): boolean {

  const eventStart: Date = event.start;
  const eventEnd: Date = event.end || event.start;

  if (eventStart > periodStart && eventStart < periodEnd) {
    return true;
  }

  if (eventEnd > periodStart && eventEnd < periodEnd) {
    return true;
  }

  if (eventStart < periodStart && eventEnd > periodEnd) {
    return true;
  }

  if (isSameSecond(eventStart, periodStart) || isSameSecond(eventStart, periodEnd)) {
    return true;
  }

  if (isSameSecond(eventEnd, periodStart) || isSameSecond(eventEnd, periodEnd)) {
    return true;
  }

  return false;

}

interface GetEventsInPeriodArgs {
  events: CalendarEvent[];
  periodStart: Date;
  periodEnd: Date;
}

function getEventsInPeriod({events, periodStart, periodEnd}: GetEventsInPeriodArgs): CalendarEvent[] {
  return events.filter((event: CalendarEvent) => isEventIsPeriod({event, periodStart, periodEnd}));
}

function getWeekDay({date}: {date: Date}): WeekDay {
  const today: Date = startOfDay(new Date());
  return {
    date,
    isPast: date < today,
    isToday: isSameDay(date, today),
    isFuture: date > today,
    isWeekend: WEEKEND_DAY_NUMBERS.indexOf(getDay(date)) > -1
  };
}

export function getWeekViewHeader({viewDate, weekStartsOn, excluded = []}:
    {viewDate: Date, weekStartsOn: number, excluded?: number[]}): WeekDay[] {
  const start: Date = startOfWeek(viewDate, {weekStartsOn});
  const days: WeekDay[] = [];
  for (let i: number = 0; i < DAYS_IN_WEEK; i++) {
    const date: Date = addDays(start, i);
    if (!excluded.some(e => date.getDay() === e)) {
      days.push(getWeekDay({date}));
    }
  }

  return days;

}

export function getWeekView({events = [], viewDate, weekStartsOn, excluded = []}:
  {events?: CalendarEvent[], viewDate: Date, weekStartsOn: number, excluded?: number[]})
  : WeekViewEventRow[] {

  if (!events) {
    events = [];
  }

  const startOfViewWeek: Date = startOfWeek(viewDate, {weekStartsOn});
  const endOfViewWeek: Date = endOfWeek(viewDate, {weekStartsOn});
  const maxRange: number = DAYS_IN_WEEK - excluded.length;

  const eventsMapped: WeekViewEvent[] = getEventsInPeriod({events, periodStart: startOfViewWeek, periodEnd: endOfViewWeek}).map(event => {
    const offset: number = getWeekViewEventOffset({event, startOfWeek: startOfViewWeek, excluded});
    const span: number = getWeekViewEventSpan({event, offset, startOfWeek: startOfViewWeek, excluded});
    return {event, offset, span};
  }).filter(e => e.offset < maxRange).filter(e => e.span > 0).map(entry => ({
      event: entry.event,
      offset: entry.offset,
      span: entry.span,
      startsBeforeWeek: entry.event.start < startOfViewWeek,
      endsAfterWeek: (entry.event.end || entry.event.start) > endOfViewWeek
  })).sort((itemA, itemB): number => {
    const startSecondsDiff: number = differenceInSeconds(itemA.event.start, itemB.event.start);
    if (startSecondsDiff === 0) {
      return differenceInSeconds(itemB.event.end || itemB.event.start, itemA.event.end || itemA.event.start);
    }
    return startSecondsDiff;
  });

  const eventRows: WeekViewEventRow[] = [];
  const allocatedEvents: WeekViewEvent[] = [];

  eventsMapped.forEach((event: WeekViewEvent, index: number) => {
    if (allocatedEvents.indexOf(event) === -1) {
      allocatedEvents.push(event);
      let rowSpan: number = event.span + event.offset;
      const otherRowEvents: WeekViewEvent[] = eventsMapped.slice(index + 1).filter(nextEvent => {
        if (
          nextEvent.offset >= rowSpan &&
          rowSpan + nextEvent.span <= DAYS_IN_WEEK &&
          allocatedEvents.indexOf(nextEvent) === -1
        ) {
          nextEvent.offset -= rowSpan;
          rowSpan += nextEvent.span + nextEvent.offset;
          allocatedEvents.push(nextEvent);
          return true;
        }
      });
      eventRows.push({
        row: [
          event,
          ...otherRowEvents
        ]
      });
    }
  });

  return eventRows;
}

export function getMonthView({events = [], viewDate, weekStartsOn, excluded = []}:
  {events?: CalendarEvent[], viewDate: Date, weekStartsOn: number, excluded?: number[]})
  : MonthView {

  if (!events) {
    events = [];
  }

  const start: Date = startOfWeek(startOfMonth(viewDate), {weekStartsOn});
  const end: Date = endOfWeek(endOfMonth(viewDate), {weekStartsOn});
  const eventsInMonth: CalendarEvent[] = getEventsInPeriod({
    events,
    periodStart: start,
    periodEnd: end
  });
  const days: MonthViewDay[] = [];
  for (let i: number = 0; i < differenceInDays(end, start) + 1; i++) {
    const date: Date = addDays(start, i);
    if (!excluded.some(e => date.getDay() === e)) {
      const day: MonthViewDay = getWeekDay({date}) as MonthViewDay;
      const events: CalendarEvent[] = getEventsInPeriod({
        events: eventsInMonth,
        periodStart: startOfDay(date),
        periodEnd: endOfDay(date)
      });
      day.inMonth = isSameMonth(date, viewDate);
      day.events = events;
      day.badgeTotal = events.length;
      days.push(day);
    }
  }

  const totalDaysVisibleInWeek: number = DAYS_IN_WEEK - excluded.length;
  const rows: number = Math.floor(days.length / totalDaysVisibleInWeek);
  const rowOffsets: number[] = [];
  for (let i: number = 0; i < rows; i++) {
    rowOffsets.push(i * totalDaysVisibleInWeek);
  }

  return {
    rowOffsets,
    totalDaysVisibleInWeek,
    days
  };

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

export function getDayView({events = [], viewDate, hourSegments, dayStart, dayEnd, eventWidth, segmentHeight}: GetDayViewArgs)
  : DayView {

  if (!events) {
    events = [];
  }

  const startOfView: Date = setMinutes(setHours(startOfDay(viewDate), dayStart.hour), dayStart.minute);
  const endOfView: Date = setMinutes(setHours(startOfMinute(endOfDay(viewDate)), dayEnd.hour), dayEnd.minute);
  const previousDayEvents: DayViewEvent[] = [];

  const dayViewEvents: DayViewEvent[] = getEventsInPeriod({
    events: events.filter((event: CalendarEvent) => !event.allDay),
    periodStart: startOfView,
    periodEnd: endOfView
  }).sort((eventA: CalendarEvent, eventB: CalendarEvent) => {
    return eventA.start.valueOf() - eventB.start.valueOf();
  }).map((event: CalendarEvent) => {

    const eventStart: Date = event.start;
    const eventEnd: Date = event.end || eventStart;
    const startsBeforeDay: boolean = eventStart < startOfView;
    const endsAfterDay: boolean = eventEnd > endOfView;
    const hourHeightModifier: number = (hourSegments * segmentHeight) / MINUTES_IN_HOUR;

    let top: number = 0;
    if (eventStart > startOfView) {
      top += differenceInMinutes(eventStart, startOfView);
    }
    top *= hourHeightModifier;

    const startDate: Date = startsBeforeDay ? startOfView : eventStart;
    const endDate: Date = endsAfterDay ? endOfView : eventEnd;
    let height: number = differenceInMinutes(endDate, startDate);
    if (!event.end) {
      height = segmentHeight;
    } else {
      height *= hourHeightModifier;
    }

    const bottom: number = top + height;

    const overlappingPreviousEvents: DayViewEvent[] = previousDayEvents.filter((previousEvent: DayViewEvent) => {
      const previousEventTop: number = previousEvent.top;
      const previousEventBottom: number = previousEvent.top + previousEvent.height;

      if (top < previousEventBottom && previousEventBottom < bottom) {
        return true;
      } else if (previousEventTop <= top && bottom <= previousEventBottom) {
        return true;
      }

      return false;

    });

    let left: number = 0;

    while (overlappingPreviousEvents.some(previousEvent => previousEvent.left === left)) {
      left += eventWidth;
    }

    const dayEvent: DayViewEvent = {
      event,
      height,
      width: eventWidth,
      top,
      left,
      startsBeforeDay,
      endsAfterDay
    };

    if (height > 0) {
      previousDayEvents.push(dayEvent);
    }

    return dayEvent;

  }).filter((dayEvent: DayViewEvent) => dayEvent.height > 0);

  const width: number = Math.max(...dayViewEvents.map((event: DayViewEvent) => event.left + event.width));
  const allDayEvents: CalendarEvent[] = getEventsInPeriod({
    events: events.filter((event: CalendarEvent) => event.allDay),
    periodStart: startOfDay(startOfView),
    periodEnd: endOfDay(endOfView)
  });

  return {
    events: dayViewEvents,
    width,
    allDayEvents
  };

}

export function getDayViewHourGrid(
  {viewDate, hourSegments, dayStart, dayEnd}:
    {viewDate: Date, hourSegments: number, dayStart: any, dayEnd: any}
): DayViewHour[] {

  const hours: DayViewHour[] = [];

  const startOfView: Date = setMinutes(setHours(startOfDay(viewDate), dayStart.hour), dayStart.minute);
  const endOfView: Date = setMinutes(setHours(startOfMinute(endOfDay(viewDate)), dayEnd.hour), dayEnd.minute);
  const segmentDuration: number = MINUTES_IN_HOUR / hourSegments;
  const startOfViewDay: Date = startOfDay(viewDate);

  for (let i: number = 0; i < HOURS_IN_DAY; i++) {
    const segments: DayViewHourSegment[] = [];
    for (let j: number = 0; j < hourSegments; j++) {
      const date: Date = addMinutes(addHours(startOfViewDay, i), j * segmentDuration);
      if (date >= startOfView && date < endOfView) {
        segments.push({
          date,
          isStart: j === 0
        });
      }
    }
    if (segments.length > 0) {
      hours.push({segments});
    }
  }

  return hours;
}
