import { NgModule } from '@angular/core';

import { NovoHeaderModule } from './../header/header.module';
import { NovoCardComponent } from './card.component';

@NgModule({
  imports: [NovoHeaderModule],
  declarations: [NovoCardComponent],
  exports: [NovoCardComponent],
})
export class NovoCardModule {
}
