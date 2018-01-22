import { DemoTipwellComponent } from './basic/basic';
import { DemoTipwellIconComponent } from './icon/icon';
import { DemoTipwellButtonlessComponent } from './buttonless/buttonless';

export const TIPWELL_DEMO_COMPONENTS: any[] = [
    DemoTipwellComponent,
    DemoTipwellIconComponent,
    DemoTipwellButtonlessComponent,
];

export const TIPWELL_DEMOS: DEMOS = {
  basic: {
    ts: require('!!raw-loader?lang=typescript!./basic/basic.ts'),
    html: require('!!raw-loader?lang=markup!./basic/basic.html'),
  },
  icon: {
    ts: require('!!raw-loader?lang=typescript!./icon/icon.ts'),
    html: require('!!raw-loader?lang=markup!./icon/icon.html'),
  },
  buttonless: {
    ts: require('!!raw-loader?lang=typescript!./buttonless/buttonless.ts'),
    html: require('!!raw-loader?lang=markup!./buttonless/buttonless.html'),
  },
};
