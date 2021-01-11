// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoPipesModule } from '../../pipes/Pipes.module';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { NovoCalendarDateChangeElement } from './common/CalendarDateChange';
// Common Elements
import { NovoEventTypeLegendElement } from './common/EventTypeLegend';
import { NovoCalendarAllDayEventElement } from './day/CalendarAllDayEvent';
import { NovoCalendarDayEventElement } from './day/CalendarDayEvent';
// Day View
import { NovoCalendarDayViewElement } from './day/CalendarDayView';
import { NovoCalendarHourSegmentElement } from './day/CalendarHourSegment';
import { NovoCalendarMonthDayElement } from './month/CalendarMonthDay';
import { NovoCalendarMonthHeaderElement } from './month/CalendarMonthHeader';
// Month View
import { NovoCalendarMonthViewElement } from './month/CalendarMonthView';
import { DayOfMonthPipe } from './pipe/DayOfMonth.pipe';
import { EndOfWeekDisplayPipe } from './pipe/EndOfWeekDisplayPipe.pipe';
import { HoursPipe } from './pipe/Hours.pipe';
import { MonthPipe } from './pipe/Month.pipe';
import { MonthDayPipe } from './pipe/MonthDay.pipe';
// Common
import { WeekdayPipe } from './pipe/Weekday.pipe';
import { YearPipe } from './pipe/Year.pipe';
import { NovoCalendarWeekEventElement } from './week/CalendarWeekEvent';
import { NovoCalendarWeekHeaderElement } from './week/CalendarWeekHeader';
// Week View
import { NovoCalendarWeekViewElement } from './week/CalendarWeekView';

@NgModule({
  imports: [CommonModule, NovoButtonModule, NovoTooltipModule, NovoPipesModule],
  declarations: [
    NovoEventTypeLegendElement,
    NovoCalendarMonthViewElement,
    NovoCalendarMonthHeaderElement,
    NovoCalendarMonthDayElement,
    NovoCalendarWeekViewElement,
    NovoCalendarWeekHeaderElement,
    NovoCalendarWeekEventElement,
    NovoCalendarDayViewElement,
    NovoCalendarDayEventElement,
    NovoCalendarHourSegmentElement,
    NovoCalendarAllDayEventElement,
    NovoCalendarDateChangeElement,
    WeekdayPipe,
    DayOfMonthPipe,
    MonthPipe,
    MonthDayPipe,
    YearPipe,
    HoursPipe,
    EndOfWeekDisplayPipe,
  ],
  exports: [
    NovoEventTypeLegendElement,
    NovoCalendarMonthViewElement,
    NovoCalendarMonthHeaderElement,
    NovoCalendarMonthDayElement,
    NovoCalendarWeekViewElement,
    NovoCalendarWeekHeaderElement,
    NovoCalendarWeekEventElement,
    NovoCalendarDayViewElement,
    NovoCalendarDayEventElement,
    NovoCalendarHourSegmentElement,
    NovoCalendarAllDayEventElement,
    NovoCalendarDateChangeElement,
    WeekdayPipe,
    DayOfMonthPipe,
    MonthPipe,
    MonthDayPipe,
    YearPipe,
    HoursPipe,
    EndOfWeekDisplayPipe,
  ],
})
export class NovoCalendarModule {}
