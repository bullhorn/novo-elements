import type { StorybookConfig } from '@storybook/angular';
import * as path from 'path';

const libRoot = path.resolve(process.cwd(), 'projects/novo-elements/src');

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/angular',
  staticDirs: [
    // Serve the demo app's image assets so docs / usage-guide stories can
    // reuse the existing annotated diagrams (ButtonAnatomy.png, etc.).
    { from: '../../../projects/demo/assets', to: '/assets' },
  ],
  // Inject runtime CSS dependencies that the demo app loads via <link> tags in
  // projects/demo/index.html. Storybook's preview iframe has its own <head>
  // that doesn't see demo's index.html, so we replicate the same <link>s here.
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" type="text/css"
      href="https://cdn.jsdelivr.net/npm/@bullhorn/bullhorn-icons@latest/fonts/Bullhorn-Glyphicons.css" />
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Montserrat:100,300,400,500,600,700,900" />
  `,
  // The manager UI (sidebar, toolbar) runs in its own iframe, so we load the
  // same Montserrat font there for the themed `fontBase` to render correctly.
  // Also pull in the demo's favicon for browser-tab identity.
  //
  // The inline <style> block surgically lightens the addons panel (Controls,
  // Actions, etc.). Storybook's theme uses a single `appBg` for both the
  // sidebar and the panel — we want the sidebar to stay dark navy, but the
  // panel content needs a light surface so tables and form controls read
  // properly. We target the panel's content root by id (stable across
  // Storybook 8+) and leave the panel's tab bar alone so it still blends
  // with the chrome.
  managerHead: (head) => `
    ${head}
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Montserrat:100,300,400,500,600,700,900" />
    <link rel="icon" type="image/svg+xml" href="/assets/images/bullhorn-logo.svg" />
    <style>
      /* Tighten up details the theme can't reach: ensure controls-panel table
       * cell text is fully legible on the navy background (Storybook's default
       * cell text color leans muted, which reads as invisible on dark). */
      #storybook-panel-root th,
      #storybook-panel-root td {
        color: #ffffff !important;
      }
      #storybook-panel-root th {
        color: rgba(255, 255, 255, 0.7) !important;
      }
      /* Form controls — slightly raised navy so they read as inset against
       * the panel surface, with light text inside. */
      #storybook-panel-root input:not([type="checkbox"]):not([type="radio"]),
      #storybook-panel-root select,
      #storybook-panel-root textarea {
        background: #2a3358 !important;
        color: #ffffff !important;
        border-color: #3a4470 !important;
      }
    </style>
  `,
  webpackFinal: async (config) => {
    // Verbose stats so compilation errors aren't silently swallowed.
    config.stats = {
      preset: 'errors-warnings',
      errors: true,
      errorDetails: true,
      moduleTrace: true,
    };

    // The library's `projects/novo-elements/src/package.json` declares a narrow
    // `exports` field. tsconfig path aliases resolve subpaths like
    // `novo-elements/utils` for TypeScript, but webpack independently honors
    // `exports` and blocks the same imports. Adding explicit aliases for each
    // known top-level subpath short-circuits resolution before webpack reaches
    // the package.json exports check.
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      'novo-elements/addons': path.join(libRoot, 'addons'),
      'novo-elements/elements': path.join(libRoot, 'elements'),
      'novo-elements/pipes': path.join(libRoot, 'pipes'),
      'novo-elements/services': path.join(libRoot, 'services'),
      'novo-elements/utils': path.join(libRoot, 'utils'),
      // Bare `novo-elements` (the library entry point) resolves to src/index.
      'novo-elements$': path.join(libRoot, 'index.ts'),
    };

    return config;
  },
};

export default config;
