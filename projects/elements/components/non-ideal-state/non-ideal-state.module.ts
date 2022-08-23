// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NonIdealStateElement } from './non-ideal-state';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoCommonModule } from 'novo-elements/common';

@NgModule({
  imports: [CommonModule, NovoIconModule, NovoCommonModule],
  declarations: [NonIdealStateElement],
  exports: [NonIdealStateElement],
})
export class NovoNonIdealStateModule {}
