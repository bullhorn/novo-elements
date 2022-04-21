// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoPipesModule } from '../../pipes/Pipes.module';
// APP
import { NovoButtonModule } from '../button';
import { NovoCalendarModule } from '../calendar/Calendar.module';
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoChipsModule } from './../chips/Chips.module';
import { NovoDatePickerElement } from './DatePicker';
import { NovoDatePickerInputElement } from './DatePickerInput';
import { NovoDateRangeInputElement } from './DateRangeInput';
import { NovoMultiDateInputElement } from './MultiDateInput';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NovoButtonModule,
    NovoPipesModule,
    NovoOverlayModule,
    TextMaskModule,
    NovoIconModule,
    NovoChipsModule,
    NovoCalendarModule,
  ],
  declarations: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
  exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
})
export class NovoDatePickerModule {}
