import { bootstrap } from '@angular/platform-browser-dynamic';

import { PLATFORM_PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS } from './platform/environment';
import { DemoApp } from './pages/app/App';
import './demo.scss';

/**
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main() {
    return bootstrap(DemoApp, [
        ...PLATFORM_PROVIDERS,
        ...ENV_PROVIDERS
    ])
        // .then(decorateComponentRef)
        .catch(err => console.error(err)); // eslint-disable-line
}


// Hot Module Reload
// experimental version by @gdi2290
if (ENV === 'development' && HMR === true) {
    // activate hot module reload
    let ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
} else {
    // bootstrap when document is ready
    document.addEventListener('DOMContentLoaded', () => main());
}
