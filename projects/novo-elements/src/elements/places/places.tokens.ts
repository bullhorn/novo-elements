import { InjectionToken } from '@angular/core';
import type { PlacesSettings } from './places.component';

/** App-wide address-lookup config; when provided, every novo-address enables autocomplete on Address 1. */
export const NOVO_ADDRESS_CONFIG = new InjectionToken<PlacesSettings>('NOVO_ADDRESS_CONFIG');
