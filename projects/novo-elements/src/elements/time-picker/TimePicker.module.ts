// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoListModule } from '../list/List.module';
import { NovoTimePickerElement } from './TimePicker';
import { NovoTimePickerInputElement } from './TimePickerInput';

@NgModule({
  imports: [CommonModule, FormsModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule, NovoListModule],
  declarations: [NovoTimePickerElement, NovoTimePickerInputElement],
  exports: [NovoTimePickerElement, NovoTimePickerInputElement],
})
export class NovoTimePickerModule {}
