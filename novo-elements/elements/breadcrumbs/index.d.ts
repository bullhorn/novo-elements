import * as i0 from '@angular/core';
import { TemplateRef, InjectionToken, OnInit, EventEmitter } from '@angular/core';
import * as i4 from '@angular/router';
import { Router } from '@angular/router';
import * as i3 from '@angular/common';
import * as i5 from 'novo-elements/elements/dropdown';
import * as i6 from 'novo-elements/elements/search';
import * as i7 from 'novo-elements/elements/button';
import * as i8 from 'novo-elements/elements/icon';
import * as i9 from 'novo-elements/elements/common';

declare class BreadcrumbService {
    private router;
    constructor(router: Router);
    navigateTo($event: any, item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BreadcrumbService>;
}

interface MenuConfig {
    name: string;
    link: string;
    linkType?: 'hrefLink' | 'routerLink';
    target?: string;
}
interface SourceConfig {
    title: string;
    link?: string;
    showMenu?: boolean;
    isSearch?: boolean;
    target?: string;
    menuList?: Array<MenuConfig>;
    customMenuTemplate?: TemplateRef<any>;
    noNavigation?: boolean;
    linkType?: 'hrefLink' | 'routerLink';
}

declare class BreadcrumbElement {
    private breadcrumbService;
    separatorIcon: TemplateRef<any>;
    source: Array<SourceConfig>;
    constructor(breadcrumbService: BreadcrumbService);
    navigateTo($event: any, item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbElement, "novo-breadcrumb", never, { "separatorIcon": { "alias": "separatorIcon"; "required": false; }; "source": { "alias": "source"; "required": false; }; }, {}, never, ["*"], false, never>;
}

/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * @docs-private
 */
interface NovoBreadcrumbRef<T = any> {
    separatorIcon: string;
}
/**
 * Injection token used to provide the parent component to options.
 */
declare const NOVO_BREADCRUMB_REF: InjectionToken<NovoBreadcrumbRef<any>>;

declare class BreadcrumbItemElement implements OnInit {
    private breadcrumbService;
    breadcrumbComponent: NovoBreadcrumbRef;
    showMenu: boolean;
    customMenuTemplate: TemplateRef<any>;
    menuList: Array<MenuConfig>;
    isSearch: boolean;
    toggleEvent: EventEmitter<any>;
    menuListDisplay: Array<MenuConfig>;
    isOpen: boolean;
    constructor(breadcrumbService: BreadcrumbService, breadcrumbComponent: NovoBreadcrumbRef);
    ngOnInit(): void;
    onToggle($event: any): void;
    searchEvent($event: any): void;
    navigateTo($event: any, item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbItemElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbItemElement, "novo-breadcrumb-item", never, { "showMenu": { "alias": "showMenu"; "required": false; }; "customMenuTemplate": { "alias": "customMenuTemplate"; "required": false; }; "menuList": { "alias": "menuList"; "required": false; }; "isSearch": { "alias": "isSearch"; "required": false; }; }, { "toggleEvent": "toggleEvent"; }, never, ["*"], false, never>;
}

declare class NovoBreadcrumbModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoBreadcrumbModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoBreadcrumbModule, [typeof BreadcrumbElement, typeof BreadcrumbItemElement], [typeof i3.CommonModule, typeof i4.RouterModule, typeof i5.NovoDropdownModule, typeof i6.NovoSearchBoxModule, typeof i7.NovoButtonModule, typeof i8.NovoIconModule, typeof i9.NovoOptionModule], [typeof BreadcrumbElement, typeof BreadcrumbItemElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoBreadcrumbModule>;
}

export { BreadcrumbElement, BreadcrumbItemElement, BreadcrumbService, NOVO_BREADCRUMB_REF, NovoBreadcrumbModule };
export type { MenuConfig, NovoBreadcrumbRef, SourceConfig };
