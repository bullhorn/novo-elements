import { Component } from '@angular/core';

/**
 * @title Tip Well with No Button Example
 */
@Component({
  selector: 'html-tip-well-example',
  templateUrl: 'html-tip-well-example.html',
  styleUrls: ['html-tip-well-example.css'],
})
export class HtmlTipWellExample {
  public demoHtmlTip: string = `
    <h2>Title</h2>
    <p>Sed sodales ligula et fermentum bibendum. Aliquam tincidunt sagittis leo eget auctor. Fusce eu sagittis metus, ut viverra magna. Mauris mollis nisl nec libero tincidunt posuere.</p>
    <table>
        <tr>
            <th width="305px">Firstname</th>
            <th width="305px">Lastname</th>
            <th>Age</th>
        </tr>
        <tr>
            <td>Jeff</td>
            <td>Smith</td>
            <td>20</td>
        </tr>
        <tr>
            <td>Seve</td>
            <td>White</td>
            <td>25</td>
        </tr>
    </table>`;

  clearLocalStorage() {
    localStorage.removeItem('novo-tw_Demo');
    location.reload();
  }
}
