import { Component } from '@angular/core';

import { COLORS } from '../consts';

const HEADER_COLORS: string[] = ['blue', 'green', 'yellow', 'orange', 'red', 'purple'];

@Component({
  selector: 'demo-buttons-icon',
  templateUrl: './icon.html',
})
export class DemoButtonsIconComponent {
  public colors: string[] = COLORS;
  public color: string = 'blue';

  public changeColor(): void {
    let idx: number = HEADER_COLORS.indexOf(this.color);
    this.color = HEADER_COLORS[idx + 1];
  }
}
