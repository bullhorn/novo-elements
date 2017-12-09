import { Component } from '@angular/core';

import { COLORS } from '../consts';

@Component({
  selector: 'demo-header-standard',
  templateUrl: './standard.html',
})
export class DemoHeaderStandardComponent {
  public colors: string[] = COLORS;
  public entity: string = 'candidate';
}
