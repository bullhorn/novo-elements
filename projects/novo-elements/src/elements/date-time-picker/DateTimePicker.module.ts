// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { IMaskModule } from 'angular-imask';
// APP
import { NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import { NovoTimePickerModule } from 'novo-elements/elements/time-picker';
import { NovoDateTimePickerElement } from './DateTimePicker';
import { NovoDateTimePickerInputElement } from './DateTimePickerInput';

@NgModule({
  imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskModule, NovoOverlayModule],
  declarations: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
  exports: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
})
export class NovoDateTimePickerModule {}
