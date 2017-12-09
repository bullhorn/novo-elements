import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../app.animations';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  animations: [fadeAnimation],
})
export class DocsComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation') public classAnimation: boolean = true;
}
