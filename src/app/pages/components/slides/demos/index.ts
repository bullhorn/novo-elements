import { DemoSlidesComponent } from './basic/basic';
import { DemoSlidesTimerComponent } from './auto-timer/auto-timer';

export const SLIDES_DEMO_COMPONENTS: any[] = [
    DemoSlidesComponent,
    DemoSlidesTimerComponent,
];

export const SLIDES_DEMOS: DEMOS = {
  basic: {
    ts: require('!!raw-loader?lang=typescript!./basic/basic.ts'),
    html: require('!!raw-loader?lang=markup!./basic/basic.html'),
  },
  timer: {
    ts: require('!!raw-loader?lang=typescript!./auto-timer/auto-timer.ts'),
    html: require('!!raw-loader?lang=markup!./auto-timer/auto-timer.html'),
  },
};
