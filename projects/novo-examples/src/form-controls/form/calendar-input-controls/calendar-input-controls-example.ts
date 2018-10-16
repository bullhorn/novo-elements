import { Component } from '@angular/core';

// Vendor
import { FormUtils, DateControl, TimeControl, DateTimeControl } from 'novo-elements';

// import { MockMeta, MockMetaHeaders } from './MockMeta';

/**
 * @title Calendar Input Controls Example
 */
@Component({
  selector: 'calendar-input-controls-example',
  templateUrl: 'calendar-input-controls-example.html',
  styleUrls: ['calendar-input-controls-example.css'],
})
export class CalendarInputControlsExample {
  public dateControl: any;
  public userDefinedDateControl: DateControl;
  public timeControl: any;
  public dateTimeControl: any;
  public calendarForm: any;

  constructor(private formUtils: FormUtils) {
    // Calendar input controls
    this.dateControl = new DateControl({
      key: 'date',
      label: 'Date',
      tooltip: 'Date',
      startDate: new Date().setMonth(new Date().getMonth() - 1),
    });
    this.userDefinedDateControl = new DateControl({
      key: 'userDefinedFormat',
      label: 'User Defined Format',
      tooltip: 'Date',
      dateFormat: 'MMM Do YYYY (dd)',
      textMaskEnabled: false,
    });
    this.timeControl = new TimeControl({ key: 'time', label: 'Time', tooltip: 'Time' });
    this.dateTimeControl = new DateTimeControl({ key: 'dateTime', tooltip: 'Date Time', label: 'Date Time', military: true });
    this.calendarForm = formUtils.toFormGroup([this.dateControl, this.userDefinedDateControl, this.timeControl, this.dateTimeControl]);
  }
}
