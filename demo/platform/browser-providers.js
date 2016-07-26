// These are globally available services in any component or any other service
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideRouter } from '@angular/router';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { provideWebpack } from '@angularclass/webpack-toolkit';
import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';

import { NOVO_ELEMENTS_LABELS_PROVIDERS } from './../../src/novo-elements';
import { routes, asyncRoutes, prefetchRouteCallbacks } from '../pages/app/App.routes';

// Application Providers/Directives/Pipes
// providers/directives/pipes that only live in our browser environment
export const APPLICATION_PROVIDERS = [
    disableDeprecatedForms(),
    provideForms(),

    provideRouter(routes),
    provideWebpack(asyncRoutes),
    providePrefetchIdleCallbacks(prefetchRouteCallbacks),

    ...HTTP_PROVIDERS,
    ...NOVO_ELEMENTS_LABELS_PROVIDERS,

    { provide: LocationStrategy, useClass: HashLocationStrategy }
];

export const PROVIDERS = [
    ...APPLICATION_PROVIDERS
];
