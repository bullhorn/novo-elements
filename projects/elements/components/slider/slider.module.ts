// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoSliderElement } from './slider';
import { NovoButtonModule } from 'novo-elements/components/button';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoSliderElement],
  exports: [NovoSliderElement],
})
export class NovoSliderModule {}
