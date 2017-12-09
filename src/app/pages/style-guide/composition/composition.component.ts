import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.scss'],
  animations: [fadeAnimation],
})
export class CompositionComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation') public classAnimation: boolean = true;
}
