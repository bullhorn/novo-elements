import { EventEmitter } from '@angular/core';
import { CollectionEvent } from './CollectionEvent';

export interface Collection<T> {
    dataChange: EventEmitter<CollectionEvent>;
    length:number;
    total:number;
    source: Array<T>;
    filterData: Array<T>;
    list: Array<T>;
    filter:any;
    sort:Array<any>;

    isEmpty():boolean;
    hasErrors():boolean;
    isLoading():boolean;
    isFiltered():boolean;

    /**
     *  Adds the specified item to the end of the list.
     *  Equivalent to <code>addItemAt(item, length)</code>.
     *
     *  @param item The item to add.
     */
    addItem(item:T): void;
    /**
     *  Adds the item at the specified index.  
     *  The index of any item greater than the index of the added item is increased by one.  
     *  If the the specified index is less than zero or greater than the length
     *  of the list, a RangeError is thrown.
     *  @param item The item to place at the index.
     *  @param index The index at which to place the item.
     *  @throws RangeError if index is less than 0 or greater than the length of the list. 
     */
    addItemAt(item: T, index: number): void;

     /**
     *  Adds all of the items to the end of the list
     *  @param items The items to place at the end of the list.  
     */
    addItems(items:Array<T>):void;

    /**
     *  Gets the item at the specified index.
     *  @param index The index in the list from which to retrieve the item.
     *  @param prefetch An <code>number</code> indicating both the direction
     *  and number of items to fetch during the request if the item is
     *  not local.
     *  @return The item at that index, or <code>null</code> if there is none.
     *  @throws mx.collections.errors.ItemPendingError if the data for that index needs to be 
     *  loaded from a remote location.
     *  @throws RangeError if <code>index &lt; 0</code>
     *  or <code>index >= length</code>.
     */
    getItemAt(index: number, prefetch: number): Object;

    /**
     *  Returns the index of the item if it is in the list such that
     *  getItemAt(index) == item.
     *  @param item The item to find.
     *  @return The index of the item, or -1 if the item is not in the list.
     */
    getItemIndex(item: Object): number;

    /**
     *  Notifies the view that an item has been updated.  
     *  This is useful if the contents of the view do not implement 
     *  If a property is specified the view may be able to optimize its 
     *  notification mechanism.
     *  Otherwise it may choose to simply refresh the whole view.
     *
     *  @param item The item within the view that was updated.
     *  @param property The name of the property that was updated.
     *  @param oldValue The old value of that property. (If property was null,
     *  this can be the old value of the item.)
     *  @param newValue The new value of that property. (If property was null,
     *  there's no need to specify this as the item is assumed to be
     *  the new value.)
     */
    //itemUpdated(item: Object, property?: Object, oldValue?: Object, newValue?: Object): void;

    removeItem(item: T):boolean;
    /** 
     *  Removes all items from the list.
     */
    removeAll(): void;

    /**
     *  Removes the item at the specified index and returns it.  
     *  Any items that were after this index are now one index earlier.
     *  @param index The index from which to remove the item.
     *  @return The item that was removed.
     */
    removeItemAt(index: number): Object;

    /**
     *  Returns an Array that is populated in the same order as the IList
     *  implementation.
     *  This method can throw an ItemPendingError.
     *  @return The array.
     */
    toArray(): Array<any>;
}
