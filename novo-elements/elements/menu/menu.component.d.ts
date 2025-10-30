import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { NovoOption } from 'novo-elements/elements/common';
import { MenuItemDirective } from './menu-item.directive';
import { CloseMenuEvent, IMenuClickEvent, NovoMenuService } from './menu.service';
import { ILinkConfig, IMenuOptions } from './menu.types';
import * as i0 from "@angular/core";
export interface MouseLocation {
    left?: string;
    marginLeft?: string;
    marginTop?: string;
    top?: string;
}
export declare class MenuComponent implements OnDestroy {
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
