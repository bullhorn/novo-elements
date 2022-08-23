// NG2
import { NgModule } from '@angular/core';
import { PopOverContent } from './pop-over-content';
import { PopOverDirective } from './pop-over';

@NgModule({
  declarations: [PopOverContent, PopOverDirective],
  exports: [PopOverContent, PopOverDirective],
})
export class NovoPopOverModule {}
