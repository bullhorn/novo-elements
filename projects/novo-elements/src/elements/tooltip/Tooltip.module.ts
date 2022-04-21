// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoTooltip } from './Tooltip.component';
// APP
import { TooltipDirective } from './Tooltip.directive';

@NgModule({
  declarations: [TooltipDirective, NovoTooltip],
  exports: [TooltipDirective],
  imports: [CommonModule],
})
export class NovoTooltipModule {}
