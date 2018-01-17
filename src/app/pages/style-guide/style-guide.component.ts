import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../app.animations';

@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.component.html',
  styleUrls: ['./style-guide.component.scss'],
  animations: [fadeAnimation],
})
export class StyleGuideComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation')
  public classAnimation: boolean = true;
}
