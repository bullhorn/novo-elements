import { Component } from '@angular/core';

/**
 * @title Basic Tabs
 */
@Component({
  selector: 'tabs-basic-example',
  templateUrl: 'tabs-basic-example.html',
  styleUrls: ['tabs-basic-example.css'],
})
export class TabsBasicExample {
  tabSelected() {
    console.log('TAB SELECTED'); // tslint:disable-line
  }

  tabDeselected() {
    console.log('TAB DESELECTED'); // tslint:disable-line
  }
}
