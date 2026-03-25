import * as i0 from '@angular/core';
import * as _angular_platform_browser from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import * as i4 from '@angular/common';

declare class NovoBoxElement {
    get display(): string;
    direction: string;
    align: string;
    justify: string;
    wrap: string;
    gap: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoBoxElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoBoxElement, "novo-box", never, { "direction": { "alias": "direction"; "required": false; }; "align": { "alias": "align"; "required": false; }; "justify": { "alias": "justify"; "required": false; }; "wrap": { "alias": "wrap"; "required": false; }; "gap": { "alias": "gap"; "required": false; }; }, {}, never, ["*"], false, never>;
}

declare class NovoFlexElement {
    get display(): string;
    direction: string;
    align: string;
    justify: string;
    wrap: string;
    gap: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFlexElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFlexElement, "novo-flex,novo-row", never, { "direction": { "alias": "direction"; "required": false; }; "align": { "alias": "align"; "required": false; }; "justify": { "alias": "justify"; "required": false; }; "wrap": { "alias": "wrap"; "required": false; }; "gap": { "alias": "gap"; "required": false; }; }, {}, never, ["*"], false, never>;
}
declare class NovoStackElement extends NovoFlexElement {
    direction: string;
    align: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoStackElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoStackElement, "novo-stack,novo-column", never, { "direction": { "alias": "direction"; "required": false; }; "align": { "alias": "align"; "required": false; }; }, {}, never, ["*"], false, never>;
}

declare class NovoGridElement {
    private _sanitizer;
    get display(): string;
    direction: string;
    align: string;
    justify: string;
    columns: string;
    get hb_gridCols(): _angular_platform_browser.SafeStyle;
    constructor(_sanitizer: DomSanitizer);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoGridElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoGridElement, "novo-grid", never, { "direction": { "alias": "direction"; "required": false; }; "align": { "alias": "align"; "required": false; }; "justify": { "alias": "justify"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; }, {}, never, ["*"], false, never>;
}

declare class NovoFlexModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFlexModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoFlexModule, [typeof NovoFlexElement, typeof NovoStackElement, typeof NovoGridElement, typeof NovoBoxElement], [typeof i4.CommonModule], [typeof NovoFlexElement, typeof NovoStackElement, typeof NovoGridElement, typeof NovoBoxElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoFlexModule>;
}

export { NovoBoxElement, NovoFlexElement, NovoFlexModule, NovoGridElement, NovoStackElement };
