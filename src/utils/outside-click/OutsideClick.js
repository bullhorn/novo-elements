// NG2
import { EventEmitter } from '@angular/core';
import { isBlank } from '@angular/core/src/facade/lang';

/**
 * Outside click helper, makes to set the element as inactive when clicking outside of it
 */
export class OutsideClick {
    constructor(element) {
        // Component element
        this.element = element;
        // Active flag
        this.active = false;
        // Outside click handler
        // Property because `this.func.bind(this)` returns a new function each time
        this.onOutsideClick = this.handleOutsideClick.bind(this);
        // Emits an active change event
        this.onActiveChange = new EventEmitter();
    }

    /**
     * Toggles the element as active and adds/removes the outside click handler
     * @param event
     * @param forceValue
     */
    toggleActive(event, forceValue) {
        // Reverse the active property (if forceValue, use that)
        this.active = !isBlank(forceValue) ? forceValue : !this.active;
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
