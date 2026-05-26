import { Component } from '@angular/core';

/**
 * @title Basic Menu
 */
@Component({
    selector: 'basic-menu-example',
    templateUrl: 'basic-menu-example.html',
    styleUrls: ['basic-menu-example.css'],
    standalone: false,
})
export class BasicMenuExample {
  public clickMe(event?: any) {
    const menuItem = event?.target?.textContent || 'Menu item';
    window.alert(`You selected: ${menuItem.trim()}`);
  }
}
