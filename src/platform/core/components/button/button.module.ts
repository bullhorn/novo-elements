import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovoButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoButtonComponent],
  exports: [NovoButtonComponent],
})
export class NovoButtonModule {
}
