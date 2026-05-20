import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect, within } from 'storybook/test';

import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { NovoIconModule } from 'novo-elements/elements/icon';

import { CardElement } from './Card';
import { NovoCardModule } from './Card.module';

/**
 * Stories for `<novo-card>` (and its sub-elements `<novo-card-header>`,
 * `<novo-card-content>`, `<novo-card-footer>`, `<novo-card-actions>`).
 *
 * Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 */
const meta: Meta<CardElement> = {
  title: 'Elements/Card',
  component: CardElement,
  decorators: [
    moduleMetadata({
      // `NovoCardModule` declares the card pieces, but several stories project
      // typography (`<novo-title>` / `<novo-text>` / `<novo-caption>`),
      // buttons in the footer, and icons in the header — pull in the
      // corresponding modules explicitly. Forms modules are already provided
      // globally via `.storybook/preview.ts`.
      imports: [NovoCardModule, NovoCommonModule, NovoButtonModule, NovoIconModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A surface that groups a related set of information into a single visual unit. ' +
          'Compose with `<novo-card-header>`, `<novo-card-content>`, and `<novo-card-footer>` ' +
          'for structured layouts, or use the legacy `title` / `config` inputs for the simpler ' +
          'header-with-actions pattern. Cards float just above their container — avoid nesting ' +
          'one inside another (or inside a modal) to prevent stacked shadows from competing.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description:
        'Header title rendered by the built-in header row. When omitted (and `config.title` is ' +
        'unset), the built-in header is suppressed — use `<novo-card-header>` for a richer layout.',
    },
    icon: {
      control: 'text',
      description: 'Optional Bullhorn icon name (without the `bhi-` prefix) shown before the title.',
    },
    inset: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description:
        'Padding applied to the card surface. Defaults to `none` so projected content can run ' +
        'edge-to-edge (e.g. images); switch to `small`/`medium`/`large` for inline summary cards.',
      table: { defaultValue: { summary: 'none' } },
    },
    inline: {
      control: 'boolean',
      description:
        'When `true`, the card sizes to its content rather than stretching to the parent. ' +
        'Use for stat / KPI cards arranged in a row.',
      table: { defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description:
        'Renders a loading line overlay and hides projected content. The header still renders ' +
        'so the user knows what is loading.',
    },
    message: {
      control: 'text',
      description:
        'Empty / error message shown in place of projected content. Pair with `messageIcon` ' +
        'to draw attention. Accepts HTML.',
    },
    messageIcon: {
      control: 'text',
      description: 'Bullhorn icon shown above the message text.',
    },
    refresh: {
      control: 'boolean',
      description: 'When `true`, renders a refresh icon button in the header; emits `(onRefresh)`.',
    },
    close: {
      control: 'boolean',
      description: 'When `true`, renders a close icon button in the header; emits `(onClose)`.',
    },
    move: {
      control: 'boolean',
      description:
        'When `true`, renders a drag handle in the header. Decorative — wire the parent up to ' +
        'a drag library (e.g. CDK drag-drop) to make it actually move.',
    },
  },
};

export default meta;
type Story = StoryObj<CardElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. When to reach for a card, when whitespace or a
 * simple section heading is the better tool, the card's anatomy (header,
 * content, footer, actions), and accessibility notes.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a card</h2>
        <p style="margin: 0 0 1.25rem;">
          A card is a container that organizes a related grouping of information
          into a single visual unit. Reach for it when several pieces of content
          share a context strongly enough that they should read as one block —
          a candidate summary, a KPI tile, an inline preview of a longer record.
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
              ✓ Use a card when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Grouping information that shares a single context</li>
              <li>Providing a summary that links to a fuller record</li>
              <li>Showing a KPI / stat tile in a dashboard</li>
              <li>Laying out a grid of equally-weighted items</li>
              <li>Wrapping a workflow step (e.g. a card-form pattern)</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a card when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The content would dominate the page — use a section + heading</li>
              <li>The content lives inside a modal or another card — nested shadows compete</li>
              <li>You just need a thin visual break — use a divider</li>
              <li>The content is a long-form article — use plain typography</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          Cards have three composable slots. All are optional — the simplest
          card is just a padded surface with arbitrary projected content.
        </p>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Header</strong> (<code>&lt;novo-card-header&gt;</code>) —
            avatar / icon, title, caption, and optional trailing actions. For
            the simpler "title + refresh/close" pattern, use the
            <code>title</code>, <code>refresh</code>, and <code>close</code>
            inputs on <code>&lt;novo-card&gt;</code> directly.
          </li>
          <li>
            <strong>Content</strong> (<code>&lt;novo-card-content&gt;</code>) —
            the body. Wrap projected children in this for consistent vertical
            spacing; set <code>condensed</code> for tighter padding.
          </li>
          <li>
            <strong>Footer</strong> (<code>&lt;novo-card-footer&gt;</code>) —
            primary / secondary actions related to the card. Renders below the
            content, separated by spacing.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Layout</h2>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Inset</strong> — pick by content type. Use
            <code>none</code> when projecting full-bleed elements (images,
            tables); switch to <code>small</code>/<code>medium</code>/<code>large</code>
            for inline KPI / summary cards.
          </li>
          <li>
            <strong>Inline</strong> — sizes the card to its content so it can
            sit next to siblings without stretching. Pair with a flex / grid
            row of inline cards for a stat tile group.
          </li>
          <li>
            <strong>Shadow</strong> — cards float just above their parent
            container. Avoid nesting cards or placing them inside modals so the
            shadow elevation stays meaningful.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            Decorative imagery in a card (e.g. a hero photo) should carry an
            empty <code>alt=""</code> so screen readers skip it. Informative
            imagery needs a meaningful alt.
          </li>
          <li>
            When the card's <code>close</code> / <code>refresh</code> icon
            buttons are enabled, they receive tooltips automatically from
            <code>NovoLabelService</code>. Keep them visible — don't replace
            the labels with bare icons.
          </li>
          <li>
            The card itself is a plain container, not a landmark or region.
            Avoid stuffing it with heading levels that compete with the page
            outline — start at <code>h3</code> / <code>h4</code> for card
            titles inside a longer page.
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
 * The simplest possible card — a `title` + projected text content. Toggle the
 * controls to see how the built-in header reacts to `icon`, `refresh`,
 * `close`, `loading`, and `message`.
 */
export const Default: Story = {
  args: {
    title: 'Card Title',
    icon: '',
    inset: 'none',
    inline: false,
    loading: false,
    message: '',
    messageIcon: '',
    refresh: false,
    close: false,
    move: false,
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- NovoCardModule -->
<novo-card title="Card Title">
  Card body content goes here.
</novo-card>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 420px;">
        <novo-card
          [title]="title"
          [icon]="icon"
          [inset]="inset"
          [inline]="inline"
          [loading]="loading"
          [message]="message"
          [messageIcon]="messageIcon"
          [refresh]="refresh"
          [close]="close"
          [move]="move"
        >
          Card body content goes here.
        </novo-card>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Composed                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * The structural composition pattern — `<novo-card-header>`,
 * `<novo-card-content>`, `<novo-card-footer>`. Reach for this when the simple
 * `title` input isn't expressive enough (you need a caption, avatar, multiple
 * footer actions, or full control over header content).
 *
 * The header slot accepts `<novo-icon>` / `<novo-avatar>` first, then
 * typography elements, then arbitrary children.
 */
export const Composed: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-card>
  <novo-card-header>
    <novo-icon>activity</novo-icon>
    <novo-title>Highland Cattle</novo-title>
    <novo-caption>Breed of rustic cattle</novo-caption>
  </novo-card-header>
  <novo-card-content>
    <novo-text>
      The Highland is a Scottish breed of rustic cattle. It originated in
      the Scottish Highlands and has long horns and a long shaggy coat.
    </novo-text>
  </novo-card-content>
  <novo-card-footer>
    <novo-button theme="dialogue" icon="pin" side="right">Pin</novo-button>
    <novo-button theme="primary" icon="share" side="right">Share</novo-button>
  </novo-card-footer>
</novo-card>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="max-width: 480px;">
        <novo-card data-testid="composed-card">
          <novo-card-header>
            <novo-icon>activity</novo-icon>
            <novo-title>Highland Cattle</novo-title>
            <novo-caption>Breed of rustic cattle</novo-caption>
          </novo-card-header>
          <novo-card-content>
            <novo-text>
              The Highland is a Scottish breed of rustic cattle. It originated
              in the Scottish Highlands and has long horns and a long shaggy
              coat — bred to withstand the intemperate conditions in the region.
            </novo-text>
          </novo-card-content>
          <novo-card-footer>
            <novo-button theme="dialogue" icon="pin" side="right">Pin</novo-button>
            <novo-button theme="primary" icon="share" side="right" data-testid="composed-card-share">
              Share
            </novo-button>
          </novo-card-footer>
        </novo-card>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Structural smoke test — header text + footer button both render and the
    // footer button reads its projected label.
    await expect(canvas.getByText('Highland Cattle')).toBeInTheDocument();
    await expect(canvas.getByText('Breed of rustic cattle')).toBeInTheDocument();
    const shareBtn = canvas.getByTestId('composed-card-share');
    await expect(shareBtn).toBeInTheDocument();
    await expect(shareBtn).toHaveTextContent(/share/i);
  },
};

