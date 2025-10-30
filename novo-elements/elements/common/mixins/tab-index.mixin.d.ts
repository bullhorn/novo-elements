import { AbstractConstructor, Constructor } from './constructor';
import { CanDisable } from './disabled.mixin';
/** @docs-private */
export interface HasTabIndex {
    /** Tabindex of the component. */
    tabIndex: number;
    /** Tabindex to which to fall back to if no value is set. */
    defaultTabIndex: number;
}
/** @docs-private */
export type HasTabIndexCtor = Constructor<HasTabIndex>;
/** Mixin to augment a directive with a `tabIndex` property. */
export declare function mixinTabIndex<T extends AbstractConstructor<CanDisable>>(base: T, defaultTabIndex?: number): HasTabIndexCtor & T;
