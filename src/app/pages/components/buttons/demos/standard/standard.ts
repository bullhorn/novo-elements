import { Component } from '@angular/core';

import { COLORS } from '../../../../../consts';

@Component({
  selector: 'demo-buttons-standard',
  templateUrl: './standard.html',
})
export class DemoButtonsStandardComponent {
  public colors: string[] = COLORS;
  public disabled: boolean = false;
  public tiles: any[] = [
    {
      label: 'Enabled',
      value: false,
    },
    {
      label: 'Disabled',
      value: true,
    },
  ];
}
