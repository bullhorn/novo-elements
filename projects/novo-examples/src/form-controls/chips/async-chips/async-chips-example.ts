import { Component } from '@angular/core';

/**
 * @title Async Chips Example
 */
@Component({
  selector: 'async-chips-example',
  templateUrl: 'async-chips-example.html',
  styleUrls: ['async-chips-example.css'],
})
export class AsyncChipsExample {
  public async: any;
  public value: any;
  public placeholder: string = 'Select...';

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
    let abbrieviated = [
      {
        value: 'USA',
        label: 'United States',
      },
      {
        value: 'GB',
        label: 'Great Britain',
      },
      {
        value: 'CA',
        label: 'Canada',
      },
      {
        value: 'AU',
        label: 'Austrailia',
      },
    ];
    this.async = {
      options: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(abbrieviated);
          }, 300);
        });
      },
      getLabels: (data) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            let values = data.map((item) => item.value);
            let results = abbrieviated.filter((item) => values.includes(item.value));
            resolve(results);
          }, 300);
        });
      },
    };
    this.value = [
      {
        value: 'USA',
      },
      {
        value: 'GB',
      },
    ];
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
