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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromPromise");
// APP
var Helpers_1 = require("../../../../utils/Helpers");
var PickerResults_1 = require("../../../picker/extras/picker-results/PickerResults");
var novo_label_service_1 = require("../../../../services/novo-label-service");
var QuickNoteResults = (function (_super) {
    __extends(QuickNoteResults, _super);
    function QuickNoteResults(element, labels, ref) {
        var _this = _super.call(this, element, labels, ref) || this;
        _this.labels = labels;
        // Mode that the quick note is in for tagging
        _this.taggingMode = '';
        return _this;
    }
    Object.defineProperty(QuickNoteResults.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (value) {
            var _this = this;
            this._term = value.searchTerm;
            this.taggingMode = value.taggingMode;
            this.hasError = false;
            this.isLoading = true;
            this.search(value, this.taggingMode)
                .subscribe(function (results) {
                _this.matches = _this.isStatic ? _this.filterData(results) : results;
                _this.isLoading = false;
            }, function () {
                _this.hasError = true;
                _this.isLoading = false;
            });
        },
        enumerable: true,
        configurable: true
    });
    QuickNoteResults.prototype.search = function (term, taggingMode) {
        var _this = this;
        var searchCall = this.config.options[taggingMode];
        return Observable_1.Observable.fromPromise(new Promise(function (resolve, reject) {
            // Check if there is match data
            if (searchCall) {
                // Resolve the data
                if (Array.isArray(searchCall)) {
                    _this.isStatic = true;
                    // Arrays are returned immediately
                    resolve(_this.structureArray(searchCall));
                }
                else if ((searchCall.hasOwnProperty('reject') && searchCall.hasOwnProperty('resolve')) || Object.getPrototypeOf(searchCall).hasOwnProperty('then')) {
                    _this.isStatic = false;
                    // Promises (ES6 or Deferred) are resolved whenever they resolve
                    searchCall
                        .then(_this.structureArray.bind(_this))
                        .then(resolve, reject);
                }
                else if (typeof searchCall === 'function') {
                    _this.isStatic = false;
                    // Promises (ES6 or Deferred) are resolved whenever they resolve
                    searchCall(term)
                        .then(_this.structureArray.bind(_this))
                        .then(resolve, reject);
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
     * @name structureArray
     * @param collection - the data once getData resolves it
     * @returns { Array }
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    QuickNoteResults.prototype.structureArray = function (collection) {
        var _this = this;
        if (collection && (typeof collection[0] === 'string' || typeof collection[0] === 'number')) {
            return collection.map(function (item) {
                return {
                    value: item,
                    label: item
                };
            });
        }
        return collection.map(function (data) {
            var value = _this.config.field ? data[_this.config.field[_this.taggingMode]] : (data.value || data);
            var label = _this.config.format ? Helpers_1.Helpers.interpolate(_this.config.format[_this.taggingMode], data) : data.label || String(value);
            return { value: value, label: label, data: data };
        });
    };
    /**
     * @name selectMatch
     * @param event
     *
     * @description
     */
    QuickNoteResults.prototype.selectMatch = function (event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        var selected = this.activeMatch;
        if (selected) {
            this.parent.onSelected(this.taggingMode, selected);
            this.parent.hideResults();
        }
        return false;
    };
    return QuickNoteResults;
}(PickerResults_1.PickerResults));
QuickNoteResults.decorators = [
    { type: core_1.Component, args: [{
                selector: 'quick-note-results',
                host: {
                    'class': 'active'
                },
                template: "\n        <novo-loading theme=\"line\" *ngIf=\"isLoading && !matches.length\"></novo-loading>\n        <novo-list *ngIf=\"matches.length > 0\">\n            <novo-list-item\n                *ngFor=\"let match of matches\"\n                (click)=\"selectMatch($event)\"\n                [class.active]=\"match===activeMatch\"\n                (mouseenter)=\"selectActive(match)\">\n                <item-content>\n                    <p [innerHtml]=\"highlight(match.label, term)\"></p>\n                </item-content>\n            </novo-list-item>\n        </novo-list>\n        <p class=\"picker-error\" *ngIf=\"hasError\">{{ labels.quickNoteError }}</p>\n        <p class=\"picker-null\" *ngIf=\"!isLoading && !matches.length && !hasError\">{{ labels.quickNoteEmpty }}</p>\n    "
            },] },
];
/** @nocollapse */
QuickNoteResults.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: novo_label_service_1.NovoLabelService, },
    { type: core_1.ChangeDetectorRef, },
]; };
exports.QuickNoteResults = QuickNoteResults;
//# sourceMappingURL=QuickNoteResults.js.map