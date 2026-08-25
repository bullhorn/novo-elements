import { Component } from '@angular/core';
import { CollapsibleNavExpansionEvent } from 'novo-elements';

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
      label: 'Bob del Toro',
    },
    {
      accent: 'job',
      label: 'UX Designer',
    },
    {
      accent: 'company',
      label: 'Companies',
    },
  ];

  onManualExpansion(event: CollapsibleNavExpansionEvent) {
    // Do not expand early if a user clicked on a collapsed option (demo of modifying early-expansion rules)
    if ((event.srcEvent.target as HTMLElement).matches('novo-option, novo-option *')) {
      event.preventExpand();
    }
  }
}
