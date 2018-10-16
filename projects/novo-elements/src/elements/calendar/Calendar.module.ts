// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { NovoPipesModule } from '../../pipes/Pipes.module';
// Common Elements
import { NovoEventTypeLegendElement } from './common/EventTypeLegend';
import { NovoCalendarDateChangeElement } from './common/CalendarDateChange';

// Month View
import { NovoCalendarMonthViewElement } from './month/CalendarMonthView';
import { NovoCalendarMonthHeaderElement } from './month/CalendarMonthHeader';
import { NovoCalendarMonthDayElement } from './month/CalendarMonthDay';
// Week View
import { NovoCalendarWeekViewElement } from './week/CalendarWeekView';
import { NovoCalendarWeekHeaderElement } from './week/CalendarWeekHeader';
import { NovoCalendarWeekEventElement } from './week/CalendarWeekEvent';
// Day View
import { NovoCalendarDayViewElement } from './day/CalendarDayView';
import { NovoCalendarDayEventElement } from './day/CalendarDayEvent';
import { NovoCalendarHourSegmentElement } from './day/CalendarHourSegment';
import { NovoCalendarAllDayEventElement } from './day/CalendarAllDayEvent';
// Common
import { WeekdayPipe } from './pipe/Weekday.pipe';
import { MonthPipe } from './pipe/Month.pipe';
import { MonthDayPipe } from './pipe/MonthDay.pipe';
import { YearPipe } from './pipe/Year.pipe';
import { HoursPipe } from './pipe/Hours.pipe';
import { DayOfMonthPipe } from './pipe/DayOfMonth.pipe';
import { EndOfWeekDisplayPipe } from './pipe/EndOfWeekDisplayPipe.pipe';

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
