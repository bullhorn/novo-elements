import { Component } from '@angular/core';

@Component({
  selector: 'demo-select-data',
  templateUrl: './data.html',
})
export class DemoSelectDataComponent {
  public placeholder: string = 'Please Select...';
  public options: string[] = ['Alpha', 'Bravo', 'Charlie'];
  public withNumbers: any[] = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Zero', value: 0 },
    { label: 'Four', value: 4, readOnly: true },
  ];
  public withNumbersValue: number = 4;
  public value: string = 'Bravo';
  // tslint:disable-next-line:max-line-length
  public states: string[] = [
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
  public state: any = 'Missouri';
}
