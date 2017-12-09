import { Component } from '@angular/core';

import { COLORS } from '../consts';

const HEADER_COLORS: string[] = ['blue', 'green', 'yellow', 'orange', 'red', 'purple'];

@Component({
  selector: 'demo-buttons-secondary',
  templateUrl: './secondary.html',
})
export class DemoButtonsSecondaryComponent {
  public color: string = 'blue';
  public colors: string[] = COLORS;

  public changeColor(): void {
    let idx: number = HEADER_COLORS.indexOf(this.color);
    this.color = HEADER_COLORS[idx + 1];
  }
}
