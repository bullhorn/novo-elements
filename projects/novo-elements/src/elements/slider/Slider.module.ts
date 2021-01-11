// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from './../button/Button.module';
import { NovoSliderElement } from './Slider';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoSliderElement],
  exports: [NovoSliderElement],
})
export class NovoSliderModule {}
