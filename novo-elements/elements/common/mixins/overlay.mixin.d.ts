import { InjectionToken } from '@angular/core';
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
export declare const NOVO_OVERLAY_CONTAINER: InjectionToken<HasOverlay>;
/** @docs-private */
export type HasOverlayCtor = Constructor<HasOverlay>;
/** Mixin to augment a directive with a `overlay` property. */
export declare function mixinOverlay<T extends AbstractConstructor<CanDisable>>(base: T): HasOverlayCtor & T;
