

import {
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  ViewChild,
  ChangeDetectorRef,
  TemplateRef
} from '@angular/core';

import {
  ConnectedPositionStrategy,
  Overlay,
  OverlayRef,
  OverlayState,
  PositionStrategy,
  RepositionScrollStrategy,
  ScrollStrategy,
} from '@angular/cdk/overlay';

/** Injection token that determines the scroll handling while the autocomplete panel is open. */
export const DEFAULT_OVERLAY_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('novo-overlay-scroll-strategy');

/** @docs-private */
export function DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
    () => RepositionScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
  provide: DEFAULT_OVERLAY_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY,
};

@Component({
  selector: 'novo-overlay-template',
  template: `
    <ng-template>
        <div class="novo-overlay-panel" role="listbox" [id]="id" #panel>
            <ng-content></ng-content>
        </div>
    </ng-template>
  `
})
export class NovoOverlayTemplate  {
  id: string = `novo-overlay-${Date.now()}`;

  /** @docs-private */
  @ViewChild(TemplateRef) template: TemplateRef<any>;

  /** Element for the panel containing the autocomplete options. */
  @ViewChild('panel') panel: ElementRef;

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }
}
