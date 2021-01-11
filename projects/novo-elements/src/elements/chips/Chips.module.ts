// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoChipElement } from './Chip';
import { NovoChipsElement } from './Chips';
import { NovoRowChipElement, NovoRowChipsElement } from './RowChips';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPickerModule],
  declarations: [NovoChipElement, NovoChipsElement, NovoRowChipElement, NovoRowChipsElement],
  exports: [NovoChipElement, NovoChipsElement, NovoRowChipElement, NovoRowChipsElement],
})
export class NovoChipsModule {}
