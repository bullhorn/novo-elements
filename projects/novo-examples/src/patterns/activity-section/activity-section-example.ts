import { Component } from '@angular/core';

/**
 * @title Activity Section
 */
@Component({
  selector: 'activity-section-example',
  templateUrl: 'activity-section-example.html',
  styleUrls: ['activity-section-example.css'],
})
export class ActivitySectionExample {
  public isDisabled: boolean = true;
  public details: any;

  constructor() {}
}
