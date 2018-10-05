import { Component } from '@angular/core';

/**
 * @title Override Template Example
 */
@Component({
  selector: 'override-template-example',
  templateUrl: 'override-template-example.html',
  styleUrls: ['override-template-example.css'],
})
export class OverrideTemplateExample {
  public placeholder: string = 'Select...';
  public overrideValue: any;
  public overrideDemo: any;

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

    this.overrideDemo = {
      options: states,
      overrideTemplate: '<h1>{{ match | json }}</h1>',
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
