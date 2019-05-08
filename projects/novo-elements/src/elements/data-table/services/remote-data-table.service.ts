import { Observable } from 'rxjs';

import { IDataTableFilter, IDataTableService } from '../interfaces';

export abstract class RemoteDataTableService<T> implements IDataTableService<T> {
  abstract getTableResults(
    sort: { id: string; value: string; transform?: Function },
    filter: IDataTableFilter | IDataTableFilter[],
    page: number,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
  ): Observable<{ results: T[]; total: number }>;
}
