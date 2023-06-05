// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoRadioElement } from './Radio';
import { NovoRadioGroup } from './RadioGroup';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoRadioElement, NovoRadioGroup],
  exports: [NovoRadioElement, NovoRadioGroup],
})
export class NovoRadioModule {}
