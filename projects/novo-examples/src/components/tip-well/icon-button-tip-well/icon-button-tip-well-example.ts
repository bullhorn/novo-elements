import { Component } from '@angular/core';

/**
 * @title Icon Button Tip Well Example
 * @description Tip well with an icon-themed close button. Useful for compact layouts where the button should appear as an icon rather than a traditional button.
 */
@Component({
    selector: 'icon-button-tip-well-example',
    templateUrl: 'icon-button-tip-well-example.html',
    styleUrls: ['icon-button-tip-well-example.css'],
    standalone: false,
})
export class IconButtonTipWellExample {
  public demoTip: string =
    'Sed sodales ligula et fermentum bibendum. Aliquam tincidunt sagittis leo eget auctor. Fusce eu sagittis metus, ut viverra magna. Mauris mollis nisl nec libero tincidunt posuere.';

  public clearLocalStorage() {
    localStorage.removeItem('novo-tw_IconButtonDemo');
    location.reload();
  }
}
