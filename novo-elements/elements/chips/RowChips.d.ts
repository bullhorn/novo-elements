import { ElementRef } from '@angular/core';
import { ComponentUtils, NovoLabelService } from 'novo-elements/services';
import { NovoChipElement } from './Chip';
import { NovoChipsElement } from './Chips';
import * as i0 from "@angular/core";
export declare class NovoRowChipElement extends NovoChipElement {
    onSelect(e: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRowChipElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoRowChipElement, "novo-row-chip", never, {}, {}, never, ["*"], false, never>;
}
export declare class NovoRowChipsElement extends NovoChipsElement {
    closeOnSelect: boolean;
    constructor(element: ElementRef, componentUtils: ComponentUtils, labels: NovoLabelService);
    onKeyDown(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRowChipsElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoRowChipsElement, "novo-row-chips", never, { "closeOnSelect": { "alias": "closeOnSelect"; "required": false; }; }, {}, never, never, false, never>;
}
