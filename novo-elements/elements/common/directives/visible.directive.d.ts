import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class VisibleDirective {
    private el;
    visible: boolean;
    get hb_visibility(): "" | "novo-visibility-hidden";
    constructor(el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<VisibleDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<VisibleDirective, "[visible]", never, { "visible": { "alias": "visible"; "required": false; }; }, {}, never, never, false, never>;
}
