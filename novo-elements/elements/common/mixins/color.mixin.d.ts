import { Constructor } from './constructor';
import { HasElementRef } from './types';
/** @docs-private */
export interface CanColor {
    /** Theme color palette for the component. */
    color: ThemePalette;
    /** Default color to fall back to if no value is set. */
    defaultColor: ThemePalette | undefined;
}
/** @docs-private */
export type CanColorCtor = Constructor<CanColor>;
/** Possible color palette values. */
export type ThemePalette = 'primary' | 'accent' | 'warn' | undefined;
/** Mixin to augment a directive with a `color` property. */
export declare function mixinColor<T extends Constructor<HasElementRef>>(base: T, defaultColor?: ThemePalette): CanColorCtor & T;
