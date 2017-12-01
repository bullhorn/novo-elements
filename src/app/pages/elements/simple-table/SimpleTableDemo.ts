import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

let StaticDemoTpl = require('./templates/static.html');
let RemoteDemoTpl = require('./templates/remote.html');
let CustomFilterDemoTPl = require('./templates/custom-filter.html');

import {
    NovoSortFilter, NovoSelection, NovoActivityTable, SimpleTableColumn,
    RemoteActivityTableService, ActivityTableDataSource, StaticActivityTableService,
    SimpleTableActionColumn, ActivityTableRenderers, SimpleTablePaginationOptions,
    SimpleTableSearchOptions, GroupedMultiPickerResults
} from '../../../../platform/index';

const template = `
<div class="container">
    <h1>Activity Table <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/simple-table">(source)</a></small></h1>
    <p>This table is a very opinionated table that has pagination and sorting/filtering a certain way.</p>
    <p>It is meant to be super easy to use and setup but not that customizable. If you need extra customization then look at Table.</p>

    <h5>Static Data Source</h5>
    <div class="example activity-table-demo">${StaticDemoTpl}</div>
    <code-snippet [code]="StaticDemoTpl"></code-snippet>

    <h5>Remote Data Source</h5>
    <div class="example activity-table-demo">${RemoteDemoTpl}</div>
    <code-snippet [code]="RemoteDemoTpl"></code-snippet>

    <h5>Custom Filter</h5>
    <div class="example activity-table-demo">${CustomFilterDemoTPl}</div>
    <code-snippet [code]="CustomFilterDemoTPl"></code-snippet>
</div>
`;

interface MockData {
    id: number;
    name: string;
    status: string;
    date: number;
    money: string;
}

