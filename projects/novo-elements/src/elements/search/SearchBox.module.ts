// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoButtonModule } from './../button/Button.module';
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoTooltipModule } from './../tooltip/Tooltip.module';
import { NovoSearchBoxElement } from './SearchBox';

@NgModule({
  imports: [CommonModule, NovoButtonModule, NovoPickerModule, NovoTooltipModule, NovoOverlayModule],
  declarations: [NovoSearchBoxElement],
  exports: [NovoSearchBoxElement],
})
export class NovoSearchBoxModule {}
