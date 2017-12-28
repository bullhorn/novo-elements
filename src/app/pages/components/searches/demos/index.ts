import { DemoSearchStandardComponent } from './standard/standard';
import { DemoSearchAutoCompleteComponent } from './autocomplete/autocomplete';
import { DemoSearchGoogleComponent } from './google-places/google-places';

export const SEARCH_DEMO_COMPONENTS: any[] = [
  DemoSearchStandardComponent,
  DemoSearchAutoCompleteComponent,
  DemoSearchGoogleComponent,
];

export const SEARCH_DEMOS: DEMOS = {
  standard: {
    ts: require('!!raw-loader?lang=typescript!./standard/standard.ts'),
    html: require('!!raw-loader?lang=markup!./standard/standard.html'),
  },
  autocomplete: {
    ts: require('!!raw-loader?lang=typescript!./autocomplete/autocomplete.ts'),
    html: require('!!raw-loader?lang=markup!./autocomplete/autocomplete.html'),
  },
  google: {
    ts: require('!!raw-loader?lang=typescript!./google-places/google-places.ts'),
    html: require('!!raw-loader?lang=markup!./google-places/google-places.html'),
  },
};
