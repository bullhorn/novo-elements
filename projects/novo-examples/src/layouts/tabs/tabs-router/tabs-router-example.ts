import { Component } from '@angular/core';

/**
 * @title Tabs for Navigation
 */
@Component({
  selector: 'tabs-router-example',
  templateUrl: 'tabs-router-example.html',
  styleUrls: ['tabs-router-example.css'],
})
export class TabsRouterExample {
  tabSelected() {
    console.log('TAB SELECTED'); // tslint:disable-line
  }

  tabDeselected() {
    console.log('TAB DESELECTED'); // tslint:disable-line
  }
}
