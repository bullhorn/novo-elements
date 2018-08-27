import { Component } from '@angular/core';

/**
 * @title Range Example
 */
@Component({
  selector: 'range-example',
  templateUrl: 'range-example.html',
  styleUrls: ['range-example.css'],
})
export class RangeExample {
  public value: any = { startDate: null, endDate: null };
}
