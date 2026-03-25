import * as i6 from '@angular/cdk/overlay';
import { Overlay, ScrollStrategyOptions, OverlayRef } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { TemplateRef, ElementRef, OnDestroy, EventEmitter, QueryList, ChangeDetectorRef, OnInit, AfterViewInit, ModuleWithProviders, InjectionToken } from '@angular/core';
import * as i7 from 'novo-elements/elements/common';
import { NovoOption } from 'novo-elements/elements/common';
import { Subscription, Subject } from 'rxjs';
import * as i5 from '@angular/common';
import * as i8 from 'novo-elements/elements/icon';

/**
 * This is a structural directive now.  Should only be used on `novo-options`
 */
declare class MenuItemDirective {
    template: TemplateRef<{
        item: any;
    }>;
    elementRef: ElementRef;
    menuItemEnabled: boolean | ((item: any) => boolean);
    menuItemVisible: boolean | ((item: any) => boolean);
    optionRef: NovoOption;
    currentItem: any;
    constructor(template: TemplateRef<{
        item: any;
    }>, elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MenuItemDirective, "[menuItem]", never, { "menuItemEnabled": { "alias": "menuItemEnabled"; "required": false; }; "menuItemVisible": { "alias": "menuItemVisible"; "required": false; }; }, {}, ["optionRef"], never, false, never>;
}

interface IMenuOptions {
    autoFocus?: boolean;
}
interface ILinkConfig {
    click: (item: any, $event?: MouseEvent) => void;
    enabled?: (item: any) => boolean;
    html: (item: any) => string;
}

interface MouseLocation {
    left?: string;
    marginLeft?: string;
    marginTop?: string;
    top?: string;
}
declare class MenuComponent implements OnDestroy {
    private menuService;
    private changeDetector;
    private elementRef;
    private options;
    menuClass: string;
    autoFocus: boolean;
    disabled: boolean;
    close: EventEmitter<CloseMenuEvent>;
    open: EventEmitter<IMenuClickEvent>;
    menuItems: QueryList<MenuItemDirective>;
    menuOptions: QueryList<NovoOption>;
    menuElement: ElementRef;
    visibleMenuItems: MenuItemDirective[];
    links: ILinkConfig[];
    item: any;
    event: MouseEvent | KeyboardEvent;
    private subscription;
    constructor(menuService: NovoMenuService, changeDetector: ChangeDetectorRef, elementRef: ElementRef, options: IMenuOptions);
    ngOnDestroy(): void;
    onMenuEvent(menuEvent: IMenuClickEvent): void;
    isMenuItemVisible(menuItem: MenuItemDirective): boolean;
    setVisibleMenuItems(): void;
    evaluateIfFunction(value: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuComponent, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuComponent, "novo-menu", never, { "menuClass": { "alias": "menuClass"; "required": false; }; "autoFocus": { "alias": "autoFocus"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "close": "close"; "open": "open"; }, ["menuItems", "menuOptions"], never, false, never>;
}

declare class MenuDirective implements OnInit, OnDestroy {
    private element;
    private menuService;
    private cdr;
    private _parentMenu;
    menuContext: any;
    menu: MenuComponent;
    menuContent: MenuContentComponent;
    waitWhenOpen: boolean;
    capture: boolean;
    anchor: boolean;
    trigger: 'click' | 'contextmenu' | 'mouseenter';
    isSubMenu: boolean;
    isActive: boolean;
    get hb_menuActive(): boolean;
    subscription: Subscription;
    constructor(element: ElementRef, menuService: NovoMenuService, cdr: ChangeDetectorRef, _parentMenu: MenuComponent);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onMenuClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuDirective, [null, null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MenuDirective, "[menu]", never, { "menuContext": { "alias": "menuContext"; "required": false; }; "menu": { "alias": "menu"; "required": false; }; "menuContent": { "alias": "menuContent"; "required": false; }; "waitWhenOpen": { "alias": "waitWhenOpen"; "required": false; }; "capture": { "alias": "capture"; "required": false; }; "anchor": { "alias": "anchor"; "required": false; }; "trigger": { "alias": "trigger"; "required": false; }; }, {}, never, never, false, never>;
}

interface IMenuClickEvent {
    anchorElement?: Element | EventTarget;
    menu?: MenuComponent;
    event?: MouseEvent | KeyboardEvent;
    parentMenu?: MenuComponent;
    menuTrigger?: MenuDirective;
    item: any;
    activeMenuItemIndex?: number;
}
interface IMenuContext extends IMenuClickEvent {
    menuItems: MenuItemDirective[];
    menuClass: string;
}
interface CloseLeafMenuEvent {
    exceptRootMenu?: boolean;
    event?: MouseEvent | KeyboardEvent;
}
interface OverlayRefWithMenu extends OverlayRef {
    menu?: MenuContentComponent;
}
interface CancelMenuEvent {
    eventType: 'cancel';
    event?: MouseEvent | KeyboardEvent;
}
interface ExecuteMenuEvent {
    eventType: 'execute';
    event?: MouseEvent | KeyboardEvent;
    item: any;
    menuItem: MenuItemDirective;
}
type CloseMenuEvent = ExecuteMenuEvent | CancelMenuEvent;
declare class NovoMenuService {
    private overlay;
    private scrollStrategy;
    isDestroyingLeafMenu: boolean;
    show: Subject<IMenuClickEvent>;
    triggerClose: Subject<MenuContentComponent>;
    close: Subject<CloseMenuEvent>;
    private menuContent;
    private overlays;
    private fakeElement;
    constructor(overlay: Overlay, scrollStrategy: ScrollStrategyOptions);
    openMenu(context: IMenuContext): void;
    attachMenu(overlay: OverlayRef, context: IMenuContext): void;
    closeAllMenus(closeEvent: CloseMenuEvent): void;
    hasOpenMenus(): boolean;
    getLastAttachedOverlay(): OverlayRefWithMenu;
    destroyLeafMenu({ exceptRootMenu, event }?: CloseLeafMenuEvent): void;
    destroySubMenus(menu: MenuContentComponent): void;
    isLeafMenu(menuContent: MenuContentComponent): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoMenuService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NovoMenuService>;
}

declare class MenuContentComponent implements OnInit, OnDestroy, AfterViewInit {
    menuItems: MenuItemDirective[];
    item: any;
    event: MouseEvent | KeyboardEvent;
    menu: any;
    parentMenu: MenuContentComponent;
    menuClass: string;
    overlay: OverlayRef;
    isLeaf: boolean;
    openSubMenu: EventEmitter<IMenuClickEvent>;
    closeLeafMenu: EventEmitter<CloseLeafMenuEvent>;
    closeAllMenus: EventEmitter<{
        event: MouseEvent;
    }>;
    autoFocus: boolean;
    private _keyManager;
    private subscription;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    stopEvent($event: MouseEvent): void;
    isMenuItemEnabled(menuItem: MenuItemDirective): boolean;
    isMenuItemVisible(menuItem: MenuItemDirective): boolean;
    evaluateIfFunction(value: any): any;
    isDisabled(link: ILinkConfig): boolean;
    onKeyEvent(event: KeyboardEvent): void;
    keyboardOpenSubMenu(event?: KeyboardEvent): void;
    keyboardMenuItemSelect(event?: KeyboardEvent): void;
    onCloseLeafMenu(event: KeyboardEvent): void;
    closeMenu(event: MouseEvent): void;
    onMouseLeave(event: MouseEvent): void;
    onOpenSubMenu(menuItem: MenuItemDirective, event?: MouseEvent | KeyboardEvent): void;
    onMenuItemSelect(menuItem: MenuItemDirective, event: MouseEvent | KeyboardEvent): void;
    private cancelEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuContentComponent, "menu-content", never, { "menuItems": { "alias": "menuItems"; "required": false; }; "item": { "alias": "item"; "required": false; }; "event": { "alias": "event"; "required": false; }; "menu": { "alias": "menu"; "required": false; }; "parentMenu": { "alias": "parentMenu"; "required": false; }; "menuClass": { "alias": "menuClass"; "required": false; }; "overlay": { "alias": "overlay"; "required": false; }; "isLeaf": { "alias": "isLeaf"; "required": false; }; }, { "openSubMenu": "openSubMenu"; "closeLeafMenu": "closeLeafMenu"; "closeAllMenus": "closeAllMenus"; }, never, never, false, never>;
}

declare class NovoMenuModule {
    static forRoot(options?: IMenuOptions): ModuleWithProviders<NovoMenuModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoMenuModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoMenuModule, [typeof MenuDirective, typeof MenuComponent, typeof MenuContentComponent, typeof MenuItemDirective], [typeof i5.CommonModule, typeof i6.OverlayModule, typeof i7.NovoCommonModule, typeof i8.NovoIconModule], [typeof MenuDirective, typeof MenuComponent, typeof MenuItemDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoMenuModule>;
}

declare const MENU_OPTIONS: InjectionToken<unknown>;
declare const PARENT_MENU: InjectionToken<unknown>;

export { MENU_OPTIONS, MenuComponent, MenuContentComponent, MenuDirective, MenuItemDirective, NovoMenuModule, NovoMenuService, PARENT_MENU };
export type { CancelMenuEvent, CloseLeafMenuEvent, CloseMenuEvent, ExecuteMenuEvent, ILinkConfig, IMenuClickEvent, IMenuContext, IMenuOptions, MouseLocation, OverlayRefWithMenu };
