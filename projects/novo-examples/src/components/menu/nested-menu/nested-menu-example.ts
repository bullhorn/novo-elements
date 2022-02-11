import { Component } from '@angular/core';

/**
 * @title Nested Menu
 */
@Component({
  selector: 'nested-menu-example',
  templateUrl: 'nested-menu-example.html',
  styleUrls: ['nested-menu-example.css'],
})
export class NestedMenuExample {
  public clickMe(event?: string) {
    window.alert(event);
  }
}
