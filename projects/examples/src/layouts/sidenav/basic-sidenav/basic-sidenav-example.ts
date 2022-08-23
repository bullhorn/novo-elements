import { Component } from '@angular/core';

/**
 * @title Basic Sidenav
 */
@Component({
  selector: 'basic-sidenav-example',
  templateUrl: 'basic-sidenav-example.html',
  styleUrls: ['basic-sidenav-example.css'],
})
export class BasicSidenavExample {
  isMobile = false;
  collapsed = false;
  openWindows = [
    {
      type: 'record',
      accent: 'candidate',
      label: `101 | Ferdinand del Toro`,
    },
    {
      type: 'record',
      accent: 'job',
      label: `101 | Ferdinand del Toro`,
    },
    {
      type: 'list',
      accent: 'company',
      label: `Companies`,
    },
  ];
  constructor() {}
}
