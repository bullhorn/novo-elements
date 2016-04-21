import { bootstrap, ELEMENT_PROBE_PROVIDERS } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import 'rxjs/add/operator/map';

import { DemoApp } from './pages/app/App';
import './index.scss';

bootstrap(DemoApp, [
    ...ROUTER_PROVIDERS,
    ...ELEMENT_PROBE_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]).catch(err => console.error(err)); // eslint-disable-line
