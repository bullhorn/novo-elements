import { DemoButtonsDialogueComponent } from './dialogue/dialogue';
import { DemoButtonsIconComponent } from './icon/icon';
import { DemoButtonsLoadingComponent } from './loading/loading';
import { DemoButtonsPrimaryComponent } from './primary/primary';
import { DemoButtonsSecondaryComponent } from './secondary/secondary';
import { DemoButtonsStandardComponent } from './standard/standard';

export const BUTTON_DEMO_COMPONENTS: any[] = [
  DemoButtonsDialogueComponent,
  DemoButtonsIconComponent,
  DemoButtonsLoadingComponent,
  DemoButtonsPrimaryComponent,
  DemoButtonsSecondaryComponent,
  DemoButtonsStandardComponent,
];

export const BUTTON_DEMOS: DEMOS = {
  dialogue: {
    ts: require('!!raw-loader?lang=typescript!./dialogue/dialogue.ts'),
    html: require('!!raw-loader?lang=markup!./dialogue/dialogue.html'),
  },
  icon: {
    ts: require('!!raw-loader?lang=typescript!./icon/icon.ts'),
    html: require('!!raw-loader?lang=markup!./icon/icon.html'),
  },
  loading: {
    ts: require('!!raw-loader?lang=typescript!./loading/loading.ts'),
    html: require('!!raw-loader?lang=markup!./loading/loading.html'),
  },
  primary: {
    ts: require('!!raw-loader?lang=typescript!./primary/primary.ts'),
    html: require('!!raw-loader?lang=markup!./primary/primary.html'),
  },
  secondary: {
    ts: require('!!raw-loader?lang=typescript!./secondary/secondary.ts'),
    html: require('!!raw-loader?lang=markup!./secondary/secondary.html'),
  },
  standard: {
    ts: require('!!raw-loader?lang=typescript!./standard/standard.ts'),
    html: require('!!raw-loader?lang=markup!./standard/standard.html'),
  },
};
