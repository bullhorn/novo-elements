// NG2
import { AfterViewInit, Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { HighlightJS } from '../highlight.service';

@Component({
  selector: 'figure-example',
  templateUrl: './figure-example.html',
  styleUrls: ['./figure-example.scss'],
  host: { class: 'figure-example' },
  encapsulation: ViewEncapsulation.None,
})
export class FigureExample implements AfterViewInit {
  @Input()
  theme: string;

  @HostBinding('class')
  get hb_theme() {
    return this.theme ? `figure-theme-${this.theme}` : '';
  }
  constructor(private element: ElementRef, private hljs: HighlightJS) {}

  ngAfterViewInit() {
    console.log('View Init');
    this.element.nativeElement.querySelectorAll('code').forEach((el) => {
      setTimeout(() => this.hljs.highlightBlock(el), 300);
    });
  }
}
