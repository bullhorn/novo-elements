import { Component, OnInit } from '@angular/core';
import { MockData } from '../extras';
import { IDataTableColumn, IDataTablePaginationOptions, IDataTableService, StaticDataTableService } from 'novo-elements';
import * as dateFns from 'date-fns';

/**
 * @title Data Table Filters Example
 */
@Component({
  selector: 'data-table-filters-example',
  templateUrl: './data-table-filters-example.component.html',
  styleUrls: ['./data-table-filters-example.component.css'],
})
export class DataTableFiltersExampleComponent implements OnInit {
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
        options: [{ label: 'Action 1', handlers: { click: this.log.bind(this) } }],
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
      filterable: {
        type: 'multi-select',
        options: ['Active', 'Inactive', 'Passive'],
      },
      sortable: true,
    },
    {
      id: 'priority',
      label: 'Priority',
      enabled: true,
      type: 'text',
      filterable: {
        type: 'select',
        options: ['Hot', 'Cold'],
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

  public sharedDisplayColumns = ['id', 'name', 'email', 'date', 'status', 'priority'];

  public sharedPaginationOptions: IDataTablePaginationOptions = {
    theme: 'standard',
    pageSize: 10,
    pageSizeOptions: [10, 50, 100, 250, 500],
  };

  public globalSearchEnabled: boolean = false;

  // Basic configuration
  public basicService: IDataTableService<MockData>;

  private staticDataSet1: MockData[] = [];
  private staticDataSet2: MockData[] = [];

  constructor() {
    for (let i = 0; i < 1000; i++) {
      let day = i < 500 ? dateFns.subDays(new Date(), i) : dateFns.addDays(new Date(), i - 500);
      this.staticDataSet1.push({
        id: i,
        embeddedObj: { id: i, test: `HMM ${i}`, another: { id: 777 } },
        simpleEmbeddedObj: { id: i },
        name: `(1) Name ${i}`,
        status: `(1) Status ${i}`,
        priority: Math.random() > 0.5 ? 'Hot' : 'Cold',
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
        priority: Math.random() > 0.5 ? 'Hot' : 'Cold',
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

  ngOnInit() {}

  public log(event: { originalEvent: MouseEvent; row: MockData }): void {
    console.log('[DataTable] Event Triggered!', event); // tslint:disable-line
  }
}
