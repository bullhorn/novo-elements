// Ng
import { EventEmitter } from '@angular/core';
// App
//import { DataChangeEvent } from './DataChangeEvent';
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
    dataChange:EventEmitter = new EventEmitter();
    _page:number = 1;
    _pageSize:number = 25;
    _filter:any = {};
    _sort:any = {};

    constructor(collection:any = []) {
        this.collection = Array.isArray(collection) ? new ArrayCollection(collection) : collection;
    }

    get length() {
        return this.collection.length();
    }

    get list() {
        return this.list();
    }

    get page():number {
        return this._page;
    }
    set page(value:number) {
        this._page = value;
        this.collection.page(this._page).then(result => {
            this.dataChange.emit(result);
        });
    }

    get pageSize():number {
        return this._pageSize;
    }
    set pageSize(value:number) {
        this._pageSize = value;
        this.collection.pageSize(this._pageSize).then(result => {
            this.dataChange.emit(result);
        });
    }

    get filter():any {
        return this._filter;
    }
    set filter(value:number) {
        this._filter = value;
        this.collection.filter(this._filter).then(result => {
            this.dataChange.emit(result);
        });
    }

    get sort():any {
        return this._sort;
    }
    set sort(value:number) {
        this._sort = value;
        this.collection.filter(this._sort).then(result => {
            this.dataChange.emit(result);
        });
    }
 //----
    onChange(filters) {
        return this.collection.filter(filters);
        if (filters.length) {
            if (Helpers.isFunction(this.config.filtering)) {
                // Custom filter function on the table config
                this.modifiedRows = this.config.filtering(filters, this._rows.slice());
            } else {
                this.modifiedRows = this._rows.slice().filter(row => {
                    let matched;
                    for (const column of filters) {
                        if (column.match && Helpers.isFunction(column.match)) {
                            // Custom match function on the column
                            matched = column.match(row[column.name], column.filter);
                        } else if (Array.isArray(column.filter)) {
                            // The filters are an array (multi-select), check value
                            if (column.type && column.type === 'date' && column.filter.filter(fil => fil.range).length > 0) {
                                matched = column.filter.some(obj => {
                                    let start = obj.value ? new Date(obj.value.startDate).getTime() : 0;
                                    let end = obj.value ? new Date(obj.value.endDate).getTime() : 0;
                                    let isMatch = false;
                                    // Assumes row data contains a JS date object
                                    let date = row[column.name] instanceof Date ? row[column.name].getTime() : row[column.name];
                                    if (start !== 0 && end !== 0) {
                                        isMatch = (date >= start && date <= end);
                                    } else isMatch = true;
                                    return isMatch;
                                });
                            } else if (column.type && column.type === 'date') {
                                // It's a date, use the date difference
                                matched = column.filter.some(value => {
                                    let min = value.min;
                                    let max = value.max;
                                    let isMatch = false;
                                    let oneDay = 24 * 60 * 60 * 1000;
                                    // Assumes row data contains a JS date object
                                    let firstDate = row[column.name] instanceof Date ? row[column.name].getTime() : row[column.name];
                                    let secondDate = new Date();
                                    let difference = 0;
                                    try {
                                        difference = Math.round((firstDate - secondDate.getTime()) / oneDay);
                                    } catch (error) {
                                        throw new Error('Row data of type \'date\' must contain a JS date object or a timestamp as its value.', error);
                                    }
                                    if (typeof(min) !== 'undefined' && typeof(max) !== 'undefined') {
                                        isMatch = (difference >= min && difference <= max);
                                    } else if (typeof(min) !== 'undefined') {
                                        isMatch = difference >= min;
                                    } else if (typeof(max) !== 'undefined') {
                                        isMatch = difference <= max;
                                    }
                                    return isMatch;
                                });
                            } else {
                                let options = column.filter;
                                // We have an array of {value: '', labels: ''}
                                if (options[0].value || options[0].label) {
                                    options = column.filter.map(opt => opt.value);
                                }
                                // It's a list of options
                                matched = options.includes(row[column.name]);
                            }
                        } else if (Array.isArray(row[column.name])) {
                            // Value is an array
                            for (const value of row[column.name]) {
                                matched = value.match(new RegExp(column.filter, 'gi'));
                                if (!matched) break;
                            }
                        } else {
                            // Basic, value is just a string
                            matched = JSON.stringify((row[column.name] || '')).match(new RegExp(column.filter, 'gi'));
                        }
                        if (!matched) break;
                    }
                    return matched;
                });
            }
        } else {
            this.modifiedRows = this._rows.slice();
        }
    }

    onSortChange(newSortColumn) {
        this.currentSortColumn = newSortColumn;

        if (newSortColumn) {
            this.columns.map(column => {
                if (column.name !== newSortColumn.name) {
                    delete column.sort;
                }
                return false;
            });

            if (Helpers.isFunction(this.config.sorting)) {
                // Custom sort function on the table config
                this.modifiedRows = this.config.sorting(newSortColumn, this.modifiedRows);
            } else {
                this.modifiedRows.sort((previous, current) => {
                    const columnName = newSortColumn.name;
                    let first = previous[columnName] || '';
                    let second = current[columnName] || '';

                    // Custom compare function on the column
                    if (newSortColumn.compare && Helpers.isFunction(newSortColumn.compare)) {
                        return newSortColumn.compare(newSortColumn.sort, first, second);
                    }

                    if (Helpers.isString(first) && Helpers.isString(second)) {
                        // Basic strings
                        first = first.toLowerCase();
                        second = second.toLowerCase();
                    } else {
                        // Numbers
                        first = isNaN(Number(first)) ? first : Number(first);
                        second = isNaN(Number(second)) ? second : Number(second);
                    }

                    if (first > second) {
                        return newSortColumn.sort === 'desc' ? -1 : 1;
                    }
                    if (first < second) {
                        return newSortColumn.sort === 'asc' ? -1 : 1;
                    }
                    return 0;
                });
            }
        }
    }
}
