import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovoSlidesComponent } from './slides.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoSlidesComponent],
  exports: [NovoSlidesComponent],
})
export class NovoSlidesModule {
}
