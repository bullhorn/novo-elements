import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'novo-rail',
  template: `
    <div class="novo-rail-contents">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    class: 'novo-rail',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NovoRailComponent extends CdkScrollable implements AfterContentInit {
  constructor(elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, ngZone: NgZone) {
    super(elementRef, scrollDispatcher, ngZone);
  }

  ngAfterContentInit() {}
}
