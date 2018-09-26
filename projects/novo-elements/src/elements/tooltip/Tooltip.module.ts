// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { TooltipDirective } from './Tooltip.directive';
import { NovoTooltip } from './Tooltip.component';

@NgModule({
  declarations: [TooltipDirective, NovoTooltip],
  exports: [TooltipDirective],
  entryComponents: [NovoTooltip],
  imports: [CommonModule],
})
export class NovoTooltipModule {}
