// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonElement } from './button';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoButtonElement],
  exports: [NovoButtonElement],
})
export class NovoButtonModule {}
