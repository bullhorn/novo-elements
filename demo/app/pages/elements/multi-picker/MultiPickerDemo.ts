// NG2
import { Component } from '@angular/core';
// APP
import { ChecklistPickerResults } from 'novo-elements';
let BasicMultiPicker = require('./templates/BasicMultiPickerDemo.html');
let NestedMultiPicker = require('./templates/NestedMultiPickerDemo.html');

const template = `
<div class="container">
    <h1>MultiPicker <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/multi-picker">(source)</a></small></h1>
    <p>The multipicker element (<code>multipicker</code>) represents a control that presents a menu of options of multiple types. The options
    within are set by the <code>source</code> attribute. Options can be pre-selected for the user using the <code>ngModel</code>
    attribute. Multipicker is the multi-category version of <code>chips</code></p>.

    <br/>

    <h5>Basic Example</h5>
    <p>
        By clicking on the <code>multi-picker</code> element, the options list will be displayed.  Select any of the options
        by clicking on the item in the list.  The value selected will be added to the list of selected values.
    </p>
    <div class="example chips-demo">${BasicMultiPicker}</div>
    <code-snippet [code]="BasicMultiPicker"></code-snippet>

    <h5>Nested Example</h5>
    <p>
        The multipicker can also support a parent-child relationship between the types, such as the relationship between a state with many cities or a department with users.
    </p>
    <div class="example chips-demo">${NestedMultiPicker}</div>
    <code-snippet [code]="NestedMultiPicker"></code-snippet>
</div>
`;

@Component({
  selector: 'chips-demo',
  template: template,
})
export class MultiPickerDemoComponent {
  BasicMultiPicker: string = BasicMultiPicker;
  NestedMultiPicker: string = NestedMultiPicker;

  placeholder: string = 'Select...';
  value: any = { states: ['Alabama'], collaborators: [1, 2, 3, 4] };
  types: any = [{ value: 'states', singular: 'state' }, { value: 'collaborators', singular: 'collaborator' }];
  staticDemo: any;
  parentChild: any;
  parentChildTypes: any;
  formatted: any;
  parentChildValue: any;

  constructor() {
    let states = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Dakota',
      'North Carolina',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ];
    let collaborators = [
      {
        id: 1,
        firstName: 'Brian',
        lastName: 'Kimball',
      },
      {
        id: 2,
        firstName: 'Josh',
        lastName: 'Godi',
      },
      {
        id: 3,
        firstName: 'Alec',
        lastName: 'Sibilia',
      },
      {
        id: 4,
        firstName: 'Kameron',
        lastName: 'Sween',
      },
    ];
    let departments = [
      {
        id: 1,
        name: 'Sales',
      },
      {
        id: 2,
        name: 'Engineering',
      },
      {
        id: 3,
        name: 'Marketing',
      },
      {
        id: 4,
        name: 'Finance',
      },
      {
        id: 5,
        name: 'Nobody Works Here',
      },
    ];
    let users = [
      {
        id: 1,
        departments: [1, 2, 4],
        name: 'Bob Sales/Engineering/Fin',
      },
      {
        id: 2,
        departments: [4],
        name: 'Beth Fin',
      },
      {
        id: 3,
        departments: [2],
        name: 'Artemis Eng',
      },
      {
        id: 4,
        departments: [1],
        name: 'Andy Sales',
      },
      {
        id: 5,
        departments: [3],
        name: 'Zoe Marketing',
      },
      {
        id: 6,
        departments: [4, 2],
        name: 'Ziva Eng Fin',
      },
    ];
    this.staticDemo = {
      options: [
        { type: 'collaborators', data: collaborators, format: '$firstName $lastName', field: 'id' },
        { type: 'states', data: states },
      ],
      resultsTemplate: ChecklistPickerResults,
      selectAllOption: true,
    };
    this.parentChild = {
      options: [
        { type: 'departments', data: departments, format: '$name', field: 'id', isParentOf: 'users' },
        { type: 'users', data: users, format: '$name', field: 'id', isChildOf: 'departments' },
      ],
      resultsTemplate: ChecklistPickerResults,
      selectAllOption: false,
      strictRelationship: false,
      chipsCount: 6,
    };
    this.parentChildTypes = [
      { value: 'departments', isParentOf: true, singular: 'department' },
      { value: 'users', isChildOf: true, singular: 'user' },
    ];
    this.formatted = {
      format: '$firstName $lastName',
      options: collaborators,
    };
    this.parentChildValue = { departments: [2, 3, 4], users: [4, 5] };
  }

  onChanged() {}
}
