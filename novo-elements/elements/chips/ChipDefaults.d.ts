import { InjectionToken } from '@angular/core';
/** Default options, for the chips module, that can be overridden. */
export interface NovoChipsDefaultOptions {
    /** The list of key codes that will trigger a chipEnd event. */
    separatorKeyCodes: readonly string[];
}
/** Injection token to be used to override the default options for the chips module. */
export declare const NOVO_CHIPS_DEFAULT_OPTIONS: InjectionToken<NovoChipsDefaultOptions>;
