import { Component } from '@angular/core';

import { COLORS } from '../consts';

@Component({
  selector: 'demo-buttons-dialogue',
  templateUrl: './dialogue.html',
})
export class DemoButtonsDialogueComponent {
  public colors: string[] = COLORS;
}
