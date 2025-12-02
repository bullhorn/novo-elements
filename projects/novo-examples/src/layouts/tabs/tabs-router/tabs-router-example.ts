import { Component } from '@angular/core';

/**
 * @title Tabs for Navigation
 */
@Component({
    selector: 'tabs-router-example',
    templateUrl: 'tabs-router-example.html',
    styleUrls: ['tabs-router-example.css'],
    standalone: false
})
export class TabsRouterExample {
  tabSelected() {
    console.info('TAB SELECTED');
  }

  tabDeselected() {
    console.info('TAB DESELECTED');
  }
}
