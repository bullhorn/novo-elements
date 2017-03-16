// Ng
import { EventEmitter } from '@angular/core';
// App
import { Collection } from './Collection';
import { CollectionEvent } from './CollectionEvent';
import { ArrayCollection } from './ArrayCollection';
import { Helpers } from '../../utils/Helpers';

/**
 * Editable class for toggling between two data sources allowing the ability to edit one while keeping one 'clean'
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
export class EditableArrayCollection<T> extends ArrayCollection<T> implements Collection<T> {
    sourceCache: Array<T> = [];
    isEditing: boolean = false;

    constructor(source: Array<T> = []) {
        super(source);
        this.sourceCache = this.source;
    }

    enterEditMode() {
        this.isEditing = true;
    }

    leaveEditMode() {
        this.isEditing = false;
    }

    cancelEditMode() {
        this.leaveEditMode();
        this.source = this.sourceCache;
        this.refresh();
    }

    /**
     * Appends an item to the end of the data provider.
     *
     * @param {any} item
     *
     * @memberOf ArrayCollection
     */
    addItem(item: T): void {
        this.isEditing ? this.sourceCache.push(item) : this.source.push(item);
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
    addItemAt(item: T, index: number): void {
        this.isEditing ? this.sourceCache.splice(index, 0, item) : this.source.splice(index, 0, item);
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
    addItems(items: Array<T>): void {
        this.isEditing ? this.sourceCache.push(...items) : this.source.push(...items);
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
    addItemsAt(items: Array<T>, index: number): void {
        this.isEditing ? this.source.splice(index, 0, ...items) : this.source.splice(index, 0, ...items);
    }

    /**
     * Creates a copy of the current ArrayCollection any.
     *
     * @returns {ArrayCollection}
     *
     * @memberOf ArrayCollection
     */
    clone(): ArrayCollection<T> {
        return new ArrayCollection(this.isEditing ? this.sourceCache.slice() : this.source.slice());
    }

    /**
     * Returns the item at the specified index.
     *
     * @param {number} index
     * @returns {any}
     *
     * @memberOf ArrayCollection
     */
    getItemAt(index: number): any {
        return this.isEditing ? this.sourceCache[index] : this.source[index];
    }

    /**
     *  Returns the index of the specified item.
     *
     * @param {any} item
     * @returns {number}
     *
     * @memberOf ArrayCollection
     */
    getItemIndex(item: T): number {
        return this.isEditing ? this.sourceCache.indexOf(item) : this.source.indexOf(item);
    }

    /**
     * Removes all items from the data provider and dispatches a CollectionEvent.REMOVE_ALL event.
     *
     * @memberOf ArrayCollection
     */
    removeAll(): void {
        this.sourceCache = [];
        super.removeAll();
    }

    refresh(): void {
        this.filterData = this.isEditing ? this.sourceCache.slice() : this.source.slice();
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
    toArray(): Array<T> {
        return this.isEditing ? this.sourceCache : this.source;
    }

    toJSON() {
        return this.isEditing ? this.sourceCache : this.source;
    }
}
