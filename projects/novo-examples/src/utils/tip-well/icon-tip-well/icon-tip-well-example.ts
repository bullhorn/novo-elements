import { Component } from '@angular/core';

/**
 * @title Tip Well with Icon Example
 */
@Component({
  selector: 'icon-tip-well-example',
  templateUrl: 'icon-tip-well-example.html',
  styleUrls: ['icon-tip-well-example.css'],
})
export class IconTipWellExample {
  public demoTip: string =
    'Sed sodales ligula et fermentum bibendum. Aliquam tincidunt sagittis leo eget auctor. Fusce eu sagittis metus, ut viverra magna. Mauris mollis nisl nec libero tincidunt posuere.';

  clearLocalStorage() {
    localStorage.removeItem('novo-tw_Demo');
    location.reload();
  }
}
