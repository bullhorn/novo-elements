import { Component } from '@angular/core';

/**
 * @title Vertical Tabs
 */
@Component({
    selector: 'tabs-vertical-example',
    templateUrl: 'tabs-vertical-example.html',
    styleUrls: ['tabs-vertical-example.css'],
    standalone: false,
})
export class TabsVerticalExample {
  tabSelected() {
    console.info('TAB SELECTED');
  }

  tabDeselected() {
    console.info('TAB DESELECTED');
  }
}
