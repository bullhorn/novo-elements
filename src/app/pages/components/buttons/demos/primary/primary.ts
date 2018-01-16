import { Component } from '@angular/core';

import { COLORS } from '../../../../../consts';

@Component({
  selector: 'demo-buttons-primary',
  templateUrl: './primary.html',
})
export class DemoButtonsPrimaryComponent {
  public colors: string[] = COLORS;
}
