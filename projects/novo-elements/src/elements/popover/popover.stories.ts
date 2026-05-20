import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect, waitFor } from 'storybook/test';

import { NovoButtonModule } from 'novo-elements/elements/button';

import { PopOverDirective } from './PopOver';
import { NovoPopOverModule } from './PopOver.module';

/**
 * Stories for the `novoPopover` directive (paired with the `<popover-content>`
 * component it spawns). Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 *
 * `novoPopover` is applied as an attribute to *any* host element (most often
 * a `<novo-button>`) and lazily creates a `<popover-content>` sibling when
 * the trigger fires. Both string content and rich HTML content are
 * supported, as is hover- vs click-driven interaction.
 */
type PopoverArgs = {
  popoverContent: string;
  popoverTitle: string;
  popoverPlacement: string;
  popoverOnHover: boolean;
  popoverDisabled: boolean;
  popoverAnimation: boolean;
  popoverDismissTimeout: number;
  popoverHtmlContent: string;
};

const meta: Meta<PopoverArgs> = {
  title: 'Overlays/Popover',
  component: PopOverDirective,
  decorators: [
    moduleMetadata({
      // `NovoPopOverModule` declares both the directive and the spawned
      // `<popover-content>` component. The button module is brought in so
      // the trigger demos use the canonical `<novo-button>` host element —
      // the directive itself works on any element with a click/focus event.
      imports: [NovoPopOverModule, NovoButtonModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A floating panel of supplemental content anchored to a trigger element. Apply the ' +
          '`novoPopover` directive to any element; the directive lazily instantiates a ' +
          '`<popover-content>` sibling on click (or hover, when `popoverOnHover` is set). Reach for ' +
          '`<novo-tooltip>` instead when you only need a short text hint, and for `<novo-modal>` when ' +
          'the content demands the user\'s full attention.',
      },
    },
  },
  argTypes: {
    popoverContent: {
      control: 'text',
      description: 'Plain-text body of the popover. Bound via the `[novoPopover]` attribute.',
    },
    popoverTitle: {
      control: 'text',
      description: 'Optional title rendered above the body. Long titles wrap inside the popover bounds.',
    },
    popoverPlacement: {
      control: 'select',
      options: [
        'top',
        'top-left',
        'top-right',
        'right',
        'right-top',
        'right-bottom',
        'bottom',
        'bottom-left',
        'bottom-right',
        'left',
        'left-top',
        'left-bottom',
      ],
      description:
        'Anchor side relative to the trigger, with optional `-left` / `-right` / `-top` / `-bottom` alignment. ' +
        'Auto-flips to the opposite side when the chosen placement would overflow the viewport.',
      table: { defaultValue: { summary: 'top' } },
    },
    popoverOnHover: {
      control: 'boolean',
      description:
        'When `true`, the popover opens on `mouseenter` / `focusin` and closes on the matching ' +
        '`mouseleave` / `focusout` — i.e. it behaves like a tooltip rather than a click-toggled panel.',
      table: { defaultValue: { summary: 'false' } },
    },
    popoverDisabled: {
      control: 'boolean',
      description: 'When `true`, suppresses all show/hide handling. Useful for conditionally muting the popover.',
    },
    popoverAnimation: {
      control: 'boolean',
      description: 'When `true`, applies the fade-in transition on open.',
      table: { defaultValue: { summary: 'true' } },
    },
    popoverDismissTimeout: {
      control: 'number',
      description:
        'When `> 0`, the popover auto-hides after the specified milliseconds. Useful for transient confirmations.',
      table: { defaultValue: { summary: '0' } },
    },
    popoverHtmlContent: {
      control: 'text',
      description:
        'Renders raw HTML in the body via `innerHTML`. Takes precedence over `[novoPopover]` text. ' +
        'Only use with trusted content — values are not sanitized beyond Angular\'s default `innerHTML` handling.',
    },
  },
};

export default meta;
type Story = StoryObj<PopoverArgs>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when a popover is the right choice (and
 * when a tooltip or modal would be better), the directive's anatomy, and the
 * accessibility considerations a consumer needs to handle themselves.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a popover</h2>
        <p style="margin: 0 0 1.25rem;">
          A popover surfaces <strong>supplemental, dismissible</strong> content
          anchored to the element the user just acted on — a definition, a
          quick action menu, a "what's this?" explainer, a small confirmation
          prompt. The user keeps page context; the popover floats above without
          blocking interaction elsewhere.
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
              ✓ Use a popover when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Showing a short explainer or definition triggered by a help icon</li>
              <li>Offering a couple of secondary actions tied to a row or chip</li>
              <li>Prompting for a quick confirmation that doesn't block the page</li>
              <li>Surfacing inline rich content (links, lists) for an item under inspection</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a popover when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The hint is a single short phrase — use <code>&lt;novo-tooltip&gt;</code></li>
              <li>The user must complete a task before continuing — use <code>&lt;novo-modal&gt;</code></li>
              <li>The content is a list of selectable options — use <code>&lt;novo-dropdown&gt;</code> or a menu</li>
              <li>The body needs more than a few sentences and a couple of controls — reach for a side panel or page</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Popover vs tooltip vs modal</h2>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Tooltip</strong> — short, hover-triggered text label.
            Non-interactive content; disappears on mouseout. Use for "what is
            this control?" hints.
          </li>
          <li>
            <strong>Popover</strong> — richer floating panel. May contain a
            title, multi-line body, and interactive content (links, small
            buttons). Click-triggered by default; the user dismisses by
            clicking the trigger a second time (or via
            <code>popoverDismissTimeout</code>).
          </li>
          <li>
            <strong>Modal</strong> — blocks the rest of the page until the
            user acts. Use when the task is required, destructive, or carries
            significant context that needs the user's full attention.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          The directive is applied to a trigger element; the spawned
          <code>&lt;popover-content&gt;</code> renders as a sibling of the
          trigger. It has three optional parts.
        </p>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Trigger</strong> — any element carrying the
            <code>novoPopover</code> directive. Typically a <code>&lt;novo-button&gt;</code>
            with <code>theme="icon"</code> and a help glyph.
          </li>
          <li>
            <strong>Title</strong> (optional) — short heading set via
            <code>popoverTitle</code>. Wraps when long; the popover container
            does not grow horizontally.
          </li>
          <li>
            <strong>Body</strong> — plain text via <code>[novoPopover]</code>,
            or rich HTML via <code>[popoverHtmlContent]</code>. Whitespace is
            preserved (<code>white-space: pre-line</code>) so newline-separated
            paragraphs survive.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Placement</h2>
        <p style="margin: 0 0 1rem;">
          <code>popoverPlacement</code> takes a side keyword
          (<code>top</code> / <code>right</code> / <code>bottom</code> /
          <code>left</code>) with an optional alignment suffix
          (<code>-left</code> / <code>-right</code> / <code>-top</code> /
          <code>-bottom</code>). The directive auto-flips to the opposite side
          when the chosen placement would overflow the viewport, so prefer
          your "first choice" placement — the fallback handles the edges.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            The trigger should be a real interactive element
            (<code>&lt;button&gt;</code>, <code>&lt;novo-button&gt;</code>, or
            a link) so it's reachable by keyboard and announced by screen
            readers. Avoid putting <code>novoPopover</code> on bare
            <code>&lt;div&gt;</code>s.
          </li>
          <li>
            Icon-only triggers must carry an <code>aria-label</code> describing
            the action — the popover body itself is not labelled to the
            trigger.
          </li>
          <li>
            <code>popoverOnHover</code> also activates on <code>focusin</code>,
            so keyboard users can read hover-triggered popovers. Click-driven
            popovers remain reachable via <code>Enter</code> /
            <code>Space</code> on the trigger.
          </li>
          <li>
            The rendered <code>&lt;popover-content&gt;</code> currently uses a
            non-standard <code>role="popover"</code>. If your popover hosts a
            menu of actions, consider supplying your own ARIA semantics
            (<code>role="menu"</code> on the body, <code>aria-haspopup</code>
            on the trigger).
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
 * The simplest popover — a button trigger with plain-text body and a title.
 * Click the button to open; click it again to dismiss. (Outside-click dismiss
 * is not currently wired — see `popoverDismissTimeout` for a transient
 * variant.)
 */
export const Default: Story = {
  args: {
    popoverContent: 'A popover surfaces supplemental content anchored to the trigger that opened it.',
    popoverTitle: 'About popovers',
    popoverPlacement: 'right',
    popoverOnHover: false,
    popoverDisabled: false,
    popoverAnimation: true,
    popoverDismissTimeout: 0,
    popoverHtmlContent: '',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- NovoPopOverModule + NovoButtonModule -->
<novo-button
  theme="primary"
  [novoPopover]="'A popover surfaces supplemental content anchored to the trigger that opened it.'"
  popoverTitle="About popovers"
  popoverPlacement="right"
>
  Open popover
</novo-button>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 6rem 4rem; display: flex; justify-content: center;">
        <novo-button
          theme="primary"
          [novoPopover]="popoverContent"
          [popoverTitle]="popoverTitle"
          [popoverPlacement]="popoverPlacement"
          [popoverOnHover]="popoverOnHover"
          [popoverDisabled]="popoverDisabled"
          [popoverAnimation]="popoverAnimation"
          [popoverDismissTimeout]="popoverDismissTimeout"
          [popoverHtmlContent]="popoverHtmlContent || null"
        >
          Open popover
        </novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Placements                                                               */
/* -------------------------------------------------------------------------- */

/**
 * The four primary placements. Each opens on click; the popover auto-flips
 * to the opposite side when the chosen placement would overflow the
 * viewport, so authoring with an ideal placement and letting the directive
 * handle edges is the recommended pattern.
 */
export const Placements: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button theme="standard" [novoPopover]="'Anchored above.'" popoverPlacement="top">Top</novo-button>
<novo-button theme="standard" [novoPopover]="'Anchored to the right.'" popoverPlacement="right">Right</novo-button>
<novo-button theme="standard" [novoPopover]="'Anchored below.'" popoverPlacement="bottom">Bottom</novo-button>
<novo-button theme="standard" [novoPopover]="'Anchored to the left.'" popoverPlacement="left">Left</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="
        display: grid;
        grid-template-columns: repeat(4, auto);
        gap: 2rem;
        justify-content: center;
        align-items: center;
        padding: 6rem 3rem;
      ">
        <novo-button theme="standard" [novoPopover]="'Anchored above the trigger.'" popoverPlacement="top">Top</novo-button>
        <novo-button theme="standard" [novoPopover]="'Anchored to the right of the trigger.'" popoverPlacement="right">Right</novo-button>
        <novo-button theme="standard" [novoPopover]="'Anchored below the trigger.'" popoverPlacement="bottom">Bottom</novo-button>
        <novo-button theme="standard" [novoPopover]="'Anchored to the left of the trigger.'" popoverPlacement="left">Left</novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. CornerAlignments                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Each primary side accepts a secondary alignment suffix — for example
 * `bottom-left` anchors below and aligns the popover's left edge with the
 * trigger's left edge. Use this when the trigger is near a viewport edge
 * and you want the popover to bleed away from that edge rather than the
 * other way around.
 */
export const CornerAlignments: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button theme="standard" [novoPopover]="'…'" popoverPlacement="bottom-left">Bottom-left</novo-button>
<novo-button theme="standard" [novoPopover]="'…'" popoverPlacement="bottom-right">Bottom-right</novo-button>
<novo-button theme="standard" [novoPopover]="'…'" popoverPlacement="top-left">Top-left</novo-button>
<novo-button theme="standard" [novoPopover]="'…'" popoverPlacement="top-right">Top-right</novo-button>
<novo-button theme="standard" [novoPopover]="'…'" popoverPlacement="right-top">Right-top</novo-button>
<novo-button theme="standard" [novoPopover]="'…'" popoverPlacement="left-bottom">Left-bottom</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="
        display: grid;
        grid-template-columns: repeat(3, auto);
        gap: 1.5rem 2rem;
        justify-content: center;
        align-items: center;
        padding: 6rem 3rem;
      ">
        <novo-button theme="standard" [novoPopover]="'Anchored below, left edges aligned.'" popoverPlacement="bottom-left">Bottom-left</novo-button>
        <novo-button theme="standard" [novoPopover]="'Anchored below, centered.'" popoverPlacement="bottom">Bottom</novo-button>
        <novo-button theme="standard" [novoPopover]="'Anchored below, right edges aligned.'" popoverPlacement="bottom-right">Bottom-right</novo-button>
        <novo-button theme="standard" [novoPopover]="'Anchored above, left edges aligned.'" popoverPlacement="top-left">Top-left</novo-button>
        <novo-button theme="standard" [novoPopover]="'Anchored above, centered.'" popoverPlacement="top">Top</novo-button>
        <novo-button theme="standard" [novoPopover]="'Anchored above, right edges aligned.'" popoverPlacement="top-right">Top-right</novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. WithoutTitle                                                             */
/* -------------------------------------------------------------------------- */

/**
 * `popoverTitle` is optional. When omitted the title slot is hidden entirely
 * (no empty bar above the body). Use the title-less variant for brief
 * single-thought explainers; reach for a title when the popover contains
 * more than a couple of sentences.
 */
export const WithoutTitle: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button
  theme="standard"
  [novoPopover]="'Plain text, no title — the popover sizes to just the body.'"
  popoverPlacement="bottom"
>
  Body only
</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 6rem 4rem; display: flex; justify-content: center;">
        <novo-button
          theme="standard"
          [novoPopover]="'Plain text, no title — the popover sizes to just the body.'"
          popoverPlacement="bottom"
        >
          Body only
        </novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. LongTitle                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Long titles wrap within the popover bounds rather than forcing the
 * container to expand horizontally. Verified against the recent fix that
 * added `white-space: normal` + `max-width: 100%` to the title rule.
 */
export const LongTitle: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button
  theme="standard"
  popoverTitle="A title long enough to need to wrap across multiple lines inside the popover container"
  [novoPopover]="'…'"
  popoverPlacement="bottom"
>
  Long title
</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 6rem 4rem; display: flex; justify-content: center;">
        <novo-button
          theme="standard"
          popoverTitle="A title long enough to need to wrap across multiple lines inside the popover container"
          [novoPopover]="'When a popover\\'s title overflows the fixed body width it should wrap, not stretch the popover horizontally past its bounds.'"
          popoverPlacement="bottom"
        >
          Long title
        </novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. HoverTrigger                                                             */
/* -------------------------------------------------------------------------- */

/**
 * `popoverOnHover` swaps click-toggle for `mouseenter` / `focusin` show and
 * `mouseleave` / `focusout` hide — the popover behaves like a heavier
 * tooltip. Keyboard users can still surface the content by tabbing onto the
 * trigger.
 */
export const HoverTrigger: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button
  theme="standard"
  [novoPopover]="'Hover or focus the trigger to reveal — this popover dismisses on mouseleave / focusout.'"
  popoverTitle="Hover-driven"
  popoverPlacement="right"
  [popoverOnHover]="true"
>
  Hover me
</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 6rem 4rem; display: flex; justify-content: center;">
        <novo-button
          theme="standard"
          [novoPopover]="'Hover or focus the trigger to reveal — this popover dismisses on mouseleave / focusout.'"
          popoverTitle="Hover-driven"
          popoverPlacement="right"
          [popoverOnHover]="true"
        >
          Hover me
        </novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. RichHtmlContent                                                          */
/* -------------------------------------------------------------------------- */

/**
 * `popoverHtmlContent` renders raw HTML in the body via `innerHTML`,
 * superseding the plain-text `[novoPopover]` content. Use for short rich
 * snippets — links, emphasis, lists — and only pass values you trust.
 */
export const RichHtmlContent: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button
  theme="primary"
  popoverTitle="Release notes"
  [popoverHtmlContent]="'<p>Two changes shipped this week:</p><ul><li>Title text now wraps.</li><li>New corner placements.</li></ul>'"
  popoverPlacement="bottom"
>
  What's new
</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 6rem 4rem; display: flex; justify-content: center;">
        <novo-button
          theme="primary"
          popoverTitle="Release notes"
          [popoverHtmlContent]="'<p style=&quot;margin:0 0 .5rem;&quot;>Two changes shipped this week:</p><ul style=&quot;margin:0;padding-left:1.25rem;&quot;><li>Title text now wraps within the popover bounds.</li><li>New corner placements for fine-grained anchoring.</li></ul>'"
          popoverPlacement="bottom"
        >
          What's new
        </novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. ScrollableContent                                                        */
/* -------------------------------------------------------------------------- */

/**
 * The popover container has a fixed width and no max-height — long bodies
 * extend the popover vertically. If the content might be arbitrarily tall,
 * cap it inside your own wrapper (e.g. `max-height` + `overflow-y: auto`)
 * via `popoverHtmlContent`.
 */
export const ScrollableContent: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Wrap the body in a scroll container via popoverHtmlContent. -->
<novo-button
  theme="standard"
  popoverTitle="Changelog"
  [popoverHtmlContent]="scrollableHtml"
  popoverPlacement="right"
>
  Long content
</novo-button>`,
      },
    },
  },
  render: () => ({
    props: {
      scrollableHtml: `
        <div style="max-height: 16rem; overflow-y: auto; padding-right: 0.5rem;">
          ${Array.from({ length: 12 })
            .map(
              (_, i) =>
                `<p style="margin:0 0 .75rem;"><strong>v1.${i}.0</strong> — Sample changelog entry describing the headline change for this release, padded out so the body needs to scroll inside the popover container.</p>`,
            )
            .join('')}
        </div>
      `,
    },
    template: `
      <div style="padding: 6rem 4rem; display: flex; justify-content: center;">
        <novo-button
          theme="standard"
          popoverTitle="Changelog"
          [popoverHtmlContent]="scrollableHtml"
          popoverPlacement="right"
        >
          Long content
        </novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 10. AutoDismiss                                                             */
/* -------------------------------------------------------------------------- */

/**
 * `popoverDismissTimeout` (ms) auto-hides the popover after it opens. Useful
 * for transient confirmation messages — *"Copied to clipboard"*,
 * *"Settings saved"* — that the user doesn't need to dismiss themselves.
 */
export const AutoDismiss: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button
  theme="primary"
  [novoPopover]="'Copied to clipboard.'"
  popoverPlacement="top"
  [popoverDismissTimeout]="2000"
>
  Copy
</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 6rem 4rem; display: flex; justify-content: center;">
        <novo-button
          theme="primary"
          [novoPopover]="'Copied to clipboard.'"
          popoverPlacement="top"
          [popoverDismissTimeout]="2000"
        >
          Copy
        </novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 11. Disabled                                                                */
/* -------------------------------------------------------------------------- */

/**
 * `popoverDisabled` suppresses show/hide handling without removing the
 * directive. Use it when the popover should toggle on/off in response to
 * application state (e.g. only show a help popover until the user has
 * dismissed it once).
 */
export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button
  theme="standard"
  [novoPopover]="'You will not see me.'"
  popoverTitle="Suppressed"
  [popoverDisabled]="true"
>
  Disabled trigger
</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 6rem 4rem; display: flex; justify-content: center;">
        <novo-button
          theme="standard"
          [novoPopover]="'You will not see me — the popover is suppressed.'"
          popoverTitle="Suppressed"
          [popoverDisabled]="true"
        >
          Disabled trigger
        </novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 12. Opened (play function)                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Same shape as `Default`, but with a `play` function that clicks the
 * trigger so visual-regression tooling snapshots the **opened** popover.
 * The popover content is rendered as a sibling of the trigger, so it lives
 * inside `document.body`; the assertion confirms the title and body text
 * are present after the open animation.
 */
export const Opened: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button
  theme="primary"
  [novoPopover]="'Anchored to the right of the trigger.'"
  popoverTitle="About popovers"
  popoverPlacement="right"
  data-testid="opened-popover-trigger"
>
  Open popover
</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 6rem 4rem; display: flex; justify-content: center;">
        <novo-button
          theme="primary"
          [novoPopover]="'Anchored to the right of the trigger — this opens automatically when the story loads.'"
          popoverTitle="About popovers"
          popoverPlacement="right"
          data-testid="opened-popover-trigger"
        >
          Open popover
        </novo-button>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByTestId('opened-popover-trigger');
    await userEvent.click(trigger);

    // The popover-content component is created as a sibling of the trigger;
    // querying from document.body covers both that case and any future move
    // to a CDK overlay portal.
    const body = within(document.body);
    await waitFor(async () => {
      const popover = await body.findByText('About popovers');
      expect(popover).toBeInTheDocument();
    });
    await waitFor(async () => {
      const content = await body.findByText(/anchored to the right of the trigger/i);
      expect(content).toBeInTheDocument();
    });
  },
};

/* -------------------------------------------------------------------------- */
/* 13. Playground                                                              */
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
        code: `<novo-button
  theme="primary"
  [novoPopover]="popoverContent"
  [popoverTitle]="popoverTitle"
  [popoverPlacement]="popoverPlacement"
  [popoverOnHover]="popoverOnHover"
  [popoverDisabled]="popoverDisabled"
  [popoverAnimation]="popoverAnimation"
  [popoverDismissTimeout]="popoverDismissTimeout"
  [popoverHtmlContent]="popoverHtmlContent"
>
  Playground trigger
</novo-button>`,
      },
    },
  },
  args: {
    popoverContent: 'Open me, tweak the controls, observe.',
    popoverTitle: 'Playground',
    popoverPlacement: 'right',
    popoverOnHover: false,
    popoverDisabled: false,
    popoverAnimation: true,
    popoverDismissTimeout: 0,
    popoverHtmlContent: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 6rem 4rem; display: flex; justify-content: center;">
        <novo-button
          theme="primary"
          [novoPopover]="popoverContent"
          [popoverTitle]="popoverTitle"
          [popoverPlacement]="popoverPlacement"
          [popoverOnHover]="popoverOnHover"
          [popoverDisabled]="popoverDisabled"
          [popoverAnimation]="popoverAnimation"
          [popoverDismissTimeout]="popoverDismissTimeout"
          [popoverHtmlContent]="popoverHtmlContent || null"
        >
          Playground trigger
        </novo-button>
      </div>
    `,
  }),
};
