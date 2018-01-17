// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
// APP
import { NovoOverlayModule } from '../overlay/overlay.module';
import { NovoButtonModule } from './../button/button.module';
// import { NovoPickerModule } from './../picker/Picker.module';
// import { NovoTooltipModule } from './../tooltip/Tooltip.module';
import { NovoSearchComponent } from './search.component';

@NgModule({
  imports: [CommonModule, NovoButtonModule, OverlayModule, NovoOverlayModule],
  declarations: [NovoSearchComponent],
  exports: [NovoSearchComponent],
})
export class NovoSearchModule {}
