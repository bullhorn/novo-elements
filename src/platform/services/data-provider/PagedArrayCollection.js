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
var ArrayCollection_1 = require("./ArrayCollection");
var CollectionEvent_1 = require("./CollectionEvent");
var PagedArrayCollection = (function (_super) {
    __extends(PagedArrayCollection, _super);
    function PagedArrayCollection(source) {
        if (source === void 0) { source = []; }
        var _this = _super.call(this, source) || this;
        _this._page = 1;
        _this._numberOfPages = 1;
        _this._pageSize = 10;
        return _this;
    }
    Object.defineProperty(PagedArrayCollection.prototype, "numberOfPages", {
        get: function () {
            var result = this.source.length / this.pageSize;
            result = Math.ceil(result);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagedArrayCollection.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (value) {
            this._page = value;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagedArrayCollection.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        set: function (value) {
            this._pageSize = value;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    PagedArrayCollection.prototype.next = function () {
        if (this.page === this.numberOfPages) {
            return this.page;
        }
        this.page++;
        return this.page;
    };
    PagedArrayCollection.prototype.prev = function () {
        if (this._page === 1) {
            return this.page;
        }
        this.page--;
        return this.page;
    };
    PagedArrayCollection.prototype.first = function () {
        if (this.page === 1) {
            return this.page;
        }
        this.page = 1;
        return this.page;
    };
    PagedArrayCollection.prototype.last = function () {
        if (this.page === this.numberOfPages) {
            return this.page;
        }
        this.page = this.numberOfPages;
        return this.page;
    };
    PagedArrayCollection.prototype.refresh = function () {
        this.filterData = this.isEditing ? this.editData.slice() : this.source.slice();
        for (var _i = 0, _a = this._sort.reverse(); _i < _a.length; _i++) {
            var item = _a[_i];
            this.sortOn(item.field, item.reverse);
        }
        for (var key in this._filter) {
            if (key) {
                this.filterOn(key, this._filter[key]);
            }
        }
        if (this.page >= 0) {
            var start = (this.page - 1) * this.pageSize;
            var end = start + this.pageSize;
            var result = this.filterData.slice(start, end);
            this.onDataChange(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.CHANGE, result));
        }
        else {
            this.onDataChange(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.CHANGE, this.filterData));
        }
    };
    return PagedArrayCollection;
}(ArrayCollection_1.ArrayCollection));
exports.PagedArrayCollection = PagedArrayCollection;
//# sourceMappingURL=PagedArrayCollection.js.map