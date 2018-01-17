import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { SEARCH_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.scss'],
  animations: [fadeAnimation],
})
export class SearchesComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;

  public name: string = 'Searches';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/search';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = SEARCH_DEMOS;
}
