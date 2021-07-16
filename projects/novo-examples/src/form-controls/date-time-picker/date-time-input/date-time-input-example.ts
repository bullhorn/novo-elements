import { Component } from '@angular/core';

/**
 * @title Date Time Input Example
 */
@Component({
  selector: 'date-time-input-example',
  templateUrl: 'date-time-input-example.html',
  styleUrls: ['date-time-input-example.css'],
})
export class DateTimeInputExample {
  dateTimeInput: Date = new Date('08/01/1983 12:57 PM');
  dateTimeInput2: Date = new Date('08/02/1984 12:57 PM');
  dateTimeInput3: Date = new Date('08/03/1985 12:57 PM');
}