/* -------------------------------------------------------------------------- */
/* 4. Insets                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * `inset` controls internal padding. Default `none` lets projected content
 * (images, tables, nested layouts) run edge-to-edge; the `small` / `medium` /
 * `large` values are convenient for inline summary cards.
 */
export const Insets: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-card inset="none">No padding</novo-card>
<novo-card inset="small">Small padding</novo-card>
<novo-card inset="medium">Medium padding</novo-card>
<novo-card inset="large">Large padding</novo-card>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 720px;">
        <novo-card inset="none">
          <div style="background: #eef3f7; padding: 0.25rem 0.5rem;">inset = "none"</div>
        </novo-card>
        <novo-card inset="small">inset = "small"</novo-card>
        <novo-card inset="medium">inset = "medium"</novo-card>
        <novo-card inset="large">inset = "large"</novo-card>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. InlineStats                                                              */
/* -------------------------------------------------------------------------- */

/**
 * `inline` shrinks the card to its content so it can sit alongside siblings.
 * The canonical pattern is a row of KPI / stat tiles, each wrapping a stacked
 * label + value.
 */
export const InlineStats: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<div style="display: flex; gap: 1rem;">
  <novo-card inline inset="large">
    <novo-title larger>500</novo-title>
    <novo-caption>Interviews</novo-caption>
  </novo-card>

  <novo-card inline inset="large">
    <novo-caption>1st Interviews to Placements</novo-caption>
    <novo-title larger>10 : 1</novo-title>
  </novo-card>

  <novo-card inline inset="large">
    <novo-caption>CVs Sent to 1st Interviews</novo-caption>
    <novo-title larger>83%</novo-title>
  </novo-card>
