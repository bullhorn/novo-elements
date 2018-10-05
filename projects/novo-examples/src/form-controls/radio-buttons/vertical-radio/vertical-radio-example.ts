import { Component } from '@angular/core';

/**
 * @title Vertical Radio Buttons
 */
@Component({
  selector: 'vertical-radio-example',
  templateUrl: 'vertical-radio-example.html',
  styleUrls: ['vertical-radio-example.css'],
})
export class VerticalRadioExample {
  onChange(change: Event): void {
    console.log('Radio Change:', change); // tslint:disable-line
  }
}
