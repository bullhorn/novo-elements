// NG2
import { NgModule } from '@angular/core';
// APP
import { TooltipDirective } from './Tooltip.directive';
import { NovoTooltip } from './Tooltip.component';

@NgModule({
  declarations: [TooltipDirective, NovoTooltip],
  exports: [TooltipDirective],
  entryComponents: [NovoTooltip],
})
export class NovoTooltipModule {}
