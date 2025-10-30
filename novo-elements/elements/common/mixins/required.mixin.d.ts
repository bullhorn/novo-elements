import { Constructor } from './constructor';
/** @docs-private */
export interface CanRequire {
    /** Whether the component is required. */
    required: boolean;
}
/** @docs-private */
export type CanRequireCtor = Constructor<CanRequire>;
/** Mixin to augment a directive with a `required` property. */
export declare function mixinRequired<T extends Constructor<{}>>(base: T): CanRequireCtor & T;
