// NG2
import { NgModule } from '@angular/core';
// APP
import { ValueDirective } from './Value';

@NgModule({
    declarations: [ValueDirective],
    exports: [ValueDirective]
})
export class NovoValueModule {
}
