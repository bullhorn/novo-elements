"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Ng
var core_1 = require("@angular/core");
var CollectionEvent_1 = require("./CollectionEvent");
var Helpers_1 = require("../../utils/Helpers");
/**
 * Base Class for all Collection based data providers
 *
 * @export
 * @class DataProvider
 * @example
 *  var dp:DataProvider = new DataProvider();
 *  dp.addItem({label:"Item 1"});
 *  dp.addItem({label:"Item 2"});
 *  dp.addItem({label:"Item 3"});
 *  dp.addItem({label:"Item 4"});

 *  var myList:List = new List();
 *  myList.dataProvider = dp;
 */
var ArrayCollection = (function () {
    function ArrayCollection(source) {
        if (source === void 0) { source = []; }
        this.dataChange = new core_1.EventEmitter();
        this.source = [];
        this.editData = [];
        this.isEditing = false;
        this.filterData = [];
        this._filter = {};
        this._sort = [];
        this.source = source;
        this.editData = this.copy(this.source);
        this.filterData = this.source.slice();
    }
    Object.defineProperty(ArrayCollection.prototype, "length", {
        get: function () {
            return this.filterData.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrayCollection.prototype, "total", {
        get: function () {
            return this.filterData.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrayCollection.prototype, "list", {
        get: function () {
            return this.filterData;
        },
        enumerable: true,
        configurable: true
    });
    ArrayCollection.prototype.isEmpty = function () {
        return this.length <= 0 && !this.isLoading() && !this.hasErrors();
    };
    ArrayCollection.prototype.hasErrors = function () {
        return false;
    };
    ArrayCollection.prototype.isLoading = function () {
        return false;
    };
    ArrayCollection.prototype.isFiltered = function () {
        return (Object.keys(this._filter).length > 0);
    };
    /**
     * Method to switch the isEditingflag for the data source
     */
    ArrayCollection.prototype.edit = function () {
        this.isEditing = true;
        this.editData = this.copy(this.source);
    };
    /**
     * Method to leave edit mode and reset source
     */
    ArrayCollection.prototype.undo = function () {
        this.isEditing = false;
        this.source = this.copy(this.editData);
        this.refresh();
    };
    /**
     * Method to leave edit mode and save editData
     */
    ArrayCollection.prototype.commit = function () {
        this.isEditing = false;
        this.source = this.filterData.slice();
        this.refresh();
    };
    /**
     * Appends an item to the end of the data provider.
     *
     * @param {any} item
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.addItem = function (item) {
        this.isEditing ? this.editData.push(item) : this.source.push(item);
        this.onDataChange(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.ADD, [item]));
        this.refresh();
    };
    /**
     * Adds a new item to the data provider at the specified index.
     *
     * @param {any} item
     * @param {number} index
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.addItemAt = function (item, index) {
        this.isEditing ? this.editData.splice(index, 0, item) : this.source.splice(index, 0, item);
        this.onDataChange(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.ADD, [item]));
        this.refresh();
    };
    /**
     *  Appends multiple items to the end of the DataProvider and dispatches a CollectionEvent.ADD event.
     *
     * @param {any} items
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.addItems = function (items) {
        this.isEditing ? (_a = this.editData).push.apply(_a, items) : (_b = this.source).push.apply(_b, items);
        this.onDataChange(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.ADD, items));
        this.refresh();
        var _a, _b;
    };
    /**
     * Adds several items to the data provider at the specified index and dispatches a CollectionEvent.ADD event.
     *
     * @param {any} items
     * @param {number} index
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.addItemsAt = function (items, index) {
        this.isEditing ? (_a = this.editData).splice.apply(_a, [index, 0].concat(items)) : (_b = this.source).splice.apply(_b, [index, 0].concat(items));
        var _a, _b;
    };
    /**
     * Creates a copy of the current ArrayCollection any.
     *
     * @returns {ArrayCollection}
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.clone = function () {
        return new ArrayCollection(this.isEditing ? this.copy(this.editData) : this.copy(this.source));
    };
    /**
    * Creates a copy of the current ArrayCollection any.
    *
    * @returns {Array}
    *
    * @memberOf ArrayCollection
    */
    ArrayCollection.prototype.copy = function (array) {
        return Helpers_1.Helpers.deepClone(array);
    };
    /**
     * Concatenates the specified items to the end of the current data provider.
     *
     * @param {any} items
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.concat = function (items) {
        this.addItems(items);
    };
    /**
     * Returns the item at the specified index.
     *
     * @param {number} index
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.getItemAt = function (index) {
        return this.isEditing ? this.editData[index] : this.source[index];
    };
    /**
     *  Returns the index of the specified item.
     *
     * @param {any} item
     * @returns {number}
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.getItemIndex = function (item) {
        return this.isEditing ? this.editData.indexOf(item) : this.source.indexOf(item);
    };
    /**
     * Invalidates all the data items that the DataProvider contains and dispatches a CollectionEvent.INVALIDATE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.invalidate = function () {
        this.onDataChange(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.INVALIDATE_ALL));
    };
    /**
     * Invalidates the specified item.
     *
     * @param {any} item
     *
     * @memberOf ArrayCollection
     */
    //invalidateItem(item:any):void {}
    /**
     * Invalidates the item at the specified index.
     *
     * @param {int} index
     *
     * @memberOf ArrayCollection
     */
    //invalidateItemAt(index:number):void {}
    /**
     * Appends the specified data into the data that the data provider contains and removes any duplicate items.
     *
     * @param {Array} newData
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.merge = function (newData) {
        for (var _i = 0, newData_1 = newData; _i < newData_1.length; _i++) {
            var obj = newData_1[_i];
            var existing = ~this.getItemIndex(obj);
            if (existing) {
                this.replaceItem(obj, existing);
            }
            else {
                this.addItem(obj);
            }
        }
    };
    /**
     * Removes all items from the data provider and dispatches a CollectionEvent.REMOVE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.removeAll = function () {
        this.source = [];
        this.editData = [];
        this.filterData = [];
        this.onDataChange(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.REMOVE_ALL, []));
        this.refresh();
    };
    /**
     * Removes the specified item from the data provider and dispatches a CollectionEvent.REMOVE event.
     *
     * @param {any} item
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.removeItem = function (item) {
        var index = this.getItemIndex(item);
        return this.removeItemAt(index);
    };
    /**
     * Removes the item at the specified index and dispatches a CollectionEvent.REMOVE event.
     *
     * @param {number} index
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.removeItemAt = function (index) {
        var success = !!(this.source.splice(index, 1));
        this.refresh();
        return success;
    };
    /**
     * Replaces an existing item with a new item and dispatches a CollectionEvent.REPLACE event.
     *
     * @param {any} newItem
     * @param {any} oldItem
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.replaceItem = function (newItem, oldItem) {
        var index = this.getItemIndex(oldItem);
        if (index >= 0) {
            this.replaceItemAt(newItem, index);
        }
    };
    /**
     * Replaces the item at the specified index and dispatches a CollectionEvent.REPLACE event.
     *
     * @param {any} newItem
     * @param {number} index
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.replaceItemAt = function (newItem, index) {
        this.filterData.splice(index, 1, newItem);
    };
    Object.defineProperty(ArrayCollection.prototype, "sort", {
        /**
         * Sorts the items that the data provider contains and dispatches a CollectionEvent.SORT event.
         *
         * @param {any} sortArgs
         * @returns null
         *
         * @memberOf ArrayCollection
         */
        get: function () {
            return this._sort;
        },
        set: function (value) {
            this._sort = value;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sorts the items that the data provider contains by the specified field and dispatches a CollectionEvent.SORT event.
     *
     * @param {any} fieldName
     * @param {any} [options=null]
     * @returns null
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.sortOn = function (fieldName, reverse) {
        if (reverse === void 0) { reverse = false; }
        this.filterData = this.filterData.sort(Helpers_1.Helpers.sortByField(fieldName, reverse));
        this.onDataChange(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.SORT));
        return this.filterData;
    };
    Object.defineProperty(ArrayCollection.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        set: function (value) {
            this._filter = value;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    ArrayCollection.prototype.filterOn = function (fieldName, value) {
        if (value === void 0) { value = null; }
        this.filterData = this.filterData.filter(Helpers_1.Helpers.filterByField(fieldName, value));
        return this.filterData;
    };
    ArrayCollection.prototype.onDataChange = function (event) {
        this.dataChange.emit(event);
    };
    ArrayCollection.prototype.refresh = function () {
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
        this.onDataChange(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.CHANGE, this.filterData));
    };
    /**
     * Creates an Array any representation of the data that the data provider contains.
     *
     * @returns {Array}
     *
     * @memberOf ArrayCollection
     */
    ArrayCollection.prototype.toArray = function () {
        return this.isEditing ? this.editData : this.source;
    };
    ArrayCollection.prototype.toJSON = function () {
        return this.isEditing ? this.editData : this.source;
    };
    return ArrayCollection;
}());
exports.ArrayCollection = ArrayCollection;
//# sourceMappingURL=ArrayCollection.js.map