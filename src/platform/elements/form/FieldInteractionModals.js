"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var Modal_1 = require("../modal/Modal");
var novo_label_service_1 = require("../../services/novo-label-service");
var ControlConfirmModal = (function () {
    function ControlConfirmModal(modalRef, params, labels) {
        this.modalRef = modalRef;
        this.params = params;
        this.labels = labels;
    }
    ControlConfirmModal.prototype.close = function (result) {
        this.modalRef.close(result);
    };
    return ControlConfirmModal;
}());
ControlConfirmModal.decorators = [
    { type: core_1.Component, args: [{
                selector: 'control-confirm-modal',
                template: "\n        <novo-notification type=\"warning\" [attr.data-automation-id]=\"'field-interaction-modal-' + params['key']\">\n            <h1>{{ labels.confirmChangesModalMessage }}</h1>\n            <h2 *ngIf=\"!params['message']\"><label>{{ params['label'] }}:</label> {{ params['oldValue'] }} <i class=\"bhi-arrow-right\"></i> {{ params['newValue'] }}</h2>\n            <h2 *ngIf=\"params['message']\">{{ params['message'] }}</h2>\n            <button theme=\"standard\" (click)=\"close(false)\" [attr.data-automation-id]=\"'field-interaction-modal-cancel' + params['key']\">{{ labels.cancel }}</button>\n            <button theme=\"primary\" icon=\"check\" (click)=\"close(true)\" autofocus [attr.data-automation-id]=\"'field-interaction-modal-save-' + params['key']\">{{ labels.save }}</button>\n        </novo-notification>\n    "
            },] },
];
/** @nocollapse */
ControlConfirmModal.ctorParameters = function () { return [
    { type: Modal_1.NovoModalRef, },
    { type: Modal_1.NovoModalParams, },
    { type: novo_label_service_1.NovoLabelService, },
]; };
exports.ControlConfirmModal = ControlConfirmModal;
var ControlPromptModal = (function () {
    function ControlPromptModal(modalRef, params, labels) {
        this.modalRef = modalRef;
        this.params = params;
        this.labels = labels;
    }
    ControlPromptModal.prototype.close = function (result) {
        this.modalRef.close(result);
    };
    return ControlPromptModal;
}());
ControlPromptModal.decorators = [
    { type: core_1.Component, args: [{
                selector: 'control-prompt-modal',
                template: "\n        <novo-notification type=\"warning\" [attr.data-automation-id]=\"'field-interaction-modal-' + params['key']\">\n            <h1>{{ labels.promptModalMessage }}</h1>\n            <p *ngFor=\"let change of params['changes']\">{{ change }}</p>\n            <button theme=\"standard\" (click)=\"close(false)\" [attr.data-automation-id]=\"'field-interaction-modal-cancel' + params['key']\">{{ labels.cancel }}</button>\n            <button theme=\"primary\" icon=\"check\" (click)=\"close(true)\" autofocus [attr.data-automation-id]=\"'field-interaction-modal-yes-' + params['key']\">{{ labels.yes }}</button>\n        </novo-notification>\n    "
            },] },
];
/** @nocollapse */
ControlPromptModal.ctorParameters = function () { return [
    { type: Modal_1.NovoModalRef, },
    { type: Modal_1.NovoModalParams, },
    { type: novo_label_service_1.NovoLabelService, },
]; };
exports.ControlPromptModal = ControlPromptModal;
//# sourceMappingURL=FieldInteractionModals.js.map