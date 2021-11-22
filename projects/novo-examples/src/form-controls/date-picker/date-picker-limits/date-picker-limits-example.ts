import { Component } from '@angular/core';
import { NovoLabelService } from 'novo-elements';

/**
 * @title Date picker limits Example
 */
@Component({
  selector: 'date-picker-limits-example',
  templateUrl: 'date-picker-limits-example.html',
  styleUrls: ['date-picker-limits-example.css'],
})
export class DatePickerLimitsExample {
  startDate: Date = new Date();
  endDate: Date = new Date();
  tooltip: String = 'this is a disabled date tooltip';
}
