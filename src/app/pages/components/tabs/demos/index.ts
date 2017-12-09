import { DemoTabsStandardComponent } from './standard/standard';
import { DemoTabsRoutingComponent } from './routing/routing';
import { DemoTabsVerticalComponent } from './vertical/vertical';

export const TABS_DEMO_COMPONENTS: any[] = [
  DemoTabsStandardComponent,
  DemoTabsRoutingComponent,
  DemoTabsVerticalComponent,
];

export const TABS_DEMOS: DEMOS = {
  standard: {
    ts: require('!!raw-loader?lang=typescript!./standard/standard.ts'),
    html: require('!!raw-loader?lang=markup!./standard/standard.html'),
  },
  routing: {
    ts: require('!!raw-loader?lang=typescript!./routing/routing.ts'),
    html: require('!!raw-loader?lang=markup!./routing/routing.html'),
  },
  vertical: {
    ts: require('!!raw-loader?lang=typescript!./vertical/vertical.ts'),
    html: require('!!raw-loader?lang=markup!./vertical/vertical.html'),
  },
};
