import { create } from 'storybook/theming';

/**
 * Storybook manager UI theme — matches the look of the existing
 * `novo-examples` demo app.
 *
 * Colors come from `novo-design-tokens` (variables.css):
 *   --color-positive (ocean):    #4a89dc
 *   --color-negative (grapefruit): #da4453
 *   --color-mint:                 #37bc9b
 *   --color-sunflower:            #f6b042
 *
 * Sidenav / chrome colors come from the demo's sidenav.scss (#1b2127).
 *
 * The brand logo and font assets are served by Storybook's `staticDirs`
 * (see main.ts), which maps `projects/demo/assets` → `/assets`. The
 * Montserrat font is loaded by `previewHead` for the preview iframe; the
 * manager UI uses it via the `fontBase` declaration here. (Storybook's
 * manager loads its own fonts; we keep it scoped to the system fallback
 * for consistency in the chrome.)
 */
export default create({
  base: 'dark',

  // Brand
  brandTitle: 'Novo Elements',
  brandUrl: 'https://github.com/bullhorn/novo-elements',
  brandImage: '/assets/images/bullhorn-logo.svg',
  brandTarget: '_blank',

  // Primary palette (Bullhorn brand)
  colorPrimary: '#4a89dc',   // ocean blue — primary
  colorSecondary: '#4a89dc', // ocean — selection accent on the dark sidebar

  // Sidebar + addons panel + chrome — deep navy-blue matching the Bullhorn
  // brand surface. `appContentBg` controls the addons panel content area
  // (Controls / Actions / etc.). `appPreviewBg` is the story rendering
  // surface and stays white so components look like they would on a normal
  // Bullhorn page.
  appBg: '#202945',
  appContentBg: '#202945',
  appPreviewBg: '#ffffff',
  appBorderColor: '#2a3358',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Fira Code", "SF Mono", Menlo, Consolas, monospace',

  // Sidebar text (light on dark)
  textColor: '#ffffff',
  textInverseColor: '#4c545a',
  textMutedColor: 'rgba(255, 255, 255, 0.6)',

  // Toolbars (top Canvas/Docs tabs + addons panel tabs) — dark to match the
  // sidebar so the chrome reads as one continuous surface. Selected tab gets
  // the ocean accent; idle tabs are a translucent white for legibility.
  barBg: '#202945',
  barTextColor: 'rgba(255, 255, 255, 0.7)',
  barHoverColor: '#ffffff',
  barSelectedColor: '#4a89dc',

  // Form controls in the manager (search box, control panel inputs)
  inputBg: '#2a3358',
  inputBorder: '#3a4470',
  inputTextColor: '#ffffff',
  inputBorderRadius: 4,
});
