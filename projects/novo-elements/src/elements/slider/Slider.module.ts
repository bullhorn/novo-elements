// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoSliderElement } from './Slider';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoSliderElement],
  exports: [NovoSliderElement],
})
export class NovoSliderModule {}
