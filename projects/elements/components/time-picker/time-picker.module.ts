// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoListModule } from 'novo-elements/components/list';
import { NovoTimePickerElement } from './time-picker';
// Vendor
import { NovoTimePickerInputElement } from './time-picker-input';

@NgModule({
  imports: [CommonModule, FormsModule, IMaskModule, NovoOverlayModule, NovoListModule],
  declarations: [NovoTimePickerElement, NovoTimePickerInputElement],
  exports: [NovoTimePickerElement, NovoTimePickerInputElement],
})
export class NovoTimePickerModule {}
