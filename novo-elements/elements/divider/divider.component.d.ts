import { BooleanInput } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
export declare class NovoDividerComponent {
    /** Whether the divider is vertically aligned. */
    get vertical(): boolean;
    set vertical(value: boolean);
    private _vertical;
    /** Whether the divider is an inset divider. */
    get inset(): boolean;
    set inset(value: boolean);
    private _inset;
    static ngAcceptInputType_vertical: BooleanInput;
    static ngAcceptInputType_inset: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDividerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDividerComponent, "novo-divider", never, { "vertical": { "alias": "vertical"; "required": false; }; "inset": { "alias": "inset"; "required": false; }; }, {}, never, never, false, never>;
}
