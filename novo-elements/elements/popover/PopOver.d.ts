import { ComponentFactoryResolver, ComponentRef, EventEmitter, OnChanges, SimpleChange, ViewContainerRef } from '@angular/core';
import { PopOverContent } from './PopOverContent';
import * as i0 from "@angular/core";
export declare class PopOverDirective implements OnChanges {
    protected viewContainerRef: ViewContainerRef;
    protected resolver: ComponentFactoryResolver;
    protected PopoverComponent: typeof PopOverContent;
    protected popover: ComponentRef<PopOverContent>;
    protected visible: boolean;
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
    toggle(): void;
    show(): void;
    hide(): void;
    getElement(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopOverDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PopOverDirective, "[popover], [novoPopover]", never, { "content": { "alias": "popover"; "required": false; }; "novoPopover": { "alias": "novoPopover"; "required": false; }; "popoverHtmlContent": { "alias": "popoverHtmlContent"; "required": false; }; "popoverDisabled": { "alias": "popoverDisabled"; "required": false; }; "popoverAlways": { "alias": "popoverAlways"; "required": false; }; "popoverAnimation": { "alias": "popoverAnimation"; "required": false; }; "popoverPlacement": { "alias": "popoverPlacement"; "required": false; }; "popoverTitle": { "alias": "popoverTitle"; "required": false; }; "popoverOnHover": { "alias": "popoverOnHover"; "required": false; }; "popoverDismissTimeout": { "alias": "popoverDismissTimeout"; "required": false; }; }, { "onShown": "onShown"; "onHidden": "onHidden"; }, never, never, false, never>;
}
