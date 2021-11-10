import { Component } from '@angular/core';

/**
 * @title Basic Tip Well Example
 */
@Component({
  selector: 'basic-tip-well-example',
  templateUrl: 'basic-tip-well-example.html',
  styleUrls: ['basic-tip-well-example.css'],
})
export class BasicTipWellExample {
  public demoTip: string =
    'Sed sodales ligula et fermentum bibendum. Aliquam tincidunt sagittis leo eget auctor. Fusce eu sagittis metus, ut viverra magna. Mauris mollis nisl nec libero tincidunt posuere.';

  public clearLocalStorage() {
    localStorage.removeItem('novo-tw_Demo');
    location.reload();
  }
}
