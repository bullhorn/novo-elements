import { Observable, of } from 'rxjs';

import { IDataTableFilter, IDataTableService } from '../interfaces';
import { Helpers } from '../../../utils/Helpers';

export class StaticDataTableService<T> implements IDataTableService<T> {
  originalData: T[];

  constructor(private currentData: T[] = []) {
    this.originalData = [...currentData];
  }

  public getTableResults(
    sort: { id: string; value: string; transform?: Function },
    filter: IDataTableFilter | IDataTableFilter[],
    page: number = 0,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
  ): Observable<{ results: T[]; total: number }> {
    this.currentData = [...this.originalData];
    let total: number = this.originalData.length;
    if (this.currentData.length !== 0) {
      if (globalSearch) {
        this.currentData = this.currentData.filter((item) =>
          Object.keys(item).some((key) => `${item[key]}`.toLowerCase().includes(globalSearch.toLowerCase())),
        );
        total = this.currentData.length;
      }
      if (filter) {
        let filters = Helpers.convertToArray(filter);
        filters.forEach((aFilter) => {
          if (Array.isArray(aFilter.value)) {
            let values = Helpers.convertToArray(aFilter.value).map((aValue) => {
              return Helpers.cleanIfString(aValue);
            });
            this.currentData = this.currentData.filter(Helpers.filterByField(aFilter.id, values));
          } else {
            let value = Helpers.cleanIfString(aFilter.value);
            this.currentData = this.currentData.filter(Helpers.filterByField(aFilter.id, value));
          }
          total = this.currentData.length;
        });
      }
      if (sort) {
        this.currentData = this.currentData.sort(Helpers.sortByField(sort.id, sort.value === 'desc'));
        total = this.currentData.length;
      }
      if (!sort && !filter && !globalSearch && !outsideFilter) {
        this.currentData = [...this.originalData];
      }
      if (!Helpers.isBlank(page) && !Helpers.isBlank(pageSize)) {
        this.currentData = this.currentData.slice(page * pageSize, (page + 1) * pageSize);
      }
    }
    return of({ results: this.currentData, total: total });
  }
}
