import { Component } from '@angular/core';

/**
 * @title Dynamic buttons
 */
@Component({
  selector: 'button-dynamic-example',
  templateUrl: 'button-dynamic-example.html',
  styleUrls: ['button-dynamic-example.css'],
})
export class ButtonDynamicExample {
  theme: string = 'primary';
  isChecked: boolean = false;
  negativeColor: string = 'negative';
  color: string = 'blue';

  changeTheme() {
    let i = Math.floor(Math.random() * 4);
    this.theme = ['primary', 'secondary', 'dialogue', 'standard', 'icon'][i];
  }
}
