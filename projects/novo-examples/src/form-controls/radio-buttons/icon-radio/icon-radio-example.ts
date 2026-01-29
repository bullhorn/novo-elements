import { Component } from '@angular/core';

/**
 * @title Radio Buttons with Icons
 */
@Component({
    selector: 'icon-radio-example',
    templateUrl: 'icon-radio-example.html',
    styleUrls: ['icon-radio-example.css'],
    standalone: false,
})
export class IconRadioExample {
  onChange(change: Event): void {
    console.info('Radio Change:', change);
  }
}