@Component({
    selector: 'simple-table-demo',
    template: template,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleTableDemoComponent implements OnInit {
    public StaticDemoTpl: string = StaticDemoTpl;
    public RemoteDemoTpl: string = RemoteDemoTpl;
    public CustomFilterDemoTPl: string = CustomFilterDemoTPl;

    public staticDatabase: StaticActivityTableService<MockData>;
    public remoteDatabase: RemoteActivityTableService<MockData>;
    public customFilterDatabase: RemoteActivityTableService<MockData>;
    public debug: boolean = false;
    public timePeriods = [
        { value: 'week', label: 'Week' },
        { value: 'custom', label: 'Custom Range' },
    ]
    public timePeriod: string = 'week';
    public pickerConfig: any;
    public pickerValue: any;
    public placeholder: string = 'Select something';

    public outsideFilter: EventEmitter<{ date: string, type: string }> = new EventEmitter<{ date: string, type: string }>()

    public columns: SimpleTableColumn<MockData>[] = [
        {
            id: 'id',
            label: 'ID',
            renderer: ActivityTableRenderers.propertyRenderer<MockData>('id'),
            config: {
                sortable: false,
                filterable: true
            }
        },
        {
            id: 'date',
            label: 'Date',
            renderer: ActivityTableRenderers.dateRenderer<MockData>('date'),
            config: {
                sortable: true,
                filterable: true,
                filterConfig: {
                    type: 'date'
                }
            }
        },
        {
            id: 'money',
            label: 'Money',
            renderer: ActivityTableRenderers.propertyRenderer<MockData>('money'),
            config: {
                sortable: true,
                filterable: true,
            }
        },
        {
            id: 'name',
            label: 'Name',
            renderer: ActivityTableRenderers.propertyRenderer<MockData>('name'),
            renderType: 'link',
            onClick: this.log.bind(this),
            config: {
                sortable: true,
                filterable: true
            }
        },
        {
            id: 'status',
            label: 'Status',
            renderer: ActivityTableRenderers.propertyRenderer<MockData>('status'),
            renderType: 'link',
            customClass: (row: MockData) => `status-${row.status.toLowerCase()}`,
            onClick: this.log.bind(this),
            config: {
                sortable: true,
                filterable: true,
                filterConfig: {
                    type: 'select',
                    options: ['New', 'Active', 'Archived']
                }
            }
        }
    ];
    public actionColumns: SimpleTableActionColumn<MockData>[] = [
        {
            id: 'preview',
            icon: 'preview',
            onClick: this.log.bind(this)
        },
        {
            id: 'edit',
            icon: 'edit',
            disabled: true,
            onClick: this.log.bind(this)
        },
        {
            id: 'actions',
            options: [
                { label: 'Action 1', onClick: this.log.bind(this) },
                { label: 'Action 2', onClick: this.log.bind(this), disabled: true },
                { label: 'Action 3', onClick: this.log.bind(this), disabledCheck: this.checkDisabled.bind(this) }
            ]
        }
    ]
    public displayedColumns = ['selection', 'actions', 'preview', ...this.columns.map(x => x.id), 'edit'];
    public paginationOptions: SimpleTablePaginationOptions = {
        pageSize: 10,
        pageSizeOptions: [10, 50, 100]
    };
    public searchOptions: SimpleTableSearchOptions = {
        placeholder: 'Search for things...',
        tooltip: 'HELLO'
    };
    public defaultSort: { id: string, value: string } = {
        id: 'id',
        value: 'asc'
    };

    private staticData: MockData[] = [];
    private selectedPicker: any;
    private selectedRange: any;

    constructor(private http: Http, private ref: ChangeDetectorRef) {
        let today = new Date();
        let mockStatuses = ['New', 'Active', 'Archived'];
        for (let i = 1; i <= 50; i++) {
            this.staticData.push({
                id: i,
                name: `Name ${i}`,
                date: today.getTime() - (1000 * 60 * 60 * 24 * i),
                status: mockStatuses[Math.floor(Math.random() * 3)],
                money: `$${Math.floor(Math.random() * 100)}`,
            });
        }
        setTimeout(() => {
            this.outsideFilter.emit({ date: '12/04/1987', type: 'week' });
        }, 5000);

        // Setup picker filter
        let categoryMap = new Map<string, { value: string, label: string, items: { value: string, label: string, filterValue: any }[] }>();
        for (let i = 0; i < 10; i++) {
            let items = [];
            for (let j = 0; j < 30; j++) {
                let filter = Math.random() >= 0.5;
                items.push({ value: `${i}-${j}`, label: `Category ${i} - Item ${j} - Filter ${filter}`, filterValue: filter });
            }
            categoryMap.set(`${i}`, { value: `${i}`, label: `Category ${i}`, items: items });
        }
        this.pickerConfig = {
            entityIcon: 'company',
            categoryMap: categoryMap,
            displayAll: true,
            customFilter: {
                field: 'filterValue',
                value: true,
                label: 'Custom Filter!'
            },
            resultsTemplate: GroupedMultiPickerResults
        };
    }

    public ngOnInit(): void {
        this.remoteDatabase = new RemoteMockDataService(this.http);
        this.customFilterDatabase = new StaticActivityTableService<MockData>([]);
        setTimeout(() => {
            this.staticDatabase = new StaticActivityTableService<MockData>(this.staticData);
            this.ref.markForCheck();
        }, 1000);
    }

    public log(data: MockData): void {
        console.log('CLICK', data); // tslint:disable-line
    }

    public checkDisabled(data: MockData): boolean {
        return data.status === 'New';
    }

    public refresh(table: NovoActivityTable<MockData>) {
        table.state.reset();
    }

    public loadNewData(): void {
        this.staticData = [];
        let today = new Date();
        let mockStatuses = ['New', 'Active', 'Archived'];
        for (let i = 1; i <= 100; i++) {
            this.staticData.push({
                id: i,
                name: `BOB ${i}`,
                date: today.getTime() - (1000 * 60 * 60 * 24 * i),
                status: mockStatuses[Math.floor(Math.random() * 3)],
                money: `$${Math.floor(Math.random() * 100)}`,
            });
        }
        this.staticDatabase = new StaticActivityTableService<MockData>(this.staticData);
        this.ref.markForCheck();
    }

    public toggleDebug(): void {
        this.debug = !this.debug;
    }

    public onRangeSelect(event): void {
        this.selectedRange = event;
        console.log('Date Filter:', event); // tslint:disable-line
        this.loadCustomFilterData();
    }

    public onPickerSelect(event: any): void {
        this.selectedPicker = event;
        console.log('Picker Filter:', event); // tslint:disable-line
        this.loadCustomFilterData();
    }

    private loadCustomFilterData() {
        console.log('LOADING DATA', this.selectedPicker, this.selectedRange); // tslint:disable-line
        if (this.selectedPicker && this.selectedPicker.value && this.selectedRange) {
            this.customFilterDatabase = undefined;
            setTimeout(() => {
                this.customFilterDatabase = new StaticActivityTableService<MockData>(this.staticData);
                this.ref.markForCheck();
            }, 3000);
        } else {
            this.customFilterDatabase = new StaticActivityTableService<MockData>([]);
            this.ref.markForCheck();
        }
    }
}

export class RemoteMockDataService extends RemoteActivityTableService<MockData> {
    constructor(private http: Http) {
        super();
    }

    public getTableResults(sort: { id: string, value: string }, filter: { id: string, value: string }, page: number, pageSize: number, globalSearch?: string): Observable<{ results: MockData[], total: number }> {
        return this.http.get('//novo-elements-mock.getsandbox.com/users')
            .map(response => response.json() as any)
            .map(results => { return { results: results, total: results.length } });
    }
}
