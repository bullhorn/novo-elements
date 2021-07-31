// NG2
import { NgModule } from '@angular/core';
import { NovoCollapsableColumnElement } from './CollapsableColumn.component';
import { NovoDragulaModule } from '../dragula/Dragula.module';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [NovoCollapsableColumnElement],
    exports: [NovoCollapsableColumnElement],
  imports: [
    NovoDragulaModule,
    CommonModule,
  ]
})
export class NovoCollapsableColumnModule {}
