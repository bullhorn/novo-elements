import { Constructor } from './constructor';
import { HasElementRef } from './types';

/** Possible size palette values. */
export type ElementSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'body' | undefined;

/** @docs-private */
export interface CanSize {
  /** Theme size palette for the component. */
  size: ElementSize;

  /** Default size to fall back to if no value is set. */
  defaultSize: ElementSize | undefined;
}

/** @docs-private */
export type CanSizeCtor = Constructor<CanSize>;

/** Mixin to augment a directive with a `size` property. */
export function mixinSize<T extends Constructor<HasElementRef>>(base: T, defaultSize?: ElementSize): CanSizeCtor & T {
  return class extends base {
    private _size: ElementSize;
    defaultSize = defaultSize;

    get size(): ElementSize {
      return this._size;
    }
    set size(value: ElementSize) {
      const size = value || this.defaultSize;
      if (size !== this._size) {
        if (this._size) {
          this._elementRef.nativeElement.classList.remove(`novo-size-${this._size}`);
        }
        if (size) {
          this._elementRef.nativeElement.classList.add(`novo-size-${size}`);
        }

        this._size = size;
      }
    }

    constructor(...args: any[]) {
      super(...args);
      // Set the default size that can be specified from the mixin.
      this.size = defaultSize;
    }
  };
}
