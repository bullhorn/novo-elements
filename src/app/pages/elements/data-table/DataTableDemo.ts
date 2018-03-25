import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';
import * as dateFns from 'date-fns';

let BasicDemoRowsTpl = require('./templates/basic-rows.html');
let BasicDemoServiceTpl = require('./templates/basic-service.html');
let RemoteDemoServiceTpl = require('./templates/basic-remote.html');

import {
  IDataTableColumn,
  RemoteDataTableService,
  IDataTableSortFilter,
  StaticDataTableService,
  IDataTablePaginationOptions,
  IDataTableSearchOptions,
  IDataTableService,
  GroupedMultiPickerResults,
} from '../../../../platform/index';

const template = `
<div class="container">
  <h1>Data Table <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/data-table">(source)</a></small></h1>

    <h5>Working with static data</h5>

    <h6>Change Dataset</h6>
    <novo-tiles [options]="dataSetOptions" (onChange)="loadDataset($event)" [(ngModel)]="loadedDataSet"></novo-tiles>
    <h6>Change Pagination Style</h6>
    <novo-tiles [options]="paginationTypeOptions" (onChange)="switchPaginationType($event)" [(ngModel)]="loadedPaginationType"></novo-tiles>
    <h6>Toggle Global Search</h6>
    <novo-tiles [options]="globalSearchOptions" (onChange)="toggleGlobalSearch($event)" [(ngModel)]="loadedGlobalSearch"></novo-tiles>

    <br/>
    <br/>

    <h5>Passing an array of rows</h5>
    <div class="example data-table-demo">${BasicDemoRowsTpl}</div>
    <code-snippet [code]="BasicDemoRowsTpl"></code-snippet>

    <h5>Using the static data service</h5>
    <div class="example data-table-demo">${BasicDemoServiceTpl}</div>
    <code-snippet [code]="BasicDemoServiceTpl"></code-snippet>

    <h5>Working with remote data</h5>

    <h5>Using the remote data service</h5>
    <p>Data won't actually change, the URL will update with the proper request it will make!</p>
    <h6>URL: {{ remoteService.url }}</h6>
    <div class="example data-table-demo">${RemoteDemoServiceTpl}</div>
    <code-snippet [code]="RemoteDemoServiceTpl"></code-snippet>
</div>
`;

interface MockData {
  id: number;
  embeddedObj: { id: number };
  name: string;
  status: string;
  enabled: boolean;
  date: Date;
  dateTime: Date;
  time: Date;
  money: number;
}

