import { DemoTilesBasicComponent } from './basic/basic';
import { DemoTilesStartingComponent } from './starting-value/starting-value';

export const TILES_DEMO_COMPONENTS: any[] = [
  DemoTilesBasicComponent,
  DemoTilesStartingComponent,
];

export const TILES_DEMOS: DEMOS = {
  basic: {
    ts: require('!!raw-loader?lang=typescript!./basic/basic.ts'),
    html: require('!!raw-loader?lang=markup!./basic/basic.html'),
  },
  startingValue: {
    ts: require('!!raw-loader?lang=typescript!./starting-value/starting-value.ts'),
    html: require('!!raw-loader?lang=markup!./starting-value/starting-value.html'),
  },
};
