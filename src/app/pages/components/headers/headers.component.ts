import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { HEADER_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-headers',
  templateUrl: './headers.component.html',
  animations: [fadeAnimation],
})
export class HeadersComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;

  public name: string = 'Headers';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/headers';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = HEADER_DEMOS;
}
