// NG2
import { NgModule } from '@angular/core';
// APP
import { NovoDrawerElement, NovoDrawerContentElement, NovoDrawerToggleElement } from './Drawer';

@NgModule({
    declarations: [NovoDrawerElement, NovoDrawerContentElement, NovoDrawerToggleElement],
    exports: [NovoDrawerElement, NovoDrawerContentElement, NovoDrawerToggleElement]
})
export class NovoDrawerModule {
}
