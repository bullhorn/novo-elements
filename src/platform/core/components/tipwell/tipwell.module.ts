import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoButtonModule } from './../button/button.module';

import { NovoTipwellComponent } from './tipwell.component';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoTipwellComponent],
  exports: [NovoTipwellComponent],
})
export class NovoTipwellModule {
}
