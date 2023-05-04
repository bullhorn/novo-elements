// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from 'novo-elements/elements/button';
// APP
import { NovoToastElement } from './Toast';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoToastElement],
  exports: [NovoToastElement],
})
export class NovoToastModule {}
