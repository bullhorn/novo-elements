import { Observable } from 'rxjs';
import { IDataTableFilter, IDataTableService, IDataTableSort } from '../interfaces';

export abstract class RemoteDataTableService<T> implements IDataTableService<T> {
  abstract getTableResults(
    sort: IDataTableSort,
    filter: IDataTableFilter | IDataTableFilter[],
    page: number,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
    advancedFilter?: any,
    where?: string,
  ): Observable<{ results: T[]; total: number }>;
}
