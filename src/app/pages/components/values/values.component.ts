import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { VALUES_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-values',
  templateUrl: './values.component.html',
  animations: [fadeAnimation],
})
export class ValuesComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation') public classAnimation: boolean = true;

  public name: string = 'Values';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/value';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = VALUES_DEMOS;
}
