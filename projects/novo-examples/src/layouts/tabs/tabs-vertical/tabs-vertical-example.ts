import { Component } from '@angular/core';

/**
 * @title Vertical Tabs
 */
@Component({
  selector: 'tabs-vertical-example',
  templateUrl: 'tabs-vertical-example.html',
  styleUrls: ['tabs-vertical-example.css'],
})
export class TabsVerticalExample {
  tabSelected() {
    console.log('TAB SELECTED'); // tslint:disable-line
  }

  tabDeselected() {
    console.log('TAB DESELECTED'); // tslint:disable-line
  }
}
