import { Component } from '@angular/core';

/**
 * @title Calendar Example
 */
@Component({
    selector: 'calendar-example',
    templateUrl: 'calendar-example.html',
    styleUrls: ['calendar-example.css'],
    standalone: false,
})
export class CalendarExample {
  activeDate = new Date();
  selection: Date[] = [];
}
