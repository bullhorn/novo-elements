import { Component } from '@angular/core';

/**
 * @title Basic Drop Down
 */
@Component({
  selector: 'basic-drop-down-example',
  templateUrl: 'basic-drop-down-example.html',
  styleUrls: ['basic-drop-down-example.css'],
})
export class BasicDropDownExample {
  public clickMe(event?: string) {
    window.alert(event);
  }
}
