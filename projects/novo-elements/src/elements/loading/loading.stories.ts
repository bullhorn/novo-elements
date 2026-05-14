import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { NovoLoadingElement } from './Loading';
import { NovoLoadingModule } from './Loading.module';

/**
 * Stories for the loading family — `<novo-loading>` (line of dots) and
 * `<novo-spinner>` (circular spinner).
 *
 * Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference. The meta is typed against
 * `NovoLoadingElement` because it's the primary animated component, but
 * the Spinner / SpinnerInverse stories also exercise `<novo-spinner>` from
 * the same module.
 *
 * Note: the module also exports `[isLoading]` / `[skeleton]` / `[loaded]`
 * directives intended to swap between a skeleton placeholder and loaded
 * content. They aren't storied here because the implementation has
 * timing and semantic issues that prevent it from rendering reliably —
 * tracked under the Novo Elements improvements epic, and a candidate for
 * removal if no consumer depends on it.
 */
const meta: Meta<NovoLoadingElement> = {
  title: 'Elements/Loading',
  component: NovoLoadingElement,
  decorators: [
    moduleMetadata({
      imports: [NovoLoadingModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Animated loading indicators. Use `<novo-loading>` (five jumping dots) for page- or section-level data fetches, ' +
          'and `<novo-spinner>` (twelve-dot circular spinner) for action-in-progress feedback — most commonly inside a ' +
          'button or input affix.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [undefined, 'grapefruit', 'aqua', 'mint', 'ocean', 'sunflower', 'pumpkin', 'plum'],
      description:
        'Analytics-palette color applied to the dots. Defaults to the rotating multi-color animation when unset.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Three discrete sizes. Defaults to `medium`.',
      table: { defaultValue: { summary: 'medium' } },
    },
    theme: {
      control: 'text',
      description: '**Deprecated** — use `color` instead. Setting `theme` proxies to `color` and logs a console warning.',
      table: { category: 'deprecated' },
    },
  },
};

export default meta;
type Story = StoryObj<NovoLoadingElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for a loading indicator at
 * all, how to pick between the line, the spinner, and a skeleton swap, and
 * the accessibility caveats that apply to every animated indicator.
 *
 * Docs-only story — renders narrative content rather than a single variant.
 */
export const UsageGuide: Story = {
  name: '📖 Usage Guide',
  tags: ['!autodocs'],
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #2d3137;
        max-width: 920px;
        line-height: 1.55;
      ">
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to show a loading indicator</h2>
        <p style="margin: 0 0 1.25rem;">
          Loading indicators tell the user the system is working on something
          they just asked for. Show one whenever the wait is long enough to
          feel like uncertainty — typically anything past <strong>300ms</strong>
          — and remove it the instant the underlying data or action resolves.
        </p>

        <div style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        ">
          <section style="
            background: #f0f9f4;
            border-left: 4px solid #2ecc71;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #1e7e3f;">
              ✓ Use a loading indicator when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Loading content from the server to initialize a view</li>
              <li>Processing a long-running user-invoked action</li>
              <li>Refreshing a table or list in place</li>
              <li>Waiting on a save / submit to confirm</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a loading indicator when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The wait is &lt; 300ms — the flicker is worse than the wait</li>
              <li>The wait has a known duration — use a determinate progress bar</li>
              <li>Nothing is actually loading — never decorative</li>
              <li>Multiple regions load at once — pick a single page-level indicator</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Which loading element?</h2>
        <p style="margin: 0 0 1rem;">
          The loading module ships two visual patterns. Pick by where the
          user's attention is and how much layout the wait occupies.
        </p>

        <div style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        ">
          <section style="
            background: #f6f8fa;
            border-radius: 6px;
            padding: 1rem 1.25rem;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem;">Line — <code>&lt;novo-loading&gt;</code></h3>
            <p style="margin: 0 0 0.5rem;">
              Five jumping dots. Use for <strong>page or section-level</strong>
              loads — initial page render, modal content, table refresh.
            </p>
            <p style="margin: 0; color: #5b6770;">
              Typically rendered centered in the empty region while data is in
              flight.
            </p>
          </section>

          <section style="
            background: #f6f8fa;
            border-radius: 6px;
            padding: 1rem 1.25rem;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem;">Spinner — <code>&lt;novo-spinner&gt;</code></h3>
            <p style="margin: 0 0 0.5rem;">
              Twelve-dot circular spinner. Use for
              <strong>action-in-progress</strong> feedback inside an existing
              element — most commonly inside a button while a save is pending.
            </p>
            <p style="margin: 0; color: #5b6770;">
              Disable the host control while the spinner is visible so the
              action can't be re-triggered.
            </p>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Best practices</h2>
        <ul style="margin: 0 0 1.5rem; padding-left: 1.25rem;">
          <li>Use the spinner for an action invoked by the user that's running but not complete.</li>
          <li>Use the line indicator when loading data to initialize content from the server.</li>
          <li>If a spinner is triggered by a button, place the spinner <em>in</em> the button and disable the button while the spinner is visible.</li>
          <li>If only a portion of a page is loading or updating, place the indicator in that part of the page — not at the page level.</li>
          <li>There should only be a single loading indicator on a page at a time.</li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            Wrap the indicator with an <code>aria-live="polite"</code> region
            (or apply <code>role="status"</code> to a parent) so screen
            readers announce that loading has started.
          </li>
          <li>
            Pair the visual indicator with a short text label
            (<em>"Loading candidates…"</em>) — animation alone is not
            announced to assistive tech.
          </li>
          <li>
            Respect <code>prefers-reduced-motion</code>: the dot animation is
            decorative, but the surrounding context should still convey
            progress through text.
          </li>
          <li>
            Don't rely on color alone (e.g. <code>color="grapefruit"</code>) to
            convey state — it's a stylistic choice, not a semantic one.
          </li>
        </ul>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 2. Default                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The default `<novo-loading>` — five dots animating in a line. With no
 * `color` set, the dots cycle through the analytics palette via the keyframe
 * animation. This is the most common page- / section-level loading state.
 */
export const Default: Story = {
  args: {
    size: 'medium',
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-loading
        [color]="color"
        [size]="size"
      ></novo-loading>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Line                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-loading>` renders five jumping dots in a line. Use this as the
 * page- or section-level loading indicator — for the initial render of a
 * view, content inside a modal, or while refreshing a table.
 */
export const Line: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; min-height: 80px;">
        <novo-loading></novo-loading>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Spinner                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-spinner>` renders a twelve-dot circular spinner. Use this for
 * action-in-progress feedback inside an existing element — most commonly
 * inside a button while a save / submit is pending.
 */
export const Spinner: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 1.5rem; min-height: 80px;">
        <novo-spinner></novo-spinner>
        <novo-spinner color="ocean"></novo-spinner>
        <novo-spinner color="mint"></novo-spinner>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Sizes                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Three discrete sizes — `small`, `medium`, `large`. Most usages should
 * leave `size` unset to inherit the default `medium`.
 */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1.5rem; align-items: center;">
        <novo-loading size="small"></novo-loading>
        <novo-loading size="medium"></novo-loading>
        <novo-loading size="large"></novo-loading>
      </div>
      <div style="display: flex; gap: 1.5rem; align-items: center; margin-top: 1rem;">
        <novo-spinner size="small"></novo-spinner>
        <novo-spinner size="medium"></novo-spinner>
        <novo-spinner size="large"></novo-spinner>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Colors                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * `color` accepts any analytics-palette token. Omit `color` entirely for the
 * default multi-color rotating animation, which is the most common choice.
 */
export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, max-content); gap: 0.5rem 1.5rem; align-items: center;">
        <novo-loading color="grapefruit"></novo-loading><span>grapefruit</span>
        <novo-loading color="aqua"></novo-loading><span>aqua</span>
        <novo-loading color="mint"></novo-loading><span>mint</span>
        <novo-loading color="ocean"></novo-loading><span>ocean</span>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. SpinnerInverse                                                           */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-spinner>` also supports an `inverse` boolean that flips the dots to
 * white so the spinner reads on a colored / dark background — for example,
 * when nested inside a `theme="primary"` button.
 */
export const SpinnerInverse: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="
        display: flex;
        gap: 1.5rem;
        align-items: center;
        padding: 1.5rem;
        background: #4a90e2;
        border-radius: 6px;
        width: max-content;
      ">
        <novo-spinner inverse></novo-spinner>
        <novo-spinner inverse size="small"></novo-spinner>
        <novo-spinner inverse size="large"></novo-spinner>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every `<novo-loading>` input wired to a control. Use it to sanity-check
 * color / size combinations or copy a code snippet via the Source tab.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    color: undefined,
    size: 'medium',
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-loading
        [color]="color"
        [size]="size"
      ></novo-loading>
    `,
  }),
};
