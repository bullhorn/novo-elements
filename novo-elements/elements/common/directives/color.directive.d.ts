import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TextColorDirective {
    private el;
    txc: string;
    get hb_textColor(): string;
    get hb_textStyle(): string;
    constructor(el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<TextColorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TextColorDirective, "[txc]", never, { "txc": { "alias": "txc"; "required": false; }; }, {}, never, never, false, never>;
}
