import { Component } from '@angular/core';

/**
 * @title Condensed Tabs
 */
@Component({
    selector: 'tabs-condensed-example',
    templateUrl: 'tabs-condensed-example.html',
    styleUrls: ['tabs-condensed-example.css'],
    standalone: false,
})
export class TabsCondensedExample {
  tabSelected() {
    console.info('TAB SELECTED');
  }

  tabDeselected() {
    console.info('TAB DESELECTED');
  }
}
