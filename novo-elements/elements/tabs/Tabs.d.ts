import { AfterContentChecked, ChangeDetectorRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
export declare class NovoNavElement implements AfterContentChecked {
    theme: string;
    direction: string;
    outlet: any;
    router: string;
    condensed: boolean;
    items: Array<any>;
    /** The index of the active tab. */
    get selectedIndex(): number | null;
    set selectedIndex(value: number | null);
    private _selectedIndex;
    /** The tab index that should be selected after the content has been checked. */
    private _indexToSelect;
    /** Output to enable support for two-way binding on `[(selectedIndex)]` */
    readonly selectedIndexChange: EventEmitter<number>;
    ngAfterContentChecked(): void;
    select(item: any): void;
    add(item: any): void;
    private _activateSelectedItem;
    private _showActiveContent;
    private _deactivateAllItems;
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    private _clampTabIndex;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoNavElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoNavElement, "novo-nav", never, { "theme": { "alias": "theme"; "required": false; }; "direction": { "alias": "direction"; "required": false; }; "outlet": { "alias": "outlet"; "required": false; }; "router": { "alias": "router"; "required": false; }; "condensed": { "alias": "condensed"; "required": false; }; "selectedIndex": { "alias": "selectedIndex"; "required": false; }; }, { "selectedIndexChange": "selectedIndexChange"; }, never, ["*"], false, never>;
}
export declare class NovoTabElement {
    private el;
    private cdr;
    role: string;
    active: boolean;
    color: string;
    disabled: boolean;
    activeChange: EventEmitter<boolean>;
    onlyText: boolean;
    get hb_textOnly(): boolean;
    tablink: any;
    nav: any;
    constructor(nav: NovoNavElement, el: ElementRef, cdr: ChangeDetectorRef);
    select(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTabElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTabElement, "novo-tab", never, { "active": { "alias": "active"; "required": false; }; "color": { "alias": "color"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "activeChange": "activeChange"; }, never, ["*"], false, never>;
}
export declare class NovoTabButtonElement {
    role: string;
    active: boolean;
    disabled: boolean;
    nav: any;
    constructor(nav: NovoNavElement);
    select(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTabButtonElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTabButtonElement, "novo-tab-button", never, { "active": { "alias": "active"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], false, never>;
}
export declare class NovoTabLinkElement implements OnInit {
    private router;
    private cdr;
    private link?;
    role: string;
    active: boolean;
    disabled: boolean;
    spy: string;
    nav: any;
    constructor(nav: NovoNavElement, router: Router, cdr: ChangeDetectorRef, link?: RouterLink);
    ngOnInit(): void;
    select(): void;
    private isLinkActive;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTabLinkElement, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTabLinkElement, "novo-tab-link", never, { "active": { "alias": "active"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "spy": { "alias": "spy"; "required": false; }; }, {}, never, ["*"], false, never>;
}
export declare class NovoNavOutletElement {
    items: Array<any>;
    show(index: any): void;
    add(item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoNavOutletElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoNavOutletElement, "novo-nav-outlet", never, {}, {}, never, ["*"], false, never>;
}
export declare class NovoNavContentElement {
    active: boolean;
    constructor(outlet: NovoNavOutletElement);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoNavContentElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoNavContentElement, "novo-nav-content", never, { "active": { "alias": "active"; "required": false; }; }, {}, never, ["*"], false, never>;
}
export declare class NovoNavHeaderElement {
    role: string;
    active: boolean;
    forElement: any;
    outlet: any;
    constructor(outlet: NovoNavOutletElement);
    show(event?: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoNavHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoNavHeaderElement, "novo-nav-header", never, { "active": { "alias": "active"; "required": false; }; "forElement": { "alias": "for"; "required": false; }; }, {}, never, ["*"], false, never>;
}
