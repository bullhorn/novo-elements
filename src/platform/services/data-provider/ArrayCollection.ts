// Ng
import { EventEmitter } from '@angular/core';
// App
import { Collection } from './Collection';
import { CollectionEvent } from './CollectionEvent';
import { Helpers } from '../../utils/Helpers';

/**
 * Base Class for all Collection based data providers
 *
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
  dataChange: EventEmitter<CollectionEvent> = new EventEmitter<CollectionEvent>();
  source: Array<T> = [];
  editData: Array<T> = [];
  isEditing: boolean = false;
  filterData: Array<T> = [];
  _filter: any = {};
  _sort: Array<any> = [];

  constructor(source: Array<T> = []) {
    this.source = source;
    this.editData = this.copy(this.source);
    this.filterData = this.source.slice();
  }

  get length() {
    return this.filterData.length;
  }

  get total(): number {
    return this.filterData.length;
  }

  get list(): Array<T> {
    return this.filterData;
  }

  isEmpty(): boolean {
    return this.length <= 0 && !this.isLoading() && !this.hasErrors();
  }

  hasErrors(): boolean {
    return false;
  }

  isLoading(): boolean {
    return false;
  }

  isFiltered(): boolean {
    return Object.keys(this._filter).length > 0;
  }

  /**
   * Method to switch the isEditingflag for the data source
   */
  edit() {
    this.isEditing = true;
    this.editData = this.copy(this.source);
  }

  /**
   * Method to leave edit mode and reset source
   */
  undo() {
    this.isEditing = false;
    this.source = this.copy(this.editData);
    this.refresh();
  }

  /**
   * Method to leave edit mode and save editData
   */
  commit() {
    this.isEditing = false;
    this.source = this.filterData.slice();
    this.refresh();
  }

  /**
   * Appends an item to the end of the data provider.
   *
   * @param item
   *
   * @memberOf ArrayCollection
   */
  addItem(item: T): void {
    this.isEditing ? this.editData.push(item) : this.source.push(item);
    this.onDataChange(new CollectionEvent(CollectionEvent.ADD, [item]));
    this.refresh();
  }

  /**
   * Adds a new item to the data provider at the specified index.
   *
   * @param item
   * @param index
   *
   * @memberOf ArrayCollection
   */
  addItemAt(item: T, index: number): void {
    this.isEditing ? this.editData.splice(index, 0, item) : this.source.splice(index, 0, item);
    this.onDataChange(new CollectionEvent(CollectionEvent.ADD, [item]));
    this.refresh();
  }

  /**
   *  Appends multiple items to the end of the DataProvider and dispatches a CollectionEvent.ADD event.
   *
   * @param items
   *
   * @memberOf ArrayCollection
   */
  addItems(items: Array<T>): void {
    this.isEditing ? this.editData.push(...items) : this.source.push(...items);
    this.onDataChange(new CollectionEvent(CollectionEvent.ADD, items));
    this.refresh();
  }

  /**
   * Adds several items to the data provider at the specified index and dispatches a CollectionEvent.ADD event.
   *
   * @param items
   * @param index
   *
   * @memberOf ArrayCollection
   */
  addItemsAt(items: Array<T>, index: number): void {
    this.isEditing ? this.editData.splice(index, 0, ...items) : this.source.splice(index, 0, ...items);
  }

  /**
   * Creates a copy of the current ArrayCollection any.
   *
   * @memberOf ArrayCollection
   */
  clone(): ArrayCollection<T> {
    return new ArrayCollection(this.isEditing ? this.copy(this.editData) : this.copy(this.source));
  }

  /**
   * Creates a copy of the current ArrayCollection any.
   *
   * @memberOf ArrayCollection
   */
  copy(array: any[]): any[] {
    return Helpers.deepClone(array);
  }

  /**
   * Concatenates the specified items to the end of the current data provider.
   *
   * @param items
   *
   * @memberOf ArrayCollection
   */
  concat(items: Array<T>): void {
    this.addItems(items);
  }

  /**
   * Returns the item at the specified index.
   *
   * @param index
   *
   * @memberOf ArrayCollection
   */
  getItemAt(index: number): any {
    return this.isEditing ? this.editData[index] : this.source[index];
  }

  /**
   *  Returns the index of the specified item.
   *
   * @param item
   *
   * @memberOf ArrayCollection
   */
  getItemIndex(item: T): number {
    return this.isEditing ? this.editData.indexOf(item) : this.source.indexOf(item);
  }

  /**
   * Invalidates all the data items that the DataProvider contains and dispatches a CollectionEvent.INVALIDATE_ALL event.
   *
   * @memberOf ArrayCollection
   */
  invalidate(): void {
    this.onDataChange(new CollectionEvent(CollectionEvent.INVALIDATE_ALL));
  }

  /**
   * Invalidates the specified item.
   *
   * @param item
   *
   * @memberOf ArrayCollection
   */
  // invalidateItem(item:any):void {}

  /**
   * Invalidates the item at the specified index.
   *
   * @param index
   *
   * @memberOf ArrayCollection
   */
  // invalidateItemAt(index:number):void {}

  /**
   * Appends the specified data into the data that the data provider contains and removes any duplicate items.
   *
   * @param newData
   *
   * @memberOf ArrayCollection
   */
  merge(newData: Array<T>): void {
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
  removeAll(): void {
    this.source = [];
    this.editData = [];
    this.filterData = [];
    this.onDataChange(new CollectionEvent(CollectionEvent.REMOVE_ALL, []));
    this.refresh();
  }

  /**
   * Removes the specified item from the data provider and dispatches a CollectionEvent.REMOVE event.
   *
   * @param item
   *
   * @memberOf ArrayCollection
   */
  removeItem(item: T): boolean {
    let index = this.getItemIndex(item);
    return this.removeItemAt(index);
  }

  /**
   * Removes the item at the specified index and dispatches a CollectionEvent.REMOVE event.
   *
   * @param index
   *
   * @memberOf ArrayCollection
   */
  removeItemAt(index: number): boolean {
    let success = !!this.source.splice(index, 1);
    this.refresh();
    return success;
  }

  /**
   * Replaces an existing item with a new item and dispatches a CollectionEvent.REPLACE event.
   *
   * @param newItem
   * @param oldItem
   *
   * @memberOf ArrayCollection
   */
  replaceItem(newItem: any, oldItem: any): any {
    let index = this.getItemIndex(oldItem);
    if (index >= 0) {
      this.replaceItemAt(newItem, index);
    }
  }

  /**
   * Replaces the item at the specified index and dispatches a CollectionEvent.REPLACE event.
   *
   * @param newItem
   * @param index
   *
   * @memberOf ArrayCollection
   */
  replaceItemAt(newItem: any, index: number): any {
    this.filterData.splice(index, 1, newItem);
  }

  /**
   * Sorts the items that the data provider contains and dispatches a CollectionEvent.SORT event.
   *
   * @param sortArgs
   * @returns null
   *
   * @memberOf ArrayCollection
   */
  get sort(): Array<any> {
    return this._sort;
  }

  set sort(value: Array<any>) {
    this._sort = value;
    this.refresh();
  }

  /**
   * Sorts the items that the data provider contains by the specified field and dispatches a CollectionEvent.SORT event.
   *
   * @param fieldName
   * @param [options=null]
   * @returns null
   *
   * @memberOf ArrayCollection
   */
  sortOn(fieldName: any, reverse = false): Array<T> {
    this.filterData = this.filterData.sort(Helpers.sortByField(fieldName, reverse));
    this.onDataChange(new CollectionEvent(CollectionEvent.SORT));
    return this.filterData;
  }

  get filter(): any {
    return this._filter;
  }

  set filter(value: any) {
    this._filter = value;
    this.refresh();
  }

  filterOn(fieldName: any, value: any = null): Array<T> {
    this.filterData = this.filterData.filter(Helpers.filterByField(fieldName, value));
    return this.filterData;
  }

  onDataChange(event: CollectionEvent): void {
    this.dataChange.emit(event);
  }

  refresh(): void {
    this.filterData = this.isEditing ? this.editData.slice() : this.source.slice();
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
   * @memberOf ArrayCollection
   */
  toArray(): Array<T> {
    return this.isEditing ? this.editData : this.source;
  }

  toJSON() {
    return this.isEditing ? this.editData : this.source;
  }
}
