// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoChipElement, NovoChipsElement } from './Chips';
import { NovoRowChipElement, NovoRowChipsElement } from './RowChips';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPickerModule],
  declarations: [NovoChipElement, NovoChipsElement, NovoRowChipElement, NovoRowChipsElement],
  exports: [NovoChipElement, NovoChipsElement, NovoRowChipElement, NovoRowChipsElement],
})
export class NovoChipsModule {}
