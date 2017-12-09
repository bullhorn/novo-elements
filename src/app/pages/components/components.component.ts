import { Component, HostBinding } from '@angular/core';

import { fadeAnimation } from '../../app.animations';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  animations: [fadeAnimation],
})
export class ComponentsComponent {
  @HostBinding('@routeAnimation') public routeAnimation: boolean = true;
  @HostBinding('class.demo-route-animation') public classAnimation: boolean = true;
}
