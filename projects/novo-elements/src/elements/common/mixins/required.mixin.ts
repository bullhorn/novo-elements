import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Constructor } from './constructor';

/** @docs-private */
export interface CanRequire {
  /** Whether the component is required. */
  required: boolean;
}

/** @docs-private */
export type CanRequireCtor = Constructor<CanRequire>;

/** Mixin to augment a directive with a `required` property. */
export function mixinRequired<T extends Constructor<{}>>(base: T): CanRequireCtor & T {
  return class extends base {
    private _required: boolean = false;

    get required() {
      return this._required;
    }
    set required(value: any) {
      this._required = coerceBooleanProperty(value);
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
