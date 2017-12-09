import { Component } from '@angular/core';

import { COLORS } from '../consts';

@Component({
  selector: 'demo-header-subtitle',
  templateUrl: './subtitle.html',
})
export class DemoHeaderSubTitleComponent {
  public colors: string[] = COLORS;
  public entity: string = 'grapefruit';
}
