import { Component } from '@angular/core';
import { ChecklistPickerResults } from 'novo-elements';

/**
 * @title Basic Multi Picker Example
 */
@Component({
  selector: 'basic-multi-picker-example',
  templateUrl: 'basic-multi-picker-example.html',
  styleUrls: ['basic-multi-picker-example.css'],
})
export class BasicMultiPickerExample {
  placeholder: string = 'Select...';
  value: any = { states: ['Alabama'], collaborators: [1, 2, 3, 4] };
  types: any = [{ value: 'states', singular: 'state' }, { value: 'collaborators', singular: 'collaborator' }];
  staticDemo: any;

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
    this.staticDemo = {
      options: [
        { type: 'collaborators', data: collaborators, format: '$firstName $lastName', field: 'id' },
        { type: 'states', data: states },
      ],
      resultsTemplate: ChecklistPickerResults,
      selectAllOption: true,
    };
  }

  onChanged($event?: Event) {}
}
