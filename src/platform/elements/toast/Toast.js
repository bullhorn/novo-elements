"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var NovoToastElement = (function () {
    function NovoToastElement() {
        this.theme = 'danger';
        this.icon = 'caution';
        this.hasDialogue = false;
        this.isCloseable = false;
        this.show = false;
        this.animate = false;
        this.parent = null;
        this.launched = false;
    }
    NovoToastElement.prototype.ngOnInit = function () {
        if (!this.launched) {
            // clear position and time
            this.position = null;
            this.time = null;
            // set icon and styling
            this.iconClass = "bhi-" + this.icon;
            this.alertTheme = this.theme + " toast-container embedded";
            if (this.hasDialogue) {
                this.alertTheme += ' dialogue';
            }
        }
    };
    NovoToastElement.prototype.ngOnChanges = function (changes) {
        // set icon and styling
        this.iconClass = "bhi-" + this.icon;
        this.alertTheme = this.theme + " toast-container embedded";
        if (this.hasDialogue) {
            this.alertTheme += ' dialogue';
        }
    };
    NovoToastElement.prototype.clickHandler = function (event) {
        if (!this.isCloseable) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            if (this.parent) {
                this.parent.hide(this);
            }
        }
    };
    NovoToastElement.prototype.close = function (event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.parent.hide(this);
    };
    return NovoToastElement;
}());
NovoToastElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-toast',
                host: {
                    '[class]': 'alertTheme',
                    '[class.show]': 'show',
                    '[class.animate]': 'animate',
                    '[class.embedded]': 'embedded',
                    '(click)': '!isCloseable && clickHandler($event)'
                },
                template: "\n        <div class=\"toast-icon\">\n            <i [ngClass]=\"iconClass\"></i>\n        </div>\n        <div class=\"toast-content\">\n            <h5 *ngIf=\"title\">{{title}}</h5>\n            <p *ngIf=\"message\" [class.message-only]=\"!title\">{{message}}</p>\n            <div *ngIf=\"link\" class=\"link-generated\">\n                <input type=\"text\" [value]=\"link\" onfocus=\"this.select();\"/>\n            </div>\n            <div class=\"dialogue\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n        <div class=\"close-icon\" *ngIf=\"isCloseable\" (click)=\"close($event)\">\n            <i class=\"bhi-times\"></i>\n        </div>\n    "
            },] },
];
/** @nocollapse */
NovoToastElement.ctorParameters = function () { return []; };
NovoToastElement.propDecorators = {
    'theme': [{ type: core_1.Input },],
    'icon': [{ type: core_1.Input },],
    'title': [{ type: core_1.Input },],
    'message': [{ type: core_1.Input },],
    'hasDialogue': [{ type: core_1.Input },],
    'link': [{ type: core_1.Input },],
    'isCloseable': [{ type: core_1.Input },],
};
exports.NovoToastElement = NovoToastElement;
//# sourceMappingURL=Toast.js.map