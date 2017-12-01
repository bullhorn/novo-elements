"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var NovoNavElement = (function () {
    function NovoNavElement() {
        this.theme = '';
        this.direction = '';
        this.condensed = false;
        this.items = [];
    }
    NovoNavElement.prototype.select = function (item) {
        /**
         * Deactivate all other tabs
         */
        function _deactivateAllItems(items) {
            items.forEach(function (t) {
                if (t.active === true) {
                    // t.deselected.next();
                }
                t.active = false;
            });
        }
        _deactivateAllItems(this.items);
        item.active = true;
        if (this.outlet) {
            this.outlet.show(this.items.indexOf(item));
        }
        // TODO - remove hack to make DOM rerender - jgodi
        var element = document.querySelector('novo-tab-link.active span.indicator');
        if (element) {
            element.style.opacity = 0.99;
            setTimeout(function () {
                element.style.opacity = 1;
            }, 10);
        }
    };
    NovoNavElement.prototype.add = function (item) {
        if (this.items.length === 0) {
            item.active = true;
            // item.selected.next();
        }
        this.items.push(item);
    };
    return NovoNavElement;
}());
NovoNavElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-nav',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
NovoNavElement.ctorParameters = function () { return []; };
NovoNavElement.propDecorators = {
    'theme': [{ type: core_1.Input },],
    'direction': [{ type: core_1.Input },],
    'outlet': [{ type: core_1.Input },],
    'router': [{ type: core_1.Input },],
    'condensed': [{ type: core_1.HostBinding, args: ['class.condensed',] }, { type: core_1.Input },],
};
exports.NovoNavElement = NovoNavElement;
var NovoTabElement = (function () {
    function NovoTabElement(nav) {
        this.active = false;
        this.disabled = false;
        this.activeChange = new core_1.EventEmitter();
        this.nav = nav;
        this.nav.add(this);
    }
    NovoTabElement.prototype.select = function () {
        if (!this.disabled) {
            this.activeChange.emit(true);
            this.nav.select(this);
        }
    };
    return NovoTabElement;
}());
NovoTabElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-tab',
                host: {
                    '(click)': 'select()',
                    '[class.active]': 'active',
                    '[class.disabled]': 'disabled'
                },
                template: "\n        <div class=\"novo-tab-link\">\n            <ng-content></ng-content>\n        </div>\n        <span class=\"indicator\"></span>\n   "
            },] },
];
/** @nocollapse */
NovoTabElement.ctorParameters = function () { return [
    { type: NovoNavElement, },
]; };
NovoTabElement.propDecorators = {
    'active': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'activeChange': [{ type: core_1.Output },],
};
exports.NovoTabElement = NovoTabElement;
var NovoTabButtonElement = (function () {
    function NovoTabButtonElement(nav) {
        this.active = false;
        this.disabled = false;
        this.nav = nav;
        this.nav.add(this);
    }
    NovoTabButtonElement.prototype.select = function () {
        if (!this.disabled) {
            this.nav.select(this);
        }
    };
    return NovoTabButtonElement;
}());
NovoTabButtonElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-tab-button',
                host: {
                    '(click)': 'select()',
                    '[class.active]': 'active',
                    '[class.disabled]': 'disabled'
                },
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
NovoTabButtonElement.ctorParameters = function () { return [
    { type: NovoNavElement, },
]; };
NovoTabButtonElement.propDecorators = {
    'active': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
};
exports.NovoTabButtonElement = NovoTabButtonElement;
var NovoTabLinkElement = (function () {
    function NovoTabLinkElement(nav) {
        this.active = false;
        this.disabled = false;
        this.nav = nav;
        this.nav.add(this);
    }
    NovoTabLinkElement.prototype.select = function () {
        if (!this.disabled) {
            this.nav.select(this);
        }
    };
    return NovoTabLinkElement;
}());
NovoTabLinkElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-tab-link',
                host: {
                    '(click)': 'select()',
                    '[class.active]': 'active',
                    '[class.disabled]': 'disabled'
                },
                template: "\n        <div class=\"novo-tab-link\">\n            <ng-content></ng-content>\n        </div>\n        <span class=\"indicator\"></span>\n    "
            },] },
];
/** @nocollapse */
NovoTabLinkElement.ctorParameters = function () { return [
    { type: NovoNavElement, },
]; };
NovoTabLinkElement.propDecorators = {
    'active': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
};
exports.NovoTabLinkElement = NovoTabLinkElement;
var NovoNavOutletElement = (function () {
    function NovoNavOutletElement() {
        this.items = [];
    }
    NovoNavOutletElement.prototype.show = function (index) {
        var item = this.items[index];
        /**
         * Deactivates other tab items
         * @param items - deactivated items
         */
        function _deactivateAllItems(items) {
            items.forEach(function (t) {
                if (t.active === true) {
                    // t.deselected.next();
                }
                t.active = false;
            });
        }
        _deactivateAllItems(this.items);
        item.active = true;
    };
    NovoNavOutletElement.prototype.add = function (item) {
        if (this.items.length === 0) {
            item.active = true;
        }
        this.items.push(item);
    };
    return NovoNavOutletElement;
}());
NovoNavOutletElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-nav-outlet',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
NovoNavOutletElement.ctorParameters = function () { return []; };
exports.NovoNavOutletElement = NovoNavOutletElement;
var NovoNavContentElement = (function () {
    function NovoNavContentElement(outlet) {
        this.active = false;
        outlet.add(this);
    }
    return NovoNavContentElement;
}());
NovoNavContentElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-nav-content',
                host: {
                    '[class.active]': 'active'
                },
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
NovoNavContentElement.ctorParameters = function () { return [
    { type: NovoNavOutletElement, },
]; };
NovoNavContentElement.propDecorators = {
    'active': [{ type: core_1.Input },],
};
exports.NovoNavContentElement = NovoNavContentElement;
var NovoNavHeaderElement = (function () {
    function NovoNavHeaderElement(outlet) {
        this.active = false;
        this.active = this.active || false;
        this.outlet = outlet;
    }
    NovoNavHeaderElement.prototype.show = function (event) {
        try {
            var INDEX = this.outlet.items.indexOf(this.forElement);
            if (INDEX > -1) {
                this.outlet.show(INDEX);
            }
        }
        catch (err) {
            // do nothing
        }
    };
    return NovoNavHeaderElement;
}());
NovoNavHeaderElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-nav-header',
                host: {
                    '[class.active]': 'active',
                    '(click)': 'show($event)'
                },
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
NovoNavHeaderElement.ctorParameters = function () { return [
    { type: NovoNavOutletElement, },
]; };
NovoNavHeaderElement.propDecorators = {
    'active': [{ type: core_1.Input },],
    'forElement': [{ type: core_1.Input, args: ['for',] },],
};
exports.NovoNavHeaderElement = NovoNavHeaderElement;
//# sourceMappingURL=Tabs.js.map