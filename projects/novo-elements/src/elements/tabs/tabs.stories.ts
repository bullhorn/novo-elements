import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect, waitFor } from 'storybook/test';

import { NovoIconModule } from '../icon/Icon.module';
import { NovoTabModule } from './Tabs.module';
import { NovoNavElement } from './Tabs';

/**
 * Stories for `<novo-nav>` / `<novo-tab>` (and `<novo-tab-button>` / `<novo-tab-link>`).
 *
 * Tabs section a view into peer panes that share a single space. The visible
 * surface is `<novo-nav>` (the tab bar) plus the tab items inside it; the
 * content panes live in a separate `<novo-nav-outlet>` and are bound back to
 * the bar via `[outlet]`.
 *
 * Story conventions (mirrors `button.stories.ts`):
 *   1. UsageGuide   (📖)  — when-to-use / anatomy / accessibility narrative
 *   2. Default            — single canonical recipe
 *   3+. Showcase stories  — themes, vertical, condensed, with-content, etc.
 *   Last. Playground (🎮) — every input wired to a control
 */
const meta: Meta<NovoNavElement> = {
  title: 'Elements/Tabs',
  component: NovoNavElement,
  decorators: [
    moduleMetadata({
      imports: [NovoTabModule, NovoIconModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tabs section information into peer panes. `<novo-nav>` is the tab bar; ' +
          '`<novo-tab>` items live inside it. Pair with `<novo-nav-outlet>` + ' +
          '`<novo-nav-content>` (linked via `[outlet]`) when each tab swaps the ' +
          'main content area, or use the bar by itself as a segmented header ' +
          'where the parent reacts to `(selectedIndexChange)`.',
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['', 'white', 'color', 'neutral'],
      description:
        'Visual treatment for the tab bar. `white` for light surfaces, `color` / ' +
        '`neutral` for colored toolbars where the bar sits on top of a brand color.',
      table: { defaultValue: { summary: '' } },
    },
    direction: {
      control: 'radio',
      options: ['', 'horizontal', 'vertical'],
      description: 'Lay tabs across the top (default) or down a side rail.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    condensed: {
      control: 'boolean',
      description: 'Tighter padding for use in dense headers / toolbars.',
      table: { defaultValue: { summary: 'false' } },
    },
    selectedIndex: {
      control: { type: 'number', min: 0 },
      description:
        'Two-way bindable active tab index. Use `[(selectedIndex)]` to read and ' +
        'set programmatically.',
      table: { defaultValue: { summary: '0' } },
    },
  },
};

export default meta;
type Story = StoryObj<NovoNavElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when tabs are the right pattern, when to
 * reach for something else (a stepper, a slideout, a radio group), how the
 * pieces compose, and the a11y wiring you need to layer on top of the
 * existing component classes.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use tabs</h2>
        <p style="margin: 0 0 1.25rem;">
          Tabs let users explore and switch between different views or
          functional aspects of the same record or workspace. They section
          information across multiple pages within a single context — only one
          tab can be open at a time, so the user focuses on the pane in front
          of them.
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
              ✓ Use tabs when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>A page holds a lot of content that splits cleanly into named groups (Overview, Edit, Activity, Notes)</li>
              <li>You need top-level navigation between sibling pages</li>
              <li>The user can finish an isolated task without leaving the current tab</li>
              <li>Each tab's label is short — ideally one or two words</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use tabs when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The user has a workflow that flows from one step to the next — reach for a stepper instead</li>
              <li>Two panes' worth of content must be visible at the same time — use a slideout or split layout</li>
              <li>You're toggling between two views of the same data (current vs. historical) — that's a segmented control / radio group</li>
              <li>The labels would have to break onto two lines or be abbreviated past recognition</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          The tab bar (<code>&lt;novo-nav&gt;</code>) is the only required
          piece. When each tab swaps the main content area, pair the bar with
          a content outlet:
        </p>
        <ol style="margin: 0 0 1.25rem; padding-left: 1.25rem;">
          <li><strong>Tab bar</strong> — <code>&lt;novo-nav&gt;</code>, with one <code>&lt;novo-tab&gt;</code> per pane.</li>
          <li><strong>Active indicator</strong> — the underline (horizontal) or rail bar (vertical) under the selected tab; the component renders this for you.</li>
          <li><strong>Content outlet</strong> — <code>&lt;novo-nav-outlet&gt;</code> with one <code>&lt;novo-nav-content&gt;</code> per tab, wired by <code>[outlet]="myOutlet"</code> on the bar.</li>
        </ol>
        <p style="margin: 0 0 1.25rem;">
          Tab items can also carry a leading <code>&lt;novo-icon&gt;</code>
          and a <code>&lt;novo-label&gt;</code> for status — keep both
          optional and reserve icons for cases where they meaningfully aid
          recognition.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Variants</h2>
        <ul style="margin: 0 0 1.25rem; padding-left: 1.25rem;">
          <li><code>theme="white"</code> — on light surfaces (most record pages).</li>
          <li><code>theme="color"</code> / <code>"neutral"</code> — on colored toolbars; text flips to white.</li>
          <li><code>direction="vertical"</code> — side rail; pair with a vertical record layout.</li>
          <li><code>condensed</code> — tighter padding for dense headers.</li>
          <li><code>&lt;novo-tab-link&gt;</code> — same look as <code>&lt;novo-tab&gt;</code> but acts as a router link; use for true page navigation.</li>
          <li><code>&lt;novo-tab-button&gt;</code> — segmented-button look; use inside a button-bar nav.</li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            Each tab item carries <code>role="tab"</code> automatically.
            Wrap the bar in <code>role="tablist"</code> at the call-site if
            the surrounding element doesn't already imply one.
          </li>
          <li>
            <code>&lt;novo-nav-header&gt;</code> exposes <code>role="tabpanel"</code> for
            the matched content area.
          </li>
          <li>
            Tabs activate on click, touch, and Enter / Space (native button
            semantics on <code>&lt;novo-tab-button&gt;</code>). Be sure your
            content updates announce themselves — the active tab's
            <code>.active</code> class is the source of truth, but you may
            want to add <code>aria-selected</code> in the template when
            consuming the component.
          </li>
          <li>
            When used for real page navigation, prefer
            <code>&lt;novo-tab-link&gt;</code> with router bindings so the
            browser back / forward / address bar all behave naturally.
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
 * The simplest tab bar — a `white` themed `<novo-nav>` with a handful of
 * `<novo-tab>` children. No content outlet is wired in this story: the parent
 * is responsible for reacting to `(selectedIndexChange)` and rendering the
 * matching pane itself.
 */
export const Default: Story = {
  args: {
    theme: 'white',
    selectedIndex: 0,
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- NovoTabModule -->
<novo-nav theme="white" [(selectedIndex)]="selected">
  <novo-tab>Overview</novo-tab>
  <novo-tab>Edit</novo-tab>
  <novo-tab>Activity</novo-tab>
  <novo-tab>Notes</novo-tab>
  <novo-tab disabled>Disabled</novo-tab>
</novo-nav>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-nav
        [theme]="theme"
        [direction]="direction"
        [condensed]="condensed"
        [(selectedIndex)]="selectedIndex"
      >
        <novo-tab>Overview</novo-tab>
        <novo-tab>Edit</novo-tab>
        <novo-tab>Activity</novo-tab>
        <novo-tab>Notes</novo-tab>
        <novo-tab disabled>Disabled</novo-tab>
      </novo-nav>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Themes                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Three approved themes. Pick by the surface the bar sits on: `white` for
 * light record pages, `color` / `neutral` for colored toolbars where the
 * bar inherits the brand color of its host.
 */
export const Themes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-nav theme="white">
  <novo-tab>Overview</novo-tab>
  <novo-tab>Edit</novo-tab>
  <novo-tab>Activity</novo-tab>
</novo-nav>

<novo-nav theme="color" style="background: #1d8ee8;">
  <novo-tab>Overview</novo-tab>
  <novo-tab>Edit</novo-tab>
  <novo-tab>Activity</novo-tab>
</novo-nav>

<novo-nav theme="neutral" style="background: #3d4550;">
  <novo-tab>Overview</novo-tab>
  <novo-tab>Edit</novo-tab>
  <novo-tab>Activity</novo-tab>
</novo-nav>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div>
          <div style="font: 12px/1.4 monospace; opacity: 0.6; margin-bottom: 0.25rem;">theme="white"</div>
          <novo-nav theme="white">
            <novo-tab>Overview</novo-tab>
            <novo-tab>Edit</novo-tab>
            <novo-tab>Activity</novo-tab>
            <novo-tab disabled>Disabled</novo-tab>
          </novo-nav>
        </div>

        <div>
          <div style="font: 12px/1.4 monospace; opacity: 0.6; margin-bottom: 0.25rem;">theme="color"</div>
          <novo-nav theme="color" style="background: #1d8ee8;">
            <novo-tab>Overview</novo-tab>
            <novo-tab>Edit</novo-tab>
            <novo-tab>Activity</novo-tab>
            <novo-tab disabled>Disabled</novo-tab>
          </novo-nav>
        </div>

        <div>
          <div style="font: 12px/1.4 monospace; opacity: 0.6; margin-bottom: 0.25rem;">theme="neutral"</div>
          <novo-nav theme="neutral" style="background: #3d4550;">
            <novo-tab>Overview</novo-tab>
            <novo-tab>Edit</novo-tab>
            <novo-tab>Activity</novo-tab>
            <novo-tab disabled>Disabled</novo-tab>
          </novo-nav>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. WithIcons                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Tabs can host a leading `<novo-icon>` alongside the label. Keep it
 * meaningful — icons compete with the label for attention, so reserve them
 * for cases where they meaningfully aid recognition or show status.
 */
export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-nav theme="white">
  <novo-tab>
    <novo-icon>person</novo-icon>
    Profile
  </novo-tab>
  <novo-tab>
    <novo-icon>note</novo-icon>
    Notes
  </novo-tab>
  <novo-tab>
    <novo-icon>calendar</novo-icon>
    Schedule
  </novo-tab>
  <novo-tab disabled>
    <novo-icon>settings</novo-icon>
    Settings
  </novo-tab>
</novo-nav>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-nav theme="white">
        <novo-tab>
          <novo-icon>person</novo-icon>
          Profile
        </novo-tab>
        <novo-tab>
          <novo-icon>note</novo-icon>
          Notes
        </novo-tab>
        <novo-tab>
          <novo-icon>calendar</novo-icon>
          Schedule
        </novo-tab>
        <novo-tab disabled>
          <novo-icon>settings</novo-icon>
          Settings
        </novo-tab>
      </novo-nav>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Vertical                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Side-rail layout via `direction="vertical"`. Pair with a vertical record
 * layout where the rail stays parked on the left and content fills the right.
 */
export const Vertical: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-nav theme="white" direction="vertical" [outlet]="outlet">
  <novo-tab><novo-icon>person</novo-icon>Profile</novo-tab>
  <novo-tab><novo-icon>note</novo-icon>Notes</novo-tab>
  <novo-tab disabled><novo-icon>settings</novo-icon>Settings</novo-tab>
</novo-nav>

<novo-nav-outlet #outlet>
  <novo-nav-content><h3>Profile</h3></novo-nav-content>
  <novo-nav-content><h3>Notes</h3></novo-nav-content>
</novo-nav-outlet>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: 200px 1fr; gap: 1.5rem; min-height: 220px;">
        <novo-nav theme="white" direction="vertical" [outlet]="vOutlet">
          <novo-tab>
            <novo-icon>person</novo-icon>
            Profile
          </novo-tab>
          <novo-tab>
            <novo-icon>note</novo-icon>
            Notes
          </novo-tab>
          <novo-tab>
            <novo-icon>calendar</novo-icon>
            Schedule
          </novo-tab>
          <novo-tab disabled>
            <novo-icon>settings</novo-icon>
            Settings
          </novo-tab>
        </novo-nav>

        <novo-nav-outlet #vOutlet>
          <novo-nav-content><h3 style="margin: 0;">Profile</h3><p>Candidate profile content.</p></novo-nav-content>
          <novo-nav-content><h3 style="margin: 0;">Notes</h3><p>Internal notes.</p></novo-nav-content>
          <novo-nav-content><h3 style="margin: 0;">Schedule</h3><p>Upcoming events.</p></novo-nav-content>
          <novo-nav-content><h3 style="margin: 0;">Settings</h3><p>Configuration.</p></novo-nav-content>
        </novo-nav-outlet>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Condensed                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Tighter padding for use inside a busy toolbar or page header. Drop in the
 * `condensed` attribute on `<novo-nav>` — the tab items pick up the smaller
 * padding via `:host-context`.
 */
export const Condensed: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-nav theme="white" condensed>
  <novo-tab>Overview</novo-tab>
  <novo-tab>Edit</novo-tab>
  <novo-tab>Activity</novo-tab>
  <novo-tab disabled>Disabled</novo-tab>
</novo-nav>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div>
          <div style="font: 12px/1.4 monospace; opacity: 0.6; margin-bottom: 0.25rem;">default</div>
          <novo-nav theme="white">
            <novo-tab>Overview</novo-tab>
            <novo-tab>Edit</novo-tab>
            <novo-tab>Activity</novo-tab>
            <novo-tab disabled>Disabled</novo-tab>
          </novo-nav>
        </div>
        <div>
          <div style="font: 12px/1.4 monospace; opacity: 0.6; margin-bottom: 0.25rem;">condensed</div>
          <novo-nav theme="white" condensed>
            <novo-tab>Overview</novo-tab>
            <novo-tab>Edit</novo-tab>
            <novo-tab>Activity</novo-tab>
            <novo-tab disabled>Disabled</novo-tab>
          </novo-nav>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. WithContent                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The full pattern — tab bar wired to a `<novo-nav-outlet>` so clicking a tab
 * also swaps in the matching `<novo-nav-content>`. The `play` function clicks
 * a non-active tab and asserts it picks up the `.active` class (the
 * component's source-of-truth indicator).
 */
export const WithContent: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-nav theme="white" [outlet]="outlet" [(selectedIndex)]="selected">
  <novo-tab>Overview</novo-tab>
  <novo-tab>Edit</novo-tab>
  <novo-tab>Activity</novo-tab>
</novo-nav>

<novo-nav-outlet #outlet>
  <novo-nav-content><h3>Overview</h3></novo-nav-content>
  <novo-nav-content><h3>Edit</h3></novo-nav-content>
  <novo-nav-content><h3>Activity</h3></novo-nav-content>
</novo-nav-outlet>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <novo-nav theme="white" [outlet]="cOutlet" data-testid="content-nav">
          <novo-tab data-testid="tab-overview">Overview</novo-tab>
          <novo-tab data-testid="tab-edit">Edit</novo-tab>
          <novo-tab data-testid="tab-activity">Activity</novo-tab>
        </novo-nav>

        <novo-nav-outlet #cOutlet>
          <novo-nav-content data-testid="content-overview">
            <h3 style="margin: 0 0 0.5rem;">Overview</h3>
            <p>Top-level summary of the record.</p>
          </novo-nav-content>
          <novo-nav-content data-testid="content-edit">
            <h3 style="margin: 0 0 0.5rem;">Edit</h3>
            <p>Inline editing for the record.</p>
          </novo-nav-content>
          <novo-nav-content data-testid="content-activity">
            <h3 style="margin: 0 0 0.5rem;">Activity</h3>
            <p>Recent activity feed.</p>
          </novo-nav-content>
        </novo-nav-outlet>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Sanity-check the initial state — first tab is active by default.
    const overview = await canvas.findByTestId('tab-overview');
    await waitFor(() => expect(overview).toHaveClass('active'));

    // Click a non-active tab and assert it becomes the active one.
    const activity = await canvas.findByTestId('tab-activity');
    expect(activity).not.toHaveClass('active');
    await userEvent.click(activity);

    await waitFor(() => expect(activity).toHaveClass('active'));
    await waitFor(() => expect(overview).not.toHaveClass('active'));

    // Outlet content swap should follow the bar selection.
    await waitFor(() =>
      expect(canvas.getByTestId('content-activity')).toHaveClass('active'),
    );
  },
};

/* -------------------------------------------------------------------------- */
/* 8. ButtonBar                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Segmented-button variant. Use `<novo-tab-button>` inside a `type="button-bar"`
 * nav when the choices look more like a small toggle group than a page-level
 * tab bar — e.g. switching the unit of a chart, picking a view mode.
 */
export const ButtonBar: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-nav theme="white" type="button-bar">
  <novo-tab-button>Day</novo-tab-button>
  <novo-tab-button>Week</novo-tab-button>
  <novo-tab-button>Month</novo-tab-button>
  <novo-tab-button disabled>Year</novo-tab-button>
</novo-nav>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-nav theme="white" type="button-bar">
        <novo-tab-button>Day</novo-tab-button>
        <novo-tab-button>Week</novo-tab-button>
        <novo-tab-button>Month</novo-tab-button>
        <novo-tab-button disabled>Year</novo-tab-button>
      </novo-nav>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Use this to sanity-check a combination or
 * copy a recipe out of the Source tab.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    theme: 'white',
    direction: 'horizontal',
    condensed: false,
    selectedIndex: 0,
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-nav theme="white" direction="horizontal" [(selectedIndex)]="selected">
  <novo-tab>Overview</novo-tab>
  <novo-tab>Edit</novo-tab>
  <novo-tab>Activity</novo-tab>
  <novo-tab disabled>Disabled</novo-tab>
</novo-nav>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-nav
        [theme]="theme"
        [direction]="direction"
        [condensed]="condensed"
        [(selectedIndex)]="selectedIndex"
      >
        <novo-tab>
          <novo-icon>person</novo-icon>
          Overview
        </novo-tab>
        <novo-tab>
          <novo-icon>edit</novo-icon>
          Edit
        </novo-tab>
        <novo-tab>
          <novo-icon>calendar</novo-icon>
          Activity
        </novo-tab>
        <novo-tab disabled>
          <novo-icon>settings</novo-icon>
          Disabled
        </novo-tab>
      </novo-nav>
    `,
  }),
};
