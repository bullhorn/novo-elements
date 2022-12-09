// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { NovoDateTimePickerInputElement } from './date-time-picker-input';
import { NovoDateTimePickerElement } from './date-time-picker';
import { NovoTimePickerModule } from 'novo-elements/components/time-picker';
import { NovoDatePickerModule } from 'novo-elements/components/date-picker';
import { NovoOverlayModule } from 'novo-elements/common/overlay';

@NgModule({
  imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskDirectiveModule, NovoOverlayModule],
  declarations: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
  exports: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
})
export class NovoDateTimePickerModule {}
