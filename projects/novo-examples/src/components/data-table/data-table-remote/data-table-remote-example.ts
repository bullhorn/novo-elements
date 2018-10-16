import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { delay } from 'rxjs/operators';
import * as dateFns from 'date-fns';
import { Subject, Observable, of } from 'rxjs';

import {
  IDataTableColumn,
  RemoteDataTableService,
  IDataTablePaginationOptions,
  IDataTableSearchOptions,
  NovoModalService,
  IDataTablePreferences,
} from 'novo-elements';

import { ConfigureColumnsModal, MockData } from '../extras';

/**
 * @title Remote Data Table Example
 */
@Component({
  selector: 'data-table-remote-example',
  templateUrl: 'data-table-remote-example.html',
  styleUrls: ['data-table-remote-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableRemoteExample {
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
      id: 'preview',
      type: 'action',
      enabled: true,
      handlers: {
        click: this.log.bind(this),
      },
      action: {
        icon: 'preview',
      },
    },
    {
      id: 'actions',
      type: 'action',
      label: 'Actions',
      enabled: true,
      action: {
        options: [
          { label: 'Action 1', handlers: { click: this.log.bind(this) } },
          { label: 'Action 2', handlers: { click: this.log.bind(this) }, disabled: true },
          { label: 'Action 3', handlers: { click: this.log.bind(this) }, disabledFunc: this.checkDisabled.bind(this) },
        ],
      },
    },
    {
      id: 'id',
      label: 'ID',
      enabled: true,
      type: 'text',
      filterable: {
        type: 'number',
      },
      sortable: true,
    },
    {
      id: 'telephone',
      label: 'Phone',
      type: 'link:tel',
      attributes: {
        target: '_blank',
      },
    },
    {
      id: 'email',
      label: 'Email',
      type: 'link:mailto',
      attributes: {
        target: '_blank',
      },
    },
    {
      id: 'address',
      label: 'Address',
      type: 'text',
      format: ['$city, $state', '$city', '$state'],
    },
    {
      id: 'embeddedObj',
      label: 'Embedded (hard)',
      enabled: true,
      format: ['$another.id', '$firstName $lastName'],
      type: 'link',
      handlers: {
        click: this.log.bind(this),
      },
      filterable: true,
    },
    {
      id: 'simpleEmbeddedObj',
      label: 'Embedded (simple)',
      enabled: true,
      format: '$id',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      id: 'date',
      label: 'Date',
      enabled: true,
      type: 'date',
      filterable: {
        type: 'date',
        allowCustomRange: true,
      },
      sortable: true,
    },
    {
      id: 'dateTime',
      label: 'DateTime',
      enabled: false,
      type: 'datetime',
    },
    {
      id: 'time',
      label: 'Time',
      enabled: false,
      type: 'time',
    },
    {
      id: 'money',
      label: 'Money',
      enabled: false,
      type: 'currency',
      filterable: true,
      sortable: true,
    },
    {
      id: 'percent',
      label: 'Percent',
      enabled: true,
      type: 'percent',
      filterable: true,
      sortable: true,
    },
    {
      id: 'name',
      label: 'Name',
      labelIcon: 'bull',
      enabled: true,
      type: 'text',
      template: 'custom',
    },
    {
      id: 'status',
      label: 'Status',
      enabled: true,
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      id: 'enabled',
      label: 'Enabled',
      enabled: true,
      type: 'text',
      sortable: true,
      filterable: {
        type: 'select',
        options: [{ value: true, label: 'True' }, { value: false, label: 'False' }],
      },
    },
    {
      id: 'edit',
      type: 'action',
      enabled: true,
      disabled: true,
      handlers: {
        click: this.log.bind(this),
      },
      action: {
        icon: 'edit',
      },
    },
  ];
  public sharedDisplayColumns = [
    'selection',
    'expand',
    'preview',
    'actions',
    'id',
    'date',
    'name',
    'telephone',
    'email',
    'simpleEmbeddedObj',
    'status',
    'percent',
    'embeddedObj',
    'edit',
  ];
  public sharedPaginationOptions: IDataTablePaginationOptions = {
    theme: 'standard',
    pageSize: 10,
    pageSizeOptions: [10, 50, 100, 250, 500],
  };
  public widePaginationOptions: IDataTablePaginationOptions = {
    theme: 'basic-wide',
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
  public refreshSubject: Subject<boolean> = new Subject();

  // Remote configuration
  public remoteService: RemoteDataTableService<MockData>;

  private staticDataSet1: MockData[] = [];

  constructor(private ref: ChangeDetectorRef, private modalService: NovoModalService) {
    for (let i = 0; i < 1000; i++) {
      let day = i < 500 ? dateFns.subDays(new Date(), i) : dateFns.addDays(new Date(), i - 500);
      this.staticDataSet1.push({
        id: i,
        embeddedObj: { id: i, test: `HMM ${i}`, another: { id: 777 } },
        simpleEmbeddedObj: { id: i },
        name: `(1) Name ${i}`,
        status: `(1) Status ${i}`,
        enabled: i % 2 === 0,
        date: day,
        dateTime: day,
        time: day,
        money: i + 10,
        percent: i / 100,
        telephone: '555-555-5555',
        email: 'test@google.com',
        address: { city: 'City', state: null },
      });
    }
    this.remoteService = new RemoteMockDataService([...this.staticDataSet1.slice(0, 10)]);
  }

  public switchPaginationType(type: 'basic' | 'standard') {
    this.sharedPaginationOptions = Object.assign({}, this.sharedPaginationOptions, { theme: type });
    this.ref.detectChanges();
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

  public configureColumns(): void {
    this.modalService
      .open(ConfigureColumnsModal, { columns: this.sharedColumns })
      .onClosed.then((columns: IDataTableColumn<MockData>[]) => {
        if (columns) {
          let enabledColumns = columns.filter((column: IDataTableColumn<MockData>) => column.enabled);
          this.sharedDisplayColumns = ['selection', 'expand', ...enabledColumns.map((column: IDataTableColumn<MockData>) => column.id)];
          this.ref.markForCheck();
        }
      });
  }

  public onPreferencesChanged(event: IDataTablePreferences): void {
    console.log('Preferences changed (persist manually):', event); // tslint:disable-line
  }

  public refresh(): void {
    this.refreshSubject.next();
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
    return of({ results: this.data, total: this.data.length }).pipe(delay(5000));
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
      return `'${values.join(`','`)}'`;
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
