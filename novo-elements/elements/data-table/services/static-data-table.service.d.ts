import { Observable } from 'rxjs';
import { IDataTableFilter, IDataTableService, IDataTableSort } from '../interfaces';
export declare class StaticDataTableService<T> implements IDataTableService<T> {
    private currentData;
    originalData: T[];
    constructor(currentData?: T[]);
    getTableResults(sort: IDataTableSort, filter: IDataTableFilter | IDataTableFilter[], page: number, pageSize: number, globalSearch?: string, outsideFilter?: any, where?: {
        query: string;
        form: any;
    }): Observable<{
        results: T[];
        total: number;
    }>;
    filterData(currentData: T[], filter: IDataTableFilter | IDataTableFilter[]): T[];
}
