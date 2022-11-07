import { Constructor } from './constructor';

/** @docs-private */
export interface HasPlaceholder {
  /** Whether the component is placeholder. */
  placeholder: string;
}

/** @docs-private */
export type HasPlaceholderCtor = Constructor<HasPlaceholder>;

/** Mixin to augment a directive with a `placeholder` property. */
export function mixinPlaceholder<T extends Constructor<{}>>(base: T): HasPlaceholderCtor & T {
  return class extends base {
    protected _placeholder: string;

    get placeholder(): string {
      return this._placeholder;
    }
    set placeholder(value: string) {
      this._placeholder = value;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
