// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoPipesModule } from '../../pipes/Pipes.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoChipsModule } from './../chips/Chips.module';
import { NovoCalendarElement } from './calendar/calendar.component';
import { NovoDatePickerElement } from './DatePicker';
import { NovoDatePickerInputElement } from './DatePickerInput';
import { NovoDateRangeInputElement } from './DateRangeInput';
import { NovoMonthSelectElement } from './month-select/month-select.component';
import { NovoMonthViewElement } from './month-view/month-view.component';
import { NovoMultiDateInputElement } from './MultiDateInput';
import { NovoYearSelectElement } from './year-select/year-select.component';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPipesModule, NovoOverlayModule, TextMaskModule, NovoIconModule, NovoChipsModule],
  declarations: [
    NovoDatePickerElement,
    NovoDatePickerInputElement,
    NovoDateRangeInputElement,
    NovoMultiDateInputElement,
    NovoMonthViewElement,
    NovoMonthSelectElement,
    NovoYearSelectElement,
    NovoCalendarElement,
  ],
  exports: [
    NovoDatePickerElement,
    NovoDatePickerInputElement,
    NovoDateRangeInputElement,
    NovoMultiDateInputElement,
    NovoMonthViewElement,
    NovoMonthSelectElement,
    NovoYearSelectElement,
    NovoCalendarElement,
  ],
})
export class NovoDatePickerModule {}
