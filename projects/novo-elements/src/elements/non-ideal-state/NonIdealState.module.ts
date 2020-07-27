// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoIconModule } from '../icon/Icon.module';
import { NonIdealStateElement } from './NonIdealState';

@NgModule({
  imports: [CommonModule, NovoIconModule],
  declarations: [NonIdealStateElement],
  exports: [NonIdealStateElement],
})
export class NovoNonIdealStateModule {}
