// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoPipesModule } from 'novo-elements/pipes';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCalendarModule } from 'novo-elements/elements/calendar';
import { NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoChipsModule } from 'novo-elements/elements/chips';
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
