import { DemoCardStandardComponent } from './standard/standard';
import { DemoCardAdvancedComponent } from './advanced/advanced';
// import { DemoCardEntityComponent } from './entity/entity';

export const CARDS_DEMO_COMPONENTS: any[] = [
  DemoCardStandardComponent,
  DemoCardAdvancedComponent,
  // DemoCardEntityComponent,
];

export const CARDS_DEMOS: DEMOS = {
  standard: {
    ts: require('!!raw-loader?lang=typescript!./standard/standard.ts'),
    html: require('!!raw-loader?lang=markup!./standard/standard.html'),
  },
  advanced: {
    ts: require('!!raw-loader?lang=typescript!./advanced/advanced.ts'),
    html: require('!!raw-loader?lang=markup!./advanced/advanced.html'),
  },
  // entity: {
  //   ts: require('!!raw-loader?lang=typescript!./entity/entity.ts'),
  //   html: require('!!raw-loader?lang=markup!./entity/entity.html'),
  // },
};
