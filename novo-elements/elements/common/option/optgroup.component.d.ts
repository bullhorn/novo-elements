import { BooleanInput } from '@angular/cdk/coercion';
import { InjectionToken } from '@angular/core';
import { CanDisable, CanDisableCtor } from '../mixins/disabled.mixin';
import { NovoOptionParentComponent } from './option-parent';
import * as i0 from "@angular/core";
export declare class NovoOptgroupBase implements CanDisable {
    disabled: boolean;
    /** Label for the option group. */
    label: string;
    /** Unique id for the underlying label. */
    _labelId: string;
    /** Whether the group is in novoInert a11y mode. */
    _novoInert: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoOptgroupBase, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoOptgroupBase, never, never, {}, {}, never, never, true, never>;
}
export declare const NovoOptgroupMixinBase: CanDisableCtor & typeof NovoOptgroupBase;
/**
 * Injection token that can be used to reference instances of `NovoOptgroup`. It serves as
 * alternative token to the actual `NovoOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export declare const NOVO_OPTGROUP: InjectionToken<NovoOptgroup>;
/**
 * Component that is used to group instances of `novo-option`.
 */
export declare class NovoOptgroup extends NovoOptgroupMixinBase {
    constructor(parent?: NovoOptionParentComponent);
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoOptgroup, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoOptgroup, "novo-optgroup", ["novoOptgroup"], { "disabled": { "alias": "disabled"; "required": false; }; "label": { "alias": "label"; "required": false; }; }, {}, never, ["novo-option, ng-container, novo-divider, cdk-virtual-scroll-viewport"], false, never>;
}
