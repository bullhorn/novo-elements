// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoChipsModule } from './../chips/Chips.module';
import { NovoMultiPickerElement } from './MultiPicker';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPickerModule, NovoChipsModule],
  declarations: [NovoMultiPickerElement],
  exports: [NovoMultiPickerElement],
})
export class NovoMultiPickerModule {}
