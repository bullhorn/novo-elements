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
// Vendor
// APP
var BasePickerResults_1 = require("../base-picker-results/BasePickerResults");
var novo_label_service_1 = require("../../../../services/novo-label-service");
var EntityPickerResult = (function () {
    function EntityPickerResult(labels) {
        this.labels = labels;
    }
    /**
     * @name escapeRegexp
     * @param queryToEscape
     *
     * @description This function captures the whole query string and replace it with the string that will be used to
     * match.
     */
    EntityPickerResult.prototype.escapeRegexp = function (queryToEscape) {
        // Ex: if the capture is "a" the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    };
    /**
     * @name highlight
     * @param match
     * @param query
     *
     * @description This function should return a <strong>-tag wrapped HTML string.
     */
    EntityPickerResult.prototype.highlight = function (match, query) {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return query && match ? match.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : match;
    };
    EntityPickerResult.prototype.getIconForResult = function (result) {
        if (result) {
            switch (result.searchEntity) {
                case 'ClientContact':
                    return 'person contact';
                case 'ClientCorporation':
                    return 'company';
                case 'Opportunity':
                    return 'opportunity';
                case 'Candidate':
                    return 'candidate';
                case 'Lead':
                    return 'lead';
                case 'JobOrder':
                    return 'job';
                case 'Placement':
                    return 'star placement';
                case 'CorporateUser':
                    return 'user';
                default:
                    return '';
            }
        }
        return '';
    };
    EntityPickerResult.prototype.renderTimestamp = function (date) {
        var timestamp = '';
        if (date) {
            timestamp = this.labels.formatDateWithFormat(date, { year: 'numeric', month: 'numeric', day: 'numeric' });
        }
        return timestamp;
    };
    EntityPickerResult.prototype.getNameForResult = function (result) {
        if (result) {
            switch (result.searchEntity) {
                case 'Lead':
                case 'CorporateUser':
                case 'ClientContact':
                case 'Candidate':
                case 'Person':
                    if ('firstName' in result) {
                        return (result.firstName + " " + result.lastName).trim();
                    }
                    return ("" + (result.name || '')).trim();
                case 'ClientCorporation':
                    return ("" + (result.name || '')).trim();
                case 'Opportunity':
                case 'JobOrder':
                    return ("" + (result.title || '')).trim();
                case 'Placement':
                    var label = '';
                    if (result.candidate) {
                        label = (result.candidate.firstName + " " + result.candidate.lastName).trim();
                    }
                    if (result.jobOrder) {
                        label = (label + " - " + result.jobOrder.title).trim();
                    }
                    return label;
                default:
                    return ("" + (result.name || '')).trim();
            }
        }
        return '';
    };
    return EntityPickerResult;
}());
EntityPickerResult.decorators = [
    { type: core_1.Component, args: [{
                selector: 'entity-picker-result',
                template: "\n        <novo-list-item *ngIf=\"match.data\">\n            <item-header>\n                <item-avatar [icon]=\"getIconForResult(match.data)\"></item-avatar>\n                <item-title>\n                    <span [innerHtml]=\"highlight(getNameForResult(match.data), term)\"></span>\n                </item-title>\n            </item-header>\n            <item-content direction=\"horizontal\">\n                <!-- COMPANY 1 -->\n                <p class=\"company\" *ngIf=\"match.data.companyName || match.data?.clientCorporation?.name\">\n                    <i class=\"bhi-company\"></i>\n                    <span [innerHtml]=\"highlight(match.data.companyName || match.data?.clientCorporation?.name, term)\"></span>\n                </p>\n                <!-- CLIENT CONTACT -->\n                <p class=\"contact\" *ngIf=\"match.data?.clientContact?.firstName\">\n                    <i class=\"bhi-person contact person\"></i>\n                    <span [innerHtml]=\"highlight(match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName, term)\"></span>\n                </p>\n                <!-- CANDIDATE -->\n                <p class=\"candidate\" *ngIf=\"match.data.candidate && match.data.searchEntity === 'Placement'\">\n                    <i class=\"bhi-candidate\"></i>\n                    <span [innerHtml]=\"highlight((match.data.candidate.firstName + ' ' + match.data.candidate.lastName), term)\"></span>\n                </p>\n                <!-- START & END DATE -->\n                <p class=\"start-date\" *ngIf=\"match.data.dateBegin && match.data.searchEntity === 'Placement'\">\n                    <i class=\"bhi-calendar\"></i>\n                    <span [innerHtml]=\"renderTimestamp(match.data.dateBegin) + ' - ' + renderTimestamp(match.data.dateEnd)\"></span>\n                </p>\n                <!-- EMAIL -->\n                <p class=\"email\" *ngIf=\"match.data.email\">\n                    <i class=\"bhi-email\"></i>\n                    <span [innerHtml]=\"highlight(match.data.email, term)\"></span>\n                </p>\n                <!-- PHONE -->\n                <p class=\"phone\" *ngIf=\"match.data.phone\">\n                    <i class=\"bhi-phone\"></i>\n                    <span [innerHtml]=\"highlight(match.data.phone, term)\"></span>\n                </p>\n                <!-- ADDRESS -->\n                <p class=\"location\" *ngIf=\"match.data.address && (match.data.address.city || match.data.address.state)\">\n                    <i class=\"bhi-location\"></i>\n                    <span *ngIf=\"match.data.address.city\" [innerHtml]=\"highlight(match.data.address.city, term)\"></span>\n                    <span *ngIf=\"match.data.address.city && match.data.address.state\">, </span>\n                    <span *ngIf=\"match.data.address.state\" [innerHtml]=\"highlight(match.data.address.state, term)\"></span>\n                </p>\n                <!-- STATUS -->\n                <p class=\"status\" *ngIf=\"match.data.status\">\n                    <i class=\"bhi-info\"></i>\n                    <span [innerHtml]=\"highlight(match.data.status, term)\"></span>\n                </p>\n            </item-content>\n        </novo-list-item>\n    "
            },] },
];
/** @nocollapse */
EntityPickerResult.ctorParameters = function () { return [
    { type: novo_label_service_1.NovoLabelService, },
]; };
EntityPickerResult.propDecorators = {
    'match': [{ type: core_1.Input },],
    'term': [{ type: core_1.Input },],
};
exports.EntityPickerResult = EntityPickerResult;
var EntityPickerResults = (function (_super) {
    __extends(EntityPickerResults, _super);
    function EntityPickerResults(element, labels, ref) {
        var _this = _super.call(this, element, ref) || this;
        _this.labels = labels;
        _this.select = new core_1.EventEmitter();
        return _this;
    }
    EntityPickerResults.prototype.getListElement = function () {
        return this.element.nativeElement.querySelector('novo-list');
    };
    EntityPickerResults.prototype.selectMatch = function (event, item) {
        this.select.next(item);
        return _super.prototype.selectMatch.call(this, event, item);
    };
    return EntityPickerResults;
}(BasePickerResults_1.BasePickerResults));
EntityPickerResults.decorators = [
    { type: core_1.Component, args: [{
                selector: 'entity-picker-results',
                template: "\n        <novo-list *ngIf=\"matches.length > 0\" direction=\"vertical\">\n            <entity-picker-result *ngFor=\"let match of matches\"\n                    [match]=\"match\"\n                    [term]=\"term\"\n                    (click)=\"selectMatch($event, match)\"\n                    [ngClass]=\"{active: isActive(match)}\"\n                    (mouseenter)=\"selectActive(match)\"\n                    [class.disabled]=\"preselected(match)\">\n            </entity-picker-result>\n            <novo-loading theme=\"line\" *ngIf=\"isLoading && matches.length > 0\"></novo-loading>\n        </novo-list>\n        <p class=\"picker-error\" *ngIf=\"hasError\">{{ labels.pickerError }}</p>\n        <p class=\"picker-null-results\" *ngIf=\"!isLoading && !matches.length && !hasError\">{{ labels.pickerEmpty }}</p>\n    "
            },] },
];
/** @nocollapse */
EntityPickerResults.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: novo_label_service_1.NovoLabelService, },
    { type: core_1.ChangeDetectorRef, },
]; };
EntityPickerResults.propDecorators = {
    'select': [{ type: core_1.Output },],
};
exports.EntityPickerResults = EntityPickerResults;
//# sourceMappingURL=EntityPickerResults.js.map