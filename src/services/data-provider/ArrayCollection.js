// Ng
import { EventEmitter } from '@angular/core';
// App
import { DataChangeEvent } from './DataChangeEvent';
import { Helpers } from '../../utils/Helpers';

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
export class ArrayCollection {
    dataChange:EventEmitter = new EventEmitter();
    list:Array = [];
    source:Array = [];
    _page:number = -1;
    _pageSize:number = -1;

    constructor(value:Array) {
        this.source = value || [];
        this.list = this.source.splice();
    }

    get length() {
        return this.source.length;
    }

    /**
     * Appends an item to the end of the data provider.
     *
     * @param {any} item
     *
     * @memberOf ArrayCollection
     */
    addItem(item:any):void {
        this.list.push(item);
    }

    /**
     * Adds a new item to the data provider at the specified index.
     *
     * @param {any} item
     * @param {number} index
     *
     * @memberOf ArrayCollection
     */
    addItemAt(item:any, index:number):void {
        this.list.splice(index, 0, item);
    }

    /**
     *  Appends multiple items to the end of the DataProvider and dispatches a DataChangeEvent.ADD event.
     *
     * @param {any} items
     *
     * @memberOf ArrayCollection
     */
    addItems(items):void {
        this.list.push(...items);
        this.dataChange.emit(new DataChangeEvent(DataChangeEvent.ADD), items);
    }

    /**
     * Adds several items to the data provider at the specified index and dispatches a DataChangeEvent.ADD event.
     *
     * @param {any} items
     * @param {number} index
     *
     * @memberOf ArrayCollection
     */
    addItemsAt(items:any, index:number):void {
        this.list.splice(index, 0, ...items);
    }

    /**
     * Creates a copy of the current ArrayCollection any.
     *
     * @returns {ArrayCollection}
     *
     * @memberOf ArrayCollection
     */
    clone():ArrayCollection {
        return new ArrayCollection(this.list.slice());
    }

    /**
     * Concatenates the specified items to the end of the current data provider.
     *
     * @param {any} items
     *
     * @memberOf ArrayCollection
     */
    concat(items:Array<any>):void {
        this.addItems(items);
    }

    /**
     * Returns the item at the specified index.
     *
     * @param {number} index
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    getItemAt(index:number):any {
        return this.list[index];
    }

    /**
     *  Returns the index of the specified item.
     *
     * @param {any} item
     * @returns {number}
     *
     * @memberOf ArrayCollection
     */
    getItemIndex(item:any):number {
        return this.list.indexOf(item);
    }

    /**
     * Invalidates all the data items that the DataProvider contains and dispatches a DataChangeEvent.INVALIDATE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    invalidate():void {
        this.dataChange.emit(new DataChangeEvent(DataChangeEvent.INVALIDATE_ALL));
    }

    /**
     * Invalidates the specified item.
     *
     * @param {any} item
     *
     * @memberOf ArrayCollection
     */
    invalidateItem(item:any):void {

    }

    /**
     * Invalidates the item at the specified index.
     *
     * @param {int} index
     *
     * @memberOf ArrayCollection
     */
    invalidateItemAt(index:number):void {

    }

    /**
     * Appends the specified data into the data that the data provider contains and removes any duplicate items.
     *
     * @param {Array} newData
     *
     * @memberOf ArrayCollection
     */
    merge(newData:Array):void {
        for (let obj of newData) {
            let existing = ~this.getItemIndex(obj);
            if (existing) {
                this.replaceItem();
            } else {
                this.addItem(obj);
            }
        }
    }

    /**
     * Removes all items from the data provider and dispatches a DataChangeEvent.REMOVE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    removeAll():void {
        let oldData = this.list.slice();
        this.list = [];
        this.dataChange.emit(new DataChangeEvent(DataChangeEvent.REMOVE_ALL, oldData));
    }

    /**
     * Removes the specified item from the data provider and dispatches a DataChangeEvent.REMOVE event.
     *
     * @param {any} item
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    removeItem(item:any):any {
        let index = this.getItemIndex(item);
        this.removeItemAt(index);
    }

    /**
     * Removes the item at the specified index and dispatches a DataChangeEvent.REMOVE event.
     *
     * @param {number} index
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    removeItemAt(index:number):any {
        this.list.splice(index, 1);
    }

    /**
     * Replaces an existing item with a new item and dispatches a DataChangeEvent.REPLACE event.
     *
     * @param {any} newItem
     * @param {any} oldItem
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    replaceItem(newItem:any, oldItem:any):any {
        let index = this.getItemIndex(oldItem);
        if (index >= 0) {
            this.replaceItemAt(newItem, index);
        }
    }

    /**
     * Replaces the item at the specified index and dispatches a DataChangeEvent.REPLACE event.
     *
     * @param {any} newItem
     * @param {number} index
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    replaceItemAt(newItem:any, index:number):any {
        this.list.splice(index, 1, newItem);
    }

    /**
     * Sorts the items that the data provider contains and dispatches a DataChangeEvent.SORT event.
     *
     * @param {any} sortArgs
     * @returns null
     *
     * @memberOf ArrayCollection
     */
    sort(...sortArgs):Promise {
        let results = [];
        for (let item of sortArgs.reverse()) {
            results.push(this.sortOn(item.fieldName, item.options));
        }
        return Promise.all(results);
    }

    /**
     * Sorts the items that the data provider contains by the specified field and dispatches a DataChangeEvent.SORT event.
     *
     * @param {any} fieldName
     * @param {any} [options=null]
     * @returns null
     *
     * @memberOf ArrayCollection
     */
    sortOn(fieldName:any, options:any = null):Promise {
        this.list = this.list.sort(Helpers.sortByField(fieldName));
        if (options.reverse) {
            this.list.reverse();
        }
        this.dataChange.emit(new DataChangeEvent(DataChangeEvent.SORT));
        return Promise.resolve(this.list);
    }

    filter(filters):Promise {
        this.list = this.source.splice();
        if (filters.length) {
            for (let key in filters) { //eslint-disable-line
                this.filterOn(key, filters[key]);
            }
        }
        return Promise.resolve(this.list);
    }

    filterOn(fieldName:any, value:any = null):Promise {
        this.list = this.list.filter(Helpers.filterByField(fieldName, value));
        return this.list;
    }

    page(num:number) {
        this._page = num;
        if (num >= 0 && this._pageSize > 0) {
            let start = this._page * this._pageSize;
            let end = start + this._pageSize;
            let result = this.list.slice(start, end);
            return Promise.resolve(result);
        }

        return Promise.resolve(this.list);
    }

    pageSize(num:number) {
        this._pageSize = num;
        if (num >= 0 && this._pageSize > 0) {
            let start = this._page * this._pageSize;
            let end = start + this._pageSize;
            let result = this.list.slice(start, end);
            return Promise.resolve(result);
        }

        return Promise.resolve(this.list);
    }

    /**
     * Creates an Array any representation of the data that the data provider contains.
     *
     * @returns {Array}
     *
     * @memberOf ArrayCollection
     */
    toArray():Array {
        return this.list;
    }

    toJSON() {
        return this.list;
    }
}
