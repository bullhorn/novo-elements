import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { NovoButtonModule } from '../button/Button.module';
import { NovoExpansionPanel } from './expansion-panel';
import { NovoExpansionModule } from './expansion.module';

/**
 * Stories for `<novo-expansion-panel>` and `<novo-accordion>`.
 *
 * An expansion panel provides an expandable details-summary view. Multiple
 * panels can be combined into an `<novo-accordion>` with optional exclusive
 * (one-at-a-time) or `multi` (any-number-open) behavior.
 */
const meta: Meta<NovoExpansionPanel> = {
  title: 'Elements/Expansion',
  component: NovoExpansionPanel,
  decorators: [
    moduleMetadata({
      // `NovoExpansionModule` declares & exports the panel, header, title,
      // description, content and action-row pieces. The action-row story
      // additionally renders `<novo-button>` so pull in `NovoButtonModule`.
      imports: [NovoExpansionModule, NovoButtonModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An expandable details/summary surface. Use a single `<novo-expansion-panel>` when ' +
          'one block of content can be optionally revealed; group multiple panels inside an ' +
          '`<novo-accordion>` for a related set. The accordion defaults to exclusive expansion ' +
          '(one panel open at a time) — set `multi="true"` to allow several open simultaneously.',
      },
    },
  },
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'Whether the panel is expanded. Two-way bindable via `expandedChange`.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description:
        'When `true`, the panel header cannot be toggled by the user. The panel can still be ' +
        'expanded/collapsed programmatically.',
      table: { defaultValue: { summary: 'false' } },
    },
    hideToggle: {
      control: 'boolean',
      description: 'Hides the chevron toggle indicator on the header.',
      table: { defaultValue: { summary: 'false' } },
    },
    padding: {
      control: 'boolean',
      description: 'Applies the default body padding. Set `false` when projecting full-bleed content.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;
type Story = StoryObj<NovoExpansionPanel>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for an expansion panel,
 * accordion modes, anatomy, and accessibility requirements.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use an expansion panel</h2>
        <p style="margin: 0 0 1.25rem;">
          Use an expansion panel when a block of content is <strong>secondary</strong> —
          relevant on demand, but not worth the vertical space of always being visible.
          Group several into an <code>&lt;novo-accordion&gt;</code> when the panels share
          a theme (e.g. settings sections, FAQ, a multi-section form summary).
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
              ✓ Use when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Revealing optional or advanced settings on demand</li>
              <li>Splitting a long form into collapsible sections</li>
              <li>Building a FAQ-style Q&amp;A list</li>
              <li>Letting users compare two sections by opening both</li>
              <li>Saving vertical space without removing access to detail</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The content is short enough to always show — just show it</li>
              <li>Users need to scan everything at once — prefer a list or table</li>
              <li>Toggling between mutually-exclusive views — use tabs</li>
              <li>Hiding required form fields behind a click — reduces completion</li>
              <li>Nesting deeper than two levels — visual hierarchy collapses</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          Every panel needs a header. Title and description are optional but
          recommended for scannability. Content projects into the body slot;
          an <code>&lt;novo-action-row&gt;</code> can be added for buttons at
          the bottom of the expanded panel.
        </p>
        <ol style="margin: 0 0 1.5rem 1.25rem; padding-left: 0.5rem;">
          <li>
            <code>&lt;novo-expansion-panel-header&gt;</code> — the clickable summary row.
            Can contain a <code>&lt;novo-panel-title&gt;</code> and an optional
            <code>&lt;novo-panel-description&gt;</code>.
          </li>
          <li>
            <strong>Body</strong> — anything projected directly inside
            <code>&lt;novo-expansion-panel&gt;</code> (outside the header) renders
            in the collapsible region.
          </li>
          <li>
            <code>&lt;novo-action-row&gt;</code> — optional bottom bar, visible only
            when the panel is open. Holds buttons (Save, Cancel, etc).
          </li>
          <li>
            <strong>Toggle indicator</strong> — chevron at the trailing edge of
            the header. Hide via <code>hideToggle</code> on the panel (or on the
            parent accordion).
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accordion modes</h2>
        <p style="margin: 0 0 1rem;">
          Wrap multiple panels in <code>&lt;novo-accordion&gt;</code> to coordinate them:
        </p>
        <ul style="margin: 0 0 1.5rem; padding-left: 1.25rem;">
          <li>
            <strong>Exclusive</strong> (<code>multi="false"</code>, default) — opening
            a panel closes the previously open one. Best when only one section is
            relevant at a time.
          </li>
          <li>
            <strong>Multi</strong> (<code>multi="true"</code>) — any number of panels
            may be open simultaneously. Useful when users compare sections.
          </li>
          <li>
            <code>displayMode="default"</code> adds a gutter around the expanded panel;
            <code>displayMode="flat"</code> keeps every panel flush at the same elevation.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            The header carries <code>role="button"</code> with
            <code>aria-controls</code> pointing at the panel body and
            <code>aria-expanded</code> reflecting state. Screen readers announce
            "collapsed"/"expanded" automatically.
          </li>
          <li>
            <code>Enter</code> and <code>Space</code> toggle the panel from a focused header.
          </li>
          <li>
            When <code>disabled</code>, the header is removed from the tab order
            (<code>tabindex="-1"</code>) and reports <code>aria-disabled="true"</code>.
          </li>
          <li>
            <strong>Do not put other interactive elements inside the header</strong> —
            the header itself is a button, and nesting a button or link inside it
            creates conflicting click targets and breaks keyboard semantics.
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
 * A single expansion panel with a title, description, and projected body
 * content. All meta-level args are bound so the controls panel toggles each
 * input live.
 */
export const Default: Story = {
  args: {
    expanded: false,
    disabled: false,
    hideToggle: false,
    padding: true,
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-expansion-panel>
  <novo-expansion-panel-header>
    <novo-panel-title>This is the expansion title</novo-panel-title>
    <novo-panel-description>This is a summary of the content</novo-panel-description>
  </novo-expansion-panel-header>

  <p>This is the primary content of the panel.</p>
</novo-expansion-panel>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-expansion-panel
        [expanded]="expanded"
        [disabled]="disabled"
        [hideToggle]="hideToggle"
        [padding]="padding"
      >
        <novo-expansion-panel-header>
          <novo-panel-title>This is the expansion title</novo-panel-title>
          <novo-panel-description>This is a summary of the content</novo-panel-description>
        </novo-expansion-panel-header>

        <p>This is the primary content of the panel. Toggle the header to expand or collapse.</p>
      </novo-expansion-panel>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Accordion (exclusive)                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Multiple panels grouped in an `<novo-accordion>`. Default behaviour is
 * **exclusive** — opening a panel collapses the previously open one.
 */
export const AccordionExclusive: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-accordion>
  <novo-expansion-panel>
    <novo-expansion-panel-header>
      <novo-panel-title>Section one</novo-panel-title>
    </novo-expansion-panel-header>
    <p>Only one panel is expanded at a time.</p>
  </novo-expansion-panel>

  <novo-expansion-panel>
    <novo-expansion-panel-header>
      <novo-panel-title>Section two</novo-panel-title>
    </novo-expansion-panel-header>
    <p>Opening this one closes the other.</p>
  </novo-expansion-panel>

  <novo-expansion-panel>
    <novo-expansion-panel-header>
      <novo-panel-title>Section three</novo-panel-title>
    </novo-expansion-panel-header>
    <p>Defaults to exclusive expansion.</p>
  </novo-expansion-panel>
</novo-accordion>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-accordion>
        <novo-expansion-panel>
          <novo-expansion-panel-header>
            <novo-panel-title>Section one</novo-panel-title>
            <novo-panel-description>Open me first</novo-panel-description>
          </novo-expansion-panel-header>
          <p>Only one panel is expanded at a time.</p>
        </novo-expansion-panel>

        <novo-expansion-panel>
          <novo-expansion-panel-header>
            <novo-panel-title>Section two</novo-panel-title>
            <novo-panel-description>Closes section one when opened</novo-panel-description>
          </novo-expansion-panel-header>
          <p>Opening this one closes the other.</p>
        </novo-expansion-panel>

        <novo-expansion-panel>
          <novo-expansion-panel-header>
            <novo-panel-title>Section three</novo-panel-title>
            <novo-panel-description>Defaults to exclusive expansion</novo-panel-description>
          </novo-expansion-panel-header>
          <p>The accordion defaults to <code>multi="false"</code>.</p>
        </novo-expansion-panel>
      </novo-accordion>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Accordion (multi)                                                        */
/* -------------------------------------------------------------------------- */

/**
 * `multi="true"` lets several panels stay open simultaneously. Useful when
 * users compare sections side by side.
 */
export const AccordionMulti: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-accordion multi="true">
  <novo-expansion-panel>
    <novo-expansion-panel-header>
      <novo-panel-title>Filters</novo-panel-title>
    </novo-expansion-panel-header>
    <p>Open both panels at once.</p>
  </novo-expansion-panel>

  <novo-expansion-panel>
    <novo-expansion-panel-header>
      <novo-panel-title>Sort</novo-panel-title>
    </novo-expansion-panel-header>
    <p>Both can stay expanded.</p>
  </novo-expansion-panel>
</novo-accordion>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-accordion multi="true">
        <novo-expansion-panel>
          <novo-expansion-panel-header>
            <novo-panel-title>Filters</novo-panel-title>
            <novo-panel-description>Stays open independently</novo-panel-description>
          </novo-expansion-panel-header>
          <p>Open both panels at once.</p>
        </novo-expansion-panel>

        <novo-expansion-panel>
          <novo-expansion-panel-header>
            <novo-panel-title>Sort</novo-panel-title>
            <novo-panel-description>Stays open independently</novo-panel-description>
          </novo-expansion-panel-header>
          <p>Both can stay expanded.</p>
        </novo-expansion-panel>

        <novo-expansion-panel>
          <novo-expansion-panel-header>
            <novo-panel-title>Group by</novo-panel-title>
            <novo-panel-description>Stays open independently</novo-panel-description>
          </novo-expansion-panel-header>
          <p>No exclusive lockout when <code>multi</code> is set.</p>
        </novo-expansion-panel>
      </novo-accordion>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Flat display mode                                                        */
/* -------------------------------------------------------------------------- */

/**
 * `displayMode="flat"` keeps every panel flush at the same elevation, even
 * when one is expanded. The default `displayMode="default"` adds a gutter
 * around the expanded panel.
 */
export const FlatAccordion: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-accordion displayMode="flat">
  <novo-expansion-panel expanded>
    <novo-expansion-panel-header>
      <novo-panel-title>Flush header</novo-panel-title>
    </novo-expansion-panel-header>
    <p>No gutter spacing when expanded.</p>
  </novo-expansion-panel>

  <novo-expansion-panel>
    <novo-expansion-panel-header>
      <novo-panel-title>Sibling stays flush</novo-panel-title>
    </novo-expansion-panel-header>
    <p>Both panels share the same elevation.</p>
  </novo-expansion-panel>
</novo-accordion>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-accordion displayMode="flat">
        <novo-expansion-panel [expanded]="true">
          <novo-expansion-panel-header>
            <novo-panel-title>Flush header</novo-panel-title>
          </novo-expansion-panel-header>
          <p>No gutter spacing when expanded — every panel stays at the same elevation.</p>
        </novo-expansion-panel>

        <novo-expansion-panel>
          <novo-expansion-panel-header>
            <novo-panel-title>Sibling stays flush</novo-panel-title>
          </novo-expansion-panel-header>
          <p>Both panels share the same elevation.</p>
        </novo-expansion-panel>
      </novo-accordion>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Disabled                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * A disabled panel cannot be toggled by the user. The header is removed from
 * the tab order and reports `aria-disabled="true"`. It can still be expanded
 * programmatically.
 */
export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-expansion-panel [disabled]="true">
  <novo-expansion-panel-header>
    <novo-panel-title>Disabled panel</novo-panel-title>
    <novo-panel-description>Cannot be toggled by the user</novo-panel-description>
  </novo-expansion-panel-header>
  <p>Content remains collapsed.</p>
</novo-expansion-panel>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <novo-expansion-panel [disabled]="true">
          <novo-expansion-panel-header>
            <novo-panel-title>Disabled panel</novo-panel-title>
            <novo-panel-description>Cannot be toggled by the user</novo-panel-description>
          </novo-expansion-panel-header>
          <p>Content remains collapsed; the header is non-interactive.</p>
        </novo-expansion-panel>

        <novo-expansion-panel [disabled]="true" [expanded]="true">
          <novo-expansion-panel-header>
            <novo-panel-title>Disabled but pre-expanded</novo-panel-title>
            <novo-panel-description>Programmatically opened</novo-panel-description>
          </novo-expansion-panel-header>
          <p>
            Disabled only blocks user toggling — the panel can still be expanded
            programmatically (here via <code>[expanded]="true"</code>).
          </p>
        </novo-expansion-panel>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. WithActionRow                                                            */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-action-row>` projects a button bar at the bottom of the expanded
 * panel. The row is only visible when the panel is open.
 */
export const WithActionRow: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-expansion-panel expanded>
  <novo-expansion-panel-header>
    <novo-panel-title>Edit profile</novo-panel-title>
    <novo-panel-description>With action row</novo-panel-description>
  </novo-expansion-panel-header>

  <p>Form content goes here.</p>

  <novo-action-row>
    <novo-button theme="dialogue">Cancel</novo-button>
    <novo-button theme="primary">Save</novo-button>
  </novo-action-row>
</novo-expansion-panel>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-expansion-panel [expanded]="true">
        <novo-expansion-panel-header>
          <novo-panel-title>Edit profile</novo-panel-title>
          <novo-panel-description>With action row</novo-panel-description>
        </novo-expansion-panel-header>

        <p>Form content goes here.</p>

        <novo-action-row>
          <novo-button theme="dialogue">Cancel</novo-button>
          <novo-button theme="primary">Save</novo-button>
        </novo-action-row>
      </novo-expansion-panel>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. CustomHeader                                                             */
/* -------------------------------------------------------------------------- */

/**
 * The header projects arbitrary content — title and description are optional.
 * Use this when you need a richer summary row, e.g. a status badge or count.
 *
 * **Caveat:** do not nest other interactive elements (buttons, links) inside
 * the header — the header itself is a button, and competing click targets
 * break keyboard semantics.
 */
export const CustomHeader: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-expansion-panel>
  <novo-expansion-panel-header [collapsedHeight]="'64px'" [expandedHeight]="'64px'">
    <div style="display: flex; align-items: center; gap: 0.75rem; width: 100%;">
      <strong>Profile</strong>
      <span style="color: #6e7480;">3 of 5 sections complete</span>
      <span style="
        margin-left: auto;
        background: #e8f4fd;
        color: #1976d2;
        padding: 2px 8px;
        border-radius: 999px;
        font-size: 12px;
      ">In progress</span>
    </div>
  </novo-expansion-panel-header>

  <p>Section content.</p>
</novo-expansion-panel>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-expansion-panel>
        <novo-expansion-panel-header [collapsedHeight]="'64px'" [expandedHeight]="'64px'">
          <div style="display: flex; align-items: center; gap: 0.75rem; width: 100%;">
            <strong>Profile</strong>
            <span style="color: #6e7480;">3 of 5 sections complete</span>
            <span style="
              margin-left: auto;
              background: #e8f4fd;
              color: #1976d2;
              padding: 2px 8px;
              border-radius: 999px;
              font-size: 12px;
            ">In progress</span>
          </div>
        </novo-expansion-panel-header>

        <p>Section content goes here. The header is fully customised but still acts as the toggle.</p>
      </novo-expansion-panel>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. Expanded (play)                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Drives the meaningful interaction: clicks the header and asserts the panel
 * reports `aria-expanded="true"`. Use this story as the visual-regression
 * snapshot of the expanded state.
 *
 * The body is not inside a CDK overlay (it's inline in the canvas), so the
 * play queries `canvasElement` directly.
 */
export const Expanded: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-expansion-panel>
  <novo-expansion-panel-header>
    <novo-panel-title>Click me to expand</novo-panel-title>
    <novo-panel-description>The play function drives this open</novo-panel-description>
  </novo-expansion-panel-header>

  <p>Revealed only after clicking the header.</p>
</novo-expansion-panel>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-expansion-panel>
        <novo-expansion-panel-header>
          <novo-panel-title>Click me to expand</novo-panel-title>
          <novo-panel-description>The play function drives this open</novo-panel-description>
        </novo-expansion-panel-header>

        <p>Revealed only after clicking the header.</p>
      </novo-expansion-panel>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = await canvas.findByRole('button', { name: /click me to expand/i });

    // Initially collapsed.
    await expect(header).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(header);

    // After clicking, the header reports expanded — this is the canonical
    // signal. The CSS animation briefly renders an empty `<p>` during the
    // transition, so a `toBeVisible()` check on the body text races the
    // animation; assert aria-expanded instead and confirm the text is
    // present in the document.
    await waitFor(async () => {
      await expect(header).toHaveAttribute('aria-expanded', 'true');
    });
    await expect(
      await canvas.findByText(/revealed only after clicking the header/i),
    ).toBeInTheDocument();
  },
};

/* -------------------------------------------------------------------------- */
/* 10. Playground                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Every supported input bound to a control. Toggle expansion, disabled state,
 * the chevron, and body padding live.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    expanded: false,
    disabled: false,
    hideToggle: false,
    padding: true,
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-expansion-panel
  [expanded]="expanded"
  [disabled]="disabled"
  [hideToggle]="hideToggle"
  [padding]="padding"
>
  <novo-expansion-panel-header>
    <novo-panel-title>Playground</novo-panel-title>
    <novo-panel-description>Tweak the controls panel</novo-panel-description>
  </novo-expansion-panel-header>

  <p>Body content.</p>
</novo-expansion-panel>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-expansion-panel
        [expanded]="expanded"
        [disabled]="disabled"
        [hideToggle]="hideToggle"
        [padding]="padding"
      >
        <novo-expansion-panel-header>
          <novo-panel-title>Playground</novo-panel-title>
          <novo-panel-description>Tweak the controls panel</novo-panel-description>
        </novo-expansion-panel-header>

        <p>Body content. Try toggling <code>hideToggle</code> or <code>padding</code> from the controls.</p>
      </novo-expansion-panel>
    `,
  }),
};