</div>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <novo-card inline inset="large">
          <div style="display: flex; flex-direction: column; align-items: center;">
            <novo-title larger>500</novo-title>
            <novo-caption>Interviews</novo-caption>
          </div>
        </novo-card>

        <novo-card inline inset="large">
          <div style="display: flex; flex-direction: column; align-items: center;">
            <novo-caption>1st Interviews to Placements</novo-caption>
            <novo-title larger>10 : 1</novo-title>
          </div>
        </novo-card>

        <novo-card inline inset="large">
          <div style="display: flex; flex-direction: column; align-items: center;">
            <novo-caption>CVs Sent to 1st Interviews</novo-caption>
            <novo-title larger>83%</novo-title>
          </div>
        </novo-card>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. WithHeaderActions                                                        */
/* -------------------------------------------------------------------------- */

/**
 * The legacy header pattern — `title` + the built-in `refresh` / `close`
 * action buttons. Wire `(onRefresh)` / `(onClose)` to react. Adding `icon`
 * prepends a Bullhorn icon next to the title.
 *
 * For richer headers (avatars, captions, trailing custom buttons), use
 * `<novo-card-header>` instead — see the *Composed* story.
 */
export const WithHeaderActions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-card
  title="Pipeline"
  icon="activity"
  [refresh]="true"
  [close]="true"
  (onRefresh)="reload()"
  (onClose)="dismiss()"
>
  Card body content goes here.
</novo-card>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="max-width: 420px;">
        <novo-card
          title="Pipeline"
          icon="activity"
          [refresh]="true"
          [close]="true"
        >
          Tracking 24 open requisitions across 6 active clients.
        </novo-card>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Loading                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * `loading` swaps the projected content for the built-in `<novo-loading>`
 * line indicator while preserving the header. Use while a card is fetching
 * the data it needs to render — the user still sees what's loading.
 */
export const Loading: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-card title="Pipeline" [loading]="true">
  <!-- content suppressed while loading -->
  Tracking 24 open requisitions across 6 active clients.
</novo-card>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="max-width: 420px;">
        <novo-card title="Pipeline" [loading]="true">
          Tracking 24 open requisitions across 6 active clients.
        </novo-card>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. EmptyMessage                                                             */
/* -------------------------------------------------------------------------- */

/**
 * `message` replaces the body with a centered empty / error state. Pair with
 * `messageIcon` (Bullhorn icon name without the `bhi-` prefix) to draw the
 * eye. Accepts HTML, so you can embed `<strong>` or `<novo-link>` markup.
 */
export const EmptyMessage: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-card
  title="Recent Activity"
  message="No activity in the past 30 days."
  messageIcon="search"
></novo-card>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="max-width: 420px;">
        <novo-card
          title="Recent Activity"
          message="No activity in the past 30 days."
          messageIcon="search"
        ></novo-card>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Sanity-check combinations or copy a code
 * snippet via the Source tab.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-card title="Playground" inset="small">
  Card body content goes here.
</novo-card>`,
      },
    },
  },
  args: {
    title: 'Playground',
    icon: '',
    inset: 'small',
    inline: false,
    loading: false,
    message: '',
    messageIcon: '',
    refresh: false,
    close: false,
    move: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 480px;">
        <novo-card
          [title]="title"
          [icon]="icon"
          [inset]="inset"
          [inline]="inline"
          [loading]="loading"
          [message]="message"
          [messageIcon]="messageIcon"
          [refresh]="refresh"
          [close]="close"
          [move]="move"
        >
          Card body content goes here. Toggle the controls in the panel to
          experiment with header actions, loading, empty states, and insets.
        </novo-card>
      </div>
    `,
  }),
};
