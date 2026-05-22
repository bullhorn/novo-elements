import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect, waitFor } from 'storybook/test';

import { TooltipDirective } from './Tooltip.directive';
import { NovoTooltipModule } from './Tooltip.module';
import { NovoButtonModule } from '../button/Button.module';

/**
 * Stories for the `[tooltip]` directive — a CDK-overlay-backed hint that
 * appears on hover. Applied as an attribute on any host element; the
 * directive owns its own overlay lifecycle (mouseenter/mouseleave) and
 * portals the rendered `<novo-tooltip>` into `document.body`.
 */
const meta: Meta<TooltipDirective> = {
  title: 'Overlays/Tooltip',
  component: TooltipDirective,
  decorators: [
    moduleMetadata({
      imports: [NovoTooltipModule, NovoButtonModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A lightweight hover hint for affordances that need a label. Applied as an attribute directive ' +
          '(`[tooltip]="text"`) on any host element — typically a button, icon, or truncated text node. ' +
          'The directive portals the rendered tooltip into `document.body` via the CDK overlay, so position, ' +
          'theme, and size are configured by sibling inputs (`tooltipPosition`, `tooltipType`, `tooltipSize`).',
      },
    },
  },
  argTypes: {
    tooltip: {
      control: 'text',
      description: 'The hint text (or HTML, when `tooltipIsHTML` is true).',
    },
    position: {
      name: 'tooltipPosition',
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Preferred placement. The overlay falls back to other positions when the preferred one would clip the viewport (unless `tooltipAutoPosition` is `false`).',
      table: { defaultValue: { summary: 'top' } },
    },
    type: {
      name: 'tooltipType',
      control: 'select',
      options: ['normal', 'info', 'success', 'warning', 'error'],
      description: 'Semantic color. `error`/`warning` for validation hints; `info`/`success` for help text and confirmations; `normal` (default) for everything else.',
      table: { defaultValue: { summary: 'normal' } },
    },
    size: {
      name: 'tooltipSize',
      control: 'select',
      options: [undefined, 'small', 'medium', 'large', 'extra-large'],
      description: 'Tooltip width. Defaults to a content-fit width when unset; explicit sizes wrap text at a fixed max-width.',
    },
    rounded: {
      name: 'tooltipRounded',
      control: 'boolean',
      description: 'When `true`, increases the border radius for a softer pill shape.',
    },
    bounce: {
      name: 'tooltipBounce',
      control: 'boolean',
      description: 'Replaces the fade-in with a brief bounce animation. Use sparingly — it draws attention.',
    },
    noAnimate: {
      name: 'tooltipNoAnimate',
      control: 'boolean',
      description: 'Disables the open/close animation. Useful inside dense lists where the cascading fade reads as flicker.',
    },
    always: {
      name: 'tooltipAlways',
      control: 'boolean',
      description: 'When `true`, the tooltip is rendered immediately on init and stays visible. Use for tutorial-style callouts.',
    },
    preline: {
      name: 'tooltipPreline',
      control: 'boolean',
      description: 'Respects `\\n` linebreaks in the tooltip text (CSS `white-space: pre-line`).',
    },
    removeArrow: {
      name: 'removeTooltipArrow',
      control: 'boolean',
      description: 'Hides the directional arrow on the tooltip.',
    },
    autoPosition: {
      name: 'tooltipAutoPosition',
      control: 'boolean',
      description: 'Allow the overlay to flip to a fallback position when the preferred placement would clip. Defaults to `true`.',
      table: { defaultValue: { summary: 'true' } },
    },
    isHTML: {
      name: 'tooltipIsHTML',
      control: 'boolean',
      description: 'Render the `tooltip` value as HTML (uses `[innerHTML]`). Make sure the content is trusted.',
    },
    closeOnClick: {
      name: 'tooltipCloseOnClick',
      control: 'boolean',
      description: 'Dismiss the tooltip when the host element is clicked, in addition to mouseleave.',
    },
    active: {
      name: 'tooltipActive',
      control: 'boolean',
      description: 'When `false`, suppresses the tooltip entirely. Useful for conditionally disabling without removing the directive.',
      table: { defaultValue: { summary: 'true' } },
    },
    onOverflow: {
      name: 'tooltipOnOverflow',
      control: 'boolean',
      description: 'Only show the tooltip when the host element is actually overflowing (i.e. truncated by ellipsis). Common for table cells.',
    },
  },
};

export default meta;
type Story = StoryObj<TooltipDirective>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when a tooltip is the right hint surface
 * (and when something else — a popover, inline help, or label — would serve
 * better), the directive's anatomy, and accessibility considerations
 * specific to hover-triggered overlays.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a tooltip</h2>
        <p style="margin: 0 0 1.25rem;">
          A tooltip is a short, hover-revealed <strong>label</strong> for an
          affordance whose meaning isn't already clear from its visible text or
          icon — an icon-only button, a truncated cell, a disabled control that
          needs a reason. It is <em>not</em> a place for instructional copy,
          rich formatting, or anything the user must read to complete a task.
          If the content matters, surface it inline or use a popover.
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
              ✓ Use a tooltip when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Labeling an icon-only button or FAB</li>
              <li>Explaining a truncated table cell or chip</li>
              <li>Surfacing the reason a control is disabled</li>
              <li>Showing the full value of a formatted/abbreviated label</li>
              <li>Adding a short keyboard shortcut hint</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a tooltip when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The content is essential — make it visible inline</li>
              <li>The content needs interaction (links, buttons) — use a popover</li>
              <li>The trigger is non-hoverable on touch (mobile) — use inline help</li>
              <li>You need to wrap several lines of formatted help text — use a popover</li>
              <li>The content duplicates the visible label verbatim</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          The directive is applied as an attribute on any host element. There
          is no template change — bind the hint text to <code>[tooltip]</code>
          and configure placement/theme via the sibling inputs.
        </p>
        <pre style="
          background: #f6f8fa;
          border-radius: 6px;
          padding: 1rem 1.25rem;
          margin: 0 0 2rem;
          overflow-x: auto;
          font-size: 0.9rem;
        "><code>&lt;novo-button
  theme="icon"
  icon="edit"
  aria-label="Edit"
  [tooltip]="'Edit candidate'"
  tooltipPosition="top"
  tooltipType="info"&gt;
&lt;/novo-button&gt;</code></pre>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Placement</h2>
        <p style="margin: 0 0 1rem;">
          Set <code>tooltipPosition</code> to the preferred placement
          (<code>top</code>, <code>bottom</code>, <code>left</code>,
          <code>right</code>, or the four diagonals). The overlay falls back
          to other positions when the preferred one would clip — set
          <code>tooltipAutoPosition="false"</code> to disable the fallback
          when you need a hard guarantee.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Themes</h2>
        <p style="margin: 0 0 1rem;">
          <code>tooltipType</code> picks a semantic color. Reach for
          <code>error</code> / <code>warning</code> only when the hint
          conveys validation intent — most tooltips should stay
          <code>normal</code>.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            <strong>Tooltips are not a substitute for an accessible name.</strong>
            Icon-only buttons must still carry an <code>aria-label</code> — the
            tooltip is a redundant visual aid, not the primary announcement.
          </li>
          <li>
            Tooltip content is set as <code>data-hint</code> on the host. The
            directive does not currently wire <code>aria-describedby</code>;
            assistive-technology users are served by the host's own label.
          </li>
          <li>
            The trigger is <code>mouseenter</code>/<code>mouseleave</code> — there
            is no focus-equivalent. Keyboard-only users won't see the tooltip;
            put genuinely necessary information in the visible label instead.
          </li>
          <li>
            Avoid <code>tooltipAlways</code> for anything dismissible — it sits
            on top of content until the host unmounts.
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
 * A button with a hover tooltip. The directive binds to the button host;
 * the play function drives the hover on render so the canvas shows the
 * tooltip immediately — without it, the story would just render a button
 * and require the user to hover to see anything. (Real consumers don't
 * need a play function; the tooltip appears on real `mouseenter`.)
 */
export const Default: Story = {
  args: {
    tooltip: 'Edit candidate',
    position: 'top',
    type: 'normal',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- NovoTooltipModule -->
<novo-button
  theme="primary"
  [tooltip]="'Edit candidate'"
  tooltipPosition="top">
  Hover me
</novo-button>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    // Bind only the args this story sets. Earlier the template bound every
    // tooltip input (`[tooltipActive]`, `[tooltipSize]`, …) even though args
    // didn't supply them, which left `tooltipActive` resolving to `undefined`
    // — the directive treats undefined as inactive and the tooltip never
    // shows on `mouseenter`. The full input surface is covered by the
    // Playground story instead.
    template: `
      <div style="padding: 4rem 2rem; display: flex; justify-content: center;">
        <novo-button
          theme="primary"
          [tooltip]="tooltip"
          [tooltipPosition]="position"
          [tooltipType]="type"
        >
          Hover me
        </novo-button>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /hover me/i });
    await userEvent.hover(trigger);

    // Tooltip portals into document.body via CDK overlay.
    const body = within(document.body);
    await waitFor(() => expect(body.getByText('Edit candidate')).toBeInTheDocument());
  },
};

/* -------------------------------------------------------------------------- */
/* 3. Positions                                                                */
/* -------------------------------------------------------------------------- */

/**
 * All eight placements. Each tooltip uses `tooltipAlways` so the overlays
 * are visible without hovering — handy as a visual reference, and lets
 * visual-regression tooling snapshot every direction in one frame.
 */
export const Positions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button [tooltip]="'Top'" tooltipPosition="top">Top</novo-button>
<novo-button [tooltip]="'Bottom'" tooltipPosition="bottom">Bottom</novo-button>
<novo-button [tooltip]="'Left'" tooltipPosition="left">Left</novo-button>
<novo-button [tooltip]="'Right'" tooltipPosition="right">Right</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="
        display: grid;
        grid-template-columns: repeat(4, max-content);
        gap: 3rem 4rem;
        justify-content: center;
        padding: 5rem 2rem;
      ">
        <novo-button theme="standard" [tooltip]="'Top'" tooltipPosition="top" [tooltipAlways]="true">Top</novo-button>
        <novo-button theme="standard" [tooltip]="'Bottom'" tooltipPosition="bottom" [tooltipAlways]="true">Bottom</novo-button>
        <novo-button theme="standard" [tooltip]="'Left'" tooltipPosition="left" [tooltipAlways]="true">Left</novo-button>
        <novo-button theme="standard" [tooltip]="'Right'" tooltipPosition="right" [tooltipAlways]="true">Right</novo-button>
        <novo-button theme="standard" [tooltip]="'Top-left'" tooltipPosition="top-left" [tooltipAlways]="true">Top-left</novo-button>
        <novo-button theme="standard" [tooltip]="'Top-right'" tooltipPosition="top-right" [tooltipAlways]="true">Top-right</novo-button>
        <novo-button theme="standard" [tooltip]="'Bottom-left'" tooltipPosition="bottom-left" [tooltipAlways]="true">Bottom-left</novo-button>
        <novo-button theme="standard" [tooltip]="'Bottom-right'" tooltipPosition="bottom-right" [tooltipAlways]="true">Bottom-right</novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Types                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Semantic color themes. Use `error`/`warning` only when the hint carries
 * validation intent; otherwise stay with `normal` or `info`.
 */
export const Types: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button [tooltip]="'Normal'" tooltipType="normal">Normal</novo-button>
<novo-button [tooltip]="'Info'" tooltipType="info">Info</novo-button>
<novo-button [tooltip]="'Success'" tooltipType="success">Success</novo-button>
<novo-button [tooltip]="'Warning'" tooltipType="warning">Warning</novo-button>
<novo-button [tooltip]="'Error'" tooltipType="error">Error</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; padding: 4rem 2rem;">
        <novo-button theme="standard" [tooltip]="'Normal'" tooltipType="normal" tooltipPosition="bottom" [tooltipAlways]="true">Normal</novo-button>
        <novo-button theme="standard" [tooltip]="'Info'" tooltipType="info" tooltipPosition="bottom" [tooltipAlways]="true">Info</novo-button>
        <novo-button theme="standard" [tooltip]="'Success'" tooltipType="success" tooltipPosition="bottom" [tooltipAlways]="true">Success</novo-button>
        <novo-button theme="standard" [tooltip]="'Warning'" tooltipType="warning" tooltipPosition="bottom" [tooltipAlways]="true">Warning</novo-button>
        <novo-button theme="standard" [tooltip]="'Error'" tooltipType="error" tooltipPosition="bottom" [tooltipAlways]="true">Error</novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Sizes                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Tooltip sizes. Omit `tooltipSize` for a content-fit width — most cases
 * should. Explicit sizes wrap longer hints at a fixed max-width.
 */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button [tooltip]="longText" tooltipSize="small">Small</novo-button>
<novo-button [tooltip]="longText" tooltipSize="medium">Medium</novo-button>
<novo-button [tooltip]="longText" tooltipSize="large">Large</novo-button>
<novo-button [tooltip]="longText" tooltipSize="extra-large">Extra-large</novo-button>`,
      },
    },
  },
  render: () => ({
    props: {
      longText:
        'Tooltips can hold a sentence or two of explanatory text; for anything longer, reach for a popover instead.',
    },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; padding: 4rem 2rem;">
        <novo-button theme="standard" [tooltip]="longText" tooltipSize="small" tooltipPosition="bottom" [tooltipAlways]="true">Small</novo-button>
        <novo-button theme="standard" [tooltip]="longText" tooltipSize="medium" tooltipPosition="bottom" [tooltipAlways]="true">Medium</novo-button>
        <novo-button theme="standard" [tooltip]="longText" tooltipSize="large" tooltipPosition="bottom" [tooltipAlways]="true">Large</novo-button>
        <novo-button theme="standard" [tooltip]="longText" tooltipSize="extra-large" tooltipPosition="bottom" [tooltipAlways]="true">Extra-large</novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Always                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * `tooltipAlways` renders the tooltip immediately and keeps it visible —
 * useful for tutorial-style callouts or onboarding hints that shouldn't
 * require user discovery.
 */
export const Always: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Renders the tooltip on init; stays visible until the host unmounts. -->
<novo-button
  theme="primary"
  [tooltip]="'Start here — pick a candidate'"
  tooltipPosition="right"
  [tooltipAlways]="true">
  New candidate
</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 4rem 6rem; display: flex; justify-content: center;">
        <novo-button
          theme="primary"
          [tooltip]="'Start here — pick a candidate'"
          tooltipPosition="right"
          tooltipType="info"
          [tooltipAlways]="true"
        >
          New candidate
        </novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. HTMLContent                                                              */
/* -------------------------------------------------------------------------- */

/**
 * `tooltipIsHTML` renders the bound `tooltip` value as HTML via
 * `[innerHTML]`. Only use with trusted content — there is no sanitization
 * beyond Angular's default. Pair with `tooltipPreline` if you'd rather keep
 * the value as plain text with `\\n` linebreaks.
 */
export const HTMLContent: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button
  [tooltip]="'<strong>Edit</strong> candidate<br/><em>Shift-click</em> to open in new tab'"
  [tooltipIsHTML]="true"
  tooltipPosition="right"
  tooltipSize="large">
  Rich tooltip
</novo-button>`,
      },
    },
  },
  render: () => ({
    props: {
      html: '<strong>Edit</strong> candidate<br/><em>Shift-click</em> to open in new tab',
    },
    template: `
      <div style="padding: 4rem 6rem; display: flex; justify-content: center;">
        <novo-button
          theme="standard"
          [tooltip]="html"
          [tooltipIsHTML]="true"
          tooltipPosition="right"
          tooltipSize="large"
          [tooltipAlways]="true"
        >
          Rich tooltip
        </novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. Opened (play function)                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Hover-driven open. The play function hovers the trigger via `userEvent`
 * and waits for the tooltip text to appear in `document.body` (the CDK
 * overlay portals outside the story canvas). This is the smoke test that
 * makes visual regression snapshot the *opened* tooltip rather than the
 * inert closed state.
 */
export const Opened: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoButtonModule, NovoTooltipModule } from 'novo-elements';

@Component({
  selector: 'my-tooltip-trigger',
  imports: [NovoButtonModule, NovoTooltipModule],
  templateUrl: './my-tooltip-trigger.component.html',
})
export class MyTooltipTriggerComponent {}

// component.html
<novo-button
  theme="primary"
  [tooltip]="'Edit candidate'"
  tooltipPosition="top">
  Hover me
</novo-button>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 5rem 2rem; display: flex; justify-content: center;">
        <novo-button
          theme="primary"
          [tooltip]="'Edit candidate'"
          tooltipPosition="top"
          data-testid="tooltip-trigger"
        >
          Hover me
        </novo-button>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByTestId('tooltip-trigger');

    // The tooltip directive opens on mouseenter — userEvent.hover dispatches
    // pointerover/mouseenter on the host. The rendered NovoTooltip is
    // portalled into document.body via CDK overlay, so the assertion queries
    // there, not the story canvas.
    await userEvent.hover(trigger);

    const body = within(document.body);
    await waitFor(() => expect(body.getByText('Edit candidate')).toBeInTheDocument());
  },
};

