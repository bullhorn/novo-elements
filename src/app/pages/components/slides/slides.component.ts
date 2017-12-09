import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { SLIDES_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-slides',
  templateUrl: './slides.component.html',
  animations: [fadeAnimation],
})
export class SlidesComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation') public classAnimation: boolean = true;

  public name: string = 'slides';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/slides';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = SLIDES_DEMOS;
}
