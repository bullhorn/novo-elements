import { Component } from '@angular/core';

/**
 * @title Condensed Tabs
 */
@Component({
  selector: 'tabs-condensed-example',
  templateUrl: 'tabs-condensed-example.html',
  styleUrls: ['tabs-condensed-example.css'],
})
export class TabsCondensedExample {
  tabSelected() {
    console.log('TAB SELECTED'); // tslint:disable-line
  }

  tabDeselected() {
    console.log('TAB DESELECTED'); // tslint:disable-line
  }
}
