"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var novo_label_service_1 = require("../../services/novo-label-service");
var CardActionsElement = (function () {
    function CardActionsElement() {
    }
    return CardActionsElement;
}());
CardActionsElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-card-actions',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
CardActionsElement.ctorParameters = function () { return []; };
exports.CardActionsElement = CardActionsElement;
var CardElement = (function () {
    function CardElement(labels) {
        this.padding = true;
        this.config = {};
        this.onClose = new core_1.EventEmitter();
        this.onRefresh = new core_1.EventEmitter();
        this.labels = labels;
    }
    CardElement.prototype.ngOnInit = function () {
        this.config = this.config || {};
    };
    CardElement.prototype.ngOnChanges = function (changes) {
        this.config = this.config || {};
        this.cardAutomationId = (this.title || this.config.title || 'no-title').toLowerCase().replace(/\s/g, '-') + "-card";
        var newIcon = this.icon || this.config.icon;
        var newMessageIcon = this.messageIcon || this.config.messageIcon;
        this.iconClass = newIcon ? "bhi-" + newIcon : null;
        this.messageIconClass = newMessageIcon ? "bhi-" + newMessageIcon : null;
    };
    CardElement.prototype.toggleClose = function () {
        if (!this.config.onClose) {
            this.onClose.next();
        }
        else {
            this.config.onClose();
        }
    };
    CardElement.prototype.toggleRefresh = function () {
        if (!this.config.onRefresh) {
            this.onRefresh.next();
        }
        else {
            this.config.onRefresh();
        }
    };
    return CardElement;
}());
CardElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-card',
                template: "\n        <div class=\"novo-card\" [attr.data-automation-id]=\"cardAutomationId\" [ngClass]=\"{'no-padding': !padding}\">\n            <!--Card Header-->\n            <header>\n                <div class=\"title\">\n                    <!--Grabber Icon-->\n                    <span tooltip=\"{{ labels.move }}\" tooltipPosition=\"bottom\"><i *ngIf=\"move || config.move\" class=\"bhi-move\" [attr.data-automation-id]=\"cardAutomationId + '-move'\"></i></span>\n                    <!--Card Title-->\n                    <h3 [attr.data-automation-id]=\"cardAutomationId + '-title'\"><i *ngIf=\"icon\" [ngClass]=\"iconClass\"></i> {{title || config.title}}</h3>\n                </div>\n                <!--Card Actions-->\n                <div class=\"actions\" [attr.data-automation-id]=\"cardAutomationId + '-actions'\">\n                    <ng-content select=\"novo-card-actions\"></ng-content>\n                    <button theme=\"icon\" icon=\"refresh-o\"  (click)=\"toggleRefresh()\" *ngIf=\"refresh || config.refresh\" [attr.data-automation-id]=\"cardAutomationId + '-refresh'\" tooltip=\"{{ labels.refresh }}\" tooltipPosition=\"bottom\"></button>\n                    <button theme=\"icon\" icon=\"close-o\" (click)=\"toggleClose()\" *ngIf=\"close || config.close\" [attr.data-automation-id]=\"cardAutomationId + '-close'\" tooltip=\"{{ labels.close }}\" tooltipPosition=\"bottom\"></button>\n                </div>\n            </header>\n            <!--Card Main-->\n            <main>\n                <!--Content (transcluded)-->\n                <ng-content *ngIf=\"!(loading || config.loading) && !(message || config.message)\"></ng-content>\n                <!--Error/Empty Message-->\n                <p class=\"card-message\" *ngIf=\"!(loading || config.loading) && (message || config.message)\" [attr.data-automation-id]=\"cardAutomationId + '-message'\"><i *ngIf=\"messageIconClass\" [ngClass]=\"messageIconClass\"></i> <span [innerHtml]=\"message || config.message\"></span></p>\n                <!--Loading-->\n                <novo-loading *ngIf=\"loading || config.loading\" theme=\"line\"  [attr.data-automation-id]=\"cardAutomationId + '-loading'\"></novo-loading>\n            </main>\n            <!--Card Footer-->\n            <ng-content *ngIf=\"!(loading || config.loading) && !(message || config.message)\" select=\"footer\"></ng-content>\n        </div>\n    "
            },] },
];
/** @nocollapse */
CardElement.ctorParameters = function () { return [
    { type: novo_label_service_1.NovoLabelService, },
]; };
CardElement.propDecorators = {
    'padding': [{ type: core_1.Input },],
    'config': [{ type: core_1.Input },],
    'title': [{ type: core_1.Input },],
    'message': [{ type: core_1.Input },],
    'messageIcon': [{ type: core_1.Input },],
    'icon': [{ type: core_1.Input },],
    'refresh': [{ type: core_1.Input },],
    'close': [{ type: core_1.Input },],
    'move': [{ type: core_1.Input },],
    'loading': [{ type: core_1.Input },],
    'onClose': [{ type: core_1.Output },],
    'onRefresh': [{ type: core_1.Output },],
};
exports.CardElement = CardElement;
//# sourceMappingURL=Card.js.map