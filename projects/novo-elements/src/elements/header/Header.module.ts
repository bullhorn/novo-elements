import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from './../button/Button.module';
import { NovoHeaderComponent, NovoHeaderSpacer, NovoUtilActionComponent, NovoUtilsComponent } from './Header';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer],
  exports: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer],
})
export class NovoHeaderModule {}
