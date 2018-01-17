import { DemoSpinnerComponent } from './spinner/spinner';
import { DemoLineComponent } from './line/line';

export const LOADING_DEMO_COMPONENTS: any[] = [
  DemoSpinnerComponent,
  DemoLineComponent,
];

export const LOADING_DEMOS: DEMOS = {
  line: {
    ts: require('!!raw-loader?lang=typescript!./line/line.ts'),
    html: require('!!raw-loader?lang=markup!./line/line.html'),
  },
  spinner: {
    ts: require('!!raw-loader?lang=typescript!./spinner/spinner.ts'),
    html: require('!!raw-loader?lang=markup!./spinner/spinner.html'),
  },
};
