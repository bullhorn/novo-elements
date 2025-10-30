import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoHintElement implements OnInit {
    /** Whether to align the hint label at the start or end of the line. */
    align: 'start' | 'end';
    /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
    id: string;
    ngOnInit(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHintElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoHintElement, "novo-hint", never, { "align": { "alias": "align"; "required": false; }; "id": { "alias": "id"; "required": false; }; }, {}, never, ["*"], false, never>;
}
