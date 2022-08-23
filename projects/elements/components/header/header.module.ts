import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NovoHeaderComponent,
  NovoHeaderSpacer,
  NovoUtilActionComponent,
  NovoUtilsComponent,
} from './header';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoCommonModule } from 'novo-elements/common';
import { NovoButtonModule } from 'novo-elements/components/button';

@NgModule({
  imports: [CommonModule, NovoCommonModule, NovoIconModule, NovoButtonModule],
  declarations: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer],
  exports: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent, NovoHeaderSpacer],
})
export class NovoHeaderModule {}
