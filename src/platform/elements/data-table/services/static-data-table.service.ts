import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'; // TODO - new RXJS

import { IDataTableService } from '../interfaces';
import { Helpers } from '../../../utils/Helpers';

export class StaticDataTableService<T> implements IDataTableService<T> {
  constructor(private data: T[] = []) {}

  public getTableResults(
    sort: { id: string; value: string; transform?: Function },
    filter: { id: string; value: string; transform?: Function },
    page: number = 0,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
  ): Observable<{ results: T[]; total: number }> {
    let ret: T[] = [...this.data];
    if (ret.length !== 0) {
      if (globalSearch) {
        ret = ret.filter((item) => Object.keys(item).some((key) => `${item[key]}`.toLowerCase().includes(globalSearch.toLowerCase())));
      }
      if (filter) {
        let value = Helpers.isString(filter.value) ? filter.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : filter.value;
        ret = ret.filter(Helpers.filterByField(filter.id, value));
      }
      if (sort) {
        ret = ret.sort(Helpers.sortByField(sort.id, sort.value === 'desc'));
      }
      if (!Helpers.isBlank(page) && !Helpers.isBlank(pageSize)) {
        ret = ret.slice(page * pageSize, (page + 1) * pageSize);
      }
    }
    return Observable.of({ results: ret, total: this.data.length });
  }
}
