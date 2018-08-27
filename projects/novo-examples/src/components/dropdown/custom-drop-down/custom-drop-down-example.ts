import { Component } from '@angular/core';

/**
 * @title Custom Drop Down
 */
@Component({
  selector: 'custom-drop-down-example',
  templateUrl: 'custom-drop-down-example.html',
  styleUrls: ['custom-drop-down-example.css'],
})
export class CustomDropDownExample {
  public clickMe(event?: string) {
    window.alert(event);
  }
}
