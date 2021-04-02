// NG2
import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'figure-example',
  templateUrl: './figure-example.html',
  styleUrls: ['./figure-example.scss'],
  host: { class: 'figure-example' },
  encapsulation: ViewEncapsulation.None,
})
export class FigureExample {
  @Input()
  theme: string;
  @HostBinding('class')
  get hb_theme() {
    return this.theme ? `figure-theme-${this.theme}` : '';
  }
}
