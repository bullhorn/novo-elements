import { Component } from '@angular/core';

/**
 * @title Date Time Example
 */
@Component({
  selector: 'date-time-example',
  templateUrl: 'date-time-example.html',
  styleUrls: ['date-time-example.css'],
})
export class DateTimeExample {
  dateTime: Date = new Date('12/04/1987');
}
