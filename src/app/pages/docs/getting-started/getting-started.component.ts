import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  animations: [fadeAnimation],
})
export class GettingStartedComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation') public classAnimation: boolean = true;
}
