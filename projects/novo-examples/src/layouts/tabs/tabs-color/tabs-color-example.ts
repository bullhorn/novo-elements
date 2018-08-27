import { Component } from '@angular/core';

/**
 * @title Colorful Tabs
 */
@Component({
  selector: 'tabs-color-example',
  templateUrl: 'tabs-color-example.html',
  styleUrls: ['tabs-color-example.css'],
})
export class TabsColorExample {
  tabSelected() {
    console.log('TAB SELECTED'); // tslint:disable-line
  }

  tabDeselected() {
    console.log('TAB DESELECTED'); // tslint:disable-line
  }
}
