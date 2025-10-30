import { ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Outside click helper, makes to set the element as inactive when clicking outside of it
 */
export declare class OutsideClick implements OnDestroy {
    element: ElementRef;
    otherElement: ElementRef;
    active: boolean;
    onOutsideClick: EventListenerOrEventListenerObject;
    onActiveChange: EventEmitter<boolean>;
    constructor(element: ElementRef);
    /**
     * When the element is destroyed, make sure to remove the handler
     */
    ngOnDestroy(): void;
    /**
     * Toggles the element as active and adds/removes the outside click handler
     */
    toggleActive(event?: MouseEvent, forceValue?: boolean): void;
    /**
     * When clicking outside, checks the element and closes if outside
     */
    handleOutsideClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OutsideClick, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OutsideClick>;
}
