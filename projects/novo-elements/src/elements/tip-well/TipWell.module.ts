// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from './../button/Button.module';
import { NovoTipWellElement } from './TipWell';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoTipWellElement],
  exports: [NovoTipWellElement],
})
export class NovoTipWellModule {}
