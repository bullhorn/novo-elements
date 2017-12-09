import { Component } from '@angular/core';

import { COLORS } from '../consts';

@Component({
  selector: 'demo-buttons-standard',
  templateUrl: './standard.html',
})
export class DemoButtonsStandardComponent {
  public colors: string[] = COLORS;
}
