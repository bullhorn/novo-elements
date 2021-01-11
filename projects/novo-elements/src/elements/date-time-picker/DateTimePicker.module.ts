// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoTimePickerModule } from '../time-picker/TimePicker.module';
import { NovoDateTimePickerElement } from './DateTimePicker';
import { NovoDateTimePickerInputElement } from './DateTimePickerInput';

@NgModule({
  imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule],
  declarations: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
  exports: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
})
export class NovoDateTimePickerModule {}
