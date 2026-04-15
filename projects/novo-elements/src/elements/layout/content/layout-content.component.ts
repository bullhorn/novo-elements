import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  Inject,
  NgZone,
  ViewEncapsulation,
} from '@angular/core';
import { NOVO_LAYOUT_CONTAINER } from '../layout.constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'novo-layout-content',
    exportAs: 'novoLayoutContent',
    template: '<ng-content></ng-content>',
    host: {
        class: 'novo-layout-content',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: false,
})
export class NovoLayoutContent extends CdkScrollable implements AfterContentInit {
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(NOVO_LAYOUT_CONTAINER) public _container: any,
    elementRef: ElementRef<HTMLElement>,
    scrollDispatcher: ScrollDispatcher,
    ngZone: NgZone,
    private destroyRef: DestroyRef,
  ) {
    super(elementRef, scrollDispatcher, ngZone);
  }

  ngAfterContentInit() {
    this._container._contentMarginChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });
  }

  getHostElement() {
    return this.elementRef.nativeElement;
  }
}
