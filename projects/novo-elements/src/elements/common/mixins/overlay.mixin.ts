import { NovoOverlayTemplateComponent } from '../overlay';
import { AbstractConstructor, Constructor } from './constructor';
import { CanDisable } from './disabled.mixin';

/** @docs-private */
export interface HasOverlay {
  overlay: NovoOverlayTemplateComponent;
  readonly panelOpen: boolean;

  openPanel(): void;
  closePanel(): void;
  togglePanel(): void;
}

/** @docs-private */
export type HasOverlayCtor = Constructor<HasOverlay>;

/** Mixin to augment a directive with a `overlay` property. */
export function mixinOverlay<T extends AbstractConstructor<CanDisable>>(base: T): HasOverlayCtor & T {
  // Note: We cast `base` to `unknown` and then `Constructor`. It could be an abstract class,
  // but given we `extend` it from another class, we can assume a constructor being accessible.
  abstract class Mixin extends (base as unknown as Constructor<CanDisable>) {
    abstract overlay: NovoOverlayTemplateComponent;

    constructor(...args: any[]) {
      super(...args);
    }

    openPanel(): void {
      if (!this.disabled) {
        this.overlay.openPanel();
      }
    }

    closePanel(): void {
      this.overlay.closePanel();
    }

    togglePanel(): void {
      if (this.panelOpen) {
        this.closePanel();
      } else {
        this.openPanel();
      }
    }

    get panelOpen(): boolean {
      return this.overlay && this.overlay.panelOpen;
    }
  }

  // Since we don't directly extend from `base` with it's original types, and we instruct
  // TypeScript that `T` actually is instantiatable through `new`, the types don't overlap.
  // This is a limitation in TS as abstract classes cannot be typed properly dynamically.
  return Mixin as unknown as T & Constructor<HasOverlay>;
}
