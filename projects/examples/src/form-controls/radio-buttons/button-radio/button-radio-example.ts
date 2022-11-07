import { Component } from '@angular/core';

/**
 * @title Radio Button with Buttons
 */
@Component({
  selector: 'button-radio-example',
  templateUrl: 'button-radio-example.html',
  styleUrls: ['button-radio-example.css'],
})
export class ButtonRadioExample {
  onChange(change: Event): void {
    console.log('Radio Change:', change); // tslint:disable-line
  }
}
