// NG2
import { Component } from '@angular/core';
// APP
import { TableData } from './TableData';
import TableDemoTpl from './templates/TableDemo.html';
import DetailsTableDemoTpl from './templates/DetailsTableDemo.html';
import SelectAllTableDemoTpl from './templates/SelectAllTableDemo.html';
// Vendor
import { DateCell, BaseRenderer } from './../../../../src/novo-elements';

const template = `
<div class="container">
    <h1>Table <small><a target="_blank" href="https://bullhorn.github.io/novo-elements/tree/master/src/elements/table">(source)</a></small></h1>
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
    selector: 'table-demo',
    template: template
})
export class TableDemoComponent {
    constructor() {
        this.TableDemoTpl = TableDemoTpl;
        this.DetailsTableDemoTpl = DetailsTableDemoTpl;
        this.SelectAllTableDemoTpl = SelectAllTableDemoTpl;

        this.customRowOptions = [
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '30', value: 30 },
            { label: '40', value: 40 }
        ];

        let columns = [
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
                title: 'Salary',
                name: 'salary',
                ordering: true,
                renderer: (object) => {
                    return `$ ${Number(object.salary).toFixed(2)}`;
                }
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
                title: 'Salary',
                name: 'salary',
                ordering: true,
                renderer: (object) => {
                    return `$ ${Number(object.salary).toFixed(2)}`;
                }
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
                title: 'Salary',
                name: 'salary',
                ordering: true,
                renderer: (object) => {
                    return `$ ${Number(object.salary).toFixed(2)}`;
                }
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
                title: 'Salary',
                name: 'salary',
                ordering: true,
                renderer: (object) => {
                    return `$ ${Number(object.salary).toFixed(2)}`;
                }
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
                title: 'Salary',
                name: 'salary',
                ordering: true,
                renderer: (object) => {
                    return `$ ${Number(object.salary).toFixed(2)}`;
                }
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
                title: 'Salary',
                name: 'salary',
                ordering: true,
                renderer: (object) => {
                    return `$ ${Number(object.salary).toFixed(2)}`;
                }
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
                title: 'Salary',
                name: 'salary',
                ordering: true,
                renderer: (object) => {
                    return `$ ${Number(object.salary).toFixed(2)}`;
                }
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
                title: 'Salary',
                name: 'salary',
                ordering: true,
                renderer: (object) => {
                    return `$ ${Number(object.salary).toFixed(2)}`;
                }
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
                options: ['New Lead', 'Active', 'Archived'],
                ordering: true,
                multiple: true,
                renderer: StatusCell,
                filtering: true
            }
        ];

        this.basic = {
            columns: columns.slice(),
            rows: TableData.slice(),
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
            },
            onTableChange: (event) => {
                this.basic.rows = event.rows;
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
            },
            onTableChange: (event) => {
                this.details.rows = event.rows;
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
                rowSelectionStyle: 'checkbox'
            },
            onTableChange: (event) => {
                this.selectAll.rows = event.rows;
            }
        };
    }

    ngOnInit() {
        this.theme = HEADER_COLORS[0];
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
}
