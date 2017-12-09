import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../../app.animations';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  animations: [fadeAnimation],
})
export class ColorComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation') public classAnimation: boolean = true;
}
