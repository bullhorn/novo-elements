import { Component } from '@angular/core';
import { NovoDropdownElement, NovoItemElement } from 'novo-elements';

/**
 * @title Submenu Drop Down
 */
@Component({
  selector: 'submenu-drop-down-example',
  templateUrl: 'submenu-drop-down-example.html',
  styleUrls: ['submenu-drop-down-example.css'],
})
export class SubmenuDropDownExample {
  public clickMe(event?: string) {
    window.alert(event);
  }

  public SUBMENU_ITEMS: string[] = [
    'Submenu Item 1',
    'Submenu Item 2'
  ];

  public submenuClick(event?: string) {
    window.alert(`Submenu clicked: ${event}`);
  }
}
