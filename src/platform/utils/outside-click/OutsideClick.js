"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var Helpers_1 = require("../Helpers");
/**
 * Outside click helper, makes to set the element as inactive when clicking outside of it
 */
var OutsideClick = (function () {
    function OutsideClick(element) {
        this.active = false;
        this.onActiveChange = new core_1.EventEmitter();
        // Component element
        this.element = element;
        // Outside click handler
        // Property because `this.func.bind(this)` returns a new function each time
        this.onOutsideClick = this.handleOutsideClick.bind(this);
    }
    /**
    * When the element is destroyed, make sure to remove the handler
    */
    OutsideClick.prototype.ngOnDestroy = function () {
        window.removeEventListener('click', this.onOutsideClick);
    };
    /**
     * Toggles the element as active and adds/removes the outside click handler
     * @param event
     * @param forceValue
     */
    OutsideClick.prototype.toggleActive = function (event, forceValue) {
        // Reverse the active property (if forceValue, use that)
        this.active = !Helpers_1.Helpers.isBlank(forceValue) ? forceValue : !this.active;
        // Bind window click events to hide on outside click
        if (this.active) {
            window.addEventListener('click', this.onOutsideClick);
        }
        else {
            window.removeEventListener('click', this.onOutsideClick);
        }
        // Fire the active change event
        this.onActiveChange.emit(this.active);
    };
    /**
     * When clicking outside, checks the element and closes if outside
     * @param event
     */
    OutsideClick.prototype.handleOutsideClick = function (event) {
        // If the elements doesn't contain the target element, it is an outside click
        var outsideClick = !this.element.nativeElement.contains(event.target);
        if (this.otherElement && outsideClick) {
            outsideClick = !this.otherElement.nativeElement.contains(event.target);
        }
        if (outsideClick) {
            this.toggleActive(event, false);
        }
    };
    return OutsideClick;
}());
exports.OutsideClick = OutsideClick;
//# sourceMappingURL=OutsideClick.js.map