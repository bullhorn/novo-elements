import { Component } from '@angular/core';

/**
 * @title Menu Context
 */
@Component({
    selector: 'menu-context-example',
    templateUrl: 'menu-context-example.html',
    styleUrls: ['menu-context-example.css'],
    standalone: false,
})
export class MenuContextExample {
  public apple = 'Context is Apples';
  public orange = 'Context is Orange';
  public isOrange = (item) => item === this.orange;

  public clickMe(item?: any, event?: any) {
    const menuItem = event?.target?.textContent || 'Menu item';
    const context = item || 'unknown';
    window.alert(`You selected: ${menuItem.trim()} (${context})`);
  }
}
