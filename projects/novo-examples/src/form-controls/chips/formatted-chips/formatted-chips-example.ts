import { Component } from '@angular/core';

/**
 * @title Formatted Chips Example
 */
@Component({
  selector: 'formatted-chips-example',
  templateUrl: 'formatted-chips-example.html',
  styleUrls: ['formatted-chips-example.css'],
})
export class FormattedChipsExample {
  public formatted: any;
  public placeholder: string = 'Select...';
  public value: any;

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
      format: '$firstName $lastName',
      options: collaborators,
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
