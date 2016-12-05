// Ng
import { EventEmitter } from '@angular/core';
// App
import { DataSource } from './DataSource';
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
export class DataProvider {
    dataChange:EventEmitter<any> = new EventEmitter();
    _page:number = 1;
    _pageSize:number = 25;
    _filter:any = {};
    _sort:any = {};
    collection:DataSource;

    constructor(collection:any = []) {
        this.collection = Array.isArray(collection) ? new ArrayCollection(collection) : collection;
    }

    get length() {
        return this.collection.length;
    }

    get list() {
        return this.collection.list;
    }

    get page():number {
        return this._page;
    }
    set page(value:number) {
        this._page = value;
        this.collection.page(this._page, this._pageSize).then(result => {
            this.dataChange.emit(result);
        });
    }

    get pageSize():number {
        return this._pageSize;
    }
    set pageSize(value:number) {
        if (this._pageSize !== value) {
            this._pageSize = value;
            this.collection.page(this._page, this._pageSize).then(result => {
                this.dataChange.emit(result);
            });
        }
    }

    get filter():any {
        return this._filter;
    }
    set filter(value:any) {
        this._filter = value;
        this.collection.filter(this._filter)
            .then(() => this.collection.page(this._page, this._pageSize))
            .then(result => this.dataChange.emit(result));
    }

    get sort():any {
        return this._sort;
    }
    set sort(value:any) {
        this._sort = value;
        this.collection.sort(this._sort)
            .then(() => this.collection.page(this._page, this._pageSize))
            .then(result => this.dataChange.emit(result));
    }
}
