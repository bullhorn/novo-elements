import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';

@Component({
  selector: 'app-customizing',
  templateUrl: './customizing.component.html',
  styleUrls: ['./customizing.component.scss'],
  animations: [fadeAnimation],
})
export class CustomizingComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;
}
