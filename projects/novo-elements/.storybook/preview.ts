import type { Preview } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import docJson from '../documentation.json';

setCompodocJson(docJson);

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
    moduleMetadata({
      imports: [],
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      // Enable the built-in Code panel in the bottom dock so each story's
      // rendered source is viewable in Canvas mode (not just inside Docs).
      codePanel: true,
    },
    options: {
      // Sort top-level categories and components alphabetically by their
      // `title` (e.g. `Elements/Avatar` < `Elements/Button` < `Form Controls/…`).
      // Stories within the same component keep their export order so the
      // curated UsageGuide → Default → … → Playground sequence is preserved.
      storySort: (a, b) => {
        if (a.title === b.title) return 0;
        return a.title.localeCompare(b.title);
      },
    },
  },
};

export default preview;
