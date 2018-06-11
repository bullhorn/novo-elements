// NG2
import { Component, OnInit } from '@angular/core';
// APP
// import { MovieDataProvider } from './MovieDataProvider';
import { TableData } from './TableData';
// Vendor
import {
  ArrayCollection,
  BaseRenderer,
  DateCell,
  NovoDropdownCell,
  NovoTableConfig,
  NovoTableElement,
  PercentageCell,
  SelectControl,
  TablePickerControl,
  TextBoxControl
} from './../../../../platform/index';

let TableDemoTpl = require('./templates/TableDemo.html');
let EditableTableDemoTpl = require('./templates/EditableTableDemo.html');
let DetailsTableDemoTpl = require('./templates/DetailsTableDemo.html');
let SelectAllTableDemoTpl = require('./templates/SelectAllTableDemo.html');
let MovieTableDemoTpl = require('./templates/MovieTableDemo.html');
let TotalFooterTableDemoTpl = require('./templates/TotalFooterTableDemo.html');


const template = `
<div class="container">
 <h1>Table <small><a target="_blank" href="https://bullhorn.github.io/novo-elements/blob/master/src/elements/table">(source)</a></small></h1>
    <p>Tables allow users to view date in a tabular format and perform actions such as Sorting and Filtering. Different configuration are possible for pagination or infinite scroll. Feature to be added include: Custom Item Renderers, etc...</p>
    <h2>Types</h2>

    <h5>Basic Table</h5>
    <p>This is the most basic table.</p>
    <div class="example table-demo">${TableDemoTpl}</div>
    <code-snippet [code]="TableDemoTpl"></code-snippet>

    <h5>Details Table</h5>
    <p>This has a row renderer to show a new details row that is expanded when you click on the action column.</p>
    <div class="example table-demo">${DetailsTableDemoTpl}</div>
    <code-snippet [code]="DetailsTableDemoTpl"></code-snippet>

    <h5>Select All Table w/ Custom Actions</h5>
    <p>This has checkboxes for selection with custom actions.</p>
    <div class="example table-demo">${SelectAllTableDemoTpl}</div>
    <code-snippet [code]="SelectAllTableDemoTpl"></code-snippet>

    <h5>Remote Table Provider</h5>
    <p>This has connects to the OMDB service.</p>
    <div class="example table-demo">${MovieTableDemoTpl}</div>
    <code-snippet [code]="MovieTableDemoTpl"></code-snippet>

    <h5>Editable Table</h5>
    <p>Can be put into edit mode and use editors that are set on the column to modify the data.</p>
    <div class="example table-demo">${EditableTableDemoTpl}</div>
    <code-snippet [code]="EditableTableDemoTpl"></code-snippet>

    <h5>Total/Average Footer</h5>
    <p>Easily configure a footer to sum or average up columns.</p>
    <div class="example table-demo">${TotalFooterTableDemoTpl}</div>
    <code-snippet [code]="TotalFooterTableDemoTpl"></code-snippet>
</div>
`;

const HEADER_COLORS = ['aqua', 'ocean', 'mint', 'grass', 'sunflower', 'company', 'lead', 'positive', 'black'];

@Component({
  selector: 'status-cell',
  template: `
    <div class="status-cell">
      <i class="bhi-info"></i>
      <label>{{ value }}</label>
    </div>
  `
})
export class StatusCell extends BaseRenderer {
}

@Component({
  selector: 'extra-details',
  template: `
    <div class="extra-data">
      <label><i class="bhi-info"></i>Description</label>
      <p>{{ data.description }}</p>
      <label><i class="bhi-info"></i>Categories</label>
      <p>{{ data.categories }}</p>
    </div>
  `
})
export class ExtraDetails extends BaseRenderer {
}

@Component({
  selector: 'image-cell',
  template: `
    <div class="image-cell">
      <img src="{{value}}"/>
    </div>
  `
})
export class ImageCell extends BaseRenderer {
}

@Component({
  selector: 'actions-cell',
  template: `
    <novo-dropdown parentScrollSelector=".table-container">
      <button type="button" theme="dialogue" icon="collapse">Actions!</button>
      <list>
        <item>Item 1</item>
        <item>Item 2</item>
        <item>Item 3</item>
        <item>Item 4</item>
        <item>Item 5</item>
        <item>Item 6</item>
        <item>Item 7</item>
        <item>Item 8</item>
        <item>Item 9</item>
      </list>
    </novo-dropdown>
  `
})
export class ActionsCell extends BaseRenderer {
  constructor() {
    super();
  }

  getActionContext(data, meta) {
    return { item: data, meta };
  }
}

interface TableDemoConfig {
  rows?: any;
  dataProvider?: any;
  columns: any[];
  config: NovoTableConfig;
}

