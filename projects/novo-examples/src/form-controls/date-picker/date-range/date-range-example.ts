import { Component } from '@angular/core';

/**
 * @title Date Range Example
 */
@Component({
  selector: 'date-range-example',
  templateUrl: 'date-range-example.html',
  styleUrls: ['date-range-example.css'],
})
export class DateRangeExample {
  rangeOne: any = {
    startDate: null,
    endDate: null,
  };
  rangeTwo: any = {
    startDate: null,
    endDate: null,
  };
}
