import { Component } from '@angular/core';

/**
 * @title Toast Options Example
 */
@Component({
  selector: 'toast-options-example',
  templateUrl: 'toast-options-example.html',
  styleUrls: ['toast-options-example.css'],
})
export class ToastOptionsExample {
  activeDate = new Date();
  selection: Date[] = [];
}
