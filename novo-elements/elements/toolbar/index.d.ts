import * as novo_elements_elements_common from 'novo-elements/elements/common';
import { CanColor } from 'novo-elements/elements/common';
import * as i0 from '@angular/core';
import { ElementRef, QueryList } from '@angular/core';
import * as i2 from '@angular/common';

/** @docs-private */
declare const _NovoToolbarBase: novo_elements_elements_common.CanColorCtor & {
    new (_elementRef: ElementRef): {
        _elementRef: ElementRef;
    };
};
declare class NovoToolbarRow extends _NovoToolbarBase implements CanColor {
    constructor(elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoToolbarRow, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoToolbarRow, "novo-toolbar-row", never, { "color": { "alias": "color"; "required": false; }; "gap": { "alias": "gap"; "required": false; }; }, {}, never, never, false, never>;
}
declare class NovoToolbar extends _NovoToolbarBase implements CanColor {
    /** Reference to all toolbar row elements that have been projected. */
    _toolbarRows: QueryList<NovoToolbarRow>;
    constructor(elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoToolbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoToolbar, "novo-toolbar", never, { "color": { "alias": "color"; "required": false; }; "gap": { "alias": "gap"; "required": false; }; }, {}, ["_toolbarRows"], ["*", "novo-toolbar-row"], false, never>;
}

declare class NovoToolbarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoToolbarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoToolbarModule, [typeof NovoToolbar, typeof NovoToolbarRow], [typeof i2.CommonModule], [typeof NovoToolbar, typeof NovoToolbarRow]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoToolbarModule>;
}

export { NovoToolbar, NovoToolbarModule, NovoToolbarRow };
