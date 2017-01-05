// NG2
import { Component } from '@angular/core';
// APP
let BasicPickerDemoTpl = require('./templates/BasicPickerDemo.html');
let AsyncPickerDemoTpl = require('./templates/AsyncPickerDemo.html');
let FormattedPickerDemoTpl = require('./templates/FormattedPickerDemo.html');
let CustomPickerResultsDemoTpl = require('./templates/CustomPickerResultsDemo.html');
let DefaultOptionsDemoTpl = require('./templates/DefaultOptionsPickerDemo.html');
// Vendor
import { PickerResults } from './../../../../index';

@Component({
    selector: 'custom-picker-results',
    host: {
        'class': 'active picker-results'
    },
    template: `
        <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
        <ul *ngIf="matches.length > 0">
            <li
                *ngFor="let match of matches"
                (click)="selectMatch($event)"
                [class.active]="match===activeMatch"
                (mouseenter)="selectActive(match)">
                **CUSTOM** <b [innerHtml]="highlight(match.label, term)"></b>
            </li>
        </ul>
        <p class="picker-error" *ngIf="hasError">Oops! An error occured.</p>
        <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">No results to display...</p>
    `
})
export class CustomPickerResults extends PickerResults {
}

const template = `
<div class="container">
    <h1>Picker <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/picker">(source)</a></small></h1>
    <p>The picker element (<code>input[picker]</code>) represents a control that presents a menu of options. The options
    within are set by the <code>items</code> attribute. Options can be pre-pickered for the user using the <code>value</code>
    attribute.</p>

    <br/>

    <h5>Basic Examples</h5>
    <p>
        By clicking on the <code>input</code> element, the options list will be displayed.  picker any of the options
        by clicking on the item in the list.  The value pickered will be displayed and the options list will be removed.
    </p>
    <div class="example picker-demo">${BasicPickerDemoTpl}</div>
    <code-snippet [code]="BasicPickerDemoTpl"></code-snippet>

    <h5>Async Examples</h5>
    <p>
        By clicking on the <code>input</code> element, the options list will be displayed.  picker any of the options
        by clicking on the item in the list.  The value pickered will be displayed and the options list will be removed.
    </p>
    <div class="example picker-demo">${AsyncPickerDemoTpl}</div>
    <code-snippet [code]="AsyncPickerDemoTpl"></code-snippet>

    <h5>Formated Picker Examples</h5>
    <p>
        By clicking on the <code>input</code> element, the options list will be displayed.  picker any of the options
        by clicking on the item in the list.  The value pickered will be displayed and the options list will be removed.
    </p>
    <div class="example picker-demo">${FormattedPickerDemoTpl}</div>
    <code-snippet [code]="FormattedPickerDemoTpl"></code-snippet>

    <h5>Custom Picker Examples</h5>
    <p>
        By clicking on the <code>input</code> element, the options list will be displayed.  picker any of the options
        by clicking on the item in the list.  The value pickered will be displayed and the options list will be removed.
    </p>
    <div class="example picker-demo">${CustomPickerResultsDemoTpl}</div>
    <code-snippet [code]="CustomPickerResultsDemoTpl"></code-snippet>

    <h5>Default Options</h5>
    <p>
        You can set a function or array for the default options on the config, for these options to appear when the user
        clicks in and doesn't have enough keys entered to perform a search
    </p>
    <div class="example picker-demo">${DefaultOptionsDemoTpl}</div>
    <code-snippet [code]="DefaultOptionsDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'picker-demo',
    template: template
})
export class PickerDemoComponent {
    private BasicPickerDemoTpl: string = BasicPickerDemoTpl;
    private AsyncPickerDemoTpl: string = AsyncPickerDemoTpl;
    private FormattedPickerDemoTpl: string = FormattedPickerDemoTpl;
    private CustomPickerResultsDemoTpl: string = CustomPickerResultsDemoTpl;
    private DefaultOptionsDemoTpl: string = DefaultOptionsDemoTpl;
    private placeholder: string = 'Select...';
    private staticDemo: any;
    private formatted: any;
    private custom: any;
    private defaultArrayConfig: any;
    private defaultFunctionConfig: any;
    private defaultArrayValue: string;
    private defaultFunctionValue: string;
    private value: string;
    private async: any;

    constructor() {
        let states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        let abbrieviated = [{
            value: 'USA',
            label: 'United States'
        }, {
            value: 'GB',
            label: 'Great Britain'
        }, {
            value: 'CA',
            label: 'Canada'
        }, {
            value: 'AU',
            label: 'Austrailia'
        }];

        let collaborators = [{
            id: 1,
            firstName: 'Brian',
            lastName: 'Kimball'
        }, {
            id: 2,
            firstName: 'Josh',
            lastName: 'Godi'
        }, {
            id: 3,
            firstName: 'Alec',
            lastName: 'Sibilia'
        }, {
            id: 4,
            firstName: 'Kameron',
            lastName: 'Sween'
        }];

        this.staticDemo = { options: states };

        this.formatted = {
            // field: 'id',
            format: '$firstName $lastName',
            options: collaborators
        };

        this.custom = {
            resultsTemplate: CustomPickerResults,
            format: '$firstName $lastName',
            options: collaborators
        };

        this.value = 'Alabama';
        this.async = {
            options: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(abbrieviated);
                    }, 300);
                });
            }
        };

        this.defaultArrayConfig = {
            defaultOptions: [
                abbrieviated[0],
                abbrieviated[1]
            ],
            minSearchLength: 2,
            options: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(abbrieviated);
                    }, 300);
                });
            }
        };
        this.defaultFunctionConfig = {
            minSearchLength: 2,
            defaultOptions: () => {
                return [
                    abbrieviated[2],
                    abbrieviated[3]
                ];
            },
            options: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(abbrieviated);
                    }, 300);
                });
            }
        };
    }
}
