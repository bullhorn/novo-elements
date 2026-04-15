import { Component } from '@angular/core';

/**
 * @title Vertical Radio Buttons
 */
@Component({
    selector: 'vertical-radio-example',
    templateUrl: 'vertical-radio-example.html',
    styleUrls: ['vertical-radio-example.css'],
    standalone: false,
})
export class VerticalRadioExample {
  onChange(change: Event): void {
    console.info('Radio Change:', change);
  }
}
