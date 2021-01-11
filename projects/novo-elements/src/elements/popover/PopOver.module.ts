// NG2
import { NgModule } from '@angular/core';
import { PopOverDirective } from './PopOver';
// APP
import { PopOverContent } from './PopOverContent';

@NgModule({
  declarations: [PopOverContent, PopOverDirective],
  exports: [PopOverContent, PopOverDirective],
})
export class NovoPopOverModule {}
