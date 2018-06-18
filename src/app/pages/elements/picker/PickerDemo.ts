// NG2
import { Component } from '@angular/core';
// Vendor
import { GroupedMultiPickerResults, PickerResults } from './../../../../platform/index';
// APP
let BasicPickerDemoTpl = require('./templates/BasicPickerDemo.html');
let AsyncPickerDemoTpl = require('./templates/AsyncPickerDemo.html');
let FormattedPickerDemoTpl = require('./templates/FormattedPickerDemo.html');
let CustomPickerResultsDemoTpl = require('./templates/CustomPickerResultsDemo.html');
let DefaultOptionsDemoTpl = require('./templates/DefaultOptionsPickerDemo.html');
let OverrideTemplateDemoTpl = require('./templates/OverrideTemplateDemo.html');
let GroupedPickerDemoTpl = require('./templates/GroupedPickerDemo.html');
let EntityPickerDemoTpl = require('./templates/EntityPickerDemo.html');


@Component({
  selector: 'custom-picker-results',
  host: {
    'class': 'active picker-results'
  },
  template: `
    <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)">
        <item-content>
          **CUSTOM** <b [innerHtml]="highlight(match.label, term)"></b>
        </item-content>
      </novo-list-item>
    </novo-list>
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

    <h5>Async Examples (With Infinite Scroll)</h5>
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

    <h5>Overriding the Result Template</h5>
    <p>
        You can provide a string to override the base result template. You have access to <code>match</code> which is the data to be displayed.
    </p>
    <div class="example picker-demo">${OverrideTemplateDemoTpl}</div>
    <code-snippet [code]="OverrideTemplateDemoTpl"></code-snippet>

    <h5>Default Options</h5>
    <p>
        You can set a function or array for the default options on the config, for these options to appear when the user
        clicks in and doesn't have enough keys entered to perform a search
    </p>
    <div class="example picker-demo">${DefaultOptionsDemoTpl}</div>
    <code-snippet [code]="DefaultOptionsDemoTpl"></code-snippet>

    <h5>Entity Single Picker</h5>
    <p>
        You can provide custom config to style the picker to select entities too!
    </p>
    <div class="example picker-demo">${EntityPickerDemoTpl}</div>
    <code-snippet [code]="EntityPickerDemoTpl"></code-snippet>

    <h5>Grouped Multi Picker (categories) with Picker</h5>
    <p>Having custom templates makes it easy to customize the functionality of the picker, here is an example of a category selector</p>
    <div class="example picker-demo">${GroupedPickerDemoTpl}</div>
    <code-snippet [code]="GroupedPickerDemoTpl"></code-snippet>
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
  private OverrideTemplateDemoTpl: string = OverrideTemplateDemoTpl;
  private GroupedPickerDemoTpl: string = GroupedPickerDemoTpl;
  private EntityPickerDemoTpl: string = EntityPickerDemoTpl;
  private placeholder: string = 'Select...';
  private staticDemo: any;
  private formatted: any;
  private custom: any;
  private defaultArrayConfig: any;
  private defaultFunctionConfig: any;
  private defaultArrayValue: string;
  private defaultFunctionValue: string;
  private value: string;
  private overrideValue: any;
  private overrideDemo: any;
  private async: any;
  private entityDemo: any;
  private entity: any;

  private groupedPicker1: any;
  private groupedPicker2: any;
  private groupedPicker3: any;
  private groupedPicker4: any;
  private groupedPicker1Value: any;
  private groupedPicker2Value: any;
  private groupedPicker3Value: any;
  private groupedPicker4Value: any;

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

    this.overrideDemo = {
      options: states,
      overrideTemplate: '<h1>{{ match | json }}</h1>'
    };

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

    this.value = null;
    this.async = {
      enableInfiniteScroll: true,
      options: (term, page) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            let arr = [];
            for (let i = 0; i < 20; i++) {
              arr.push({ value: `Page: ${page} - Item: ${i + 1}`, label: `Page: ${page} - Item: ${i + 1}` });
            }
            resolve(arr);
          }, 1000);
        });
      }
    };

    this.defaultArrayConfig = {
      defaultOptions: [
        states[0],
        states[1]
      ],
      minSearchLength: 2,
      options: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(states);
          }, 300);
        });
      }
    };
    this.defaultFunctionConfig = {
      minSearchLength: 2,
      defaultOptions: () => {
        return [
          states[2],
          states[3]
        ];
      },
      options: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(states);
          }, 300);
        });
      }
    };

    this.entityDemo = {
      options: collaborators,
      format: '$firstName $lastName',
      entityIcon: 'person'
    };

    this.setupGroupedPickerDemo();
  }

  setupGroupedPickerDemo() {
    let categoryMap = new Map<string, { value: string, label: string, items: { value: string, label: string }[] }>();
    for (let i = 0; i < 10; i++) {
      let items = [];
      for (let j = 0; j < 10; j++) {
        items.push({ value: `${i}-${j}`, label: `Category ${i} - Item ${j}` });
      }
      categoryMap.set(`${i}`, { value: `${i}`, label: `Category ${i}`, items: items });
    }
    let filterCategoryMap = new Map<string, { value: string, label: string, items: { value: string, label: string, data: any }[] }>();
    for (let i = 0; i < 10; i++) {
      let items = [];
      for (let j = 0; j < 10; j++) {
        let filter = Math.random() >= 0.5;
        items.push({ value: `${i}-${j}`, label: `Category ${i} - Item ${j} - Data - ${filter}`, data: { filter: filter } });
      }
      filterCategoryMap.set(`${i}`, { value: `${i}`, label: `Category ${i}`, items: items });
    }
    this.groupedPicker1 = {
      categoryMap: categoryMap,
      resultsTemplate: GroupedMultiPickerResults,
      displayAll: true
    };
    this.groupedPicker2 = {
      categoryMap: categoryMap,
      resultsTemplate: GroupedMultiPickerResults
    };
    this.groupedPicker3 = {
      categories: [
        { value: 'C1', label: 'Category 1' },
        { value: 'C2', label: 'Category 2' },
        { value: 'C3', label: 'Category 3' },
        { value: 'C4', label: 'Category 4' },
        { value: 'C5', label: 'Category 5' },
      ],
      getItemsForCategoryAsync: (category, customFilter) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { value: 'A1', label: 'Async 1' },
              { value: 'A2', label: 'Async 2' },
              { value: 'A3', label: 'Async 3' },
              { value: 'A4', label: 'Async 4' },
              { value: 'A5', label: 'Async 5' },
            ]);
          }, 1000);
        });
      },
      resultsTemplate: GroupedMultiPickerResults
    };
    this.groupedPicker4 = {
      entityIcon: 'company',
      categoryMap: filterCategoryMap,
      displayAll: true,
      placeholder: 'Filter things...',
      customFilter: {
        matchFunction: (item, value) => {
          if (value) {
            return item.data.filter === value;
          }
          return true;
        },
        defaultFilterValue: false,
        label: 'Custom Filter!'
      },
      resultsTemplate: GroupedMultiPickerResults
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
