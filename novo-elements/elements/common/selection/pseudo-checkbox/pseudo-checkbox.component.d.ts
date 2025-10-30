import * as i0 from "@angular/core";
/**
 * Possible states for a pseudo checkbox.
 * @docs-private
 */
export type NovoPseudoCheckboxState = 'unchecked' | 'checked' | 'indeterminate';
export type NovoPseudoCheckboxShape = 'box' | 'circle' | 'line';
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `novo-primary .novo-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<novo-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
export declare class NovoPseudoCheckbox {
    _animationMode?: string;
    /** Display state of the checkbox. */
    state: NovoPseudoCheckboxState;
    /** Display state of the checkbox. */
    shape: NovoPseudoCheckboxShape;
    /** Whether the checkbox is disabled. */
    disabled: boolean;
    constructor(_animationMode?: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoPseudoCheckbox, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoPseudoCheckbox, "novo-pseudo-checkbox", never, { "state": { "alias": "state"; "required": false; }; "shape": { "alias": "shape"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, false, never>;
}
