import { Component } from '@angular/core';
import { EntityPickerResults } from 'novo-elements';

/**
 * @title Entity Picker Example
 */
@Component({
  selector: 'entity-picker-example',
  templateUrl: 'entity-picker-example.html',
  styleUrls: ['entity-picker-example.css'],
})
export class EntityPickerExample {
  public placeholder: string = 'Select...';
  public entityDemo: any;
  public entity: any;

  constructor() {
    const collaborators = [
      {
        searchEntity: 'Candidate',
        id: 1,
        firstName: 'Brian',
        lastName: 'Kimball',
        companyName: 'Bullhorn',
        phone: '617-555-6789',
        address: { city: 'Boston', state: 'MA' },
        occupation: 'Developer',
        status: 'Active',
      },
      {
        searchEntity: 'ClientContact',
        id: 2,
        firstName: 'Josh',
        lastName: 'Godi',
        companyName: 'Not Bullhorn',
        phone: '617-555-6789',
        address: { city: 'St. Louis', state: 'MO' },
        occupation: 'Developer',
        status: 'Inactive',
      },
      {
        searchEntity: 'ClientContact',
        id: 3,
        firstName: 'Alec',
        lastName: 'Sibilia',
        companyName: 'Not Bullhorn',
        phone: '617-555-6789',
        address: { city: 'Seattle', state: 'WA' },
        occupation: 'Designer',
        status: 'Inactive',
      },
      {
        searchEntity: 'Candidate',
        id: 4,
        firstName: 'Jonathan',
        lastName: 'Braun',
        companyName: 'Bullhorn',
        phone: '617-555-6789',
        address: { city: 'Boston', state: 'MA' },
        occupation: 'Designer',
        status: 'Active',
      },
      {
        searchEntity: 'Candidate',
        id: 5,
        firstName: 'Dan',
        lastName: 'Voegelin',
        companyName: 'Bullhorn',
        phone: '617-555-6789',
        address: { city: 'A Mountain', state: 'NH' },
        occupation: 'Developer',
        status: 'Active',
      },
      {
        searchEntity: 'Candidate',
        id: 6,
        firstName: 'Charles',
        lastName: 'Barnes',
        companyName: 'Bullhorn',
        phone: '617-555-6789',
        address: { city: 'Boston', state: 'MA' },
        occupation: 'Developer',
        status: 'Active',
      },
    ];

    this.entityDemo = {
      options: collaborators,
      format: '$firstName $lastName',
      entityIcon: 'person',
      resultsTemplate: EntityPickerResults,
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
