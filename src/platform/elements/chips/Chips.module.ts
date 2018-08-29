// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoChipElement, NovoChipsElement } from './Chips';
import { NovoRowChipElement, NovoRowChipsElement } from './RowChips';
import { InputStateService } from './../../services/input-state/InputStateService';
import { NovoLoadingModule } from './../loading/Loading.module';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPickerModule, NovoLoadingModule],
  declarations: [NovoChipElement, NovoChipsElement, NovoRowChipElement, NovoRowChipsElement],
  exports: [NovoChipElement, NovoChipsElement, NovoRowChipElement, NovoRowChipsElement],
  providers: [InputStateService]
})
export class NovoChipsModule {}
