import * as i0 from '@angular/core';
import { AfterViewInit, ElementRef, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, ViewContainerRef, ComponentFactoryResolver, ComponentRef, SimpleChange } from '@angular/core';
import * as i3 from '@angular/common';

declare class PopOverContent implements AfterViewInit {
    protected element: ElementRef;
    protected cdr: ChangeDetectorRef;
    content: string;
    htmlContent: string;
    placement: string;
    title: string;
    animation: boolean;
    popoverDiv: ElementRef;
    popover: PopOverDirective;
    onCloseFromOutside: EventEmitter<any>;
    top: number;
    left: number;
    displayType: string;
    effectivePlacement: string;
    effectiveAlignment: string;
    isHidden: boolean;
    constructor(element: ElementRef, cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    toggle(): void;
    show(): void;
    hide(): void;
    hideFromPopover(): void;
    protected positionElements(hostEl: HTMLElement, targetEl: HTMLElement, positionStr: string, appendToBody?: boolean): {
        top: number;
        left: number;
    };
    protected position(nativeEl: HTMLElement): {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    protected offset(nativeEl: any): {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    protected getStyle(nativeEl: HTMLElement, cssProp: string): string;
    protected isStaticPositioned(nativeEl: HTMLElement): boolean;
    protected parentOffsetEl(nativeEl: HTMLElement): any;
    protected getEffectivePlacement(desiredPlacement: string, hostElement: HTMLElement, targetElement: HTMLElement): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopOverContent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopOverContent, "popover-content", never, { "content": { "alias": "content"; "required": false; }; "htmlContent": { "alias": "htmlContent"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "title": { "alias": "title"; "required": false; }; "animation": { "alias": "animation"; "required": false; }; }, {}, never, ["*"], false, never>;
}

declare class PopOverDirective implements OnChanges, OnDestroy {
    protected viewContainerRef: ViewContainerRef;
    protected resolver: ComponentFactoryResolver;
    protected PopoverComponent: typeof PopOverContent;
    protected popover: ComponentRef<PopOverContent>;
    protected visible: boolean;
    private subscriptions;
    constructor(viewContainerRef: ViewContainerRef, resolver: ComponentFactoryResolver);
    content: string | PopOverContent;
    set novoPopover(content: string | PopOverContent);
    popoverHtmlContent: string;
    popoverDisabled: boolean;
    popoverAlways: boolean;
    popoverAnimation: boolean;
    popoverPlacement: string;
    popoverTitle: string;
    popoverOnHover: boolean;
    popoverDismissTimeout: number;
    onShown: EventEmitter<PopOverDirective>;
    onHidden: EventEmitter<PopOverDirective>;
    showOrHideOnClick(): void;
    showOnHover(): void;
    hideOnHover(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    toggle(): void;
    show(): void;
    hide(): void;
    getElement(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopOverDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PopOverDirective, "[popover], [novoPopover]", never, { "content": { "alias": "popover"; "required": false; }; "novoPopover": { "alias": "novoPopover"; "required": false; }; "popoverHtmlContent": { "alias": "popoverHtmlContent"; "required": false; }; "popoverDisabled": { "alias": "popoverDisabled"; "required": false; }; "popoverAlways": { "alias": "popoverAlways"; "required": false; }; "popoverAnimation": { "alias": "popoverAnimation"; "required": false; }; "popoverPlacement": { "alias": "popoverPlacement"; "required": false; }; "popoverTitle": { "alias": "popoverTitle"; "required": false; }; "popoverOnHover": { "alias": "popoverOnHover"; "required": false; }; "popoverDismissTimeout": { "alias": "popoverDismissTimeout"; "required": false; }; }, { "onShown": "onShown"; "onHidden": "onHidden"; }, never, never, false, never>;
}

declare class NovoPopOverModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoPopOverModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoPopOverModule, [typeof PopOverContent, typeof PopOverDirective], [typeof i3.CommonModule], [typeof PopOverContent, typeof PopOverDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoPopOverModule>;
}

export { NovoPopOverModule, PopOverContent, PopOverDirective };
