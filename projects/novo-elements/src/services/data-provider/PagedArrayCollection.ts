import { EventEmitter } from '@angular/core';

import { ArrayCollection } from './ArrayCollection';
import { PagedCollection } from './PagedCollection';
import { CollectionEvent } from './CollectionEvent';

export class PagedArrayCollection<T> extends ArrayCollection<T> implements PagedCollection<T> {
  _page: number = 1;
  _numberOfPages: number = 1;
  _pageSize: number = 10;

  constructor(source: Array<T> = []) {
    super(source);
  }

  get numberOfPages(): number {
    let result: number = this.source.length / this.pageSize;
    result = Math.ceil(result);
    return result;
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
    this.refresh();
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
    this.refresh();
  }

  next(): number {
    if (this.page === this.numberOfPages) {
      return this.page;
    }
    this.page++;
    return this.page;
  }

  prev(): number {
    if (this._page === 1) {
      return this.page;
    }
    this.page--;
    return this.page;
  }

  first(): number {
    if (this.page === 1) {
      return this.page;
    }
    this.page = 1;
    return this.page;
  }

  last(): number {
    if (this.page === this.numberOfPages) {
      return this.page;
    }
    this.page = this.numberOfPages;
    return this.page;
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
    if (this.page >= 0) {
      let start = (this.page - 1) * this.pageSize;
      let end = start + this.pageSize;
      let result = this.filterData.slice(start, end);
      this.onDataChange(new CollectionEvent(CollectionEvent.CHANGE, result));
    } else {
      this.onDataChange(new CollectionEvent(CollectionEvent.CHANGE, this.filterData));
    }
  }
}
