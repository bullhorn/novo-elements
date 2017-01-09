// Ng
import { EventEmitter } from '@angular/core';
// App
import { Collection } from './Collection';
import { CollectionEvent } from './CollectionEvent';
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
export class ArrayCollection<T> implements Collection<T> {
    dataChange:EventEmitter<CollectionEvent> = new EventEmitter<CollectionEvent>();
    source:Array<T> = [];
    filterData:Array<T> = [];
    _filter:any = {};
    _sort:Array<any> = [];

    constructor(source:Array<T> = []) {
        this.source = source;
        this.filterData = source.slice();
    }

    get length() {
        return this.filterData.length;
    }

    get total(): number {
        return this.filterData.length;
    }

    get list():Array<T> {
        return this.filterData;
    }

    isEmpty():boolean {
        return this.length <= 0 && !this.isLoading() && !this.hasErrors();
    }

    hasErrors():boolean {
        return false;
    }

    isLoading():boolean {
        return false;
    }

    isFiltered():boolean {
        return (Object.keys(this._filter).length > 0);
    }

    /**
     * Appends an item to the end of the data provider.
     *
     * @param {any} item
     *
     * @memberOf ArrayCollection
     */
    addItem(item:T):void {
        this.source.push(item);
        this.onDataChange(new CollectionEvent(CollectionEvent.ADD, [item]));
        this.refresh();
    }

    /**
     * Adds a new item to the data provider at the specified index.
     *
     * @param {any} item
     * @param {number} index
     *
     * @memberOf ArrayCollection
     */
    addItemAt(item:T, index:number):void {
        this.source.splice(index, 0, item);
        this.onDataChange(new CollectionEvent(CollectionEvent.ADD, [item]));
        this.refresh();
    }

    /**
     *  Appends multiple items to the end of the DataProvider and dispatches a CollectionEvent.ADD event.
     *
     * @param {any} items
     *
     * @memberOf ArrayCollection
     */
    addItems(items:Array<T>):void {
        this.source.push(...items);
        this.onDataChange(new CollectionEvent(CollectionEvent.ADD, items));
        this.refresh();
    }

    /**
     * Adds several items to the data provider at the specified index and dispatches a CollectionEvent.ADD event.
     *
     * @param {any} items
     * @param {number} index
     *
     * @memberOf ArrayCollection
     */
    addItemsAt(items:Array<T>, index:number):void {
        this.source.splice(index, 0, ...items);
    }

    /**
     * Creates a copy of the current ArrayCollection any.
     *
     * @returns {ArrayCollection}
     *
     * @memberOf ArrayCollection
     */
    clone():ArrayCollection<T> {
        return new ArrayCollection(this.source.slice());
    }

    /**
     * Concatenates the specified items to the end of the current data provider.
     *
     * @param {any} items
     *
     * @memberOf ArrayCollection
     */
    concat(items:Array<T>):void {
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
        return this.source[index];
    }

    /**
     *  Returns the index of the specified item.
     *
     * @param {any} item
     * @returns {number}
     *
     * @memberOf ArrayCollection
     */
    getItemIndex(item:T):number {
        return this.source.indexOf(item);
    }

    /**
     * Invalidates all the data items that the DataProvider contains and dispatches a CollectionEvent.INVALIDATE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    invalidate():void {
        this.onDataChange(new CollectionEvent(CollectionEvent.INVALIDATE_ALL));
    }

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
    merge(newData:Array<T>):void {
        for (let obj of newData) {
            let existing = ~this.getItemIndex(obj);
            if (existing) {
                this.replaceItem(obj, existing);
            } else {
                this.addItem(obj);
            }
        }
    }

    /**
     * Removes all items from the data provider and dispatches a CollectionEvent.REMOVE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    removeAll():void {
        //let oldData = this.filterData.slice();
        this.source = [];
        this.filterData = [];
        this.onDataChange(new CollectionEvent(CollectionEvent.REMOVE_ALL, []));
        this.refresh();
        //this.onDataChange(new CollectionEvent(CollectionEvent.REMOVE_ALL, oldData));
    }

    /**
     * Removes the specified item from the data provider and dispatches a CollectionEvent.REMOVE event.
     *
     * @param {any} item
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    removeItem(item:T):boolean {
        let index = this.getItemIndex(item);
        return this.removeItemAt(index);
    }

    /**
     * Removes the item at the specified index and dispatches a CollectionEvent.REMOVE event.
     *
     * @param {number} index
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    removeItemAt(index:number):boolean {
        return !!(this.filterData.splice(index, 1));
    }

    /**
     * Replaces an existing item with a new item and dispatches a CollectionEvent.REPLACE event.
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
     * Replaces the item at the specified index and dispatches a CollectionEvent.REPLACE event.
     *
     * @param {any} newItem
     * @param {number} index
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    replaceItemAt(newItem:any, index:number):any {
        this.filterData.splice(index, 1, newItem);
    }

    /**
     * Sorts the items that the data provider contains and dispatches a CollectionEvent.SORT event.
     *
     * @param {any} sortArgs
     * @returns null
     *
     * @memberOf ArrayCollection
     */
    get sort():Array<any> {
        return this._sort;
    }

    set sort(value:Array<any>) {
        this._sort = value;
        this.refresh();
    }

    /**
     * Sorts the items that the data provider contains by the specified field and dispatches a CollectionEvent.SORT event.
     *
     * @param {any} fieldName
     * @param {any} [options=null]
     * @returns null
     *
     * @memberOf ArrayCollection
     */
    sortOn(fieldName:any, reverse = false):Array<T> {
        this.filterData = this.filterData.sort(Helpers.sortByField(fieldName, reverse));
        this.onDataChange(new CollectionEvent(CollectionEvent.SORT));
        return this.filterData;
    }

    get filter():any {
        return this._filter;
    }

    set filter(value:any) {
        this._filter = value;
        this.refresh();
    }

    filterOn(fieldName:any, value:any = null):Array<T> {
        this.filterData = this.filterData.filter(Helpers.filterByField(fieldName, value));
        return this.filterData;
    }

    onDataChange(event:CollectionEvent):void {
        this.dataChange.emit(event);
    }

    refresh():void {
        this.filterData = this.source.slice();
        for (let item of this._sort.reverse()) {
            this.sortOn(item.field, item.reverse);
        }
        for (let key in this._filter) {
            if (key) {
                this.filterOn(key, this._filter[key]);
            }
        }
        this.onDataChange(new CollectionEvent(CollectionEvent.CHANGE, this.filterData));
    }

    /**
     * Creates an Array any representation of the data that the data provider contains.
     *
     * @returns {Array}
     *
     * @memberOf ArrayCollection
     */
    toArray():Array<T> {
        return this.source;
    }

    toJSON() {
        return this.source;
    }
}
