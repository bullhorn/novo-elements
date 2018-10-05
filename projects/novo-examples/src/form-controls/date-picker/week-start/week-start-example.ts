import { Component } from '@angular/core';

/**
 * @title Week Start Example
 */
@Component({
  selector: 'week-start-example',
  templateUrl: 'week-start-example.html',
  styleUrls: ['week-start-example.css'],
})
export class WeekStartExample {
  weekStartDate: Date = new Date();
  weekStart: number = 0;

  setWeekStart(num: number): void {
    this.weekStart = num;
  }
}
