import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { SWITCH_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.scss'],
  animations: [fadeAnimation],
})
export class SwitchesComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;

  public name: string = 'Switches';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/switch';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = SWITCH_DEMOS;
}
