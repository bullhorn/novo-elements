import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import 'rxjs/add/operator/map';

import { DemoApp } from './pages/app/App';
import './index.scss';

bootstrap(DemoApp, [
    ...ROUTER_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
]).catch(err => console.error(err)); // eslint-disable-line
