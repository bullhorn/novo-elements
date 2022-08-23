import { InjectionToken } from '@angular/core';

/**
 * Throws an exception when two NovoSidenav are matching the same position.
 * @docs-private
 */
export function throwNovoDuplicatedSidenavError(position: string) {
  throw Error(`A drawer was already declared for 'position="${position}"'`);
}

/** Result of the toggle promise that indicates the state of the drawer. */
export type NovoSidenavToggleResult = 'open' | 'close';

/** Sidenav and SideNav display modes. */
export type NovoSidenavMode = 'over' | 'push' | 'side';

/** Configures whether drawers should use auto sizing by default. */
export const NOVO_LAYOUT_DEFAULT_AUTOSIZE = new InjectionToken<boolean>('NOVO_LAYOUT_DEFAULT_AUTOSIZE', {
  providedIn: 'root',
  factory: NOVO_LAYOUT_DEFAULT_AUTOSIZE_FACTORY,
});

/**
 * Used to provide a drawer container to a drawer while avoiding circular references.
 * @docs-private
 */
export const NOVO_LAYOUT_CONTAINER = new InjectionToken('NOVO_LAYOUT_CONTAINER');

/** @docs-private */
export function NOVO_LAYOUT_DEFAULT_AUTOSIZE_FACTORY(): boolean {
  return false;
}
