import { EventEmitter, ElementRef, OnDestroy } from '@angular/core';
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
     * @param event
     * @param forceValue
     */
    toggleActive(event?: MouseEvent, forceValue?: boolean): void;
    /**
     * When clicking outside, checks the element and closes if outside
     * @param event
     */
    handleOutsideClick(event: MouseEvent): void;
}
