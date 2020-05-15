import { Observable } from 'rxjs';

import { IDataTableSort, IDataTableFilter, IDataTableService } from '../interfaces';

export abstract class RemoteDataTableService<T> implements IDataTableService<T> {
  abstract getTableResults(
    sort: IDataTableSort,
    filter: IDataTableFilter | IDataTableFilter[],
    page: number,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
  ): Observable<{ results: T[]; total: number }>;
}
