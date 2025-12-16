import { Component } from '@angular/core';

/**
 * @title Colorful Tabs
 */
@Component({
    selector: 'tabs-color-example',
    templateUrl: 'tabs-color-example.html',
    styleUrls: ['tabs-color-example.css'],
    standalone: false
})
export class TabsColorExample {
  public selected = 1;

  tabSelected() {
    console.info('TAB SELECTED');
  }

  tabDeselected() {
    console.info('TAB DESELECTED');
  }

  updateTabIndex(value: number) {
    this.selected += value;
  }
}
