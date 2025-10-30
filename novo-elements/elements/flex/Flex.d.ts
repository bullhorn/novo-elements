import * as i0 from "@angular/core";
export declare class NovoFlexElement {
    get display(): string;
    direction: string;
    align: string;
    justify: string;
    wrap: string;
    gap: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFlexElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFlexElement, "novo-flex,novo-row", never, { "direction": { "alias": "direction"; "required": false; }; "align": { "alias": "align"; "required": false; }; "justify": { "alias": "justify"; "required": false; }; "wrap": { "alias": "wrap"; "required": false; }; "gap": { "alias": "gap"; "required": false; }; }, {}, never, ["*"], false, never>;
}
export declare class NovoStackElement extends NovoFlexElement {
    direction: string;
    align: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoStackElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoStackElement, "novo-stack,novo-column", never, { "direction": { "alias": "direction"; "required": false; }; "align": { "alias": "align"; "required": false; }; }, {}, never, ["*"], false, never>;
}
