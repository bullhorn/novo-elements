// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoFlexElement } from './Flex';
import { NovoGridElement } from './Grid';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoFlexElement, NovoGridElement],
  exports: [NovoFlexElement, NovoGridElement],
})
export class NovoFlexModule {}
