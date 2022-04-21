// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoPipesModule } from '../../pipes/Pipes.module';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { NovoAgendaDateChangeElement } from './common/AgendaDateChange';
// Common Elements
import { NovoEventTypeLegendElement } from './common/EventTypeLegend';
import { NovoAgendaAllDayEventElement } from './day/AgendaAllDayEvent';
import { NovoAgendaDayEventElement } from './day/AgendaDayEvent';
// Day View
import { NovoAgendaDayViewElement } from './day/AgendaDayView';
import { NovoAgendaHourSegmentElement } from './day/AgendaHourSegment';
import { NovoAgendaMonthDayElement } from './month/AgendaMonthDay';
import { NovoAgendaMonthHeaderElement } from './month/AgendaMonthHeader';
// Month View
import { NovoAgendaMonthViewElement } from './month/AgendaMonthView';
import { DayOfMonthPipe } from './pipe/DayOfMonth.pipe';
import { EndOfWeekDisplayPipe } from './pipe/EndOfWeekDisplayPipe.pipe';
import { HoursPipe } from './pipe/Hours.pipe';
import { MonthPipe } from './pipe/Month.pipe';
import { MonthDayPipe } from './pipe/MonthDay.pipe';
// Common
import { WeekdayPipe } from './pipe/Weekday.pipe';
import { YearPipe } from './pipe/Year.pipe';
import { NovoAgendaWeekEventElement } from './week/AgendaWeekEvent';
import { NovoAgendaWeekHeaderElement } from './week/AgendaWeekHeader';
// Week View
import { NovoAgendaWeekViewElement } from './week/AgendaWeekView';

@NgModule({
  imports: [CommonModule, NovoButtonModule, NovoTooltipModule, NovoPipesModule],
  declarations: [
    NovoEventTypeLegendElement,
    NovoAgendaMonthViewElement,
    NovoAgendaMonthHeaderElement,
    NovoAgendaMonthDayElement,
    NovoAgendaWeekViewElement,
    NovoAgendaWeekHeaderElement,
    NovoAgendaWeekEventElement,
    NovoAgendaDayViewElement,
    NovoAgendaDayEventElement,
    NovoAgendaHourSegmentElement,
    NovoAgendaAllDayEventElement,
    NovoAgendaDateChangeElement,
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
    NovoAgendaMonthViewElement,
    NovoAgendaMonthHeaderElement,
    NovoAgendaMonthDayElement,
    NovoAgendaWeekViewElement,
    NovoAgendaWeekHeaderElement,
    NovoAgendaWeekEventElement,
    NovoAgendaDayViewElement,
    NovoAgendaDayEventElement,
    NovoAgendaHourSegmentElement,
    NovoAgendaAllDayEventElement,
    NovoAgendaDateChangeElement,
    WeekdayPipe,
    DayOfMonthPipe,
    MonthPipe,
    MonthDayPipe,
    YearPipe,
    HoursPipe,
    EndOfWeekDisplayPipe,
  ],
})
export class NovoAgendaModule {}
