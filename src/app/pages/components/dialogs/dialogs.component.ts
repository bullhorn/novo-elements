import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { DIALOGS_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-dialogs',
  templateUrl: './dialogs.component.html',
  animations: [fadeAnimation],
})
export class DialogsComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation') public classAnimation: boolean = true;

  public name: string = 'Dialogs';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/dialogs';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = DIALOGS_DEMOS;
}
