import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovoButtonModule } from './../button/Button.module';
import { NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer } from './Header';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer],
  exports: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer],
})
export class NovoHeaderModule {}
