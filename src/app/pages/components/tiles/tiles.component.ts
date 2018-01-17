import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { TILES_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-tiles',
  templateUrl: './tiles.component.html',
  animations: [fadeAnimation],
})
export class TilesComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;

  public name: string = 'Tiles';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/tiles';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = TILES_DEMOS;
}
