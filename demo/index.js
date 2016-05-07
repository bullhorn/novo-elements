import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import 'rxjs/add/operator/map';

import { DemoApp } from './pages/app/App';
import './index.scss';

bootstrap(DemoApp, [
    ROUTER_PROVIDERS
]).catch(err => console.error(err)); // eslint-disable-line
