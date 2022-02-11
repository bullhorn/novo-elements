// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonElement } from './Button';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoButtonElement],
  exports: [NovoButtonElement],
})
export class NovoButtonModule {}