@Component({
  selector: 'table-demo',
  template: template
})
export class TableDemoComponent implements OnInit {
  public TableDemoTpl: string = TableDemoTpl;
  public DetailsTableDemoTpl: string = DetailsTableDemoTpl;
  public SelectAllTableDemoTpl: string = SelectAllTableDemoTpl;
  public MovieTableDemoTpl: string = MovieTableDemoTpl;
  public EditableTableDemoTpl: string = EditableTableDemoTpl;
  public TotalFooterTableDemoTpl: string = TotalFooterTableDemoTpl;
  public customRowOptions: Array<any> = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 }
  ];
  public theme: string;
  public basic: TableDemoConfig;
  public details: TableDemoConfig;
  private selectAll: TableDemoConfig;
  public remote: TableDemoConfig;
  public totalFooter: TableDemoConfig;
  public editable: TableDemoConfig;
  public editableNewRowDefault: any = { name: 'Default', jobType: 'Contract' };

  constructor() {
    let columns = [
      { title: 'Actions', renderer: ActionsCell },
      { title: 'Name', name: 'name', ordering: true, type: 'link', filtering: true },
      { title: 'Position', name: 'position', ordering: true, filtering: true },
      {
        title: 'Extn.',
        name: 'ext',
        ordering: true,
        renderer: object => {
          return object.ext.obj;
        },
        compare: (sort, previous, current) => {
          let first = previous.obj,
            second = current.obj;

          if (first > second) {
            return sort === 'desc' ? -1 : 1;
          }
          if (first < second) {
            return sort === 'asc' ? -1 : 1;
          }
          return 0;
        }
      },
      {
        title: 'Start date',
        type: 'date',
        name: 'startDate',
        renderer: DateCell,
        ordering: true,
        filtering: true,
        range: true
      },
      {
        title: '%',
        name: 'percent',
        ordering: true,
        renderer: PercentageCell
      },
      {
        title: 'Salary',
        name: 'salary',
        ordering: true,
        renderer: (object) => {
          return `$ ${Number(object.salary).toFixed(2)}`;
        }
      },
      {
        title: 'Status',
        name: 'status',
        renderer: NovoDropdownCell,
        dropdownCellConfig: [
          {
            category: 'Update Status',
            callback: this.updateStatus.bind(this),
            options: [
              { label: 'New Lead', value: 'New Lead' },
              { label: 'Active', value: 'Active' },
              { label: 'Archived', value: 'Archived', }
            ]
          },
          {
            category: 'Move',
            callback: this.move.bind(this),
            options: ['Kitten', 'Kitty']
          },
          {
            callback: this.move.bind(this),
            options: ['Meow', 'Kitty']
          }
        ]
      }
    ];
    this.basic = {
      columns: columns.slice(),
      rows: [],
      config: {
        paging: {
          current: 1,
          itemsPerPage: 10,
          onPageChange: event => {
            this.basic.config.paging.current = event.page;
            this.basic.config.paging.itemsPerPage = event.itemsPerPage;
          }
        },
        filtering: true,
        sorting: true,
        ordering: true,
        resizing: true
      }
    };
    this.details = {
      columns: columns.slice(),
      rows: TableData.slice(),
      config: {
        paging: {
          current: 1,
          itemsPerPage: 10,
          onPageChange: event => {
            this.details.config.paging.current = event.page;
            this.details.config.paging.itemsPerPage = event.itemsPerPage;
          }
        },
        sorting: true,
        filtering: true,
        ordering: true,
        resizing: true,
        hasDetails: true,
        detailsRenderer: ExtraDetails
      }
    };
    this.selectAll = {
      columns: columns.slice(),
      rows: TableData.slice(),
      config: {
        paging: {
          current: 1,
          itemsPerPage: 10,
          onPageChange: event => {
            this.selectAll.config.paging.current = event.page;
            this.selectAll.config.paging.itemsPerPage = event.itemsPerPage;
          }
        },
        sorting: true,
        filtering: true,
        ordering: true,
        resizing: true,
        selectAllEnabled: true,
        rowSelectionStyle: 'checkbox'
      }
    };

    let imdbColumns = [
      { title: 'Title', name: 'Title', ordering: true, filtering: true },
      { title: 'Year', name: 'Year', ordering: true, filtering: true },
      { title: 'Type', name: 'Type', ordering: true, filtering: true, options: ['movie', 'series', 'episode'], multiple: true },
      { title: 'Poster', name: 'Poster', ordering: false, filtering: false, renderer: ImageCell }
    ];

    // this.remote = {
    //     columns: imdbColumns.slice(),
    //     dataProvider: new MovieDataProvider(),
    //     config: {
    //         paging: {
    //             current: 1,
    //             itemsPerPage: 10,
    //             onPageChange: event => {
    //                 this.basic.config.paging.current = event.page;
    //                 this.basic.config.paging.itemsPerPage = event.itemsPerPage;
    //             }
    //         },
    //         filtering: true,
    //         sorting: true,
    //         ordering: true,
    //         resizing: true
    //     }
    // };

    // For columns that can be edited, pass an editor property
    let names = [
      'Joshua Godi',
      'Kameron Sween',
      'Brian Kimball',
      'Sweeney Todd',
      'Tom Cruise',
      'Ed Bailey',
      'Bo Jackson',
      'Ernie McDudson'
    ];
    this.editable = {
      columns: [
        {
          title: 'Name',
          name: 'name',
          ordering: true,
          filtering: true,
          editorType: 'TablePickerControl',
          editorConfig: { key: 'name', config: { options: names } }
        },
        {
          title: 'Job Type',
          name: 'jobType',
          ordering: true,
          filtering: true,
          options: ['Freelance', 'Contact', 'Billable'],
          multiple: true,
          editorType: 'SelectControl',
          editorConfig: {
            key: 'jobType',
            options: [{ value: 'Freelance', label: 'Freelance' }, { value: 'Contract', label: 'Contract' }, { value: 'Billable', label: 'Billable' }]
          }
        },
        {
          title: 'Rate',
          name: 'rate',
          ordering: true,
          filtering: true,
          renderer: PercentageCell,
          editorType: 'TextBoxControl',
          editorConfig: {
            key: 'rate',
            type: 'percentage',
            required: true,
            interactions: [
              {
                event: 'change',
                script: (form) => {
                  console.log('Form Interaction Called!', form); // tslint:disable-line
                  if (form.value.rate) {
                    if (Number(form.value.rate) >= .75) {
                      form.controls.rating.setValue('High');
                    } else if (Number(form.value.rate) >= .50) {
                      form.controls.rating.setValue('Medium');
                    } else {
                      form.controls.rating.setValue('Low');
                    }
                  }
                }
              }
            ]
          }
        },
        { title: 'Rating', name: 'rating' }
      ],
      rows: new ArrayCollection([
        { id: 1, name: 'Joshua Godi', jobType: 'Freelance', rate: null, rating: 'Low' },
        { id: 2, name: 'Brian Kimball', jobType: 'Contact', rate: .50, rating: 'Medium' },
        { id: 3, name: 'Kameron Sween', jobType: 'Billable', rate: 1.00, rating: 'High' }
      ]),
      config: {
        paging: {
          current: 1,
          itemsPerPage: 10,
          onPageChange: event => {
            this.basic.config.paging.current = event.page;
            this.basic.config.paging.itemsPerPage = event.itemsPerPage;
          }
        },
        filtering: true,
        sorting: true,
        ordering: true,
        resizing: true
      }
    };

    this.totalFooter = {
      columns: [
        { title: 'Name', name: 'name', ordering: true, filtering: true },
        { title: 'Count 1', name: 'count1', ordering: true, filtering: true },
        { title: 'Count 2', name: 'count2', ordering: true, filtering: true },
        { title: 'Count 3', name: 'count3', ordering: true, filtering: true }
      ],
      rows: [
        { id: 1, name: 'Name 1', count1: 1, count2: 2, count3: 3 },
        { id: 2, name: 'Name 2', count1: 1, count2: 2, count3: 3 },
        { id: 3, name: 'Name 3', count1: 1, count2: 2, count3: 3 },
        { id: 4, name: 'Name 4', count1: 1, count2: 2, count3: 3 },
        { id: 5, name: 'Name 5', count1: 1, count2: 2, count3: 3 },
      ],
      config: {
        paging: {
          current: 1,
          itemsPerPage: 10,
          onPageChange: event => {
            this.basic.config.paging.current = event.page;
            this.basic.config.paging.itemsPerPage = event.itemsPerPage;
          }
        },
        footers: [{
          columns: ['count1', 'count2', 'count3'],
          method: 'SUM',
          labelColumn: 'name',
          label: 'Mega Total'
        }, {
          columns: ['count1', 'count2', 'count3'],
          method: 'AVG',
          labelColumn: 'name',
          label: 'Yep, Average!'
        }],
        filtering: true,
        sorting: true,
        ordering: true,
        resizing: true
      }
    };
  }

  ngOnInit() {
    this.theme = HEADER_COLORS[0];
  }

  reload() {
    this.basic.rows = TableData.slice();
  }

  changeTheme() {
    let idx = HEADER_COLORS.indexOf(this.theme);
    if (idx === HEADER_COLORS.length - 1) {
      idx = -1;
    }
    this.theme = HEADER_COLORS[idx + 1];
  }

  singleAction() {
    window.alert('HI!');
  }

  selectedAction(action) {
    window.alert(`You clicked ${action}!`);
  }

  save(table: NovoTableElement) {
    // Save updated data and get fresh data for the table to reflect the changes!
    let errorsOrData = table.validateAndGetUpdatedData();
    if (!errorsOrData.errors) {
      table.toggleLoading(true);
      console.log('SAVING', errorsOrData); // tslint:disable-line
      // TODO - save data - fetch the data
      setTimeout(() => {
        table.displayToastMessage({ icon: 'check', theme: 'success', message: 'Saved!' }, 2000);
        table.saveChanges();
      }, 2000);
    } else {
      console.log('ERRORS!', errorsOrData); // tslint:disable-line
      table.displayToastMessage({ icon: 'caution', theme: 'danger', message: 'Errors!!' });
    }
  }

  public updateStatus(data: any, status: string): void {
    console.log('Update Status', data, status); // tslint:disable-line
  }

  public move(data: any, status: string): void {
    console.log('Move', data, status); // tslint:disable-line
  }
}
