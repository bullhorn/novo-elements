import { addons } from 'storybook/manager-api';
import novoTheme from './theme';

addons.setConfig({
  theme: novoTheme,
  // Sidebar tweaks to match the demo app's information density.
  sidebar: {
    showRoots: true,
  },
});
