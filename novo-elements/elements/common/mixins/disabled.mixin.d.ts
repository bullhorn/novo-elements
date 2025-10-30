import { Constructor } from './constructor';
/** @docs-private */
export interface CanDisable {
    /** Whether the component is disabled. */
    disabled: boolean;
}
/** @docs-private */
export type CanDisableCtor = Constructor<CanDisable>;
/** Mixin to augment a directive with a `disabled` property. */
export declare function mixinDisabled<T extends Constructor<{}>>(base: T): CanDisableCtor & T;
