import { ElementRef, TemplateRef } from '@angular/core';
import { NovoOption } from 'novo-elements/elements/common';
import * as i0 from "@angular/core";
/**
 * This is a structural directive now.  Should only be used on `novo-options`
 */
export declare class MenuItemDirective {
    template: TemplateRef<{
        item: any;
    }>;
    elementRef: ElementRef;
    menuItemEnabled: boolean | ((item: any) => boolean);
    menuItemVisible: boolean | ((item: any) => boolean);
    optionRef: NovoOption;
    currentItem: any;
    constructor(template: TemplateRef<{
        item: any;
    }>, elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MenuItemDirective, "[menuItem]", never, { "menuItemEnabled": { "alias": "menuItemEnabled"; "required": false; }; "menuItemVisible": { "alias": "menuItemVisible"; "required": false; }; }, {}, ["optionRef"], never, false, never>;
}
