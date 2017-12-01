"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PopOverContent = (function () {
    function PopOverContent(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.placement = 'top';
        this.animation = true;
        this.onCloseFromOutside = new core_1.EventEmitter();
        this.top = -10000;
        this.left = -10000;
        this.displayType = 'none';
        this.isHidden = false;
    }
    PopOverContent.prototype.ngAfterViewInit = function () {
        this.show();
        this.cdr.detectChanges();
    };
    PopOverContent.prototype.toggle = function () {
        if (this.isHidden) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    PopOverContent.prototype.show = function () {
        if (!this.popover || !this.popover.getElement()) {
            return;
        }
        var p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
        this.displayType = 'block';
        this.top = p.top;
        this.left = p.left;
        this.isHidden = false;
    };
    PopOverContent.prototype.hide = function () {
        this.top = -10000;
        this.left = -10000;
        this.isHidden = true;
        this.popover.hide();
    };
    PopOverContent.prototype.hideFromPopover = function () {
        this.top = -10000;
        this.left = -10000;
    };
    PopOverContent.prototype.positionElements = function (hostEl, targetEl, positionStr, appendToBody) {
        if (appendToBody === void 0) { appendToBody = false; }
        var positionStrParts = positionStr.split('-');
        var mainSide = this.effectivePlacement = this.getEffectivePlacement(positionStrParts[0] || 'right', hostEl, targetEl);
        var orientation = this.effectiveAlignment = positionStrParts[1] || 'center';
        var hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        var targetElWidth = targetEl.offsetWidth;
        var targetElHeight = targetEl.offsetHeight;
        var shiftWidth = {
            center: function () {
                return hostElPos.left + (hostElPos.width - targetElWidth) / 2;
            },
            right: function () {
                return hostElPos.left;
            },
            left: function () {
                return hostElPos.left + (hostElPos.width - targetElWidth);
            }
        };
        var shiftHeight = {
            center: function () {
                return hostElPos.top + (hostElPos.height - targetElHeight) / 2;
            },
            bottom: function () {
                return hostElPos.top;
            },
            top: function () {
                return hostElPos.top + (hostElPos.height - targetElHeight);
            }
        };
        var targetElPos;
        switch (mainSide) {
            case 'right':
                targetElPos = {
                    top: shiftHeight[orientation](),
                    left: hostElPos.left + hostElPos.width
                };
                break;
            case 'left':
                targetElPos = {
                    top: shiftHeight[orientation](),
                    left: hostElPos.left - targetElWidth
                };
                break;
            case 'bottom':
                targetElPos = {
                    top: hostElPos.top + hostElPos.height,
                    left: shiftWidth[orientation]()
                };
                break;
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[orientation]()
                };
                break;
        }
        return targetElPos;
    };
    PopOverContent.prototype.position = function (nativeEl) {
        var offsetParentBCR = { top: 0, left: 0 };
        var elBCR = this.offset(nativeEl);
        var offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    };
    PopOverContent.prototype.offset = function (nativeEl) {
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    };
    PopOverContent.prototype.getStyle = function (nativeEl, cssProp) {
        if (nativeEl.currentStyle) {
            return nativeEl.currentStyle[cssProp];
        }
        if (window.getComputedStyle) {
            return window.getComputedStyle(nativeEl)[cssProp];
        }
        return nativeEl.style[cssProp];
    };
    PopOverContent.prototype.isStaticPositioned = function (nativeEl) {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    };
    PopOverContent.prototype.parentOffsetEl = function (nativeEl) {
        var offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    };
    PopOverContent.prototype.getEffectivePlacement = function (desiredPlacement, hostElement, targetElement) {
        var hostElBoundingRect = hostElement.getBoundingClientRect();
        if (desiredPlacement === 'top' && hostElBoundingRect.top - targetElement.offsetHeight < 0) {
            return 'bottom';
        }
        if (desiredPlacement === 'bottom' && hostElBoundingRect.bottom + targetElement.offsetHeight > window.innerHeight) {
            return 'top';
        }
        if (desiredPlacement === 'left' && hostElBoundingRect.left - targetElement.offsetWidth < 0) {
            return 'right';
        }
        if (desiredPlacement === 'right' && hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
            return 'left';
        }
        return desiredPlacement;
    };
    return PopOverContent;
}());
PopOverContent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'popover-content',
                template: "\n        <div #popoverDiv\n            class=\"popover {{ effectivePlacement }}\"\n            [style.top]=\"top + 'px'\"\n            [style.left]=\"left + 'px'\"\n            [class.fade]=\"animation\"\n            style=\"display: block\"\n            role=\"popover\">\n            <div class=\"arrow {{effectiveAlignment}}\"></div>\n            <h4 class=\"popover-title\" [hidden]=\"!title\">{{ title }}</h4>\n            <div class=\"popover-content\">\n                <ng-content></ng-content>\n                <div class=\"popover-content-text\">{{ content }}</div>\n            </div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
PopOverContent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.ChangeDetectorRef, },
]; };
PopOverContent.propDecorators = {
    'content': [{ type: core_1.Input },],
    'placement': [{ type: core_1.Input },],
    'title': [{ type: core_1.Input },],
    'animation': [{ type: core_1.Input },],
    'popoverDiv': [{ type: core_1.ViewChild, args: ['popoverDiv',] },],
};
exports.PopOverContent = PopOverContent;
//# sourceMappingURL=PopOverContent.js.map