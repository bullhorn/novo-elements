import { Component } from '@angular/core';

/**
 * @title Date Range Input Example
 */
@Component({
  selector: 'date-range-input-example',
  templateUrl: 'date-range-input-example.html',
  styleUrls: ['date-range-input-example.css'],
})
export class DateRangeInputExample {
  selected: any = {
    startDate: null,
    endDate: null,
  };
}
