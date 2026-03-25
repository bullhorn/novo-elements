import * as i0 from '@angular/core';
import { OnDestroy, OnInit, AfterViewInit, ViewContainerRef, ElementRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import * as i3 from '@angular/common';

declare class NovoTooltip {
    message: string;
    hidden: boolean;
    tooltipType: string;
    rounded: boolean;
    size: string;
    positionStrategy: any;
    preline: boolean;
    noAnimate: boolean;
    position: string;
    isHTML: boolean;
    bounce: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTooltip, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTooltip, "novo-tooltip", never, {}, {}, never, never, false, never>;
}

declare class TooltipDirective implements OnDestroy, OnInit, AfterViewInit {
    protected overlay: Overlay;
    private viewContainerRef;
    private elementRef;
    tooltip: string;
    position: string;
    type: string;
    size: string;
    bounce: boolean;
    noAnimate: boolean;
    rounded: boolean;
    always: boolean;
    preline: boolean;
    removeArrow: boolean;
    autoPosition: boolean;
    isHTML: boolean;
    closeOnClick: boolean;
    onOverflow: boolean;
    private _active;
    set active(value: boolean);
    get active(): boolean;
    private tooltipInstance;
    private portal;
    private overlayRef;
    private _resizeObserver;
    constructor(overlay: Overlay, viewContainerRef: ViewContainerRef, elementRef: ElementRef);
    isPosition(position: string): boolean;
    isType(type: string): boolean;
    isSize(size: string): boolean;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onclick(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    show(): void;
    hide(): void;
    private getPosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TooltipDirective, "[tooltip]", never, { "tooltip": { "alias": "tooltip"; "required": false; }; "position": { "alias": "tooltipPosition"; "required": false; }; "type": { "alias": "tooltipType"; "required": false; }; "size": { "alias": "tooltipSize"; "required": false; }; "bounce": { "alias": "tooltipBounce"; "required": false; }; "noAnimate": { "alias": "tooltipNoAnimate"; "required": false; }; "rounded": { "alias": "tooltipRounded"; "required": false; }; "always": { "alias": "tooltipAlways"; "required": false; }; "preline": { "alias": "tooltipPreline"; "required": false; }; "removeArrow": { "alias": "removeTooltipArrow"; "required": false; }; "autoPosition": { "alias": "tooltipAutoPosition"; "required": false; }; "isHTML": { "alias": "tooltipIsHTML"; "required": false; }; "closeOnClick": { "alias": "tooltipCloseOnClick"; "required": false; }; "onOverflow": { "alias": "tooltipOnOverflow"; "required": false; }; "active": { "alias": "tooltipActive"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoTooltipModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTooltipModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoTooltipModule, [typeof TooltipDirective, typeof NovoTooltip], [typeof i3.CommonModule], [typeof TooltipDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoTooltipModule>;
}

export { NovoTooltip, NovoTooltipModule, TooltipDirective };
