// NG2
import { NgModule } from '@angular/core';
import { NovoCollapsableColumnElement } from './CollapsableColumn.component';
import {NovoDragulaModule} from 'novo-elements';

@NgModule({
    declarations: [NovoCollapsableColumnElement],
    exports: [NovoCollapsableColumnElement],
    imports: [
        NovoDragulaModule
    ]
})
export class NovoCollapsableColumnModule {}
