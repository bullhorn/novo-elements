import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { RADIO_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-radio',
  templateUrl: './radio.component.html',
  animations: [fadeAnimation],
})
export class RadioComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;

  public name: string = 'Radio';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/radio';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = RADIO_DEMOS;
}
