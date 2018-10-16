import { Component } from '@angular/core';

/**
 * @title Default Options Picker Example
 */
@Component({
  selector: 'default-options-picker-example',
  templateUrl: 'default-options-picker-example.html',
  styleUrls: ['default-options-picker-example.css'],
})
export class DefaultOptionsPickerExample {
  public placeholder: string = 'Select...';
  public defaultArrayConfig: any;
  public defaultFunctionConfig: any;
  public defaultArrayValue: string;
  public defaultFunctionValue: string;
  public value: string;

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

    this.defaultArrayConfig = {
      defaultOptions: [states[0], states[1]],
      minSearchLength: 2,
      options: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(states);
          }, 300);
        });
      },
    };
    this.defaultFunctionConfig = {
      minSearchLength: 2,
      defaultOptions: () => {
        return [states[2], states[3]];
      },
      options: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(states);
          }, 300);
        });
      },
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
