// NG2
import { Component } from '@angular/core';

/**
 * @title Title Example
 */
@Component({
  selector: 'title-example',
  templateUrl: './title-example.html',
  styleUrls: ['./title-example.scss'],
})
export class TitleExample {
  icons: string[] = ['email', 'bell', 'person', 'caution', 'chart-pie', 'bot', 'certification', 'calendar', 'send', 'coffee'];
  index: number = 0;
  get icon() {
    return this.icons[this.index % this.icons.length];
  }

  changeIcon() {
    console.log('changign icon', this.index);
    this.index++;
  }
}
