// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
// APP
import { NovoOverlayModule } from '../overlay';
import { NovoOptionModule } from '../option';
import {
  NovoSelectComponent,
  NovoSelectOptionComponent,
} from './select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    NovoOverlayModule,
    NovoOptionModule,
  ],
  declarations: [NovoSelectComponent, NovoSelectOptionComponent],
  exports: [NovoSelectComponent, NovoSelectOptionComponent],
})
export class NovoSelectModule {}
