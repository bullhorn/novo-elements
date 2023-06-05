// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
// Common Elements
import { NovoAgendaDateChangeElement } from './common/AgendaDateChange';
import { NovoEventTypeLegendElement } from './common/EventTypeLegend';
// Day View
import { NovoAgendaAllDayEventElement } from './day/AgendaAllDayEvent';
import { NovoAgendaDayEventElement } from './day/AgendaDayEvent';
import { NovoAgendaDayViewElement } from './day/AgendaDayView';
import { NovoAgendaHourSegmentElement } from './day/AgendaHourSegment';
// Month View
import { NovoAgendaMonthDayElement } from './month/AgendaMonthDay';
import { NovoAgendaMonthHeaderElement } from './month/AgendaMonthHeader';
import { NovoAgendaMonthViewElement } from './month/AgendaMonthView';
// Week View
import { NovoAgendaWeekEventElement } from './week/AgendaWeekEvent';
import { NovoAgendaWeekHeaderElement } from './week/AgendaWeekHeader';
import { NovoAgendaWeekViewElement } from './week/AgendaWeekView';
// Pipes
import { DayOfMonthPipe } from './pipe/DayOfMonth.pipe';
import { EndOfWeekDisplayPipe } from './pipe/EndOfWeekDisplayPipe.pipe';
import { HoursPipe } from './pipe/Hours.pipe';
import { MonthPipe } from './pipe/Month.pipe';
import { MonthDayPipe } from './pipe/MonthDay.pipe';
import { WeekdayPipe } from './pipe/Weekday.pipe';
import { YearPipe } from './pipe/Year.pipe';

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
