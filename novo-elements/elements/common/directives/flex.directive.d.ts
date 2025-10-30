import { ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class FlexDirective {
    private readonly el;
    private readonly renderer;
    private _flex;
    get flex(): string;
    set flex(value: string);
    constructor(el: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<FlexDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FlexDirective, "[flex]", never, { "flex": { "alias": "flex"; "required": false; }; }, {}, never, never, false, never>;
}
