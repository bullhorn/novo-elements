"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var OutsideClick_1 = require("../../utils/outside-click/OutsideClick");
var KeyCodes_1 = require("../../utils/key-codes/KeyCodes");
var Helpers_1 = require("../../utils/Helpers");
var NovoDropdownContainer = (function () {
    function NovoDropdownContainer(element, renderer, ref) {
        this.element = element;
        this.renderer = renderer;
        this.ref = ref;
        this.scrollHandler = this.handleScroll.bind(this);
    }
    NovoDropdownContainer.prototype.ngDoCheck = function () {
        if (this.isVisible && this.position) {
            var element = this.element.nativeElement;
            var position = Helpers_1.Helpers.calcPositionOffset(this.position, element, this.side);
            if (position) {
                this.renderer.setElementStyle(element, 'top', position.top);
                this.renderer.setElementStyle(element, 'left', position.left);
            }
        }
    };
    NovoDropdownContainer.prototype.handleScroll = function () {
        // On scroll, don't force the position to update (jump from top/middle/bottom/right)
        this.updatePosition(this.relativeElement, this.side);
    };
    NovoDropdownContainer.prototype.show = function (appendToBody) {
        this.appendToBody = appendToBody;
        this.renderer.setElementStyle(this.element.nativeElement, 'display', 'block');
        this.renderer.setElementStyle(this.element.nativeElement, 'visibility', 'visible');
        this.isVisible = true;
        if (appendToBody) {
            window.addEventListener('scroll', this.scrollHandler);
        }
        this.ref.markForCheck();
    };
    NovoDropdownContainer.prototype.hide = function () {
        this.isVisible = false;
        this.renderer.setElementStyle(this.element.nativeElement, 'visibility', 'hidden');
        if (this.appendToBody) {
            window.removeEventListener('scroll', this.scrollHandler);
        }
        this.ref.markForCheck();
    };
    NovoDropdownContainer.prototype.updatePosition = function (element, side) {
        this.relativeElement = element;
        this.side = side;
        this.position = element.getBoundingClientRect();
        this.ngDoCheck();
        this.ref.markForCheck();
    };
    NovoDropdownContainer.prototype.onKeyDown = function (event) {
        // Close with ESC/Enter
        if (this.isVisible && (event.keyCode === KeyCodes_1.KeyCodes.ESC || event.keyCode === KeyCodes_1.KeyCodes.ENTER)) {
            this.parent.toggleActive(null, false);
        }
    };
    return NovoDropdownContainer;
}());
NovoDropdownContainer.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-dropdown-container',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
NovoDropdownContainer.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
    { type: core_1.ChangeDetectorRef, },
]; };
NovoDropdownContainer.propDecorators = {
    'onKeyDown': [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
};
exports.NovoDropdownContainer = NovoDropdownContainer;
var NovoDropdownElement = (function (_super) {
    __extends(NovoDropdownElement, _super);
    function NovoDropdownElement(element, ref) {
        var _this = _super.call(this, element) || this;
        _this.ref = ref;
        // Append the dropdown container to the body
        _this.appendToBody = false;
        // What action to perform when we recieve scroll from parent selector
        // TODO - handle "move"
        _this.parentScrollAction = 'close';
        // Side the dropdown will open
        _this.side = 'left';
        _this.activeIndex = -1;
        _this.filterTerm = '';
        // Click handler
        _this.clickHandler = _this.toggleActive.bind(_this);
        _this.closeHandler = _this.toggleActive.bind(_this);
        _this.toggled = _this.onActiveChange;
        // Listen for active change to hide/show menu
        _this.onActiveChange.subscribe(function (active) {
            if (active) {
                _this.show();
            }
            else {
                _this.hide();
            }
        });
        return _this;
    }
    Object.defineProperty(NovoDropdownElement.prototype, "items", {
        set: function (items) {
            this._items = items;
            // Get the innertext of all the items to allow for searching
            this._textItems = items.map(function (item) {
                return item.element.nativeElement.innerText;
            });
        },
        enumerable: true,
        configurable: true
    });
    NovoDropdownElement.prototype.ngOnInit = function () {
        // Add a click handler to the button to toggle the menu
        var button = this.element.nativeElement.querySelector('button');
        button.addEventListener('click', this.clickHandler);
        if (this.parentScrollSelector) {
            this.parentScrollElement = Helpers_1.Helpers.findAncestor(this.element.nativeElement, this.parentScrollSelector);
        }
    };
    NovoDropdownElement.prototype.ngOnDestroy = function () {
        // Remove listener
        var button = this.element.nativeElement.querySelector('button');
        if (button) {
            button.removeEventListener('click', this.clickHandler);
        }
    };
    NovoDropdownElement.prototype.show = function () {
        this.container.parent = this;
        this.container.show(this.appendToBody);
        this.otherElement = this.container.element;
        if (this.appendToBody) {
            this.container.updatePosition(this.element.nativeElement.children[0], this.side);
            // If append to body then rip it out of here and put on body
            window.document.body.appendChild(this.container.element.nativeElement);
            window.addEventListener('resize', this.closeHandler);
        }
        // Listen for scroll on a parent to force close
        if (this.parentScrollElement) {
            if (this.parentScrollAction === 'close') {
                this.parentScrollElement.addEventListener('scroll', this.closeHandler);
            }
        }
        this.ref.markForCheck();
    };
    NovoDropdownElement.prototype.hide = function () {
        this.container.hide();
        // If append to body then rip it out of here and put on body
        if (this.appendToBody) {
            var elm = this.container.element.nativeElement;
            elm.parentNode.removeChild(elm);
            window.removeEventListener('resize', this.closeHandler);
        }
        if (this.parentScrollElement) {
            if (this.parentScrollAction === 'close') {
                this.parentScrollElement.removeEventListener('scroll', this.closeHandler);
            }
        }
        // Clear active index
        if (this.activeIndex !== -1) {
            this._items.toArray()[this.activeIndex].active = false;
        }
        this.activeIndex = -1;
        this.ref.markForCheck();
    };
    NovoDropdownElement.prototype.onKeyDown = function (event) {
        var _this = this;
        Helpers_1.Helpers.swallowEvent(event);
        if (this.active && event.keyCode === KeyCodes_1.KeyCodes.ESC) {
            // active & esc hit -- close
            this.toggleActive();
        }
        else if (event.keyCode === KeyCodes_1.KeyCodes.ENTER) {
            // enter -- perform the "click"
            this._items.toArray()[this.activeIndex].onClick();
        }
        else if (event.keyCode === KeyCodes_1.KeyCodes.DOWN) {
            // down - navigate through the list ignoring disabled ones
            if (this.activeIndex !== -1) {
                this._items.toArray()[this.activeIndex].active = false;
            }
            this.activeIndex++;
            if (this.activeIndex === this._items.length) {
                this.activeIndex = 0;
            }
            while (this._items.toArray()[this.activeIndex].disabled) {
                this.activeIndex++;
                if (this.activeIndex === this._items.length) {
                    this.activeIndex = 0;
                }
            }
            this._items.toArray()[this.activeIndex].active = true;
            this.scrollToActive();
        }
        else if (event.keyCode === KeyCodes_1.KeyCodes.UP) {
            // up -- navigate through the list ignoring disabled ones
            if (this.activeIndex !== -1) {
                this._items.toArray()[this.activeIndex].active = false;
            }
            this.activeIndex--;
            if (this.activeIndex < 0) {
                this.activeIndex = this._items.length - 1;
            }
            while (this._items.toArray()[this.activeIndex].disabled) {
                this.activeIndex--;
                if (this.activeIndex < 0) {
                    this.activeIndex = this._items.length - 1;
                }
            }
            this._items.toArray()[this.activeIndex].active = true;
            this.scrollToActive();
        }
        else if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === KeyCodes_1.KeyCodes.SPACE) {
            // A-Z, 0-9, space -- filter the list and scroll to active filter
            // filter has hard reset after 2s
            clearTimeout(this.filterTermTimeout);
            this.filterTermTimeout = setTimeout(function () { _this.filterTerm = ''; }, 2000);
            var char = String.fromCharCode(event.keyCode);
            this.filterTerm = this.filterTerm.concat(char);
            var index = this._textItems.findIndex(function (value) {
                return new RegExp("^" + _this.filterTerm.toLowerCase()).test(value.trim().toLowerCase());
            });
            if (index !== -1) {
                if (this.activeIndex !== -1) {
                    this._items.toArray()[this.activeIndex].active = false;
                }
                this.activeIndex = index;
                this._items.toArray()[this.activeIndex].active = true;
                this.scrollToActive();
            }
        }
        else if ([KeyCodes_1.KeyCodes.BACKSPACE, KeyCodes_1.KeyCodes.DELETE].includes(event.keyCode)) {
            // backspace, delete -- remove partial filters
            clearTimeout(this.filterTermTimeout);
            this.filterTermTimeout = setTimeout(function () { _this.filterTerm = ''; }, 2000);
            this.filterTerm = this.filterTerm.slice(0, -1);
        }
    };
    NovoDropdownElement.prototype.scrollToActive = function () {
        var container = this.element.nativeElement.querySelector('novo-dropdown-container');
        var item = this._items.toArray()[this.activeIndex];
        if (container && item) {
            container.scrollTop = item.element.nativeElement.offsetTop;
        }
        else {
            // Append to body
            container = document.querySelector('body > novo-dropdown-container');
            if (container && item) {
                container.scrollTop = item.element.nativeElement.offsetTop;
            }
        }
    };
    return NovoDropdownElement;
}(OutsideClick_1.OutsideClick));
NovoDropdownElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-dropdown',
                template: "\n        <ng-content select=\"button\" #trigger></ng-content>\n        <novo-dropdown-container class=\"dropdown-container {{ containerClass }}\">\n            <ng-content></ng-content>\n        </novo-dropdown-container>\n    "
            },] },
];
/** @nocollapse */
NovoDropdownElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.ChangeDetectorRef, },
]; };
NovoDropdownElement.propDecorators = {
    'appendToBody': [{ type: core_1.Input },],
    'parentScrollSelector': [{ type: core_1.Input },],
    'parentScrollAction': [{ type: core_1.Input },],
    'containerClass': [{ type: core_1.Input },],
    'side': [{ type: core_1.Input },],
    'toggled': [{ type: core_1.Output },],
    'container': [{ type: core_1.ViewChild, args: [NovoDropdownContainer,] },],
    'button': [{ type: core_1.ViewChild, args: ['trigger',] },],
    'onKeyDown': [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
};
exports.NovoDropdownElement = NovoDropdownElement;
var NovoItemElement = (function () {
    function NovoItemElement(dropdown, element) {
        this.dropdown = dropdown;
        this.element = element;
        this.keepOpen = false;
        this.action = new core_1.EventEmitter();
        this.active = false;
    }
    NovoItemElement.prototype.onClick = function () {
        // Poor man's disable
        if (!this.disabled) {
            // Close if keepOpen is false
            if (!this.keepOpen) {
                this.dropdown.toggleActive();
            }
            // Emit the action
            this.action.emit();
        }
    };
    return NovoItemElement;
}());
NovoItemElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'item',
                template: '<ng-content></ng-content>',
                host: {
                    '[class.disabled]': 'disabled',
                    '[class.active]': 'active'
                }
            },] },
];
/** @nocollapse */
NovoItemElement.ctorParameters = function () { return [
    { type: NovoDropdownElement, },
    { type: core_1.ElementRef, },
]; };
NovoItemElement.propDecorators = {
    'disabled': [{ type: core_1.Input },],
    'keepOpen': [{ type: core_1.Input },],
    'action': [{ type: core_1.Output },],
    'onClick': [{ type: core_1.HostListener, args: ['click', [],] },],
};
exports.NovoItemElement = NovoItemElement;
var NovoListElement = (function () {
    function NovoListElement(dropdown) {
        this.dropdown = dropdown;
    }
    NovoListElement.prototype.ngAfterContentInit = function () {
        this.dropdown.items = this.items;
    };
    return NovoListElement;
}());
NovoListElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'list',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
NovoListElement.ctorParameters = function () { return [
    { type: NovoDropdownElement, },
]; };
NovoListElement.propDecorators = {
    'items': [{ type: core_1.ContentChildren, args: [NovoItemElement,] },],
};
exports.NovoListElement = NovoListElement;
var NovoItemHeaderElement = (function () {
    function NovoItemHeaderElement() {
    }
    return NovoItemHeaderElement;
}());
NovoItemHeaderElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'dropdown-item-header',
                template: '<ng-content></ng-content>',
            },] },
];
/** @nocollapse */
NovoItemHeaderElement.ctorParameters = function () { return []; };
exports.NovoItemHeaderElement = NovoItemHeaderElement;
//# sourceMappingURL=Dropdown.js.map