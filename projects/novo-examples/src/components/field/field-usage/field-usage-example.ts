import { Component } from '@angular/core';

/**
 * @title Field Usage Example
 */
@Component({
  selector: 'field-usage-example',
  templateUrl: 'field-usage-example.html',
  styleUrls: ['field-usage-example.css'],
})
export class FieldUsageExample {
  time = '14:00';
  date = new Date();
  date2;
  daterange;
}
