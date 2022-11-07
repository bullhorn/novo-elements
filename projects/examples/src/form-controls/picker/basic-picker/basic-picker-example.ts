import { Component } from '@angular/core';

/**
 * @title Basic Picker Example
 */
@Component({
  selector: 'basic-picker-example',
  templateUrl: 'basic-picker-example.html',
  styleUrls: ['basic-picker-example.css'],
})
export class BasicPickerExample {
  public placeholder: string = 'Select...';
  public staticDemo: any = {
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
      'Wyoming',
    ],
  };
  public value: string;

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
