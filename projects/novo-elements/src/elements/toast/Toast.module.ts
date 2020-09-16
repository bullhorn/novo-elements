// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoToastElement } from './Toast';
import { NovoButtonModule } from '../button';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoToastElement],
  exports: [NovoToastElement],
})
export class NovoToastModule {}
