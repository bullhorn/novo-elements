import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuContentComponent } from './menu-content.component';
import { MenuComponent } from './menu.component';
import { NovoMenuService } from './menu.service';
import * as i0 from "@angular/core";
export declare class MenuDirective implements OnInit, OnDestroy {
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
