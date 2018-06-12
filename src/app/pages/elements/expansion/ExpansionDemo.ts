// NG2
import { Component } from '@angular/core';
import { DateCell, PercentageCell, NovoTableConfig, NovoDropdownCell } from './../../../../platform/index';
// APP
let ExpansionDemoTpl = require('./templates/ExpansionDemo.html');
let AccordionDemoTpl = require('./templates/AccordionDemo.html');
let DisabledExpansionDemoTpl = require('./templates/DisabledExpansionDemo.html');
let LazyExpansionDemoTpl = require('./templates/LazyExpansionDemo.html');
let ThemedExpansionDemoTpl = require('./templates/ThemedExpansionDemo.html');

export const TableData = [
    {
        'name': 'Victoria Cantrell',
        'position': 'Integer Corporation',
        'office': 'Croatia',
        'ext': { 'obj': '8262' },
        'startDate': new Date('2017/08/19'),
        'salary': 208178,
        'percent': .50,
        'status': 'New Lead',
        'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
        'categories': ['Temporary', 'Developer']
    }, {
        'name': 'Pearl Crosby',
        'position': 'In PC',
        'office': 'Cambodia',
        'ext': { 'obj': '8262' },
        'startDate': new Date('2017/10/08'),
        'salary': 114367,
        'percent': .50,
        'status': 'New Lead',
        'description': 'When there was despair in the dust bowl and depression across the land, she saw a nation conquer fear itself with a New Deal, new jobs and a new sense of common purpose. Yes we can.',
        'categories': ['Temporary', 'Developer']
    }, {
        'name': 'Colette Foley',
        'position': 'Lorem Inc.',
        'office': 'Korea, North',
        'ext': { 'obj': '8262' },
        'startDate': new Date('2017/07/19'),
        'salary': 721473,
        'status': 'New Lead',
        'percent': 1,
        'description': 'To my campaign manager David Plouffe, my chief strategist David Axelrod, and the best campaign team ever assembled in the history of politics – you made this happen, and I am forever grateful for what you’ve sacrificed to get it done.',
        'categories': ['Temporary', 'Developer']
    }
];

const template = `
<div class="container">
    <h1>Expandable Containers<small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/expansion">(source)</a></small></h1>
    <p> 
        Expansion Panel provides an expandable details-summary view.
        Each expansion-panel must include a header and may optionally include an action bar.
    </p>
    <p>By default, the expansion-panel header includes a toggle icon at the end of the
header to indicate the expansion state. This icon can be hidden via the
hideToggle property.
</p>
    

   <h2>Basic Usage</h2>

    <h5>Standard Expansion Panel</h5>
    <p>This is an example of a standard list.</p>
    <div class="example standard-list-demo">${ExpansionDemoTpl}</div>
    <code-snippet [code]="ExpansionDemoTpl"></code-snippet>

    <h5>Accordion Expansion Panel</h5>
    <p>This is an example of a Accordion.</p>
    <div class="example standard-list-demo">${AccordionDemoTpl}</div>
    <code-snippet [code]="AccordionDemoTpl"></code-snippet>

    <h5>Disabled Expansion Panel</h5>
    <p>This is an example of a Disabled panel.</p>
    <div class="example standard-list-demo">${DisabledExpansionDemoTpl}</div>
    <code-snippet [code]="DisabledExpansionDemoTpl"></code-snippet>

    <h5>Lazy Expansion Panel</h5>
    <p>This is an example of a Lazy loaded list.</p>
    <div class="example standard-list-demo">${LazyExpansionDemoTpl}</div>
    <code-snippet [code]="LazyExpansionDemoTpl"></code-snippet>

    <h5>Themed Expansion Panel</h5>
    <p>This is an example of a themed list.</p>
    <div class="example themed-list-demo">${ThemedExpansionDemoTpl}</div>
    <code-snippet [code]="ThemedExpansionDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'expansion-demo',
    template: template
})
export class ExpansionDemoComponent {
    private ExpansionDemoTpl:string = ExpansionDemoTpl;
    private AccordionDemoTpl:string = AccordionDemoTpl;
    private DisabledExpansionDemoTpl:string = DisabledExpansionDemoTpl;
    private LazyExpansionDemoTpl:string = LazyExpansionDemoTpl;
    private ThemedExpansionDemoTpl:string = ThemedExpansionDemoTpl;
    public isDisabled: boolean = true;
    public details: any;

    constructor() {
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
                name: 'status'
            }
        ];
        this.details = {
            columns: columns.slice(),
            rows: TableData.slice(),
            config: {
                paging: {
                    current: 1,
                    itemsPerPage: 10
                },
                sorting: true,
                filtering: true,
                ordering: true,
                resizing: true            }
        };
    }
}
