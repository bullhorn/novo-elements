import { ModuleWithProviders } from '@angular/core';
import { IMenuOptions } from 'novo-elements/elements';
import * as i0 from "@angular/core";
export declare class NovoElementProviders {
    static forRoot(options?: {
        menu: IMenuOptions;
    }): ModuleWithProviders<NovoElementProviders>;
    static forChild(): ModuleWithProviders<NovoElementProviders>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoElementProviders, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoElementProviders, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoElementProviders>;
}
