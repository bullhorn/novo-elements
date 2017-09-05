// NG2
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http } from "@angular/http";
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { NovoSortFilter, NovoSelection } from "../../../../index";

@Component({
    selector: 'simple-table-demo',
    template: require('./SimpleTableDemo.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleTableDemoComponent implements OnInit {
    exampleDatabase: ExampleHttpDao | null;
    dataSource: ExampleDataSource | null;

    columns = [
        { id: 'id', label: 'ID', renderer: (row: any) => `${row.id}`, config: { sortable: true, filterable: true } },
        { id: 'name', label: 'Name', renderer: (row: any) => `${row.name}`, config: { sortable: true, filterable: true } },
        { id: 'status', label: 'Status', renderer: (row: any) => `${row.status}`, config: { sortable: true, filterable: true } }
    ];
    displayedColumns = ['selection', ...this.columns.map(x => x.id)];

    // @ViewChild(MdPaginator) paginator: MdPaginator;
    @ViewChild(NovoSortFilter) sort: NovoSortFilter;
    @ViewChild(NovoSelection) selection: NovoSelection;

    constructor(private http: Http, private ref: ChangeDetectorRef) { }

    ngOnInit() {
        this.exampleDatabase = new ExampleHttpDao(this.http);
        this.dataSource = new ExampleDataSource(this.exampleDatabase!, this.sort, this.ref);
    }
}

export class ExampleHttpDao {
    constructor(private http: Http) { }

    getContacts(sort: { id: string, value: string }, filter: { id: string, value: string }, page: number): Observable<any> {
        console.log('S', sort, 'F', filter);
        const token = '7d0f35da-839d-4f16-8d67-78cd67a0affa';
        let query = '&query=NOT%20(status%3A%22Archive%22)%20AND%20isDeleted%3Afalse'
        let url = `http://optimus-backend.bh-bos2.bullhorn.com:8181/rest-services/1hs/search/ClientContact?BhRestToken=${token}&fields=id,name,status&start=0&count=500&showTotalMatched=true`;
        if (sort) {
            url += `&sort=${sort.value === 'desc' ? '-' : ''}${sort.id}`
        }
        if (filter) {
            query += ` AND ${filter.id}:(${filter.value}*)`;
        }
        url += query;
        return this.http.get(url)
            .map(response => response.json() as any)
            .map(result => result.data);
    }
}

export class ExampleDataSource extends DataSource<any> {
    resultsLength = 0;
    isLoadingResults = false;
    isRateLimitReached = false;

    constructor(private exampleDatabase: ExampleHttpDao, private sort: NovoSortFilter, private ref: ChangeDetectorRef) {
        super();
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.sort.novoTableChange
        ];
        return Observable.merge(...displayDataChanges)
            .startWith(null)
            .switchMap(() => {
                this.isLoadingResults = true;
                this.ref.markForCheck();
                return this.exampleDatabase.getContacts(this.sort.currentSortColumn, this.sort.currentFilterColumn, 0);
            })
            .map(data => {
                this.isLoadingResults = false;
                this.isRateLimitReached = false;
                this.resultsLength = data.length;
                this.ref.markForCheck();
                return data;
            })
            .catch(() => {
                this.isLoadingResults = false;
                this.isRateLimitReached = true;
                this.ref.markForCheck();
                return Observable.of(null);
            });
    }

    disconnect() { }
}
