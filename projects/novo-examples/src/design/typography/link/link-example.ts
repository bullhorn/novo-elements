// NG2
import { Component } from '@angular/core';

/**
 * @title Link Example
 */
@Component({
  selector: 'link-example',
  templateUrl: './link-example.html',
  styleUrls: ['./link-example.scss'],
})
export class LinkExample {
  alert(message: string) {
    alert(message);
  }
}
