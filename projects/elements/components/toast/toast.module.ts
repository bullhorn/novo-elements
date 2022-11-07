// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoToastElement } from './toast';
import { NovoButtonModule } from 'novo-elements/components/button';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoToastElement],
  exports: [NovoToastElement],
})
export class NovoToastModule {}
