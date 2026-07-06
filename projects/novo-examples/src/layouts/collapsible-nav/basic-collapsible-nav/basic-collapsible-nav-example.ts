import { Component } from '@angular/core';

/**
 * @title Basic Collapsible Nav
 */
@Component({
    selector: 'basic-collapsible-nav-example',
    templateUrl: 'basic-collapsible-nav-example.html',
    styleUrls: ['basic-collapsible-nav-example.css'],
    standalone: false,
})
export class BasicCollapsibleNavExample {
  collapsed = false;
  openWindows = [
    {
      accent: 'candidate',
      label: '101 | Ferdinand del Toro',
    },
    {
      accent: 'job',
      label: '101 | Ferdinand del Toro',
    },
    {
      accent: 'company',
      label: 'Companies',
    },
  ];
}
