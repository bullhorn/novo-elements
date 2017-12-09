import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovoLoadingComponent, NovoSpinnerComponent } from './loading.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoLoadingComponent, NovoSpinnerComponent],
  exports: [NovoLoadingComponent, NovoSpinnerComponent],
})
export class NovoLoadingModule {
}
