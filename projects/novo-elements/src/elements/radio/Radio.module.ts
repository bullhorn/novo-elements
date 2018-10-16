// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoRadioElement, NovoRadioGroup } from './Radio';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoRadioElement, NovoRadioGroup],
  exports: [NovoRadioElement, NovoRadioGroup],
})
export class NovoRadioModule {}
