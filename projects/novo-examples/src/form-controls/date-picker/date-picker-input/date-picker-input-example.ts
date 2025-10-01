import { Component } from '@angular/core';

/**
 * @title Date Picker Input Example
 */
@Component({
    selector: 'date-picker-input-example',
    templateUrl: 'date-picker-input-example.html',
    styleUrls: ['date-picker-input-example.css'],
    standalone: false
})
export class DatePickerInputExample {
  selected: Date = new Date();
}
