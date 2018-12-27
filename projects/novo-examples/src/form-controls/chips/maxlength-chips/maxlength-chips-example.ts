import { Component } from '@angular/core';

/**
 * @title Maxlength Chips Example
 */
@Component({
  selector: 'maxlength-chips-example',
  templateUrl: 'maxlength-chips-example.html',
  styleUrls: ['maxlength-chips-example.css'],
})
export class MaxlengthChipsExample {
  public maxlengthDemo: any;
  public placeholder: string = 'Select...';
  public value: any;

  constructor() {
    let options = [
      'Apples',
      'Bananas',
      'Blueberries',
      'Grapes',
      'Mangoes',
      'Oranges',
      'Peaches',
      'Pears',
      'Pineapples',
      'Raspberries',
      'Strawberries',
    ];

    this.maxlengthDemo = {
      options: options,
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
