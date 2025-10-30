import { OnInit } from '@angular/core';
import { NovoBaseTextElement } from '../base/base-text.component';
import * as i0 from "@angular/core";
export declare class NovoLabel extends NovoBaseTextElement implements OnInit {
    id: string;
    inputId: import("@angular/core").InputSignal<any>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoLabel, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoLabel, "novo-label,[novo-label]", never, { "inputId": { "alias": "id"; "required": false; "isSignal": true; }; }, {}, never, ["*"], false, never>;
}
