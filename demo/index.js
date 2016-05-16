import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MODAL_BROWSER_PROVIDERS } from 'angular2-modal/platform-browser';
import 'rxjs/add/operator/map';

import { DemoApp } from './pages/app/App';
import './index.scss';

bootstrap(DemoApp, [
    ...MODAL_BROWSER_PROVIDERS,
    ...ROUTER_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
]).catch(err => console.error(err)); // eslint-disable-line
