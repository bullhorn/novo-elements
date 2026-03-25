import * as i0 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from 'novo-elements/elements/icon';
import * as i4 from 'novo-elements/elements/common';

declare class NonIdealStateElement {
    hb_class: string;
    theme: string;
    icon: string;
    title: string;
    description: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NonIdealStateElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NonIdealStateElement, "novo-non-ideal-state", never, { "theme": { "alias": "theme"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "title": { "alias": "title"; "required": false; }; "description": { "alias": "description"; "required": false; }; }, {}, never, ["novo-icon", "novo-icon,novo-loading,novo-avatar", "novo-title", "novo-text", "*"], false, never>;
}

declare class NovoNonIdealStateModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoNonIdealStateModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoNonIdealStateModule, [typeof NonIdealStateElement], [typeof i2.CommonModule, typeof i3.NovoIconModule, typeof i4.NovoCommonModule], [typeof NonIdealStateElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoNonIdealStateModule>;
}

export { NonIdealStateElement, NovoNonIdealStateModule };
