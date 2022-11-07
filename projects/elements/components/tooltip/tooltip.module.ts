// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';
import { NovoTooltip } from './tooltip.component';

@NgModule({
  declarations: [TooltipDirective, NovoTooltip],
  exports: [TooltipDirective],
  imports: [CommonModule],
})
export class NovoTooltipModule {}
