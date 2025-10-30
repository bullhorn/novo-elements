import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BackgroundColorDirective {
    private el;
    bg: string;
    get hb_bgColor(): string;
    get hb_bgStyle(): string;
    constructor(el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<BackgroundColorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BackgroundColorDirective, "[bg]", never, { "bg": { "alias": "bg"; "required": false; }; }, {}, never, never, false, never>;
}
