import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { NovoSortFilter } from './sort';
import { SimpleTablePagination } from './pagination';
import { NovoActivityTable } from './table';
import { Helpers } from '../../utils/Helpers';

export interface ActivityTableService<T> {
    getTableResults(sort: { id: string, value: string }, filter: { id: string, value: string }, page: number, pageSize: number, globalSearch?: string): Observable<{ results: T[], total: number }>;
}

export abstract class RemoteActivityTableService<T> implements ActivityTableService<T> {
    abstract getTableResults(sort: { id: string, value: string }, filter: { id: string, value: string }, page: number, pageSize: number, globalSearch?: string): Observable<{ results: T[], total: number }>;
}

export class StaticActivityTableService<T> implements ActivityTableService<T> {
    constructor(private data: T[] = []) { }

    getTableResults(sort: { id: string, value: string }, filter: { id: string, value: string }, page: number, pageSize: number, globalSearch?: string): Observable<{ results: T[], total: number }> {
        console.log('S', sort, 'F', filter, 'P', page, pageSize, 'GS', globalSearch);
        let ret: T[] = Helpers.deepClone(this.data);
        if (ret.length !== 0) {
            if (globalSearch) {
                ret = ret.filter(item => Object.keys(item).some(key => `${item[key]}`.toLowerCase().includes(globalSearch.toLowerCase())));
            }
            if (filter) {
                ret = ret.filter(Helpers.filterByField(filter.id, filter.value));
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

export class ActivityTableDataSource<T> extends DataSource<T> {
    total = 0;
    loading = false;

    constructor(private tableService: ActivityTableService<T>, private table: NovoActivityTable<T>) {
        super();
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.table.sort.novoTableChange,
            this.table.pagination.pageChange,
            this.table.globalSearchChange
        ];
        return Observable.merge(...displayDataChanges)
            .startWith(null)
            .switchMap(() => {
                this.loading = true;
                return this.tableService.getTableResults(this.table.sort.currentSortColumn, this.table.sort.currentFilterColumn, this.table.pagination.page, this.table.pagination.pageSize, this.table.currentGlobalSearch);
            })
            .map((data: { results: T[], total: number }) => {
                this.loading = false;
                this.total = data.total;
                return data.results;
            })
            .catch(() => {
                this.loading = false;
                return Observable.of(null);
            });
    }

    disconnect() { }
}
