import { OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class NovoAvatarElement implements OnInit {
    private sanitizer;
    source: any;
    label: string;
    theme: string;
    image: string;
    size: string;
    shape: string;
    color: string;
    get hb_classBinding(): string[];
    get background(): string;
    src: any;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): any;
    setPrefixedValue(elm: any, prop: any, value: any): any;
    private _isValidURL;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAvatarElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAvatarElement, "novo-avatar", never, { "source": { "alias": "source"; "required": false; }; "label": { "alias": "label"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "image": { "alias": "image"; "required": false; }; "size": { "alias": "size"; "required": false; }; "shape": { "alias": "shape"; "required": false; }; "color": { "alias": "color"; "required": false; }; }, {}, never, never, false, never>;
}
