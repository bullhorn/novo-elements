import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';

@Component({
  selector: 'app-iconography',
  templateUrl: './iconography.component.html',
  styleUrls: ['./iconography.component.scss'],
  animations: [fadeAnimation],
})
export class IconographyComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;
}
