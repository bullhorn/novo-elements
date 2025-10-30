import { CdkAccordion } from '@angular/cdk/accordion';
import * as i0 from "@angular/core";
/** NovoAccordion's display modes. */
export type NovoAccordionDisplayMode = 'default' | 'flat';
/**
 * Directive for a Material Design Accordion.
 */
export declare class NovoAccordion extends CdkAccordion {
    /** Whether the expansion indicator should be hidden. */
    get hideToggle(): boolean;
    set hideToggle(show: boolean);
    private _hideToggle;
    /**
     * The display mode used for all expansion panels in the accordion. Currently two display
     * modes exist:
     *  default - a gutter-like spacing is placed around any expanded panel, placing the expanded
     *     panel at a different elevation from the reset of the accordion.
     *  flat - no spacing is placed around expanded panels, showing all panels at the same
     *     elevation.
     */
    displayMode: NovoAccordionDisplayMode;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAccordion, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoAccordion, "novo-accordion", ["novoAccordion"], { "hideToggle": { "alias": "hideToggle"; "required": false; }; "displayMode": { "alias": "displayMode"; "required": false; }; }, {}, never, never, false, never>;
}
