import { Constructor } from './constructor';

/** @docs-private */
export interface HasIdentity {
  /** Whether the component is id. */
  id: string;
}

/** @docs-private */
export type HasIdentityCtor = Constructor<HasIdentity>;

let nextUniqueId = 0;

/** Mixin to augment a directive with a `id` property. */
export function mixinIdentity<T extends Constructor<{}>>(base: T): HasIdentityCtor & T {
  return class extends base {
    protected _id: string;
    protected _uid = `novo-identity-${nextUniqueId++}`;

    get id(): string {
      return this._id;
    }
    set id(value: string) {
      this._id = value || this._uid;
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
