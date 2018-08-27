// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from './../button/Button.module';
import { NovoSliderElement } from './Slider';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoSliderElement],
  exports: [NovoSliderElement],
})
export class NovoSliderModule {}
