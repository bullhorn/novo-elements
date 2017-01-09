# Table

## Usage
```javascript
import {NOVO_TABLE_ELEMENTS, NOVO_TABLE_EXTRAS} from 'novo-elements';
```

##### Properties
- `'rows' : Array<Object> : default: []`
    * Array of data for the table body
- `'columns' : Array<Object> : default: []`
    * Array containing the column definitions for the table head
- `'config' : Object`
    * Configuration object for the table
    * Available Configuration
        * `'paging' : Bool | Object : default: false` - Sets up the paging config for the table
            * `'current' : Number` - Sets the current selected page on the table
            * `'itemsPerPage' : Number` - Sets the number of items displayed per page on the table
        * `'sorting' : Bool | Func : default: false`
            * If `true` the table will allow sorting (column definition must allow sorting as well, see below)
            * If `function` this will represent the sorting function that the table uses, overriding the default
        * `'filtering' : Bool | Func : default: false`
            * If `true` the table will allow filtering (column definition must allow filtering as well, see below)
            * If `function` this will represent the filtering function that the table uses, overriding the default
        * `'ordering' : Bool : default: false`
            * Allows the columns to be re-ordered
        * `'resizing' : Bool : default: false`
            * Allows the columns to be re-sized
        * `'hasDetails' : Bool : default: false`
            * Custom contains for details on the table will be shown (must provide a `detailsRenderer`)
        * `'detailsRenderer' : Component : default: null`
            * Custom details section for more information
        * `'rowSelect': Bool' : default: false`
            * Allows for the rows to be clicked

##### Events
- ``onTableChange``
    * Fired when anything on the table changes (filtering, sorting, etc..)
    * `$event` contains information on what changed
- `'onRowClick'`
    * Click handler for the row
    * `$event` contains the row that was clicked

#### Column Definition
In general the column definition will be an object with some basic configuration.

- `'title' : String`
    * Display string for the column inside the table head
- `'name' : String`
    * Key to render when rendering the row object
- `'type' : String : default: 'text'`
    * Type of the column
    * Current Values: `['text', 'link', 'date']`
- `'ordering' : Bool : default: false`
    * Determines if the column can be re-ordered
- `'sorting' : Bool : default: false`
    * Determines if the column can be sorted
- `'filtering' : Bool : default: false`
    * Determines if the column can be filtered
- `'multiple' : Bool : default: false`
    * Determines if the column can be filtered by multiple values
- `'range' : Bool : default: false`
    * Determines if the filter should include a date range option
- `'renderer' : Func | Cell : default: null`
    * Custom renderer for the column, useful if it is an embedded object
- `'compare' : Func : default: null`
    * Custom compare function for the column, used in sorting, useful if it is an embedded object
- `'match' : Func : default: null`
    * Custom match function for the column, used in filtering, useful if it uses an embedded object
- `'options' : Array : default: null`
    * Custom options for a filter

#### Custom Header

```html
<novo-table [theme]="theme" [rows]="rows" [columns]="columns" [config]="config" (onTableChange)="onTableChange($event)">
    <novo-table-header>
        TEST :)
    </novo-table-header>
</novo-table>
```

#### Custom Actions

```html
<novo-table [rows]="rows" [columns]="columns" [config]="config" (onTableChange)="onTableChange($event)" #table>
    <novo-table-actions>
        <button theme="secondary" (click)="singleAction()">Click Me!</button>
        <novo-dropdown side="right" *ngIf="table.selected.length">
            <button theme="primary" icon="collapse" inverse>{{table.selected.length}} Selected</button>
            <list>
                <item (action)="selectedAction('action 1')">Action 1</item>
                <item (action)="selectedAction('action 2')">Action 2</item>
                <item (action)="selectedAction('action 3')" disabled="true">Action 3</item>
            </list>
        </novo-dropdown>
    </novo-table-actions>
</novo-table>
```

#### Custom State Messaging

```
<novo-table [theme]="theme" [dataProvider]="basic.rows" [columns]="basic.columns" [config]="basic.config">
    <div classs="table-message" table-empty-message>Custom Empty State Template! Click RELOAD to get Data!</div>
    <div classs="table-message" table-no-matching-records-message>Custom No Matched Records</div>
    <div classs="table-message" table-error-message>Oh No! There was an Error</div>
</div>
```