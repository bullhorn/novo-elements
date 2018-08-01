import { Observable } from 'rxjs';

import { IDataTableService } from '../interfaces';

export abstract class RemoteDataTableService<T> implements IDataTableService<T> {
  abstract getTableResults(
    sort: { id: string; value: string; transform?: Function },
    filter: { id: string; value: string; transform?: Function },
    page: number,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
  ): Observable<{ results: T[]; total: number }>;
}
