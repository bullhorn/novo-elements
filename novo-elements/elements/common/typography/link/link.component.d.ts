import { NovoBaseTextElement } from '../base/base-text.component';
import * as i0 from "@angular/core";
/**
 * Tag Example
 * <novo-text size="small" disabled>Label</novo-text
 * <novo-text small disabled>Label</novo-text>
 * <novo-text large disabled>Label</novo-text>
 * <novo-text error>Label</novo-text>
 * <novo-text muted>Label</novo-text>
 * <novo-text class="tc-grapefruit">Label</novo-text>
 * <novo-text color="grapefruit">Label</novo-text>
 */
export declare class NovoLink extends NovoBaseTextElement {
    href: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoLink, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoLink, "novo-link", never, { "href": { "alias": "href"; "required": false; }; }, {}, never, ["*"], false, never>;
}
