import { ModuleWithProviders } from '@angular/core';
import { IMenuOptions } from './menu.types';
import * as i0 from "@angular/core";
import * as i1 from "./menu.directive";
import * as i2 from "./menu.component";
import * as i3 from "./menu-content.component";
import * as i4 from "./menu-item.directive";
import * as i5 from "@angular/common";
import * as i6 from "@angular/cdk/overlay";
import * as i7 from "novo-elements/elements/common";
import * as i8 from "novo-elements/elements/icon";
export declare class NovoMenuModule {
    static forRoot(options?: IMenuOptions): ModuleWithProviders<NovoMenuModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoMenuModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoMenuModule, [typeof i1.MenuDirective, typeof i2.MenuComponent, typeof i3.MenuContentComponent, typeof i4.MenuItemDirective], [typeof i5.CommonModule, typeof i6.OverlayModule, typeof i7.NovoCommonModule, typeof i8.NovoIconModule], [typeof i1.MenuDirective, typeof i2.MenuComponent, typeof i4.MenuItemDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoMenuModule>;
}
