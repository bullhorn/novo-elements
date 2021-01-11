import { Component } from '@angular/core';
import { addDays } from 'date-fns';

/**
 * @title Standalone Example
 */
@Component({
  selector: 'standalone-calendar-example',
  templateUrl: 'standalone-calendar-example.html',
  styleUrls: ['standalone-calendar-example.css'],
})
export class StandaloneCalendarExample {
  selected: Date[] = [addDays(new Date(), 0), addDays(new Date(), 1), addDays(new Date(), 3), addDays(new Date(), 5)];
  preview: Date[] = [addDays(new Date(), 2), addDays(new Date(), 4), addDays(new Date(), 6)];
}
