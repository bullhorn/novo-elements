import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { SELECT_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-select',
  templateUrl: './select.component.html',
  animations: [fadeAnimation],
})
export class SelectComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;

  public name: string = 'Select';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/select';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = SELECT_DEMOS;
}
