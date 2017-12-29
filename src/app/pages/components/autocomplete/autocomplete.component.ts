import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';
import { AUTOCOMPLETE_DEMOS } from './demos';

let usageDoc: string = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'demo-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  animations: [fadeAnimation],
})
export class AutocompleteComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation') public classAnimation: boolean = true;

  public name: string = 'AutoComplete';
  public src: string = 'https://github.com/bullhorn/novo-elements-3.0/tree/master/src/platform/core/components/autocomplete';
  public usageDoc: string = usageDoc;
  public demos: DEMOS = AUTOCOMPLETE_DEMOS;
}
