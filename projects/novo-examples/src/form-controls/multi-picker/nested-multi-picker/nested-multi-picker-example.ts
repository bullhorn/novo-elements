import { Component } from '@angular/core';
import { ChecklistPickerResults } from 'novo-elements';

/**
 * @title Nested Multi Picker Example
 */
@Component({
  selector: 'nested-multi-picker-example',
  templateUrl: 'nested-multi-picker-example.html',
  styleUrls: ['nested-multi-picker-example.css'],
})
export class NestedMultiPickerExample {
  placeholder: string = 'Select...';
  parentChild: any;
  parentChildTypes: any;
  formatted: any;
  parentChildValue: any;

  constructor() {
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
    this.parentChildValue = { departments: [2, 3, 4], users: [4, 5] };
  }

  onChanged(event?: Event) {}
}
