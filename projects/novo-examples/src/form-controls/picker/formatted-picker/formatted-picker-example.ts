import { Component } from '@angular/core';

/**
 * @title Formatted Picker Example
 */
@Component({
  selector: 'formatted-picker-example',
  templateUrl: 'formatted-picker-example.html',
  styleUrls: ['formatted-picker-example.css'],
})
export class FormattedPickerExample {
  public placeholder: string = 'Select...';
  public formatted: any;
  public value: string;

  constructor() {
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

    this.formatted = {
      field: 'id',
      format: `$firstName $lastName`,
      options: collaborators,
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
