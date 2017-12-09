import { Component } from '@angular/core';

@Component({
  selector: 'demo-tabs-routing',
  templateUrl: './routing.html',
})
export class DemoTabsRoutingComponent {
  public navLinks: any[] = [
    {
      label: 'Tab 1',
      icon: 'person',
      path: '.',
    }, {
      label: 'Tab 2',
      icon: 'company',
      path: 'menus',
    }, {
      label: 'Tab 3',
      icon: 'caution',
      path: 'cards',
      disabled: true,
    },
  ];
}
