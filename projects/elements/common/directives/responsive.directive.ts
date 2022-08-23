// tslint:disable: directive-selector
import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2 } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';

const entriesMap = new WeakMap();

const ro = new ResizeObserver((entries: any[]) => {
  for (const entry of entries) {
    if (entriesMap.has(entry.target)) {
      const comp = entriesMap.get(entry.target);
      comp._resizeCallback(entry);
    }
  }
});

@Directive({ selector: '[responsive]' })
export class ResizeObserverDirective implements OnDestroy {
  @Input() responsive: number[];
  @Input() sizes: string[] = ['size-s', 'size-m', 'size-l', 'size-xl', 'size-xxl'];

  @Output()
  resize = new EventEmitter();

  private size: string;

  constructor(private el: ElementRef, private readonly renderer: Renderer2) {
    const target = this.el.nativeElement;
    entriesMap.set(target, this);
    ro.observe(target);
  }

  _resizeCallback(entry: any) {
    const size = this.responsive.reduce((max, w, idx) => {
      if (entry.contentRect.width > w) {
        max = this.sizes[idx + 1];
      }
      return max;
    }, this.sizes[0]);
    if (size !== this.size) {
      this.renderer.removeClass(this.el.nativeElement, this.size);
      this.renderer.addClass(this.el.nativeElement, size);
      this.size = size;
      this.resize.emit(entry);
    }
  }

  ngOnDestroy() {
    const target = this.el.nativeElement;
    ro.unobserve(target);
    entriesMap.delete(target);
  }
}
