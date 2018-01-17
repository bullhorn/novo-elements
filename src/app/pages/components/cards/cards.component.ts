import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { CARDS_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-cards',
  templateUrl: './cards.component.html',
  animations: [fadeAnimation],
})
export class CardsComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;

  public name: string = 'Cards';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/cards';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = CARDS_DEMOS;
}
