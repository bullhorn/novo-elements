import { Component } from '@angular/core';

/**
 * @title Basic Tabs
 */
@Component({
    selector: 'tabs-basic-example',
    templateUrl: 'tabs-basic-example.html',
    styleUrls: ['tabs-basic-example.css'],
    standalone: false,
})
export class TabsBasicExample {
  tabSelected() {
    console.info('TAB SELECTED');
  }

  tabDeselected() {
    console.info('TAB DESELECTED');
  }
}
