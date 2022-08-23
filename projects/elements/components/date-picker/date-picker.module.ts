// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoMultiDateInputElement } from './multi-date-input';
import { NovoDateRangeInputElement } from './date-range-input';
import { NovoDatePickerInputElement } from './date-picker-input';
import { NovoDatePickerElement } from './date-picker';
import { NovoChipsModule } from 'novo-elements/components/chips';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoCalendarModule } from 'novo-elements/components/calendar';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoPipesModule } from 'novo-elements/pipes';
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
