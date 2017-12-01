"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var novo_label_service_1 = require("../../services/novo-label-service");
var NovoTipWellElement = (function () {
    function NovoTipWellElement(labels) {
        this.labels = labels;
        this.button = true;
        this.confirmed = new core_1.EventEmitter();
        this.isActive = true;
        this.isActive = true;
        // Check if localStorage is enabled
        this.isLocalStorageEnabled = (function () {
            var isEnabled = false;
            if (typeof localStorage === 'object') {
                try {
                    localStorage.setItem('lsTest', '1');
                    localStorage.removeItem('lsTest');
                    isEnabled = true;
                }
                catch (e) {
                    console.warn('This web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
                }
            }
            return isEnabled;
        })();
    }
    NovoTipWellElement.prototype.ngOnInit = function () {
        this.tip = this.tip || '';
        this.buttonText = this.buttonText || this.labels.okGotIt;
        this.button = typeof this.button === 'string' ? this.button === 'true' : this.button;
        this.icon = this.icon || null;
        // Set a (semi) unique name for the tip-well
        this.name = this.name || Math.round(Math.random() * 100);
        this.localStorageKey = "novo-tw_" + this.name;
        // Check localStorage for state
        if (this.isLocalStorageEnabled) {
            var storedValue = JSON.parse(localStorage.getItem(this.localStorageKey));
            this.isActive = storedValue !== false;
        }
    };
    /**
     * @name hideTip
     */
    NovoTipWellElement.prototype.hideTip = function () {
        if (this.isLocalStorageEnabled) {
            localStorage.setItem(this.localStorageKey, JSON.stringify(false));
        }
        this.isActive = false;
        this.confirmed.emit();
    };
    return NovoTipWellElement;
}());
NovoTipWellElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-tip-well',
                template: "\n        <div *ngIf=\"isActive\">\n            <div>\n                <i class=\"bhi-{{ icon }}\" *ngIf=\"icon\" [attr.data-automation-id]=\"'novo-tip-well-icon-' + name\"></i>\n                <p [attr.data-automation-id]=\"'novo-tip-well-tip-' + name\">{{ tip }}</p>\n            </div>\n            <button theme=\"dialogue\" (click)=\"hideTip()\" *ngIf=\"button\" [attr.data-automation-id]=\"'novo-tip-well-button-' + name\">{{ buttonText }}</button>\n        </div>\n    ",
                host: {
                    '[class.active]': 'isActive'
                }
            },] },
];
/** @nocollapse */
NovoTipWellElement.ctorParameters = function () { return [
    { type: novo_label_service_1.NovoLabelService, },
]; };
NovoTipWellElement.propDecorators = {
    'name': [{ type: core_1.Input },],
    'tip': [{ type: core_1.Input },],
    'buttonText': [{ type: core_1.Input },],
    'button': [{ type: core_1.Input },],
    'icon': [{ type: core_1.Input },],
    'confirmed': [{ type: core_1.Output },],
};
exports.NovoTipWellElement = NovoTipWellElement;
//# sourceMappingURL=TipWell.js.map