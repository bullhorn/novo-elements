import { DemoRadioComponent } from './basic/basic';
import { DemoRadioButtonComponent } from './button/button';
import { DemoRadioIconComponent } from './icon/icon';
import { DemoRadioVerticalComponent } from './vertical/vertical';

export const RADIO_DEMO_COMPONENTS: any[] = [
  DemoRadioComponent,
  DemoRadioButtonComponent,
  DemoRadioIconComponent,
  DemoRadioVerticalComponent,
];

export const RADIO_DEMOS: DEMOS = {
  basic: {
    ts: require('!!raw-loader?lang=typescript!./basic/basic.ts'),
    html: require('!!raw-loader?lang=markup!./basic/basic.html'),
  },
  button: {
    ts: require('!!raw-loader?lang=typescript!./button/button.ts'),
    html: require('!!raw-loader?lang=markup!./button/button.html'),
  },
  icon: {
    ts: require('!!raw-loader?lang=typescript!./icon/icon.ts'),
    html: require('!!raw-loader?lang=markup!./icon/icon.html'),
  },
  vertical: {
    ts: require('!!raw-loader?lang=typescript!./vertical/vertical.ts'),
    html: require('!!raw-loader?lang=markup!./vertical/vertical.html'),
  },
};
