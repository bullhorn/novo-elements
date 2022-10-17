// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoTipWellElement } from './tip-well';
import { NovoButtonModule } from 'novo-elements/components/button';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoTipWellElement],
  exports: [NovoTipWellElement],
})
export class NovoTipWellModule {}
