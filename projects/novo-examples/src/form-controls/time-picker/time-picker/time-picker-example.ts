import { Component } from '@angular/core';

/**
 * @title Time Picker Example
 */
@Component({
  selector: 'time-picker-example',
  templateUrl: 'time-picker-example.html',
  styleUrls: ['time-picker-example.css'],
})
export class TimePickerExample {
  time: Date = new Date();
}
