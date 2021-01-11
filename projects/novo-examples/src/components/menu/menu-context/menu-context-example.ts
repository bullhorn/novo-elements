import { Component } from '@angular/core';

/**
 * @title Menu Context
 */
@Component({
  selector: 'menu-context-example',
  templateUrl: 'menu-context-example.html',
  styleUrls: ['menu-context-example.css'],
})
export class MenuContextExample {
  public reference = 'The Menu Context';
  public clickMe(event?: string) {
    window.alert(event);
  }
}
