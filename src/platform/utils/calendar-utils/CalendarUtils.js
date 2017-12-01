"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateFns = require("date-fns");
var WEEKEND_DAY_NUMBERS = [0, 6];
var DAYS_IN_WEEK = 7;
var HOURS_IN_DAY = 24;
var MINUTES_IN_HOUR = 60;
var CalendarEventResponse;
(function (CalendarEventResponse) {
    CalendarEventResponse[CalendarEventResponse["Maybe"] = 0] = "Maybe";
    CalendarEventResponse[CalendarEventResponse["Accepted"] = 1] = "Accepted";
    CalendarEventResponse[CalendarEventResponse["Rejected"] = 2] = "Rejected";
})(CalendarEventResponse = exports.CalendarEventResponse || (exports.CalendarEventResponse = {}));
function getExcludedDays(_a) {
    var startDate = _a.startDate, days = _a.days, excluded = _a.excluded;
    if (excluded.length < 1) {
        return 0;
    }
    var day = startDate.getDay();
    var reduce = 0;
    for (var i = 0; i < days; i++) {
        if (day === DAYS_IN_WEEK) {
            day = 0;
        }
        if (excluded.some(function (e) { return e === day; })) {
            reduce++;
        }
        day++;
    }
    return reduce;
}
function getWeekViewEventSpan(_a) {
    var event = _a.event, offset = _a.offset, startOfWeek = _a.startOfWeek, excluded = _a.excluded;
    var begin = event.start < startOfWeek ? startOfWeek : event.start;
    var span = 1;
    if (event.end) {
        span = dateFns.differenceInDays(dateFns.addMinutes(dateFns.endOfDay(event.end), 1), dateFns.startOfDay(begin));
    }
    var totalLength = offset + span;
    if (totalLength > DAYS_IN_WEEK) {
        span = DAYS_IN_WEEK - offset;
    }
    return span - getExcludedDays({ startDate: begin, days: span, excluded: excluded });
}
function getWeekViewEventOffset(_a) {
    var event = _a.event, startOfWeek = _a.startOfWeek, _b = _a.excluded, excluded = _b === void 0 ? [] : _b;
    if (event.start < startOfWeek) {
        return 0;
    }
    var distance = dateFns.differenceInDays(event.start, startOfWeek);
    return distance - getExcludedDays({ startDate: startOfWeek, days: distance, excluded: excluded });
}
exports.getWeekViewEventOffset = getWeekViewEventOffset;
function isEventIsPeriod(_a) {
    var event = _a.event, periodStart = _a.periodStart, periodEnd = _a.periodEnd;
    var eventStart = event.start;
    var eventEnd = event.end || event.start;
    if (eventStart > periodStart && eventStart < periodEnd) {
        return true;
    }
    if (eventEnd > periodStart && eventEnd < periodEnd) {
        return true;
    }
    if (eventStart < periodStart && eventEnd > periodEnd) {
        return true;
    }
    if (dateFns.isSameSecond(eventStart, periodStart) || dateFns.isSameSecond(eventStart, periodEnd)) {
        return true;
    }
    if (dateFns.isSameSecond(eventEnd, periodStart) || dateFns.isSameSecond(eventEnd, periodEnd)) {
        return true;
    }
    return false;
}
function getEventsInPeriod(_a) {
    var events = _a.events, periodStart = _a.periodStart, periodEnd = _a.periodEnd;
    return events.filter(function (event) { return isEventIsPeriod({ event: event, periodStart: periodStart, periodEnd: periodEnd }); });
}
function getEventsInTimeRange(events, dayStart, dayEnd) {
    return events.filter(function (event) {
        var eventStart = event.start;
        var eventEnd = event.end || eventStart;
        var startOfView = dateFns.setMinutes(dateFns.setHours(dateFns.startOfDay(eventStart), dayStart.hour), dayStart.minute);
        var endOfView = dateFns.setMinutes(dateFns.setHours(dateFns.startOfMinute(eventStart), dayEnd.hour), dayEnd.minute);
        return dateFns.isAfter(eventEnd, startOfView)
            && dateFns.isBefore(eventStart, endOfView);
    });
}
function getWeekDay(_a) {
    var date = _a.date;
    var today = dateFns.startOfDay(new Date());
    return {
        date: date,
        isPast: date < today,
        isToday: dateFns.isSameDay(date, today),
        isFuture: date > today,
        isWeekend: WEEKEND_DAY_NUMBERS.indexOf(dateFns.getDay(date)) > -1
    };
}
function getWeekViewHeader(_a) {
    var viewDate = _a.viewDate, weekStartsOn = _a.weekStartsOn, _b = _a.excluded, excluded = _b === void 0 ? [] : _b;
    var start = dateFns.startOfWeek(viewDate, { weekStartsOn: weekStartsOn });
    var days = [];
    var _loop_1 = function (i) {
        var date = dateFns.addDays(start, i);
        if (!excluded.some(function (e) { return date.getDay() === e; })) {
            days.push(getWeekDay({ date: date }));
        }
    };
    for (var i = 0; i < DAYS_IN_WEEK; i++) {
        _loop_1(i);
    }
    return days;
}
exports.getWeekViewHeader = getWeekViewHeader;
function getWeekView(_a) {
    var _b = _a.events, events = _b === void 0 ? [] : _b, viewDate = _a.viewDate, weekStartsOn = _a.weekStartsOn, _c = _a.excluded, excluded = _c === void 0 ? [] : _c, hourSegments = _a.hourSegments, segmentHeight = _a.segmentHeight, dayStart = _a.dayStart, dayEnd = _a.dayEnd;
    if (!events) {
        events = [];
    }
    var startOfViewWeek = dateFns.startOfWeek(viewDate, { weekStartsOn: weekStartsOn });
    var endOfViewWeek = dateFns.endOfWeek(viewDate, { weekStartsOn: weekStartsOn });
    var maxRange = DAYS_IN_WEEK - excluded.length;
    var eventsMapped = getEventsInTimeRange(getEventsInPeriod({ events: events, periodStart: startOfViewWeek, periodEnd: endOfViewWeek }), dayStart, dayEnd).map(function (event) {
        var offset = getWeekViewEventOffset({ event: event, startOfWeek: startOfViewWeek, excluded: excluded });
        var span = 1; //getWeekViewEventSpan({ event, offset, startOfWeek: startOfViewWeek, excluded });
        return { event: event, offset: offset, span: span };
    }).filter(function (e) { return e.offset < maxRange; }).filter(function (e) { return e.span > 0; }).map(function (entry) { return ({
        event: entry.event,
        offset: entry.offset,
        span: entry.span,
        startsBeforeWeek: entry.event.start < startOfViewWeek,
        endsAfterWeek: (entry.event.end || entry.event.start) > endOfViewWeek,
        top: 0
    }); }).sort(function (itemA, itemB) {
        var startSecondsDiff = dateFns.differenceInSeconds(itemA.event.start, itemB.event.start);
        if (startSecondsDiff === 0) {
            return dateFns.differenceInSeconds(itemB.event.end || itemB.event.start, itemA.event.end || itemA.event.start);
        }
        return startSecondsDiff;
    }).map(function (entry) {
        var startOfView = dateFns.setMinutes(dateFns.setHours(dateFns.startOfDay(entry.event.start), dayStart.hour), dayStart.minute);
        var endOfView = dateFns.setMinutes(dateFns.setHours(dateFns.startOfMinute(dateFns.endOfDay(entry.event.start)), dayEnd.hour), dayEnd.minute);
        var eventStart = entry.event.start;
        var eventEnd = entry.event.end || eventStart;
        var hourHeightModifier = (hourSegments * segmentHeight) / MINUTES_IN_HOUR;
        if (eventStart > startOfView) {
            entry.top += dateFns.differenceInMinutes(eventStart, startOfView);
        }
        entry.top *= hourHeightModifier;
        var startsBeforeDay = eventStart < startOfView;
        var endsAfterDay = eventEnd > endOfView;
        var startDate = startsBeforeDay ? startOfView : eventStart;
        var endDate = endsAfterDay ? endOfView : eventEnd;
        var height = dateFns.differenceInMinutes(endDate, startDate);
        if (!entry.event.end) {
            height = segmentHeight;
        }
        else {
            height *= hourHeightModifier;
        }
        entry.height = height;
        return entry;
    });
    var eventRows = [];
    var allocatedEvents = [];
    eventsMapped.forEach(function (event, index) {
        if (allocatedEvents.indexOf(event) === -1) {
            allocatedEvents.push(event);
            var otherRowEvents = eventsMapped.slice(index + 1).filter(function (nextEvent) {
                return nextEvent.top === event.top && nextEvent.offset === event.offset;
            });
            if (otherRowEvents.length > 0) {
                var totalEventsForRow = otherRowEvents.length + 1;
                event.span = (1 / totalEventsForRow);
                var nextOffset_1 = event.span + event.offset;
                otherRowEvents.forEach(function (nextEvent) {
                    nextEvent.offset = nextOffset_1;
                    nextEvent.span = event.span;
                    nextOffset_1 = nextEvent.span + nextEvent.offset;
                });
                allocatedEvents.push.apply(allocatedEvents, otherRowEvents);
            }
            eventRows.push({
                row: [
                    event
                ].concat(otherRowEvents)
            });
        }
    });
    return eventRows;
}
exports.getWeekView = getWeekView;
function getMonthView(_a) {
    var _b = _a.events, events = _b === void 0 ? [] : _b, viewDate = _a.viewDate, weekStartsOn = _a.weekStartsOn, _c = _a.excluded, excluded = _c === void 0 ? [] : _c;
    if (!events) {
        events = [];
    }
    var start = dateFns.startOfWeek(dateFns.startOfMonth(viewDate), { weekStartsOn: weekStartsOn });
    var end = dateFns.endOfWeek(dateFns.endOfMonth(viewDate), { weekStartsOn: weekStartsOn });
    var eventsInMonth = getEventsInPeriod({
        events: events,
        periodStart: start,
        periodEnd: end
    });
    var days = [];
    var _loop_2 = function (i) {
        var date = dateFns.addDays(start, i);
        if (!excluded.some(function (e) { return date.getDay() === e; })) {
            var day = getWeekDay({ date: date });
            var calEvents = getEventsInPeriod({
                events: eventsInMonth,
                periodStart: dateFns.startOfDay(date),
                periodEnd: dateFns.endOfDay(date)
            });
            day.inMonth = dateFns.isSameMonth(date, viewDate);
            day.events = calEvents;
            day.badgeTotal = calEvents.length;
            days.push(day);
        }
    };
    for (var i = 0; i < dateFns.differenceInDays(end, start) + 1; i++) {
        _loop_2(i);
    }
    var totalDaysVisibleInWeek = DAYS_IN_WEEK - excluded.length;
    var rows = Math.floor(days.length / totalDaysVisibleInWeek);
    var rowOffsets = [];
    for (var i = 0; i < rows; i++) {
        rowOffsets.push(i * totalDaysVisibleInWeek);
    }
    return {
        rowOffsets: rowOffsets,
        totalDaysVisibleInWeek: totalDaysVisibleInWeek,
        days: days
    };
}
exports.getMonthView = getMonthView;
function getDayView(_a) {
    var _b = _a.events, events = _b === void 0 ? [] : _b, viewDate = _a.viewDate, hourSegments = _a.hourSegments, dayStart = _a.dayStart, dayEnd = _a.dayEnd, eventWidth = _a.eventWidth, segmentHeight = _a.segmentHeight;
    if (!events) {
        events = [];
    }
    var startOfView = dateFns.setMinutes(dateFns.setHours(dateFns.startOfDay(viewDate), dayStart.hour), dayStart.minute);
    var endOfView = dateFns.setMinutes(dateFns.setHours(dateFns.startOfMinute(dateFns.endOfDay(viewDate)), dayEnd.hour), dayEnd.minute);
    var previousDayEvents = [];
    var dayViewEvents = getEventsInTimeRange(getEventsInPeriod({
        events: events.filter(function (event) { return !event.allDay; }),
        periodStart: startOfView,
        periodEnd: endOfView
    }), dayStart, dayEnd).sort(function (eventA, eventB) {
        return eventA.start.valueOf() - eventB.start.valueOf();
    }).map(function (event) {
        var eventStart = event.start;
        var eventEnd = event.end || eventStart;
        var startsBeforeDay = eventStart < startOfView;
        var endsAfterDay = eventEnd > endOfView;
        var hourHeightModifier = (hourSegments * segmentHeight) / MINUTES_IN_HOUR;
        var top = 0;
        if (eventStart > startOfView) {
            top += dateFns.differenceInMinutes(eventStart, startOfView);
        }
        top *= hourHeightModifier;
        var startDate = startsBeforeDay ? startOfView : eventStart;
        var endDate = endsAfterDay ? endOfView : eventEnd;
        var height = dateFns.differenceInMinutes(endDate, startDate);
        if (!event.end) {
            height = segmentHeight;
        }
        else {
            height *= hourHeightModifier;
        }
        var bottom = top + height;
        var overlappingPreviousEvents = previousDayEvents.filter(function (previousEvent) {
            var previousEventTop = previousEvent.top;
            var previousEventBottom = previousEvent.top + previousEvent.height;
            if (top < previousEventBottom && previousEventBottom < bottom) {
                return true;
            }
            else if (previousEventTop <= top && bottom <= previousEventBottom) {
                return true;
            }
            return false;
        });
        var left = 0;
        while (overlappingPreviousEvents.some(function (previousEvent) { return previousEvent.left === left; })) {
            left += eventWidth;
        }
        var dayEvent = {
            event: event,
            height: height,
            width: eventWidth,
            top: top,
            left: left,
            startsBeforeDay: startsBeforeDay,
            endsAfterDay: endsAfterDay
        };
        if (height > 0) {
            previousDayEvents.push(dayEvent);
        }
        return dayEvent;
    }).filter(function (dayEvent) { return dayEvent.height > 0; });
    var width = Math.max.apply(Math, dayViewEvents.map(function (event) { return event.left + event.width; }));
    var allDayEvents = getEventsInPeriod({
        events: events.filter(function (event) { return event.allDay; }),
        periodStart: dateFns.startOfDay(startOfView),
        periodEnd: dateFns.endOfDay(endOfView)
    });
    return {
        events: dayViewEvents,
        width: width,
        allDayEvents: allDayEvents
    };
}
exports.getDayView = getDayView;
function getDayViewHourGrid(_a) {
    var viewDate = _a.viewDate, hourSegments = _a.hourSegments, dayStart = _a.dayStart, dayEnd = _a.dayEnd;
    var hours = [];
    var startOfView = dateFns.setMinutes(dateFns.setHours(dateFns.startOfDay(viewDate), dayStart.hour), dayStart.minute);
    var endOfView = dateFns.setMinutes(dateFns.setHours(dateFns.startOfMinute(dateFns.endOfDay(viewDate)), dayEnd.hour), dayEnd.minute);
    var segmentDuration = MINUTES_IN_HOUR / hourSegments;
    var startOfViewDay = dateFns.startOfDay(viewDate);
    for (var i = 0; i < HOURS_IN_DAY; i++) {
        var segments = [];
        for (var j = 0; j < hourSegments; j++) {
            var date = dateFns.addMinutes(dateFns.addHours(startOfViewDay, i), j * segmentDuration);
            if (date >= startOfView && date < endOfView) {
                segments.push({
                    date: date,
                    isStart: j === 0
                });
            }
        }
        if (segments.length > 0) {
            hours.push({ segments: segments });
        }
    }
    return hours;
}
exports.getDayViewHourGrid = getDayViewHourGrid;
//# sourceMappingURL=CalendarUtils.js.map