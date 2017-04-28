// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { CalendarMonthElement } from './CalendarMonth';
import { CalendarMonthHeaderElement } from './CalendarMonthHeader';
import { CalendarMonthDayElement } from './CalendarMonthDay';
import { WeekdayPipe } from './Weekday.pipe';
import { MonthPipe } from './Month.pipe';
import { YearPipe } from './Year.pipe';
import { DayOfMonthPipe } from './DayOfMonth.pipe';

@NgModule({
    imports: [CommonModule, NovoButtonModule],
    declarations: [CalendarMonthElement, CalendarMonthHeaderElement, CalendarMonthDayElement, WeekdayPipe, DayOfMonthPipe, MonthPipe, YearPipe],
    exports: [CalendarMonthElement, CalendarMonthHeaderElement, CalendarMonthDayElement, WeekdayPipe, DayOfMonthPipe, MonthPipe, YearPipe]
})
export class NovoCalendarModule {
}
