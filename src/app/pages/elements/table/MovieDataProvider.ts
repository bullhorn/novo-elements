import { PagedArrayCollection, CollectionEvent } from './../../../../platform/index';

export class MovieDataProvider extends PagedArrayCollection<any> {
  // http://www.omdbapi.com/?s=Star&y=2016&plot=short&r=json&page=2
  totalResults = 0;
  pagesLoaded = 0;
  loading: boolean = false;

  constructor(source: Array<any> = []) {
    super(source);
    this.refresh();
  }

  isLoading(): boolean {
    return this.loading;
  }

  get total() {
    return this.totalResults;
  }

  get filter(): any {
    return this._filter;
  }

  set filter(value: any) {
    this._filter = value;
    this.pagesLoaded = 0;
    this.removeAll();
    this.refresh();
  }

  get sort(): Array<any> {
    return this._sort;
  }

  set sort(value: Array<any>) {
    this._sort = value;
    this.pagesLoaded = 0;
    this.removeAll();
    this.refresh();
  }

  loadMore() {
    if (this.filter && this.needMore()) {
      this.pagesLoaded++;
      let year = this.filter.Year || '';
      let search = this.filter.Title || 'Star';
      let type = this.filter.Type ? this.filter.Type : '';
      return fetch(`http://www.omdbapi.com/?s=${search}&y=${year}&type=${type}&plot=short&r=json&page=${this.pagesLoaded}`).then(
        (r: any) => {
          this.addItems(r.Search);
          this.totalResults = r.totalResults;
          return this.loadMore();
        },
      );
    }
    let start = (this.page - 1) * this.pageSize;
    let end = start + this.pageSize;
    let result = this.source.slice(start, end);
    this.loading = false;
    return Promise.resolve(result);
  }

  needMore(): boolean {
    let recordsNeeded = this.page * this.pageSize;
    return this.source.length < recordsNeeded;
  }

  refresh() {
    this.loading = true;
    this.filterData = this.source.slice();
    setTimeout(() => {
      this.loadMore().then((results: Array<any>) => {
        this.onDataChange(new CollectionEvent(CollectionEvent.CHANGE, results));
      });
    }, 1000);
  }
}
