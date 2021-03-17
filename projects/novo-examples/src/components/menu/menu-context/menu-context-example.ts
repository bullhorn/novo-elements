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
  public apple = 'Context is Apples';
  public orange = 'Context is Orange';
  public isOrange = (item) => item === this.orange;

  public clickMe(event?: string) {
    window.alert(event);
  }
}
