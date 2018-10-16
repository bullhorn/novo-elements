import { Component } from '@angular/core';

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

    this.entityDemo = {
      options: collaborators,
      format: '$firstName $lastName',
      entityIcon: 'person',
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
