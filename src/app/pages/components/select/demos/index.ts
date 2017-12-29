import { DemoSelectStandardComponent } from './standard/standard';
import { DemoSelectDataComponent } from './data/data';
import { DemoSelectGroupsComponent } from './groups/groups';
import { DemoSelectHeaderComponent } from './header/header';

export const SELECT_DEMO_COMPONENTS: any[] = [
  DemoSelectStandardComponent,
  DemoSelectDataComponent,
  DemoSelectGroupsComponent,
  DemoSelectHeaderComponent,
];

export const SELECT_DEMOS: DEMOS = {
  standard: {
    ts: require('!!raw-loader?lang=typescript!./standard/standard.ts'),
    html: require('!!raw-loader?lang=markup!./standard/standard.html'),
  },
  data: {
    ts: require('!!raw-loader?lang=typescript!./data/data.ts'),
    html: require('!!raw-loader?lang=markup!./data/data.html'),
  },
  groups: {
    ts: require('!!raw-loader?lang=typescript!./groups/groups.ts'),
    html: require('!!raw-loader?lang=markup!./groups/groups.html'),
  },
  header: {
    ts: require('!!raw-loader?lang=typescript!./header/header.ts'),
    html: require('!!raw-loader?lang=markup!./header/header.html'),
  },

};
