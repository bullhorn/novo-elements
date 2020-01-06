import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as dateFns from 'date-fns';
import { Subject } from 'rxjs';

import {
  IDataTableColumn,
  StaticDataTableService,
  IDataTablePaginationOptions,
  IDataTableSearchOptions,
  IDataTableService,
  NovoModalService,
  IDataTablePreferences,
} from 'novo-elements';

import { ConfigureColumnsModal, MockData } from '../extras';

/**
 * @title Data Table Service Example
 */
@Component({
  selector: 'data-table-service-example',
  templateUrl: 'data-table-service-example.html',
  styleUrls: ['data-table-service-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableServiceExample {
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
      id: 'priority',
      label: 'Priority',
      enabled: true,
      type: 'text',
      filterable: {
        type: 'multi-select',
        options: this.getPriorityOptions(),
      },
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
    'priority',
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

  // Basic configuration
  public basicService: IDataTableService<MockData>;

  private staticDataSet1: MockData[] = [];
  private staticDataSet2: MockData[] = [];
  private staticDataSet3: MockData[] = [];

  constructor(private ref: ChangeDetectorRef, private modalService: NovoModalService) {
    for (let i = 0; i < 1000; i++) {
      const day = i < 500 ? dateFns.subDays(new Date(), i) : dateFns.addDays(new Date(), i - 500);
      this.staticDataSet1.push({
        id: i,
        embeddedObj: { id: i, test: `HMM ${i}`, another: { id: 777 } },
        simpleEmbeddedObj: { id: i },
        name: `(1) Name ${i}`,
        status: `(1) Status ${i}`,
        priority: this.getPriority(),
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
      this.staticDataSet2.push({
        id: i + 1001,
        embeddedObj: { id: i, test: `HMM ${i}`, another: { id: 777 } },
        simpleEmbeddedObj: { id: i },
        name: `(2) Name ${i}`,
        status: `(2) Status ${i}`,
        priority: this.getPriority(),
        enabled: i % 2 === 0,
        date: day,
        dateTime: day,
        time: day,
        money: i + 10,
        percent: i / 100,
        telephone: '555-555-5555',
        email: 'test@google.com',
        address: { city: 'City', state: 'State' },
      });
    }
    this.basicService = new StaticDataTableService([...this.staticDataSet1]);
  }

  public getPriority(): string {
    const x = Math.round(Math.random() * 50);
    return 'test ' + x.toString();
  }

  public getPriorityOptions() {
    const options = new Array();
    let i;
    for (i = 0; i < 49; i++) {
      options.push('test ' + i.toString());
    }
    return options;
  }
  public switchPaginationType(type: 'basic' | 'standard') {
    this.sharedPaginationOptions = Object.assign({}, this.sharedPaginationOptions, { theme: type });
    this.ref.detectChanges();
  }

  public loadDataset(setIndex: number) {
    switch (setIndex) {
      case 1:
        this.basicService = new StaticDataTableService([...this.staticDataSet1]);
        break;
      case 2:
        this.basicService = new StaticDataTableService([...this.staticDataSet2]);
        break;
      case 3:
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

  public checkDisabled(): boolean {
    return true;
  }

  public configureColumns(): void {
    this.modalService
      .open(ConfigureColumnsModal, { columns: this.sharedColumns })
      .onClosed.then((columns: IDataTableColumn<MockData>[]) => {
        if (columns) {
          const enabledColumns = columns.filter((column: IDataTableColumn<MockData>) => column.enabled);
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
