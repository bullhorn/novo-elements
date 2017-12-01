import { EventEmitter } from '@angular/core';
import { Collection } from './Collection';
import { CollectionEvent } from './CollectionEvent';
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
export declare class ArrayCollection<T> implements Collection<T> {
    dataChange: EventEmitter<CollectionEvent>;
    source: Array<T>;
    editData: Array<T>;
    isEditing: boolean;
    filterData: Array<T>;
    _filter: any;
    _sort: Array<any>;
    constructor(source?: Array<T>);
    readonly length: number;
    readonly total: number;
    readonly list: Array<T>;
    isEmpty(): boolean;
    hasErrors(): boolean;
    isLoading(): boolean;
    isFiltered(): boolean;
    /**
     * Method to switch the isEditingflag for the data source
     */
    edit(): void;
    /**
     * Method to leave edit mode and reset source
     */
    undo(): void;
    /**
     * Method to leave edit mode and save editData
     */
    commit(): void;
    /**
     * Appends an item to the end of the data provider.
     *
     * @param {any} item
     *
     * @memberOf ArrayCollection
     */
    addItem(item: T): void;
    /**
     * Adds a new item to the data provider at the specified index.
     *
     * @param {any} item
     * @param {number} index
     *
     * @memberOf ArrayCollection
     */
    addItemAt(item: T, index: number): void;
    /**
     *  Appends multiple items to the end of the DataProvider and dispatches a CollectionEvent.ADD event.
     *
     * @param {any} items
     *
     * @memberOf ArrayCollection
     */
    addItems(items: Array<T>): void;
    /**
     * Adds several items to the data provider at the specified index and dispatches a CollectionEvent.ADD event.
     *
     * @param {any} items
     * @param {number} index
     *
     * @memberOf ArrayCollection
     */
    addItemsAt(items: Array<T>, index: number): void;
    /**
     * Creates a copy of the current ArrayCollection any.
     *
     * @returns {ArrayCollection}
     *
     * @memberOf ArrayCollection
     */
    clone(): ArrayCollection<T>;
    /**
    * Creates a copy of the current ArrayCollection any.
    *
    * @returns {Array}
    *
    * @memberOf ArrayCollection
    */
    copy(array: any[]): any[];
    /**
     * Concatenates the specified items to the end of the current data provider.
     *
     * @param {any} items
     *
     * @memberOf ArrayCollection
     */
    concat(items: Array<T>): void;
    /**
     * Returns the item at the specified index.
     *
     * @param {number} index
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    getItemAt(index: number): any;
    /**
     *  Returns the index of the specified item.
     *
     * @param {any} item
     * @returns {number}
     *
     * @memberOf ArrayCollection
     */
    getItemIndex(item: T): number;
    /**
     * Invalidates all the data items that the DataProvider contains and dispatches a CollectionEvent.INVALIDATE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    invalidate(): void;
    /**
     * Invalidates the specified item.
     *
     * @param {any} item
     *
     * @memberOf ArrayCollection
     */
    /**
     * Invalidates the item at the specified index.
     *
     * @param {int} index
     *
     * @memberOf ArrayCollection
     */
    /**
     * Appends the specified data into the data that the data provider contains and removes any duplicate items.
     *
     * @param {Array} newData
     *
     * @memberOf ArrayCollection
     */
    merge(newData: Array<T>): void;
    /**
     * Removes all items from the data provider and dispatches a CollectionEvent.REMOVE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    removeAll(): void;
    /**
     * Removes the specified item from the data provider and dispatches a CollectionEvent.REMOVE event.
     *
     * @param {any} item
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    removeItem(item: T): boolean;
    /**
     * Removes the item at the specified index and dispatches a CollectionEvent.REMOVE event.
     *
     * @param {number} index
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    removeItemAt(index: number): boolean;
    /**
     * Replaces an existing item with a new item and dispatches a CollectionEvent.REPLACE event.
     *
     * @param {any} newItem
     * @param {any} oldItem
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    replaceItem(newItem: any, oldItem: any): any;
    /**
     * Replaces the item at the specified index and dispatches a CollectionEvent.REPLACE event.
     *
     * @param {any} newItem
     * @param {number} index
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    replaceItemAt(newItem: any, index: number): any;
    /**
     * Sorts the items that the data provider contains and dispatches a CollectionEvent.SORT event.
     *
     * @param {any} sortArgs
     * @returns null
     *
     * @memberOf ArrayCollection
     */
    sort: Array<any>;
    /**
     * Sorts the items that the data provider contains by the specified field and dispatches a CollectionEvent.SORT event.
     *
     * @param {any} fieldName
     * @param {any} [options=null]
     * @returns null
     *
     * @memberOf ArrayCollection
     */
    sortOn(fieldName: any, reverse?: boolean): Array<T>;
    filter: any;
    filterOn(fieldName: any, value?: any): Array<T>;
    onDataChange(event: CollectionEvent): void;
    refresh(): void;
    /**
     * Creates an Array any representation of the data that the data provider contains.
     *
     * @returns {Array}
     *
     * @memberOf ArrayCollection
     */
    toArray(): Array<T>;
    toJSON(): T[];
}
