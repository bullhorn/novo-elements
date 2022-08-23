// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoAgendaWeekViewElement } from './week/agenda-week-view';
import { NovoAgendaWeekHeaderElement } from './week/agenda-week-header';
import { NovoAgendaWeekEventElement } from './week/agenda-week-event';
import { YearPipe } from './pipe/year.pipe';
import { WeekdayPipe } from './pipe/weekday.pipe';
import { MonthDayPipe } from './pipe/month-day.pipe';
import { MonthPipe } from './pipe/month.pipe';
import { HoursPipe } from './pipe/hours.pipe';
import { EndOfWeekDisplayPipe } from './pipe/end-of-week-display-pipe.pipe';
import { DayOfMonthPipe } from './pipe/day-of-month.pipe';
import { NovoAgendaMonthViewElement } from './month/agenda-month-view';
import { NovoAgendaMonthHeaderElement } from './month/agenda-month-header';
import { NovoAgendaMonthDayElement } from './month/agenda-month-day';
import { NovoAgendaHourSegmentElement } from './day/agenda-hour-segment';
import { NovoAgendaDayViewElement } from './day/agenda-day-view';
import { NovoAgendaDayEventElement } from './day/agenda-day-event';
import { NovoAgendaAllDayEventElement } from './day/agenda-all-day-event';
import { NovoEventTypeLegendElement } from './common/event-type-legend';
import { NovoAgendaDateChangeElement } from './common/agenda-date-change';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoPipesModule } from 'novo-elements/pipes';

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
