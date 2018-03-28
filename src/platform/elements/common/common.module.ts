import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovoTemplate } from './novo-template/novo-template.directive';

@NgModule({
  imports: [CommonModule],
  exports: [NovoTemplate],
  declarations: [NovoTemplate],
})
export class NovoCommonModule {}
