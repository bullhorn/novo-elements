import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoGridElement } from './grid';
import { NovoFlexElement, NovoStackElement } from './flex';
import { NovoBoxElement } from './box';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoFlexElement, NovoStackElement, NovoGridElement, NovoBoxElement],
  exports: [NovoFlexElement, NovoStackElement, NovoGridElement, NovoBoxElement],
})
export class NovoFlexModule {}
