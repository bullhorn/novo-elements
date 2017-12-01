"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var NovoButtonElement = (function () {
    function NovoButtonElement() {
        this.leftSide = false;
        this.rightSide = true;
    }
    NovoButtonElement.prototype.ngOnChanges = function (changes) {
        this.iconClass = (this.icon && !this.loading) ? "bhi-" + this.icon : '';
        this.flex = this.theme ? 'flex-wrapper' : '';
        if (this.side !== null && this.theme !== 'primary') {
            this.leftSide = (this.side === 'left');
            this.rightSide = !this.leftSide;
        }
    };
    return NovoButtonElement;
}());
NovoButtonElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'button[theme]',
                host: {
                    '[attr.theme]': 'theme',
                    '[attr.color]': 'color',
                    '[attr.icon]': 'icon',
                    '[attr.loading]': 'loading'
                },
                template: "\n        <!--Flex wrapper for cross-browser support-->\n        <div [class]=\"flex\">\n            <!--Left Icon-->\n            <i *ngIf=\"icon && iconClass && leftSide\" [ngClass]=\"iconClass\"></i>\n            <!--Transcluded Content-->\n            <ng-content></ng-content>\n            <!--Right Icon-->\n            <i *ngIf=\"icon && iconClass && rightSide\" [ngClass]=\"iconClass\"></i>\n            <i *ngIf=\"loading\" class=\"loading\">\n                <svg version=\"1.1\"\n                 xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:a=\"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/\"\n                 x=\"0px\" y=\"0px\" width=\"18.2px\" height=\"18.5px\" viewBox=\"0 0 18.2 18.5\" style=\"enable-background:new 0 0 18.2 18.5;\"\n                 xml:space=\"preserve\">\n                <style type=\"text/css\">\n                    .spinner { fill:#FFFFFF; }\n                </style>\n                    <path class=\"spinner\" d=\"M9.2,18.5C4.1,18.5,0,14.4,0,9.2S4.1,0,9.2,0c0.9,0,1.9,0.1,2.7,0.4c0.8,0.2,1.2,1.1,1,1.9\n                        c-0.2,0.8-1.1,1.2-1.9,1C10.5,3.1,9.9,3,9.2,3C5.8,3,3,5.8,3,9.2s2.8,6.2,6.2,6.2c2.8,0,5.3-1.9,6-4.7c0.2-0.8,1-1.3,1.8-1.1\n                        c0.8,0.2,1.3,1,1.1,1.8C17.1,15.7,13.4,18.5,9.2,18.5z\"/>\n                </svg>\n            </i>\n        </div>\n    "
            },] },
];
/** @nocollapse */
NovoButtonElement.ctorParameters = function () { return []; };
NovoButtonElement.propDecorators = {
    'icon': [{ type: core_1.Input },],
    'color': [{ type: core_1.Input },],
    'side': [{ type: core_1.Input },],
    'theme': [{ type: core_1.Input },],
    'loading': [{ type: core_1.Input },],
};
exports.NovoButtonElement = NovoButtonElement;
//# sourceMappingURL=Button.js.map