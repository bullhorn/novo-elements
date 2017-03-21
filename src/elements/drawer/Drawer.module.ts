// NG2
import { NgModule } from '@angular/core';
// APP
import { NovoDrawerElement } from './Drawer';
import { NovoDrawerContentElement } from './extras/drawer-content/DrawerContent';
import { NovoDrawerToggleElement } from './extras/drawer-toggle/DrawerToggle';

@NgModule({
    declarations: [NovoDrawerElement, NovoDrawerContentElement, NovoDrawerToggleElement],
    exports: [NovoDrawerElement, NovoDrawerContentElement, NovoDrawerToggleElement]
})
export class NovoDrawerModule {
}
