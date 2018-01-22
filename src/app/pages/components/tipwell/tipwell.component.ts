import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { TIPWELL_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-tipwell',
  templateUrl: './tipwell.component.html',
  animations: [fadeAnimation],
})
export class TipwellComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation') public classAnimation: boolean = true;

  public name: string = 'Tipwell';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/tipwell';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = TIPWELL_DEMOS;

  public clearLocalStorage(): void {
      localStorage.removeItem('novo-tw_Demo');
      location.reload();
  }
}
