import { Component } from '@angular/core';

/**
 * @title Toast with Content Buttons
 */
@Component({
    selector: 'toast-content-buttons-example',
    templateUrl: 'toast-content-buttons-example.html',
    styleUrls: ['toast-content-buttons-example.css'],
    standalone: false,
})
export class ToastContentButtonsExample {
  viewReport() {}

  downloadReport() {}
}
