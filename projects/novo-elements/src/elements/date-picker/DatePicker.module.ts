// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';

// APP
import { NovoPipesModule } from '../../pipes/Pipes.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoChipsModule } from './../chips/Chips.module';
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoDatePickerElement } from './DatePicker';
import { NovoDatePickerInputElement } from './DatePickerInput';
import { NovoDateRangeInputElement } from './DateRangeInput';
import { NovoMultiDateInputElement } from './MultiDateInput';
@NgModule({
  imports: [CommonModule, FormsModule, NovoPipesModule, NovoOverlayModule, TextMaskModule, NovoIconModule, NovoChipsModule],
  declarations: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
  exports: [NovoDatePickerElement, NovoDatePickerInputElement, NovoDateRangeInputElement, NovoMultiDateInputElement],
})
export class NovoDatePickerModule {}
