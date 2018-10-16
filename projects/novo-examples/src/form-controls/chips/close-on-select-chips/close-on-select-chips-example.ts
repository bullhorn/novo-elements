import { Component } from '@angular/core';

/**
 * @title Close On Select Chips Example
 */
@Component({
  selector: 'close-on-select-chips-example',
  templateUrl: 'close-on-select-chips-example.html',
  styleUrls: ['close-on-select-chips-example.css'],
})
export class CloseOnSelectChipsExample {
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
