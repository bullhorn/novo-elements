import { Component } from '@angular/core';

import { COLORS, IDEAL_COLORS } from '../../../../../consts';

@Component({
  selector: 'demo-buttons-secondary',
  templateUrl: './secondary.html',
})
export class DemoButtonsSecondaryComponent {
  public color: string = IDEAL_COLORS[0];
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

  public changeColor(): void {
    this.color = IDEAL_COLORS[Math.floor(Math.random() * IDEAL_COLORS.length)];
  }
}
