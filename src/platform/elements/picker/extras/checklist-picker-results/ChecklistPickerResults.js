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
var BasePickerResults_1 = require("../base-picker-results/BasePickerResults");
var Helpers_1 = require("../../../../utils/Helpers");
var novo_label_service_1 = require("../../../../services/novo-label-service");
// Vendor
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromPromise");
/**
 * @name: ChecklistPickerResults
 *
 * @description This is the actual list of matches that gets injected into the DOM.
 */
var ChecklistPickerResults = (function (_super) {
    __extends(ChecklistPickerResults, _super);
    function ChecklistPickerResults(element, labels, ref) {
        var _this = _super.call(this, element, ref) || this;
        _this.labels = labels;
        return _this;
    }
    ChecklistPickerResults.prototype.search = function () {
        var _this = this;
        var options = this.config.options;
        //only set this the first time
        return Observable_1.Observable.fromPromise(new Promise(function (resolve, reject) {
            // Check if there is match data
            if (options) {
                // Resolve the data
                if (Array.isArray(options)) {
                    _this.isStatic = true;
                    // Arrays are returned immediately
                    resolve(options);
                }
                else {
                    // All other kinds of data are rejected
                    reject('The data provided is not an array or a promise');
                    throw new Error('The data provided is not an array or a promise');
                }
            }
            else {
                // No data gets rejected
                reject('error');
            }
        }));
    };
    /**
     * @name filterData=
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    ChecklistPickerResults.prototype.filterData = function (matches) {
        var _this = this;
        if (this.term && matches) {
            this.filteredMatches = matches.map(function (section) {
                var items = section.originalData.filter(function (match) {
                    return ~String(match.label).toLowerCase().indexOf(_this.term.toLowerCase());
                });
                section.data = items;
                return section;
            }, this);
            return this.filteredMatches;
        }
        else if (this.term === '') {
            matches.forEach(function (section) {
                section.data = section.originalData;
            });
            return matches;
        }
        // Show no recent results template
        return matches;
    };
    /**
     * @name selectMatch
     * @param event
     * @param item
     *
     * @description
     */
    ChecklistPickerResults.prototype.selectMatch = function (event, item) {
        Helpers_1.Helpers.swallowEvent(event);
        if (item.indeterminate) {
            item.indeterminate = false;
            item.checked = true;
        }
        else {
            item.checked = !item.checked;
        }
        var selected = this.activeMatch;
        if (selected) {
            this.parent.value = selected;
        }
        this.ref.markForCheck();
        return false;
    };
    return ChecklistPickerResults;
}(BasePickerResults_1.BasePickerResults));
ChecklistPickerResults.decorators = [
    { type: core_1.Component, args: [{
                selector: 'checklist-picker-results',
                host: {
                    'class': 'active picker-results'
                },
                template: "\n        <novo-loading theme=\"line\" *ngIf=\"isLoading && !matches.length\"></novo-loading>\n        <ul *ngIf=\"matches.length > 0\">\n            <span *ngFor=\"let section of matches; let i = index\">\n                <li class=\"header caption\" *ngIf=\"section.data.length > 0\">{{ section.label || section.type }}</li>\n                <li\n                    *ngFor=\"let match of section.data; let i = index\" [ngClass]=\"{checked: match.checked}\"\n                    (click)=\"selectMatch($event, match)\"\n                    [class.active]=\"match === activeMatch\"\n                    (mouseenter)=\"selectActive(match)\">\n                    <label>\n                        <i [ngClass]=\"{'bhi-checkbox-empty': !match.checked, 'bhi-checkbox-filled': match.checked, 'bhi-checkbox-indeterminate': match.indeterminate }\"></i>\n                        {{match.label}}\n                    </label>\n                </li>\n            </span>\n        </ul>\n        <p class=\"picker-error\" *ngIf=\"hasError\">{{ labels.pickerError }}</p>\n        <p class=\"picker-null-results\" *ngIf=\"!isLoading && !matches.length && !hasError\">{{ labels.pickerEmpty }}</p>\n    "
            },] },
];
/** @nocollapse */
ChecklistPickerResults.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: novo_label_service_1.NovoLabelService, },
    { type: core_1.ChangeDetectorRef, },
]; };
exports.ChecklistPickerResults = ChecklistPickerResults;
//# sourceMappingURL=ChecklistPickerResults.js.map