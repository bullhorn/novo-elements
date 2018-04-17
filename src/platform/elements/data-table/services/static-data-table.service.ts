import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'; // TODO - new RXJS

import { IDataTableService } from '../interfaces';
import { Helpers } from '../../../utils/Helpers';

export class StaticDataTableService<T> implements IDataTableService<T> {
  originalData: T[];

  constructor(private currentData: T[] = []) {
    this.originalData = [...currentData];
  }

  public getTableResults(
    sort: { id: string; value: string; transform?: Function },
    filter: { id: string; value: string; transform?: Function },
    page: number = 0,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
  ): Observable<{ results: T[]; total: number }> {
    let ret: T[] = [];
    this.currentData = [...this.originalData];
    if (this.currentData.length !== 0) {
      if (globalSearch) {
        this.currentData = this.currentData.filter((item) =>
          Object.keys(item).some((key) => `${item[key]}`.toLowerCase().includes(globalSearch.toLowerCase())),
        );
      }
      if (filter) {
        let value = Helpers.isString(filter.value) ? filter.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : filter.value;
        this.currentData = this.currentData.filter(Helpers.filterByField(filter.id, value));
      }
      if (sort) {
        this.currentData = this.currentData.sort(Helpers.sortByField(sort.id, sort.value === 'desc'));
      }
      if (!sort && !filter && !globalSearch && !outsideFilter) {
        this.currentData = [...this.originalData];
      }
      if (!Helpers.isBlank(page) && !Helpers.isBlank(pageSize)) {
        ret = this.currentData.slice(page * pageSize, (page + 1) * pageSize);
      }
    }
    return Observable.of({ results: ret, total: this.currentData.length });
  }
}
