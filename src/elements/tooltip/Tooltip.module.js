// NG2
import { NgModule } from '@angular/core';
// APP
import { TooltipDirective } from './Tooltip';

@NgModule({
    declarations: [TooltipDirective],
    exports: [TooltipDirective]
})
export class NovoTooltipModule {
}
