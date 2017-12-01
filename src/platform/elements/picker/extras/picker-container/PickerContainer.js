"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var KeyCodes_1 = require("../../../../utils/key-codes/KeyCodes");
var Helpers_1 = require("../../../../utils/Helpers");
var NovoPickerContainer = (function () {
    function NovoPickerContainer(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.scrollHandler = this.handleScroll.bind(this);
    }
    NovoPickerContainer.prototype.ngDoCheck = function () {
        if (this.isVisible && this.position) {
            var element = this.element.nativeElement;
            var position = Helpers_1.Helpers.calcPositionOffset(this.position, element, this.side);
            if (position) {
                this.renderer.setElementStyle(element, 'top', position.top);
                this.renderer.setElementStyle(element, 'left', position.left);
                this.renderer.setElementStyle(element, 'width', position.width);
            }
        }
    };
    NovoPickerContainer.prototype.handleScroll = function () {
        // On scroll, don't force the position to update (jump from top/middle/bottom/right)
        this.updatePosition(this.relativeElement, this.side);
    };
    NovoPickerContainer.prototype.show = function (appendToBody) {
        this.appendToBody = appendToBody;
        this.renderer.setElementStyle(this.element.nativeElement, 'display', 'block');
        this.renderer.setElementStyle(this.element.nativeElement, 'visibility', 'visible');
        this.isVisible = true;
        if (appendToBody) {
            window.addEventListener('scroll', this.scrollHandler);
        }
    };
    NovoPickerContainer.prototype.hide = function () {
        this.isVisible = false;
        this.renderer.setElementStyle(this.element.nativeElement, 'visibility', 'hidden');
        if (this.appendToBody) {
            window.removeEventListener('scroll', this.scrollHandler);
        }
    };
    NovoPickerContainer.prototype.updatePosition = function (element, side) {
        this.relativeElement = element;
        this.side = side;
        this.position = element.getBoundingClientRect();
        this.ngDoCheck();
    };
    NovoPickerContainer.prototype.onKeyDown = function (event) {
        // Close with ESC/Enter
        if (this.isVisible && (event.keyCode === KeyCodes_1.KeyCodes.ESC || event.keyCode === KeyCodes_1.KeyCodes.ENTER)) {
            //this.parent.toggleActive(null, false);
        }
    };
    return NovoPickerContainer;
}());
NovoPickerContainer.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-picker-container',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
NovoPickerContainer.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
]; };
NovoPickerContainer.propDecorators = {
    'onKeyDown': [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
};
exports.NovoPickerContainer = NovoPickerContainer;
//# sourceMappingURL=PickerContainer.js.map