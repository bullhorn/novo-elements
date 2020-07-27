// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoFlexElement } from './Flex';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoFlexElement],
  exports: [NovoFlexElement],
})
export class NovoFlexModule {}
