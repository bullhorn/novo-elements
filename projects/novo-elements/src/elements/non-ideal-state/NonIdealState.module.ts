// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoIconModule } from '../icon/Icon.module';
import { NonIdealStateElement } from './NonIdealState';

@NgModule({
  imports: [CommonModule, NovoIconModule],
  declarations: [NonIdealStateElement],
  exports: [NonIdealStateElement],
})
export class NovoNonIdealStateModule {}