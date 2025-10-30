import { InjectionToken } from '@angular/core';
export declare enum ProgressAppearance {
    LINEAR = "linear",
    RADIAL = "radial"
}
/**
 * Used to provide a progress container to a progress bar while avoiding circular references.
 * @docs-private
 */
export declare const NOVO_PROGRESS_CONTAINER: InjectionToken<unknown>;
