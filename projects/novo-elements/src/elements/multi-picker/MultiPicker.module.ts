// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoChipsModule } from 'novo-elements/elements/chips';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { NovoMultiPickerElement } from './MultiPicker';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPickerModule, NovoChipsModule],
  declarations: [NovoMultiPickerElement],
  exports: [NovoMultiPickerElement],
})
export class NovoMultiPickerModule {}
