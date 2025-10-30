import { NovoBaseTextElement } from '../base/base-text.component';
import { TypographyWeight } from '../text.types';
import * as i0 from "@angular/core";
/**
 * Tag Example
 * <novo-title size="sm" disabled>Label</novo-title
 * <novo-title small disabled>Label</novo-title>
 * <novo-title large disabled>Label</novo-title>
 * <novo-title error>Label</novo-title>
 * <novo-title muted>Label</novo-title>
 * <novo-title class="tc-grapefruit">Label</novo-title>
 * <novo-title color="grapefruit">Label</novo-title>
 */
export declare class NovoTitle extends NovoBaseTextElement {
    weight: TypographyWeight;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTitle, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTitle, "novo-title,[novo-title]", never, {}, {}, never, ["*"], false, never>;
}
