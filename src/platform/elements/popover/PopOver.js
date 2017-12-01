"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var PopOverContent_1 = require("./PopOverContent");
var PopOverDirective = (function () {
    function PopOverDirective(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.PopoverComponent = PopOverContent_1.PopOverContent;
        this.popoverOnHover = false;
        this.popoverDismissTimeout = 0;
        this.onShown = new core_1.EventEmitter();
        this.onHidden = new core_1.EventEmitter();
    }
    // ---------------------------------------------------
    // Event listeners
    // ---------------------------------------------------
    PopOverDirective.prototype.showOrHideOnClick = function () {
        if (this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.toggle();
    };
    PopOverDirective.prototype.showOnHover = function () {
        if (!this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.show();
    };
    PopOverDirective.prototype.hideOnHover = function () {
        if (!this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.hide();
    };
    PopOverDirective.prototype.ngOnChanges = function (changes) {
        if (changes['popoverDisabled']) {
            if (changes['popoverDisabled'].currentValue) {
                this.hide();
            }
        }
        if (changes['popoverAlways']) {
            if (changes['popoverAlways'].currentValue) {
                this.show();
            }
        }
    };
    PopOverDirective.prototype.toggle = function () {
        if (!this.visible) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    PopOverDirective.prototype.show = function () {
        var _this = this;
        if (this.visible) {
            return;
        }
        this.visible = true;
        if (typeof this.content === 'string') {
            var factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible) {
                return;
            }
            this.popover = this.viewContainerRef.createComponent(factory);
            var popover = this.popover.instance;
            popover.popover = this;
            popover.content = this.content;
            if (this.popoverPlacement !== undefined) {
                popover.placement = this.popoverPlacement;
            }
            if (this.popoverAnimation !== undefined) {
                popover.animation = this.popoverAnimation;
            }
            if (this.popoverTitle !== undefined) {
                popover.title = this.popoverTitle;
            }
            popover.onCloseFromOutside.subscribe(function () { return _this.hide(); });
            if (this.popoverDismissTimeout > 0) {
                setTimeout(function () { return _this.hide(); }, this.popoverDismissTimeout);
            }
        }
        else {
            var popover = this.content;
            popover.popover = this;
            if (this.popoverPlacement !== undefined) {
                popover.placement = this.popoverPlacement;
            }
            if (this.popoverAnimation !== undefined) {
                popover.animation = this.popoverAnimation;
            }
            if (this.popoverTitle !== undefined) {
                popover.title = this.popoverTitle;
            }
            popover.onCloseFromOutside.subscribe(function () { return _this.hide(); });
            if (this.popoverDismissTimeout > 0) {
                setTimeout(function () { return _this.hide(); }, this.popoverDismissTimeout);
            }
            popover.show();
        }
        this.onShown.emit(this);
    };
    PopOverDirective.prototype.hide = function () {
        if (!this.visible) {
            return;
        }
        this.visible = false;
        if (this.popover) {
            this.popover.destroy();
        }
        if (this.content instanceof PopOverContent_1.PopOverContent) {
            this.content.hideFromPopover();
        }
        this.onHidden.emit(this);
    };
    PopOverDirective.prototype.getElement = function () {
        return this.viewContainerRef.element.nativeElement;
    };
    return PopOverDirective;
}());
PopOverDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[popover]'
            },] },
];
/** @nocollapse */
PopOverDirective.ctorParameters = function () { return [
    { type: core_1.ViewContainerRef, },
    { type: core_1.ComponentFactoryResolver, },
]; };
PopOverDirective.propDecorators = {
    'content': [{ type: core_1.Input, args: ['popover',] },],
    'popoverDisabled': [{ type: core_1.Input },],
    'popoverAlways': [{ type: core_1.Input },],
    'popoverAnimation': [{ type: core_1.Input },],
    'popoverPlacement': [{ type: core_1.Input },],
    'popoverTitle': [{ type: core_1.Input },],
    'popoverOnHover': [{ type: core_1.Input },],
    'popoverDismissTimeout': [{ type: core_1.Input },],
    'onShown': [{ type: core_1.Output },],
    'onHidden': [{ type: core_1.Output },],
    'showOrHideOnClick': [{ type: core_1.HostListener, args: ['click',] },],
    'showOnHover': [{ type: core_1.HostListener, args: ['focusin',] }, { type: core_1.HostListener, args: ['mouseenter',] },],
    'hideOnHover': [{ type: core_1.HostListener, args: ['focusout',] }, { type: core_1.HostListener, args: ['mouseleave',] },],
};
exports.PopOverDirective = PopOverDirective;
//# sourceMappingURL=PopOver.js.map