import { Overlay, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { MenuContentComponent } from './menu-content.component';
import type { MenuItemDirective } from './menu-item.directive';
import type { MenuComponent } from './menu.component';
import type { MenuDirective } from './menu.directive';
import * as i0 from "@angular/core";
export interface IMenuClickEvent {
    anchorElement?: Element | EventTarget;
    menu?: MenuComponent;
    event?: MouseEvent | KeyboardEvent;
    parentMenu?: MenuComponent;
    menuTrigger?: MenuDirective;
    item: any;
    activeMenuItemIndex?: number;
}
export interface IMenuContext extends IMenuClickEvent {
    menuItems: MenuItemDirective[];
    menuClass: string;
}
export interface CloseLeafMenuEvent {
    exceptRootMenu?: boolean;
    event?: MouseEvent | KeyboardEvent;
}
export interface OverlayRefWithMenu extends OverlayRef {
    menu?: MenuContentComponent;
}
export interface CancelMenuEvent {
    eventType: 'cancel';
    event?: MouseEvent | KeyboardEvent;
}
export interface ExecuteMenuEvent {
    eventType: 'execute';
    event?: MouseEvent | KeyboardEvent;
    item: any;
    menuItem: MenuItemDirective;
}
export type CloseMenuEvent = ExecuteMenuEvent | CancelMenuEvent;
export declare class NovoMenuService {
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
