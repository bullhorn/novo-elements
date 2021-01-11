import { Component } from '@angular/core';

/**
 * @title Basic Menu
 */
@Component({
  selector: 'basic-menu-example',
  templateUrl: 'basic-menu-example.html',
  styleUrls: ['basic-menu-example.css'],
})
export class BasicMenuExample {
  public clickMe(event?: string) {
    window.alert(event);
  }
}
