// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoMultiPickerElement } from './multi-picker';
import { NovoPickerModule } from 'novo-elements/components/picker';
import { NovoChipsModule } from 'novo-elements/components/chips';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPickerModule, NovoChipsModule],
  declarations: [NovoMultiPickerElement],
  exports: [NovoMultiPickerElement],
})
export class NovoMultiPickerModule {}
