// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoChipsModule } from './../chips/Chips.module';
// APP
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoMultiPickerElement } from './MultiPicker';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPickerModule, NovoChipsModule],
  declarations: [NovoMultiPickerElement],
  exports: [NovoMultiPickerElement],
})
export class NovoMultiPickerModule {}
