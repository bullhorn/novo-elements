// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoCalendarModule } from 'novo-elements/components/calendar';
import { NovoChipsModule } from 'novo-elements/components/chips';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoDatePickerElement } from './date-picker';
import { NovoDatePickerInputElement } from './date-picker-input';
import { NovoDateRangeInputElement } from './date-range-input';
import { NovoMultiDateInputElement } from './multi-date-input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NovoButtonModule,
    NovoPipesModule,
    NovoOverlayModule,
    IMaskModule,
    NovoIconModule,
    NovoChipsModule,
    NovoCalendarModule,
  ],
  declarations: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
  exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
})
export class NovoDatePickerModule {}
