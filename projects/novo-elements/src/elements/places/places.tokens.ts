import { InjectionToken } from '@angular/core';
import type { PlacesSettings } from './places.component';

/**
 * App-wide address-lookup configuration. When provided, every `novo-address`
 * block enables Google Places autocomplete on its Address 1 input using these
 * settings. Provide it once at the application root (statically via
 * `NovoElementProviders.forRoot({ address })`, or via a `useFactory` for
 * runtime-derived endpoints).
 */
export const NOVO_ADDRESS_CONFIG = new InjectionToken<PlacesSettings>('NOVO_ADDRESS_CONFIG');
