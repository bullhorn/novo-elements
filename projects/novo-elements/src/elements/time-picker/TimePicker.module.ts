// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { IMaskModule } from 'angular-imask';
// APP
import { NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoListModule } from 'novo-elements/elements/list';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoTimePickerElement } from './TimePicker';
import { NovoTimePickerInputElement } from './TimePickerInput';

@NgModule({
  imports: [CommonModule, FormsModule, IMaskModule, NovoOverlayModule, NovoListModule, NovoButtonModule],
  declarations: [NovoTimePickerElement, NovoTimePickerInputElement],
  exports: [NovoTimePickerElement, NovoTimePickerInputElement],
})
export class NovoTimePickerModule {}
