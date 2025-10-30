import { EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class NovoTipWellElement implements OnInit {
    private labels;
    private sanitizer;
    name: string | number;
    tip: string;
    buttonText: string;
    button: boolean;
    icon: string;
    sanitize: boolean;
    confirmed: EventEmitter<any>;
    isActive: boolean;
    isLocalStorageEnabled: any;
    localStorageKey: string;
    private _tipWithStyles;
    private _lastTipStyled;
    constructor(labels: NovoLabelService, sanitizer: DomSanitizer);
    get tipWithStyles(): SafeHtml;
    ngOnInit(): void;
    hideTip(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTipWellElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTipWellElement, "novo-tip-well", never, { "name": { "alias": "name"; "required": false; }; "tip": { "alias": "tip"; "required": false; }; "buttonText": { "alias": "buttonText"; "required": false; }; "button": { "alias": "button"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "sanitize": { "alias": "sanitize"; "required": false; }; }, { "confirmed": "confirmed"; }, never, ["novo-icon", "*"], false, never>;
}
