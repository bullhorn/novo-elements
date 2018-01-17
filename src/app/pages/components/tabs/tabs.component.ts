import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { TABS_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-tabs',
  templateUrl: './tabs.component.html',
  animations: [fadeAnimation],
})
export class TabsComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;

  public name: string = 'Tabs';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/tabs';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = TABS_DEMOS;
}
