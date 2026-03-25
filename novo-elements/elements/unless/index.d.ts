import * as i0 from '@angular/core';
import { TemplateRef, ViewContainerRef, DestroyRef } from '@angular/core';
import { Security } from 'novo-elements/services';
import * as i2 from '@angular/common';

declare class Unless {
    templateRef: TemplateRef<any>;
    viewContainer: ViewContainerRef;
    security: Security;
    private destroyRef;
    permissions: string;
    isDisplayed: boolean;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, security: Security, destroyRef: DestroyRef);
    set bhUnless(value: string);
    check(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Unless, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<Unless, "[bhUnless]", never, { "bhUnless": { "alias": "bhUnless"; "required": false; }; }, {}, never, never, false, never>;
}

declare class UnlessModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<UnlessModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<UnlessModule, [typeof Unless], [typeof i2.CommonModule], [typeof Unless]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<UnlessModule>;
}

export { Unless, UnlessModule };
