import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../app.animations';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeAnimation],
})
export class HomeComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;
}
