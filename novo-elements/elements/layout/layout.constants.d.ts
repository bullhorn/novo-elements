import { InjectionToken } from '@angular/core';
/**
 * Throws an exception when two NovoSidenav are matching the same position.
 * @docs-private
 */
export declare function throwNovoDuplicatedSidenavError(position: string): void;
/** Result of the toggle promise that indicates the state of the drawer. */
export type NovoSidenavToggleResult = 'open' | 'close';
/** Sidenav and SideNav display modes. */
export type NovoSidenavMode = 'over' | 'push' | 'side';
/** Configures whether drawers should use auto sizing by default. */
export declare const NOVO_LAYOUT_DEFAULT_AUTOSIZE: InjectionToken<boolean>;
/**
 * Used to provide a drawer container to a drawer while avoiding circular references.
 * @docs-private
 */
export declare const NOVO_LAYOUT_CONTAINER: InjectionToken<unknown>;
/** @docs-private */
export declare function NOVO_LAYOUT_DEFAULT_AUTOSIZE_FACTORY(): boolean;
