import { Component } from '@angular/core';

/**
 * @title Basic Chips Example
 */
@Component({
  selector: 'basic-chips-example',
  templateUrl: 'basic-chips-example.html',
  styleUrls: ['basic-chips-example.css'],
})
export class BasicChipsExample {
  public staticDemo: {
    options: [
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
      'Wyoming'
    ];
  };
  public placeholder: string = 'Select...';
  public value: any = ['Alabama'];

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
