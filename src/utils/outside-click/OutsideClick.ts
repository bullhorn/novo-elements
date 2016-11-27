// NG2
import { EventEmitter, ElementRef, OnDestroy } from '@angular/core';
// APP
import { Helpers } from '../Helpers';

/**
 * Outside click helper, makes to set the element as inactive when clicking outside of it
 */
export class OutsideClick implements OnDestroy {
    element:ElementRef;
    active:boolean = false;
    onOutsideClick:any;
    onActiveChange:EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(element:ElementRef) {
        // Component element
        this.element = element;
        // Outside click handler
        // Property because `this.func.bind(this)` returns a new function each time
        this.onOutsideClick = this.handleOutsideClick.bind(this);
    }

    /**
     * Toggles the element as active and adds/removes the outside click handler
     * @param event
     * @param forceValue
     */
    toggleActive(event?, forceValue?) {
        // Reverse the active property (if forceValue, use that)
        this.active = !Helpers.isBlank(forceValue) ? forceValue : !this.active;
        // Bind window click events to hide on outside click
        if (this.active) {
            window.addEventListener('click', this.onOutsideClick);
        } else {
            window.removeEventListener('click', this.onOutsideClick);
        }
        // Fire the active change event
        this.onActiveChange.emit(this.active);
    }

    /**
     * When the element is destroyed, make sure to remove the handler
     */
    ngOnDestroy() {
        window.removeEventListener('click', this.onOutsideClick);
    }

    /**
     * When clicking outside, checks the element and closes if outside
     * @param event
     */
    handleOutsideClick(event) {
        // If the elements doesn't contain the target element, it is an outside click
        if (!this.element.nativeElement.contains(event.target)) {
            this.toggleActive(event, false);
        }
    }
}
