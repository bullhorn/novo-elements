// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoRadioGroup } from './radio-group';
import { NovoRadioElement } from './radio';
import { NovoButtonModule } from 'novo-elements/components/button';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoRadioElement, NovoRadioGroup],
  exports: [NovoRadioElement, NovoRadioGroup],
})
export class NovoRadioModule {}
