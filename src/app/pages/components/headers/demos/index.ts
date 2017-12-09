import { DemoHeaderStandardComponent } from './standard/standard';
import { DemoHeaderSubTitleComponent } from './subtitle/subtitle';
import { DemoHeaderRecordComponent } from './record/record';
import { DemoHeaderMainframeComponent } from './mainframe/mainframe';

export const HEADER_DEMO_COMPONENTS: any[] = [
  DemoHeaderStandardComponent,
  DemoHeaderSubTitleComponent,
  DemoHeaderRecordComponent,
  DemoHeaderMainframeComponent,
];

export const HEADER_DEMOS: DEMOS = {
  standard: {
    ts: require('!!raw-loader?lang=typescript!./standard/standard.ts'),
    html: require('!!raw-loader?lang=markup!./standard/standard.html'),
  },
  subtitle: {
    ts: require('!!raw-loader?lang=typescript!./subtitle/subtitle.ts'),
    html: require('!!raw-loader?lang=markup!./subtitle/subtitle.html'),
  },
  mainframe: {
    ts: require('!!raw-loader?lang=typescript!./mainframe/mainframe.ts'),
    html: require('!!raw-loader?lang=markup!./mainframe/mainframe.html'),
  },
  record: {
    ts: require('!!raw-loader?lang=typescript!./record/record.ts'),
    html: require('!!raw-loader?lang=markup!./record/record.html'),
  },
};
