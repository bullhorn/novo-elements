import { EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoColorSwatchComponent implements OnInit {
    color: string;
    style: {
        [key: string]: string;
    };
    focusStyle: {
        [key: string]: string;
    };
    focus: boolean;
    onClick: EventEmitter<any>;
    onHover: EventEmitter<any>;
    divStyles: {
        [key: string]: string;
    };
    focusStyles: {
        [key: string]: string;
    };
    inFocus: boolean;
    ngOnInit(): void;
    currentStyles(): {
        [key: string]: string;
    };
    handleFocusOut(): void;
    handleFocus(): void;
    handleHover(hex: string, $event: any): void;
    handleClick(hex: string, $event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoColorSwatchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoColorSwatchComponent, "novo-color-swatch", never, { "color": { "alias": "color"; "required": false; }; "style": { "alias": "style"; "required": false; }; "focusStyle": { "alias": "focusStyle"; "required": false; }; "focus": { "alias": "focus"; "required": false; }; }, { "onClick": "onClick"; "onHover": "onHover"; }, never, ["*"], false, never>;
}
