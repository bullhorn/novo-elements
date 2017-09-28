import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { NovoSortFilter } from './sort';
import { NovoSimpleTablePagination } from './pagination';
import { NovoActivityTableState } from './state';
import { Helpers } from '../../utils/Helpers';

export interface ActivityTableService<T> {
    getTableResults(sort: { id: string, value: string }, filter: { id: string, value: string }, page: number, pageSize: number, globalSearch?: string): Observable<{ results: T[], total: number }>;
}

export abstract class RemoteActivityTableService<T> implements ActivityTableService<T> {
    abstract getTableResults(sort: { id: string, value: string }, filter: { id: string, value: string }, page: number, pageSize: number, globalSearch?: string): Observable<{ results: T[], total: number }>;
}

export class StaticActivityTableService<T> implements ActivityTableService<T> {
    constructor(private data: T[] = []) { }

    public getTableResults(sort: { id: string, value: string }, filter: { id: string, value: string }, page: number, pageSize: number, globalSearch?: string): Observable<{ results: T[], total: number }> {
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
    public total = 0;
    public current = 0;
    public loading = false;

    get totallyEmpty(): boolean {
        return this.total === 0;
    }

    get currentlyEmpty(): boolean {
        return this.current === 0;
    }

    constructor(private tableService: ActivityTableService<T>, private state: NovoActivityTableState, private ref: ChangeDetectorRef) {
        super();
    }

    public connect(): Observable<any[]> {
        const displayDataChanges: any = [
            this.state.updates
        ];
        return Observable.merge(...displayDataChanges)
            .startWith(null)
            .switchMap(() => {
                this.loading = true;
                return this.tableService.getTableResults(this.state.sort, this.state.filter, this.state.page, this.state.pageSize, this.state.globalSearch);
            })
            .map((data: { results: T[], total: number }) => {
                this.loading = false;
                this.total = data.total;
                this.current = data.results.length;
                setTimeout(() => {
                    this.ref.markForCheck();
                });
                return data.results;
            })
            .catch((error) => {
                console.error(error); // tslint: disable-line
                this.loading = false;
                return Observable.of(null);
            });
    }

    public disconnect(): void { }
}
