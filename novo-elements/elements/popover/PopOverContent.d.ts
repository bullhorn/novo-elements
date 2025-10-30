import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { PopOverDirective } from './PopOver';
import * as i0 from "@angular/core";
export declare class PopOverContent implements AfterViewInit {
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
