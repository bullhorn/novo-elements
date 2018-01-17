import { Component } from '@angular/core';

import { IDEAL_COLORS, COLORS } from '../../../../../consts';

@Component({
  selector: 'demo-buttons-icon',
  templateUrl: './icon.html',
})
export class DemoButtonsIconComponent {
  public colors: string[] = COLORS;
  public color: string = IDEAL_COLORS[0];
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

  public changeColor(): void {
    this.color = IDEAL_COLORS[Math.floor(Math.random() * IDEAL_COLORS.length)];
  }
}
