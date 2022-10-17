import { InjectionToken } from '@angular/core';

/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * @docs-private
 */
export interface NovoBreadcrumbRef<T = any> {
  separatorIcon: string;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const NOVO_BREADCRUMB_REF = new InjectionToken<NovoBreadcrumbRef>('NOVO_BREADCRUMB_REF');
