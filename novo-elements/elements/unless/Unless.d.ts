import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Security } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class Unless {
    templateRef: TemplateRef<any>;
    viewContainer: ViewContainerRef;
    security: Security;
    permissions: string;
    isDisplayed: boolean;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, security: Security);
    set bhUnless(value: string);
    check(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Unless, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<Unless, "[bhUnless]", never, { "bhUnless": { "alias": "bhUnless"; "required": false; }; }, {}, never, never, false, never>;
}
