import { Observable, of } from 'rxjs';
import { Helpers } from '../../../utils/Helpers';
import { IDataTableFilter, IDataTableService, IDataTableSort } from '../interfaces';

export class StaticDataTableService<T> implements IDataTableService<T> {
  originalData: T[];

  constructor(private currentData: T[] = []) {
    this.originalData = [...currentData];
  }

  public getTableResults(
    sort: IDataTableSort,
    filter: IDataTableFilter | IDataTableFilter[],
    page: number = 0,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
    where?: { query: string; form: any },
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
        this.currentData = this.filterData(this.currentData, filter);
        total = this.currentData.length;
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
    return of({ results: this.currentData, total });
  }

  public filterData(currentData: T[], filter: IDataTableFilter | IDataTableFilter[]): T[] {
    const filters = Helpers.convertToArray(filter);
    filters.forEach((aFilter) => {
      if (Array.isArray(aFilter.value)) {
        const values = Helpers.convertToArray(aFilter.value).map(Helpers.escapeString);
        currentData = currentData.filter(Helpers.filterByField(aFilter.id, values));
      } else {
        const value = Helpers.escapeString(aFilter.value);
        currentData = currentData.filter(Helpers.filterByField(aFilter.id, value));
      }
    });
    return currentData;
  }
}
