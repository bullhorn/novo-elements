import { Component } from '@angular/core';

/**
 * @title Tip Well with HTML Example
 */
@Component({
  selector: 'html-tip-well-example',
  templateUrl: 'html-tip-well-example.html',
  styleUrls: ['html-tip-well-example.css'],
})
export class HtmlTipWellExample {
  public demoHtmlTip: string = `
    <h2>Title</h2>
    <p>
      <div style="color:red">This text is RED</div>
      <div><b>This text is BOLD</b></div>
      <div><i>This text is ITALIC</i></div>
    </p>
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
            <td>Steve</td>
            <td>White</td>
            <td>25</td>
        </tr>
    </table>`;

  clearLocalStorage() {
    localStorage.removeItem('novo-tw_Demo');
    location.reload();
  }
}
