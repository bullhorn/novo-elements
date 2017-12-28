import { DemoAutocompleteStandardComponent } from './standard/standard';
import { DemoAutocompleteAdvancedComponent } from './advanced/advanced';
import { DemoAutocompleteEntityComponent } from './entity/entity';

export const AUTOCOMPLETE_DEMO_COMPONENTS: any[] = [
  DemoAutocompleteStandardComponent,
  DemoAutocompleteAdvancedComponent,
  DemoAutocompleteEntityComponent,
];

export const AUTOCOMPLETE_DEMOS: DEMOS = {
  standard: {
    ts: require('!!raw-loader?lang=typescript!./standard/standard.ts'),
    html: require('!!raw-loader?lang=markup!./standard/standard.html'),
  },
  advanced: {
    ts: require('!!raw-loader?lang=typescript!./advanced/advanced.ts'),
    html: require('!!raw-loader?lang=markup!./advanced/advanced.html'),
  },
  entity: {
    ts: require('!!raw-loader?lang=typescript!./entity/entity.ts'),
    html: require('!!raw-loader?lang=markup!./entity/entity.html'),
  },
};
