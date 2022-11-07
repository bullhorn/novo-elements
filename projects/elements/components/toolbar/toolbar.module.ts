// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoToolbar, NovoToolbarRow } from './toolbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoToolbar, NovoToolbarRow],
  exports: [NovoToolbar, NovoToolbarRow],
})
export class NovoToolbarModule {}
