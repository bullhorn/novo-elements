// NG2
import { NgModule } from '@angular/core';
import { PopOverDirective } from './PopOver';
// APP
import { PopOverContent } from './PopOverContent';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PopOverContent, PopOverDirective],
  exports: [PopOverContent, PopOverDirective],
  imports: [
    CommonModule
  ]
})
export class NovoPopOverModule {}
