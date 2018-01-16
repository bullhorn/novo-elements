import { Component } from '@angular/core';

import { IDEAL_COLORS, COLORS } from '../../../../../consts';

@Component({
  selector: 'demo-buttons-icon',
  templateUrl: './icon.html',
})
export class DemoButtonsIconComponent {
  public colors: string[] = COLORS;
  public color: string = IDEAL_COLORS[0];

  public changeColor(): void {
    this.color = IDEAL_COLORS[Math.floor(Math.random() * IDEAL_COLORS.length)];
  }
}
