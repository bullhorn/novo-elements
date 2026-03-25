import * as i0 from '@angular/core';
import { ElementRef } from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from 'novo-elements/elements/common';
import * as i4 from 'novo-elements/elements/icon';
import * as i5 from 'novo-elements/elements/button';

declare class NovoHeaderSpacer {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHeaderSpacer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoHeaderSpacer, "header-spacer", never, {}, {}, never, ["*"], false, never>;
}
declare class NovoUtilsComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoUtilsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoUtilsComponent, "utils", never, {}, {}, never, ["*"], false, never>;
}
declare class NovoUtilActionComponent {
    icon: string;
    size: string;
    inverse: boolean;
    disabled: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoUtilActionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoUtilActionComponent, "util-action, novo-action", never, { "icon": { "alias": "icon"; "required": false; }; "size": { "alias": "size"; "required": false; }; "inverse": { "alias": "inverse"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], false, never>;
}
declare class NovoHeaderComponent {
    element: ElementRef;
    role: string;
    headerClass: string;
    condensed: boolean;
    title: string;
    subTitle: string;
    inverse: string;
    icon: string;
    size: 'small' | 'medium' | 'large';
    get hb_isSizeSmall(): boolean;
    get hb_isSizeLarge(): boolean;
    get hb_isSizeDefault(): boolean;
    set theme(theme: string);
    get theme(): string;
    private _theme;
    constructor(element: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoHeaderComponent, "novo-header,header[theme],header[accent]", never, { "condensed": { "alias": "condensed"; "required": false; }; "title": { "alias": "title"; "required": false; }; "subTitle": { "alias": "subTitle"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "size": { "alias": "size"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; }, {}, never, ["[prefix]", "novo-icon, [novo-icon]", "h1, h2, h3, h4, h5, h6, small, novo-title, [novo-title], [novo-subtitle]", "section", "novo-action,[novo-action]", "utils", "[suffix]", "*"], false, never>;
}

declare class NovoHeaderModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHeaderModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoHeaderModule, [typeof NovoHeaderComponent, typeof NovoUtilActionComponent, typeof NovoUtilsComponent, typeof NovoHeaderSpacer], [typeof i2.CommonModule, typeof i3.NovoCommonModule, typeof i4.NovoIconModule, typeof i5.NovoButtonModule], [typeof NovoHeaderComponent, typeof NovoUtilActionComponent, typeof NovoUtilsComponent, typeof NovoHeaderSpacer]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoHeaderModule>;
}

export { NovoHeaderComponent, NovoHeaderModule, NovoHeaderSpacer, NovoUtilActionComponent, NovoUtilsComponent };
