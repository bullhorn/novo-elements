import { Component } from '@angular/core';

/**
 * @title Scrollable Drop Down
 */
@Component({
  selector: 'scrollable-drop-down-example',
  templateUrl: 'scrollable-drop-down-example.html',
  styleUrls: ['scrollable-drop-down-example.css'],
})
export class ScrollableDropDownExample {
  public clickMe(event?: string) {
    window.alert(event);
  }
}
