import { DemoSwitchStandardComponent } from './standard/standard';
// import { DemoListAdvancedComponent } from './advanced/advanced';
// import { DemoListEntityComponent } from './entity/entity';

export const SWITCH_DEMO_COMPONENTS: any[] = [
  DemoSwitchStandardComponent,
  // DemoListAdvancedComponent,
  // DemoListEntityComponent,
];

export const SWITCH_DEMOS: DEMOS = {
  standard: {
    ts: require('!!raw-loader?lang=typescript!./standard/standard.ts'),
    html: require('!!raw-loader?lang=markup!./standard/standard.html'),
  },
  // advanced: {
  //   ts: require('!!raw-loader?lang=typescript!./advanced/advanced.ts'),
  //   html: require('!!raw-loader?lang=markup!./advanced/advanced.html'),
  // },
  // entity: {
  //   ts: require('!!raw-loader?lang=typescript!./entity/entity.ts'),
  //   html: require('!!raw-loader?lang=markup!./entity/entity.html'),
  // },
};
