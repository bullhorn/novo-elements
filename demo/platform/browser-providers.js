// These are globally available services in any component or any other service
import { HashLocationStrategy, LocationStrategy, FORM_PROVIDERS } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { NOVO_ELEMENTS_LABELS_PROVIDERS } from './../../src/novo-elements';

// Application Providers/Directives/Pipes
// providers/directives/pipes that only live in our browser environment
export const APPLICATION_PROVIDERS = [
    ...ROUTER_PROVIDERS,
    ...FORM_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...NOVO_ELEMENTS_LABELS_PROVIDERS,

    { provide: LocationStrategy, useClass: HashLocationStrategy }
];

export const PROVIDERS = [
    ...APPLICATION_PROVIDERS
];
