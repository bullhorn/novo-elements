export class CollectionEvent {
  static REFRESH: string = 'Collection.REFRESH';
  static ADD: string = 'Collection.ADD';
  static REMOVE: string = 'Collection.REMOVE';
  static REMOVE_ALL: string = 'Collection.REMOVE_ALL';
  static REPLACE: string = 'Collection.REPLACE';
  static INVALIDATE_ALL: string = 'Collection.INVALIDATE_ALL';
  static SORT: string = 'Collection.SORT';
  static FILTER: string = 'Collection.FILTER';
  static CHANGE: string = 'Collection.CHANGE';
  static CURRENTPAGE_CHANGE: string = 'Collection.CURRENTPAGE_CHANGE';
  static PAGESIZE_CHANGE: string = 'Collection.PAGESIZE_CHANGE';
  static NUMBEROFPAGES_CHANGE: string = 'Collection.NUMBEROFPAGES_CHANGE';

  type: string = '';
  data: Array<any> = [];

  constructor(type = 'Collection.REFRESH', data = []) {
    this.type = type;
    this.data = data;
  }
}
