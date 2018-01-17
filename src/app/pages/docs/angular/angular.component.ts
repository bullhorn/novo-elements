import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations: [fadeAnimation],
})
export class AngularComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;
}
