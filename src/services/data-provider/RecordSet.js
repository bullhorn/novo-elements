// Ng
import { EventEmitter } from '@angular/core';
// App
import { DataChangeEvent } from './DataChangeEvent';
import { ArrayCollection } from './ArrayCollection';

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
export class RecordSet extends ArrayCollection {
    added:EventEmitter = new EventEmitter();
    dataChange:EventEmitter = new EventEmitter();

    /**
     * Appends an item to the end of the data provider.
     *
     * @param {any} item
     *
     * @memberOf ArrayCollection
     */
    addItem(item:any):void {
        this.merge([item]);
    }

    _addItem(item:any):void {
        this.collection.push(item);
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
        this.collection.splice(index, 0, item);
    }

    /**
     *  Appends multiple items to the end of the DataProvider and dispatches a DataChangeEvent.ADD event.
     *
     * @param {any} items
     *
     * @memberOf ArrayCollection
     */
    addItems(items):void {
        this.merge(items);
        this.dataChange.emit(new DataChangeEvent(DataChangeEvent.ADD), items);
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
        let ref = this.collection.find(x => x.id === item.id);
        return this.collection.indexOf(ref);
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
    //invalidateItem(item:any):void {
        //do something
    //}

    /**
     * Invalidates the item at the specified index.
     *
     * @param {int} index
     *
     * @memberOf ArrayCollection
     */
    //invalidateItemAt(index:number):void {
        //do something
    //}

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
                this.replaceItem(obj);
            } else {
                this._addItem(obj);
            }
        }
    }
}
