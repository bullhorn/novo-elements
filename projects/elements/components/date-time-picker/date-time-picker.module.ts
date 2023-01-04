// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoDatePickerModule } from 'novo-elements/components/date-picker';
import { NovoTimePickerModule } from 'novo-elements/components/time-picker';
import { NovoDateTimePickerElement } from './date-time-picker';
// Vendor
import { NovoDateTimePickerInputElement } from './date-time-picker-input';

@NgModule({
  imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskModule, NovoOverlayModule],
  declarations: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
  exports: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
})
export class NovoDateTimePickerModule {}
