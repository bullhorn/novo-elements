// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoCommonModule } from 'novo-elements/elements/common';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NonIdealStateElement } from './NonIdealState';

@NgModule({
  imports: [CommonModule, NovoIconModule, NovoCommonModule],
  declarations: [NonIdealStateElement],
  exports: [NonIdealStateElement],
})
export class NovoNonIdealStateModule {}
