import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from './../button/Button.module';
import { NovoCommonModule } from './../common/common.module';
import { NovoIconModule } from './../icon/Icon.module';
import { NovoHeaderComponent, NovoHeaderSpacer, NovoUtilActionComponent, NovoUtilsComponent } from './Header';

@NgModule({
  imports: [CommonModule, NovoCommonModule, NovoIconModule, NovoButtonModule],
  declarations: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer],
  exports: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer],
})
export class NovoHeaderModule {}
