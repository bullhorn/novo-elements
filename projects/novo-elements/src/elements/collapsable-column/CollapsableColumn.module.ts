// NG2
import { NgModule } from '@angular/core';
import { NovoCollapsableColumnElement } from './CollapsableColumn.component';
import { NovoDragulaModule } from '../dragula/Dragula.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';

@NgModule({
    declarations: [NovoCollapsableColumnElement],
    exports: [NovoCollapsableColumnElement],
  imports: [
    NovoDragulaModule,
    CommonModule,
    FormsModule,
    NovoFormExtrasModule,
  ]
})
export class NovoCollapsableColumnModule {}
