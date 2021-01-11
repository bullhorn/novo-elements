// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoFlexElement } from './Flex';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoFlexElement],
  exports: [NovoFlexElement],
})
export class NovoFlexModule {}
