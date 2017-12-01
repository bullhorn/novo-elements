"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var Helpers_1 = require("../../../../utils/Helpers");
// Vendor
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromPromise");
/**
 * @name: PickerResults
 *
 * @description This is the actual list of matches that gets injected into the DOM. It's also the piece that can be
 * overwritten if custom list options are needed.
 */
var BasePickerResults = (function () {
    function BasePickerResults(element, ref) {
        this._term = '';
        this.selected = [];
        this.matches = [];
        this.hasError = false;
        this.isLoading = false;
        this.isStatic = true;
        this.page = 0;
        this.lastPage = false;
        this.autoSelectFirstOption = true;
        this.element = element;
        this.ref = ref;
    }
    BasePickerResults.prototype.onScrollDown = function (target) {
        if (target) {
            var offset = target.offsetHeight + target.scrollTop, bottom = target.scrollHeight;
            if (offset >= bottom) {
                event.stopPropagation();
                if (!this.lastPage && !this.config.disableInfiniteScroll) {
                    this.processSearch();
                }
            }
        }
    };
    Object.defineProperty(BasePickerResults.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (value) {
            if (value !== this._term || this.page === 0) {
                this._term = value;
                this.page = 0;
                this.matches = [];
                this.processSearch();
            }
        },
        enumerable: true,
        configurable: true
    });
    BasePickerResults.prototype.processSearch = function () {
        var _this = this;
        this.hasError = false;
        this.isLoading = true;
        this.ref.markForCheck();
        this.search(this.term)
            .subscribe(function (results) {
            if (_this.isStatic) {
                _this.matches = _this.filterData(results);
            }
            else {
                _this.matches = _this.matches.concat(results);
                _this.lastPage = (results && !results.length);
            }
            if (_this.matches.length > 0 && _this.autoSelectFirstOption) {
                _this.nextActiveMatch();
            }
            _this.isLoading = false;
            _this.ref.markForCheck();
            setTimeout(function () { return _this.overlay.updatePosition(); }); // @bkimball: This was added for Dylan Schulte, 9.18.2017 4:14PM EST, you're welcome!
        }, function (err) {
            _this.hasError = _this.term && _this.term.length !== 0;
            _this.isLoading = false;
            _this.lastPage = true;
            if (_this.term && _this.term.length !== 0) {
                console.error(err); // tslint:disable-lineno
            }
            _this.ref.markForCheck();
        });
    };
    BasePickerResults.prototype.search = function (term, mode) {
        var _this = this;
        var options = this.config.options;
        return Observable_1.Observable.fromPromise(new Promise(function (resolve, reject) {
            // Check if there is match data
            if (options) {
                // Resolve the data
                if (Array.isArray(options)) {
                    _this.isStatic = true;
                    // Arrays are returned immediately
                    resolve(_this.structureArray(options));
                }
                else if (term && term.length >= (_this.config.minSearchLength || 1)) {
                    if ((options.hasOwnProperty('reject') && options.hasOwnProperty('resolve')) || Object.getPrototypeOf(options).hasOwnProperty('then')) {
                        _this.isStatic = false;
                        // Promises (ES6 or Deferred) are resolved whenever they resolve
                        options
                            .then(_this.structureArray.bind(_this))
                            .then(resolve, reject);
                    }
                    else if (typeof options === 'function') {
                        _this.isStatic = false;
                        // Promises (ES6 or Deferred) are resolved whenever they resolve
                        options(term, ++_this.page)
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
                    if (_this.config.defaultOptions) {
                        _this.isStatic = false;
                        if (typeof _this.config.defaultOptions === 'function') {
                            var defaultOptions = _this.config.defaultOptions(term, ++_this.page);
                            if (Object.getPrototypeOf(defaultOptions).hasOwnProperty('then')) {
                                defaultOptions
                                    .then(_this.structureArray.bind(_this))
                                    .then(resolve, reject);
                            }
                            else {
                                resolve(_this.structureArray(defaultOptions));
                            }
                        }
                        else {
                            resolve(_this.structureArray(_this.config.defaultOptions));
                        }
                    }
                    else {
                        // No search term gets rejected
                        reject('No search term');
                    }
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
    BasePickerResults.prototype.structureArray = function (collection) {
        var _this = this;
        var dataArray = collection.data ? collection.data : collection;
        if (dataArray && (typeof dataArray[0] === 'string' || typeof dataArray[0] === 'number')) {
            return collection.map(function (item) {
                return {
                    value: item,
                    label: item
                };
            });
        }
        return dataArray.map(function (data) {
            var value = _this.config.field ? data[_this.config.field] : (data.value || data);
            if (_this.config.valueFormat) {
                value = Helpers_1.Helpers.interpolate(_this.config.valueFormat, data);
            }
            var label = _this.config.format ? Helpers_1.Helpers.interpolate(_this.config.format, data) : data.label || String(value);
            return { value: value, label: label, data: data };
        });
    };
    /**
     * @name filterData=
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    BasePickerResults.prototype.filterData = function (matches) {
        var _this = this;
        if (this.term && matches) {
            return matches.filter(function (match) {
                return ~String(match.label).toLowerCase().indexOf(_this.term.toLowerCase());
            });
        }
        // Show no recent results template
        return matches;
    };
    /**
     * @name selectActiveMatch
     *
     * @description This function is called when the user presses the enter key to call the selectMatch method.
     */
    BasePickerResults.prototype.selectActiveMatch = function () {
        this.selectMatch();
    };
    /**
     * @name prevActiveMatch
     *
     * @description This function sets activeMatch to the match before the current node.
     */
    BasePickerResults.prototype.prevActiveMatch = function () {
        var index = this.matches.indexOf(this.activeMatch);
        this.activeMatch = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
        this.scrollToActive();
        this.ref.markForCheck();
    };
    /**
     * @name nextActiveMatch
     *
     * @description This function sets activeMatch to the match after the current node.
     */
    BasePickerResults.prototype.nextActiveMatch = function () {
        var index = this.matches.indexOf(this.activeMatch);
        this.activeMatch = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
        this.scrollToActive();
        this.ref.markForCheck();
    };
    BasePickerResults.prototype.getListElement = function () {
        return this.element.nativeElement;
    };
    BasePickerResults.prototype.getChildrenOfListElement = function () {
        var children = [];
        if (this.getListElement()) {
            children = this.getListElement().children;
        }
        return children;
    };
    BasePickerResults.prototype.scrollToActive = function () {
        var list = this.getListElement();
        var items = this.getChildrenOfListElement();
        var index = this.matches.indexOf(this.activeMatch);
        var item = items[index];
        if (item) {
            list.scrollTop = item.offsetTop;
        }
    };
    /**
     * @name selectActive
     * @param match
     *
     * @description
     */
    BasePickerResults.prototype.selectActive = function (match) {
        this.activeMatch = match;
    };
    /**
     * @name isActive
     * @param match
     *
     * @description
     */
    BasePickerResults.prototype.isActive = function (match) {
        return this.activeMatch === match;
    };
    /**
     * @name selectMatch
     * @param event
     * @param item
     *
     * @description
     */
    BasePickerResults.prototype.selectMatch = function (event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        var selected = this.activeMatch;
        if (selected && this.parent) {
            this.parent.value = selected;
            if (this.parent.closeOnSelect) {
                this.parent.hideResults();
            }
        }
        this.ref.markForCheck();
        return false;
    };
    /**
     * @name escapeRegexp
     * @param queryToEscape
     *
     * @description This function captures the whole query string and replace it with the string that will be used to
     * match.
     */
    BasePickerResults.prototype.escapeRegexp = function (queryToEscape) {
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
    BasePickerResults.prototype.highlight = function (match, query) {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return query ? match.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : match;
    };
    BasePickerResults.prototype.preselected = function (match) {
        return this.selected.findIndex(function (item) {
            var isPreselected = false;
            if (item && item.value && match && match.value) {
                if (item.value.id && match.value.id) {
                    isPreselected = item.value.id === match.value.id;
                }
                else {
                    isPreselected = item.value === match.value;
                }
            }
            return isPreselected;
        }) !== -1;
    };
    return BasePickerResults;
}());
BasePickerResults.propDecorators = {
    'matches': [{ type: core_1.Input },],
    'onScrollDown': [{ type: core_1.HostListener, args: ['scroll', ['$event.target'],] },],
};
exports.BasePickerResults = BasePickerResults;
//# sourceMappingURL=BasePickerResults.js.map