// NG2
import { NgModule } from '@angular/core';
// APP
import { PopOverContent } from './PopOverContent';
import { PopOverDirective } from './PopOver';

@NgModule({
    declarations: [PopOverContent, PopOverDirective],
    exports: [PopOverContent, PopOverDirective],
    entryComponents: [PopOverContent]
})
export class NovoPopOverModule {
}

