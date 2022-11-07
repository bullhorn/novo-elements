// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoTimePickerInputElement } from './time-picker-input';
import { NovoTimePickerElement } from './time-picker';
import { NovoListModule } from 'novo-elements/components/list';
import { NovoOverlayModule } from 'novo-elements/common/overlay';

@NgModule({
  imports: [CommonModule, FormsModule, IMaskDirectiveModule, TextMaskModule, NovoOverlayModule, NovoListModule],
  declarations: [NovoTimePickerElement, NovoTimePickerInputElement],
  exports: [NovoTimePickerElement, NovoTimePickerInputElement],
})
export class NovoTimePickerModule {}
