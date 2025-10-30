import { AfterViewInit, ElementRef } from '@angular/core';
import { HighlightJS } from '../highlight.service';
import * as i0 from "@angular/core";
export declare class FigureExample implements AfterViewInit {
    private element;
    private hljs;
    theme: string;
    get hb_theme(): string;
    constructor(element: ElementRef, hljs: HighlightJS);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FigureExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FigureExample, "figure-example", never, { "theme": { "alias": "theme"; "required": false; }; }, {}, never, ["img,[img],code,pre", "novo-label,label", "*"], false, never>;
}