/* -------------------------------------------------------------------------- */
/* 9. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Hover the button to surface the tooltip;
 * toggle `tooltipAlways` on to pin it open while tweaking other settings.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-button
  theme="primary"
  [tooltip]="'Tooltip text'"
  tooltipPosition="top"
  tooltipType="normal">
  Hover me
</novo-button>`,
      },
    },
  },
  args: {
    tooltip: 'Tooltip text',
    position: 'top',
    type: 'normal',
    size: undefined,
    rounded: false,
    bounce: false,
    noAnimate: false,
    always: false,
    preline: false,
    removeArrow: false,
    autoPosition: true,
    isHTML: false,
    closeOnClick: false,
    active: true,
    onOverflow: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 5rem 2rem; display: flex; justify-content: center;">
        <novo-button
          theme="primary"
          [tooltip]="tooltip"
          [tooltipPosition]="position"
          [tooltipType]="type"
          [tooltipSize]="size"
          [tooltipRounded]="rounded"
          [tooltipBounce]="bounce"
          [tooltipNoAnimate]="noAnimate"
          [tooltipAlways]="always"
          [tooltipPreline]="preline"
          [removeTooltipArrow]="removeArrow"
          [tooltipAutoPosition]="autoPosition"
          [tooltipIsHTML]="isHTML"
          [tooltipCloseOnClick]="closeOnClick"
          [tooltipActive]="active"
          [tooltipOnOverflow]="onOverflow"
        >
          Hover me
        </novo-button>
      </div>
    `,
  }),
};
