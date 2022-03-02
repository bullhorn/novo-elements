import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoBoxElement } from './Box';
import { NovoFlexElement, NovoStackElement } from './Flex';
import { NovoGridElement } from './Grid';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoFlexElement, NovoStackElement, NovoGridElement, NovoBoxElement],
  exports: [NovoFlexElement, NovoStackElement, NovoGridElement, NovoBoxElement],
})
export class NovoFlexModule {}
