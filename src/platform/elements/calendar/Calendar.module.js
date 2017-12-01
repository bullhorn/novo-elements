"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var Button_module_1 = require("../button/Button.module");
var Tooltip_module_1 = require("../tooltip/Tooltip.module");
var Pipes_module_1 = require("../../pipes/Pipes.module");
// Common Elements
var EventTypeLegend_1 = require("./common/EventTypeLegend");
var CalendarDateChange_1 = require("./common/CalendarDateChange");
// Month View
var CalendarMonthView_1 = require("./month/CalendarMonthView");
var CalendarMonthHeader_1 = require("./month/CalendarMonthHeader");
var CalendarMonthDay_1 = require("./month/CalendarMonthDay");
// Week View
var CalendarWeekView_1 = require("./week/CalendarWeekView");
var CalendarWeekHeader_1 = require("./week/CalendarWeekHeader");
var CalendarWeekEvent_1 = require("./week/CalendarWeekEvent");
// Day View
var CalendarDayView_1 = require("./day/CalendarDayView");
var CalendarDayEvent_1 = require("./day/CalendarDayEvent");
var CalendarHourSegment_1 = require("./day/CalendarHourSegment");
var CalendarAllDayEvent_1 = require("./day/CalendarAllDayEvent");
// Common
var Weekday_pipe_1 = require("./pipe/Weekday.pipe");
var Month_pipe_1 = require("./pipe/Month.pipe");
var MonthDay_pipe_1 = require("./pipe/MonthDay.pipe");
var Year_pipe_1 = require("./pipe/Year.pipe");
var Hours_pipe_1 = require("./pipe/Hours.pipe");
var DayOfMonth_pipe_1 = require("./pipe/DayOfMonth.pipe");
var EndOfWeekDisplayPipe_pipe_1 = require("./pipe/EndOfWeekDisplayPipe.pipe");
var NovoCalendarModule = (function () {
    function NovoCalendarModule() {
    }
    return NovoCalendarModule;
}());
NovoCalendarModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, Button_module_1.NovoButtonModule, Tooltip_module_1.NovoTooltipModule, Pipes_module_1.NovoPipesModule],
                declarations: [
                    EventTypeLegend_1.NovoEventTypeLegendElement,
                    CalendarMonthView_1.NovoCalendarMonthViewElement,
                    CalendarMonthHeader_1.NovoCalendarMonthHeaderElement,
                    CalendarMonthDay_1.NovoCalendarMonthDayElement,
                    CalendarWeekView_1.NovoCalendarWeekViewElement,
                    CalendarWeekHeader_1.NovoCalendarWeekHeaderElement,
                    CalendarWeekEvent_1.NovoCalendarWeekEventElement,
                    CalendarDayView_1.NovoCalendarDayViewElement,
                    CalendarDayEvent_1.NovoCalendarDayEventElement,
                    CalendarHourSegment_1.NovoCalendarHourSegmentElement,
                    CalendarAllDayEvent_1.NovoCalendarAllDayEventElement,
                    CalendarDateChange_1.NovoCalendarDateChangeElement,
                    Weekday_pipe_1.WeekdayPipe,
                    DayOfMonth_pipe_1.DayOfMonthPipe,
                    Month_pipe_1.MonthPipe,
                    MonthDay_pipe_1.MonthDayPipe,
                    Year_pipe_1.YearPipe,
                    Hours_pipe_1.HoursPipe,
                    EndOfWeekDisplayPipe_pipe_1.EndOfWeekDisplayPipe
                ],
                exports: [
                    EventTypeLegend_1.NovoEventTypeLegendElement,
                    CalendarMonthView_1.NovoCalendarMonthViewElement,
                    CalendarMonthHeader_1.NovoCalendarMonthHeaderElement,
                    CalendarMonthDay_1.NovoCalendarMonthDayElement,
                    CalendarWeekView_1.NovoCalendarWeekViewElement,
                    CalendarWeekHeader_1.NovoCalendarWeekHeaderElement,
                    CalendarWeekEvent_1.NovoCalendarWeekEventElement,
                    CalendarDayView_1.NovoCalendarDayViewElement,
                    CalendarDayEvent_1.NovoCalendarDayEventElement,
                    CalendarHourSegment_1.NovoCalendarHourSegmentElement,
                    CalendarAllDayEvent_1.NovoCalendarAllDayEventElement,
                    CalendarDateChange_1.NovoCalendarDateChangeElement,
                    Weekday_pipe_1.WeekdayPipe,
                    DayOfMonth_pipe_1.DayOfMonthPipe,
                    Month_pipe_1.MonthPipe,
                    MonthDay_pipe_1.MonthDayPipe,
                    Year_pipe_1.YearPipe,
                    Hours_pipe_1.HoursPipe,
                    EndOfWeekDisplayPipe_pipe_1.EndOfWeekDisplayPipe
                ]
            },] },
];
/** @nocollapse */
NovoCalendarModule.ctorParameters = function () { return []; };
exports.NovoCalendarModule = NovoCalendarModule;
//# sourceMappingURL=Calendar.module.js.map