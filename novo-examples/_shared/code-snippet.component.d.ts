import { ChangeDetectorRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HighlightJS } from './highlight.service';
import * as i0 from "@angular/core";
export declare class CodeSnippetComponent implements OnInit {
    private sanitizer;
    private hljs;
    private cdr;
    example: any;
    highlightHTML: SafeHtml;
    highlightTS: SafeHtml;
    highlightCSS: SafeHtml;
    constructor(sanitizer: DomSanitizer, hljs: HighlightJS, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CodeSnippetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CodeSnippetComponent, "code-snippet", never, { "example": { "alias": "example"; "required": false; }; }, {}, never, never, false, never>;
}
