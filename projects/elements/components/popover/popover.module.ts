// NG2
import { NgModule } from '@angular/core';
import { PopOverDirective } from './popover';
import { PopOverContent } from './popover-content';

@NgModule({
  declarations: [PopOverContent, PopOverDirective],
  exports: [PopOverContent, PopOverDirective],
})
export class NovoPopOverModule {}
