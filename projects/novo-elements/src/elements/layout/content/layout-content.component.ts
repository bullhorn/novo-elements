import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Inject,
  NgZone,
  ViewEncapsulation,
} from '@angular/core';
import { NovoLayoutContainer } from '../container/layout-container.component';

@Component({
  selector: 'novo-layout-content',
  exportAs: 'novoLayoutContent',
  template: '<ng-content></ng-content>',
  host: {
    class: 'novo-layout-content',
    '[style.margin-left.px]': '_container._contentMargins.left',
    '[style.margin-right.px]': '_container._contentMargins.right',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NovoLayoutContent extends CdkScrollable implements AfterContentInit {
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(forwardRef(() => NovoLayoutContainer)) public _container: NovoLayoutContainer,
    elementRef: ElementRef<HTMLElement>,
    scrollDispatcher: ScrollDispatcher,
    ngZone: NgZone,
  ) {
    super(elementRef, scrollDispatcher, ngZone);
  }

  ngAfterContentInit() {
    this._container._contentMarginChanges.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });
  }
}
