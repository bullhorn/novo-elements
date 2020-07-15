// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoToastElement } from './Toast';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoToastElement],
  exports: [NovoToastElement],
})
export class NovoToastModule { }
