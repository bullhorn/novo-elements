import { InjectionToken } from '@angular/core';

export enum ProgressAppearance {
  LINEAR = 'linear',
  RADIAL = 'radial',
}

/**
 * Used to provide a progress container to a progress bar while avoiding circular references.
 * @docs-private
 */
export const NOVO_PROGRESS_CONTAINER = new InjectionToken('NOVO_PROGRESS_CONTAINER');
