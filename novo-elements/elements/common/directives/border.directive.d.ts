import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BorderDirective {
    private el;
    borderStyle: string;
    borderColor: string;
    borderWidth: number;
    border: string;
    borderLeft: string;
    bl: string;
    borderRight: string;
    br: string;
    borderTop: string;
    bt: string;
    borderBottom: string;
    bb: string;
    borderX: string;
    bx: string;
    borderY: string;
    by: string;
    get hb_border(): string;
    get hb_border_left(): string;
    get hb_border_right(): string;
    get hb_border_top(): string;
    get hb_border_bottom(): string;
    constructor(el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<BorderDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BorderDirective, "[border], [bb], [borderBottom], [bt], [borderTop], [bl], [borderLeft], [br], [borderRight], [bx], [borderX], [by], [borderY]", never, { "borderStyle": { "alias": "borderStyle"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "borderWidth": { "alias": "borderWidth"; "required": false; }; "border": { "alias": "border"; "required": false; }; "borderLeft": { "alias": "borderLeft"; "required": false; }; "bl": { "alias": "bl"; "required": false; }; "borderRight": { "alias": "borderRight"; "required": false; }; "br": { "alias": "br"; "required": false; }; "borderTop": { "alias": "borderTop"; "required": false; }; "bt": { "alias": "bt"; "required": false; }; "borderBottom": { "alias": "borderBottom"; "required": false; }; "bb": { "alias": "bb"; "required": false; }; "borderX": { "alias": "borderX"; "required": false; }; "bx": { "alias": "bx"; "required": false; }; "borderY": { "alias": "borderY"; "required": false; }; "by": { "alias": "by"; "required": false; }; }, {}, never, never, false, never>;
}
