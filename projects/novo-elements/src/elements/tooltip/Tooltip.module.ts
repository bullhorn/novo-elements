// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { TooltipDirective } from './Tooltip.directive';
import { NovoTooltip } from './Tooltip.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TooltipDirective, NovoTooltip],
  exports: [TooltipDirective, NovoTooltip],
})
export class NovoTooltipModule { }
