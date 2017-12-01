import { AfterViewInit, ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { PopOverDirective } from './PopOver';
export declare class PopOverContent implements AfterViewInit {
    protected element: ElementRef;
    protected cdr: ChangeDetectorRef;
    content: string;
    placement: string;
    title: string;
    animation: boolean;
    popoverDiv: ElementRef;
    popover: PopOverDirective;
    onCloseFromOutside: EventEmitter<{}>;
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
}
