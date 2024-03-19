import { Component } from '@angular/core';

/**
 * @title Hide Chips Example
 */
@Component({
  selector: 'hide-chips-example',
  templateUrl: 'hide-chips-example.html',
  styleUrls: ['hide-chips-example.css'],
})
export class HideChipsExample {
  public placeholder: string = 'Select...';
  public value: any;
  public hideDemo: any;
  public model: any;

  constructor() {
    const collaborators = [
      {
        id: 1,
        firstName: 'Brian',
        lastName: 'Kimball',
        searchEntity: 'candidate',
      },
      {
        id: 2,
        firstName: 'Josh',
        lastName: 'Godi',
        searchEntity: 'contact',
      },
      {
        id: 3,
        firstName: 'Alec',
        lastName: 'Sibilia',
        searchEntity: 'candidate',
      },
      {
        id: 4,
        firstName: 'Kameron',
        lastName: 'Sween',
        searchEntity: 'candidate',
      },
      {
        id: 5,
        firstName: 'Emily',
        lastName: 'Jones',
        searchEntity: 'candidate',
      },
      {
        id: 6,
        firstName: 'Michael',
        lastName: 'Smith',
        searchEntity: 'contact',
      },
      {
        id: 7,
        firstName: 'Sophia',
        lastName: 'Johnson',
        searchEntity: 'candidate',
      },
      {
        id: 8,
        firstName: 'Ethan',
        lastName: 'Brown',
        searchEntity: 'contact',
      },
      {
        id: 9,
        firstName: 'Isabella',
        lastName: 'Williams',
        searchEntity: 'candidate',
      },
      {
        id: 10,
        firstName: 'Jacob',
        lastName: 'Davis',
        searchEntity: 'contact',
      },
      {
        id: 11,
        firstName: 'Mia',
        lastName: 'Miller',
        searchEntity: 'candidate',
      },
      {
        id: 12,
        firstName: 'Alexander',
        lastName: 'Wilson',
        searchEntity: 'contact',
      },
      {
        id: 13,
        firstName: 'Charlotte',
        lastName: 'Taylor',
        searchEntity: 'candidate',
      },
      {
        id: 14,
        firstName: 'William',
        lastName: 'Anderson',
        searchEntity: 'contact',
      },
      {
        id: 15,
        firstName: 'Amelia',
        lastName: 'Martinez',
        searchEntity: 'candidate',
      },
      {
        id: 16,
        firstName: 'Daniel',
        lastName: 'Jackson',
        searchEntity: 'contact',
      },
    ];
    this.hideDemo = {
      format: '$firstName $lastName',
      options: collaborators,
      hideChipsLimit: 3
    };

    this.model = [];
  }

  onChanged(event) {
    console.log('EVENT', event);
  }
}
