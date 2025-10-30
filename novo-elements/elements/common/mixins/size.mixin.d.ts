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
export declare function mixinSize<T extends Constructor<HasElementRef>>(base: T, defaultSize?: ElementSize): CanSizeCtor & T;
