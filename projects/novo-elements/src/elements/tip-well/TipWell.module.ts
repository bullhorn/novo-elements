// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from './../button/Button.module';
import { NovoTipWellElement } from './TipWell';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoTipWellElement],
  exports: [NovoTipWellElement],
})
export class NovoTipWellModule {}