@Component({
  selector: 'data-table-demo',
  template: template,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableDemoComponent implements OnInit {
  public BasicDemoRowsTpl: string = BasicDemoRowsTpl;
  public BasicDemoServiceTpl: string = BasicDemoServiceTpl;
  public RemoteDemoServiceTpl: string = RemoteDemoServiceTpl;

  // Table configuration
  public dataSetOptions: any[] = [{ label: 'Dataset #1', value: 1 }, { label: 'Dataset #2', value: 2 }, { label: 'Dataset #3', value: 3 }];
  public loadedDataSet: number = 1;
  public paginationTypeOptions: any[] = [{ label: 'Standard', value: 'standard' }, { label: 'Basic', value: 'basic' }];
  public loadedPaginationType: string = 'standard';
  public globalSearchOptions: any[] = [{ label: 'Show', value: true }, { label: 'Hide', value: false }];
  public loadedGlobalSearch: boolean = false;

  // Shared configuration
  public sharedColumns: IDataTableColumn<MockData>[] = [
    {
      id: 'id',
      label: 'ID',
      type: 'string',
      filterable: true,
      sortable: true,
    },
    {
      id: 'embeddedObj',
      label: 'Embedded',
      property: 'embeddedObj.id',
      type: 'link',
      handlers: {
        click: this.log.bind(this),
      },
      filterable: true,
      sortable: true,
    },
    {
      id: 'date',
      label: 'Date',
      type: 'date',
      filterable: {
        type: 'date',
      },
      sortable: true,
    },
    {
      id: 'dateTime',
      label: 'DateTime',
      type: 'datetime',
    },
    {
      id: 'time',
      label: 'Time',
      type: 'time',
    },
    {
      id: 'money',
      label: 'Money',
      type: 'currency',
      filterable: true,
      sortable: true,
    },
    {
      id: 'name',
      label: 'Name',
      type: 'string',
      template: 'custom',
    },
    {
      id: 'status',
      label: 'Status',
      type: 'string',
      filterable: true,
      sortable: true,
    },
    {
      id: 'enabled',
      label: 'Enabled',
      type: 'string',
      sortable: true,
      filterable: {
        type: 'select',
        options: [{ value: true, label: 'True' }, { value: false, label: 'False' }],
      },
    },
    {
      id: 'preview',
      type: 'action',
      handlers: {
        click: this.log.bind(this),
      },
      action: {
        icon: 'preview',
      },
    },
    {
      id: 'edit',
      type: 'action',
      disabled: true,
      handlers: {
        click: this.log.bind(this),
      },
      action: {
        icon: 'edit',
      },
    },
    {
      id: 'actions',
      type: 'action',
      action: {
        options: [
          { label: 'Action 1', handlers: { click: this.log.bind(this) } },
          { label: 'Action 2', handlers: { click: this.log.bind(this) }, disabled: true },
          { label: 'Action 3', handlers: { click: this.log.bind(this) }, disabledFunc: this.checkDisabled.bind(this) },
        ],
      },
    },
  ];
  public sharedDisplayColumns = [
    'selection',
    'preview',
    'actions',
    'id',
    'name',
    'status',
    'embeddedObj',
    'date',
    'dateTime',
    'time',
    'money',
    'edit',
  ];
  public sharedPaginationOptions: IDataTablePaginationOptions = {
    theme: 'standard',
    pageSize: 10,
    pageSizeOptions: [10, 50, 100, 250, 500],
  };
  public sharedSearchOptions: IDataTableSearchOptions = {
    placeholder: 'Search for things...',
    tooltip: 'HELLO',
  };
  public sharedDefaultSort: { id: string; value: string } = {
    id: 'id',
    value: 'asc',
  };
  public globalSearchEnabled: boolean = false;

  // Basic configuration
  public basicRows: MockData[];
  public basicService: IDataTableService<MockData>;
  // Remote configuration
  public remoteService: RemoteDataTableService<MockData>;

  private staticDataSet1: MockData[] = [];
  private staticDataSet2: MockData[] = [];
  private staticDataSet3: MockData[] = [];

  constructor(private ref: ChangeDetectorRef) {
    for (let i = 0; i < 1000; i++) {
      let day = i < 500 ? dateFns.subDays(new Date(), i) : dateFns.addDays(new Date(), i - 500);
      this.staticDataSet1.push({
        id: i,
        embeddedObj: { id: i },
        name: `(1) Name ${i}`,
        status: `(1) Status ${i}`,
        enabled: i % 2 === 0,
        date: day,
        dateTime: day,
        time: day,
        money: i + 10,
      });
      this.staticDataSet2.push({
        id: i + 1001,
        embeddedObj: { id: i },
        name: `(2) Name ${i}`,
        status: `(2) Status ${i}`,
        enabled: i % 2 === 0,
        date: day,
        dateTime: day,
        time: day,
        money: i + 10,
      });
    }
    this.basicRows = [...this.staticDataSet1];
    this.basicService = new StaticDataTableService([...this.staticDataSet1]);
    this.remoteService = new RemoteMockDataService([...this.staticDataSet1]);
  }

  public ngOnInit(): void {}

  public switchPaginationType(type: 'basic' | 'standard') {
    this.sharedPaginationOptions = Object.assign({}, this.sharedPaginationOptions, { theme: type });
    this.ref.detectChanges();
  }

  public loadDataset(setIndex: number) {
    switch (setIndex) {
      case 1:
        this.basicRows = [...this.staticDataSet1];
        this.basicService = new StaticDataTableService([...this.staticDataSet1]);
        break;
      case 2:
        this.basicRows = [...this.staticDataSet2];
        this.basicService = new StaticDataTableService([...this.staticDataSet2]);
        break;
      case 3:
        this.basicRows = [...this.staticDataSet3];
        this.basicService = new StaticDataTableService([...this.staticDataSet3]);
        break;
      default:
        break;
    }
  }

  public toggleGlobalSearch(toggle: boolean): void {
    this.globalSearchEnabled = toggle;
    this.ref.detectChanges();
  }

  public log(event: { originalEvent: MouseEvent; row: MockData }): void {
    console.log('[DataTable] Event Triggered!', event); // tslint:disable-line
  }

  public checkDisabled(row: MockData): boolean {
    return true;
  }
}

class RemoteMockDataService extends RemoteDataTableService<MockData> {
  public url: string;

  constructor(private data: MockData[]) {
    super();
  }

  public getTableResults(
    sort: { id: string; value: string; transform?: Function },
    filter: { id: string; value: string; transform?: Function },
    page: number,
    pageSize: number,
    globalSearch?: string,
  ): Observable<{ results: MockData[]; total: number }> {
    let whereQuery: string = this.buildWhereClause(filter);
    let sortQuery: string = this.buildSortColumn(sort);
    let pageQuery: number = this.buildStart(page, pageSize);
    this.url = `http://mock-api.com?where=${whereQuery}&sort=${sortQuery}&pageSize=${pageSize}&page=${pageQuery}`;
    return Observable.of({ results: this.data, total: this.data.length }).pipe(delay(5000));
  }

  private buildWhereClause(filter: { id: string; value: string; transform?: Function }): string {
    let query: any = {};
    if (filter) {
      query[filter.id] = filter.transform ? filter.transform(filter.value) : filter.value;
    }
    return this.toQuerySyntax(query);
  }

  private buildSortColumn(sort: { id: string; value: string; transform?: Function }): string {
    if (sort) {
      let value = sort.id;
      if (sort.transform) {
        value = sort.transform(value);
      }
      return sort.value === 'asc' ? value : `-${value}`;
    }
    return '';
  }

  private buildStart(page: number, pageSize: number): number {
    return (page || 0) * pageSize;
  }

  private toQuerySyntax(data: any) {
    let queries: Array<string> = [];
    for (let key in data) {
      let value = data[key];
      if (key === 'or') {
        queries.push(`(${this.toQuerySyntax(value).replace(/ AND /g, ' OR ')})`);
      } else {
        queries.push(this.parseQueryValue(key, value));
      }
    }

    return queries.join(' AND ');
  }

  private parseQueryValue(key: string, value: any, isNot: boolean = false) {
    let clauses: Array<string> = [],
      IN = isNot ? ' NOT IN ' : ' IN ',
      EQ = isNot ? '<>' : '=',
      GT = isNot ? '<' : '>=',
      LT = isNot ? '>=' : '<';
    if (Array.isArray(value)) {
      clauses.push(`${key}${IN}(${this.writeQueryValues(value)})`);
    } else if (value instanceof Object) {
      if (typeof value.isNull === 'boolean') {
        let query: string = value.isNull ? 'IS NULL' : 'IS NOT NULL';
        clauses.push(`${key} ${query}`);
      }
      if (value.min !== null && value.min !== undefined) {
        clauses.push(`${key}${GT}${this.writeQueryValue(value.min)}`);
      }
      if (value.max !== null && value.max !== undefined) {
        clauses.push(`${key}${LT}${this.writeQueryValue(value.max)}`);
      }
      if (value.any && Array.isArray(value.any)) {
        clauses.push(`${key}${IN}(${this.writeQueryValues(value.any)})`);
      }
      if (value.all && Array.isArray(value.all)) {
        clauses.push(`${key}${IN}(${this.writeQueryValues(value.all)})`);
      }
      if (value.not !== null && value.not !== undefined) {
        clauses.push(this.parseQueryValue(key, value.not, true));
      }
      if (value.like !== null && value.like !== undefined) {
        clauses.push(`${key} like '%${value.like}%'`);
      }
      if (value.lookup !== null && value.lookup !== undefined) {
        let obj = {};
        obj[key] = value.lookup;
        clauses.push(this.toQuerySyntax(obj));
      }
      if (value.with !== null && value.with !== undefined) {
        clauses.push(`${key} IS NOT EMPTY`);
      }
      if (value.without !== null && value.without !== undefined) {
        clauses.push(`${key} IS EMPTY`);
      }
      if (value.or !== null && value.or !== undefined) {
        let obj = {};
        obj[key] = value.or;
        clauses.push(this.toQuerySyntax(obj).replace('AND', 'OR'));
      }
      for (let subkey in value) {
        if (['min', 'max', 'any', 'all', 'not', 'or', 'like', 'lookup', 'with', 'without', 'isNull'].indexOf(subkey) < 0) {
          let subvalue = value[subkey];
          clauses.push(this.parseQueryValue(`${key}.${subkey}`, subvalue));
        }
      }
    } else {
      clauses.push(`${key}${EQ}${this.writeQueryValue(value)}`);
    }

    return clauses.join(' AND ');
  }

  private writeQueryValues(values) {
    if (typeof values[0] === 'number' || typeof values[0] === 'boolean') {
      return `${values.join(',')}`;
    } else {
      return `'${values.join("','")}'`;
    }
  }

  private writeQueryValue(value) {
    if (value instanceof Date) {
      return value.getTime();
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      return `${value}`;
    } else {
      return `'${value.replace(/\*/g, '')}'`;
    }
  }
}
