// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonElement } from './Button';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoButtonElement],
  exports: [NovoButtonElement],
})
export class NovoButtonModule {}
