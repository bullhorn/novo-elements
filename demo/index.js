import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import 'rxjs/add/operator/map';

import { DemoApp } from './pages/app/App';
import './index.scss';

/**
 * Main Bootstrapping
 */
export function main() {
    return bootstrap(DemoApp, [
        ...ROUTER_PROVIDERS,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]).catch(err => console.error(err)); // eslint-disable-line
}

if (ENV === 'development' && HMR === true) {
    // activate hot module reload
    let ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
} else {
    // bootstrap when document is ready
    document.addEventListener('DOMContentLoaded', () => main());
}
