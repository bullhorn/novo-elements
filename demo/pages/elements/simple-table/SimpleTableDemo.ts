// NG2
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Http } from '@angular/http';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import {
    NovoSortFilter, NovoSelection, NovoActivityTable, SimpleTableColumn,
    RemoteSimpleTableService, SimpleTableDataSource, StaticSimpleTableService,
    SimpleTableButtonColumn
} from '../../../../index';

interface MockData {
    id: number;
    name: string;
    status: string;
}

@Component({
    selector: 'simple-table-demo',
    template: require('./SimpleTableDemo.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleTableDemoComponent implements OnInit {
    exampleDatabase: StaticSimpleTableService<MockData>;
    dataSource: SimpleTableDataSource<MockData>;

    mockData: MockData[] = [];

    // TODO - some generic renderers
    columns: SimpleTableColumn<MockData>[] = [
        { id: 'id', label: 'ID', renderer: (row: MockData) => `${row.id}`, config: { sortable: true, filterable: true } },
        { id: 'name', label: 'Name', renderer: (row: MockData) => `${row.name}`, renderType: 'link', onClick: (row: MockData) => { console.log('CLICK', row) }, config: { sortable: true, filterable: true } },
        { id: 'status', label: 'Status', renderer: (row: MockData) => `${row.status}`, renderType: 'link', onClick: (row: MockData) => { console.log('CLICK', row) }, config: { sortable: true, filterable: true } }
    ];
    buttonColumns: SimpleTableButtonColumn<MockData>[] = [
        { icon: 'preview', onClick: (row: MockData) => { console.log('CLICK', row); } },
        { icon: 'edit', onClick: (row: MockData) => { console.log('CLICK', row); } },
    ]
    displayedColumns = ['selection', 'preview', ...this.columns.map(x => x.id), 'edit'];

    @ViewChild(NovoActivityTable) table: NovoActivityTable<MockData>;

    constructor(private http: Http) {
        for (let i = 0; i < 100; i++) {
            this.mockData.push({
                id: i,
                name: `Name ${i}`,
                status: `Status ${i}`
            });
        }
    }

    ngOnInit() {
        this.exampleDatabase = new StaticSimpleTableService<MockData>(this.mockData);
        this.dataSource = new SimpleTableDataSource<MockData>(this.exampleDatabase, this.table, this.table.sort, this.table.pagination);
    }
}

export class TestDao extends StaticSimpleTableService<MockData> {

}

export class ExampleHttpDao extends RemoteSimpleTableService<MockData> {
    constructor(private http: Http) {
        super();
    }

    getTableResults(sort: { id: string, value: string }, filter: { id: string, value: string }, page: number, pageSize: number): Observable<{ results: MockData[], total: number }> {
        console.log('S', sort, 'F', filter);
        const token = 'c4d3d053-295b-4cba-b6d9-a9c7e99fb5ac';
        let query = '&query=NOT%20(status%3A%22Archive%22)%20AND%20isDeleted%3Afalse'
        let url = `http://rohit-backend.bh-bos2.bullhorn.com:8181/rest-services/1hs/search/ClientContact?BhRestToken=${token}&fields=id,name,status&start=0&count=500&showTotalMatched=true`;
        if (sort) {
            url += `&sort=${sort.value === 'desc' ? '-' : ''}${sort.id}`
        }
        if (filter) {
            query += ` AND ${filter.id}:(${filter.value}*)`;
        }
        url += query;
        return this.http.get(url)
            .map(response => response.json() as any)
            .map(result => { return { results: result.data, total: result.total } });
    }
}
