import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect, waitFor } from 'storybook/test';

import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoOptionModule } from 'novo-elements/elements/common';
import { NovoDividerModule } from 'novo-elements/elements/divider';
import { NovoIconModule } from 'novo-elements/elements/icon';

import { NovoDropdownElement } from './Dropdown';
import { NovoDropdownModule } from './Dropdown.module';

/**
 * Stories for `<novo-dropdown>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 *
 * Dropdown is a click-to-open action menu built on the shared CDK overlay
 * (`<novo-overlay-template>`). Its first projected child becomes the trigger
 * — either a `<novo-button>` / `<button>` (auto-detected), or any element
 * tagged with the `dropdownTrigger` directive when a richer trigger is
 * needed. Action items are projected as `<novo-option>` / `<novo-optgroup>`
 * children.
 */
const meta: Meta<NovoDropdownElement> = {
  title: 'Overlays/Dropdown',
  component: NovoDropdownElement,
  decorators: [
    moduleMetadata({
      // `NovoDropdownModule` only re-exports its own primitives (dropdown
      // host + the deprecated `item` / `list` / `dropdown-item-header`).
      // Every interesting story projects a `<novo-button>` trigger plus
      // `<novo-option>` / `<novo-optgroup>` children — pull each in here.
      // `<novo-divider>` and `<novo-icon>` are used for the search-input
      // pattern in `WithHeaderAndFooter`.
      imports: [NovoDropdownModule, NovoButtonModule, NovoOptionModule, NovoDividerModule, NovoIconModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Click-to-open action menu. Project a button trigger and a list of `<novo-option>` action items; ' +
          'the overlay opens on click and closes on selection unless `keepOpen` is set. Use `side` to pin the ' +
          'panel relative to the trigger (`default`, `right`, `bottom-left`, etc.) and `height` to cap a long ' +
          'list. Reach for `<novo-select>` instead when the user is picking a **value** rather than firing an ' +
          '**action**.',
      },
    },
  },
  argTypes: {
    side: {
      control: 'select',
      options: [
        'default',
        'right',
        'above-below',
        'right-above-below',
        'center',
        'bottom',
        'bottom-left',
        'bottom-right',
        'top-left',
        'top-right',
      ],
      description:
        'Preferred panel placement relative to the trigger. The overlay falls back to other positions when ' +
        'the preferred placement would clip — see `Placements` for the visual matrix.',
      table: { defaultValue: { summary: 'default' } },
    },
    scrollStrategy: {
      control: 'radio',
      options: ['reposition', 'block', 'close'],
      description: 'What happens to the panel when an ancestor scrolls.',
      table: { defaultValue: { summary: 'reposition' } },
    },
    keepOpen: {
      control: 'boolean',
      description: 'When `true`, the panel stays open after an item is selected. Ignored when `multiple` is set.',
      table: { defaultValue: { summary: 'false' } },
    },
    multiple: {
      control: 'boolean',
      description:
        'Allow toggling several options without closing the panel. `Ctrl + A` toggles all options; ' +
        '`Shift + ↑ / ↓` extends the selection range.',
      table: { defaultValue: { summary: 'false' } },
    },
    scrollToActiveItemOnOpen: {
      control: 'boolean',
      description:
        'When `true`, scroll the first selected option into view each time the panel opens. Useful with long lists.',
      table: { defaultValue: { summary: 'false' } },
    },
    height: {
      control: 'number',
      description: 'Optional fixed max-height (in px) for the panel. Above this, the list scrolls.',
    },
    width: {
      control: 'number',
      description: 'Optional fixed width (in px) for the panel. `-1` (default) sizes the panel dynamically.',
      table: { defaultValue: { summary: '-1' } },
    },
    containerClass: {
      control: 'text',
      description: 'Custom CSS class applied to the inner panel container — for app-side theming overrides.',
    },
    disabled: {
      control: 'boolean',
      description: 'When `true`, the host is removed from the focus order and the trigger does not open the panel.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoDropdownElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for a dropdown vs a select or
 * popover, the anatomy of trigger / menu / options, and accessibility
 * expectations.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a dropdown</h2>
        <p style="margin: 0 0 1.25rem;">
          A dropdown surfaces a list of <strong>actions</strong> the user can fire from a single
          trigger — typically an "Actions" or kebab-menu button on a record header, table row, or
          toolbar. The user clicks an item to <em>do</em> something; the panel then closes
          automatically. If the user is picking a <em>value</em> to bind to a form, reach for
          <code>&lt;novo-select&gt;</code> instead.
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
              ✓ Use a dropdown when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Surfacing 3–15 secondary actions for a record or row</li>
              <li>Grouping related table-row actions under one trigger</li>
              <li>Offering a kebab menu of overflow actions in a toolbar</li>
              <li>Letting the user pick an action by category (with <code>&lt;novo-optgroup&gt;</code>)</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a dropdown when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Binding a value to a form — use <code>&lt;novo-select&gt;</code></li>
              <li>The user needs to type-to-filter — use <code>&lt;novo-autocomplete&gt;</code></li>
              <li>The action set is one or two items — show them inline</li>
              <li>The content is freeform / non-list — use <code>&lt;novo-popover&gt;</code></li>
              <li>Linking to other views — use links, not action items</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Dropdown vs select vs popover</h2>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Dropdown</strong> — fires actions. Each option is a verb; clicking closes the
            panel and runs a handler. No bound value.
          </li>
          <li>
            <strong>Select</strong> — picks a value. Integrates with <code>ngModel</code> /
            reactive forms, renders a "current value" in the trigger, and is the right tool for
            form fields.
          </li>
          <li>
            <strong>Popover</strong> — holds arbitrary content (not just a list). Reach for it
            when the floating panel is freeform — a help panel, a mini-form, a preview.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Trigger</strong> — the first projected child. Use <code>&lt;novo-button&gt;</code> /
            <code>&lt;button&gt;</code> by default; tag any other element with the
            <code>dropdownTrigger</code> directive for a richer trigger (see
            <em>CustomTrigger</em>).
          </li>
          <li>
            <strong>Menu container</strong> — the overlay panel. Class hook is
            <code>containerClass</code>; max height is <code>height</code> (px); width defaults to
            dynamic (use <code>width</code> to fix it).
          </li>
          <li>
            <strong>Optgroup</strong> (optional) — label-bearing wrapper around related options.
            Multiple groups stack with the label rendered as a small uppercase heading.
          </li>
          <li>
            <strong>Option</strong> — the action item. Bind <code>(click)</code> for the handler;
            add <code>disabled</code> + <code>tooltip</code> to convey unavailability;
            <code>keepOpen</code> per-option to prevent the panel from closing on click.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            The host element is focusable (<code>tabindex="0"</code> when enabled,
            <code>-1</code> when disabled). Activating the trigger via mouse or keyboard opens
            the panel and moves focus to the active option.
          </li>
          <li>
            Arrow keys move between options; <code>Enter</code> / <code>Space</code> fire the
            active option; <code>Esc</code> closes; <code>Tab</code> closes and restores focus to
            the trigger. Type-ahead (250 ms) jumps to options by first letter.
          </li>
          <li>
            When <code>multiple</code> is set, <code>Ctrl + A</code> toggles all options and
            <code>Shift + ↑ / ↓</code> extends the selection range.
          </li>
          <li>
            Icon-only triggers (e.g. a kebab <code>more-vert</code>) must always carry an
            <code>aria-label</code> — the icon alone has nothing for screen readers to announce.
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
 * The canonical dropdown — a `<novo-button>` trigger, one `<novo-optgroup>`,
 * and a handful of `<novo-option>` action items. Clicking an item fires its
 * handler and closes the panel.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoOptionModule } from 'novo-elements/elements/common';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';

@Component({
  selector: 'my-actions-dropdown',
  imports: [NovoDropdownModule, NovoButtonModule, NovoOptionModule],
  templateUrl: './my-actions-dropdown.component.html',
})
export class MyActionsDropdownComponent {
  run(action: string) {
    console.log('clicked', action);
  }
}

// component.html
<novo-dropdown>
  <novo-button theme="secondary" icon="collapse">Actions</novo-button>
  <novo-optgroup label="Engage">
    <novo-option (click)="run('Send Email')">Send Email</novo-option>
    <novo-option (click)="run('Send SMS')">Send SMS</novo-option>
    <novo-option disabled tooltip="Not available">Advertise Shifts</novo-option>
  </novo-optgroup>
  <novo-optgroup label="Manage">
    <novo-option (click)="run('Find Matching Jobs')">Find Matching Jobs</novo-option>
    <novo-option (click)="run('Update Record')">Update Record</novo-option>
  </novo-optgroup>
</novo-dropdown>`,
      },
    },
  },
  args: {
    side: 'default',
    scrollStrategy: 'reposition',
    keepOpen: false,
    multiple: false,
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      run: (label: string) => console.info('clicked', label),
    },
    template: `
      <div style="padding: 1rem; min-height: 280px;">
        <novo-dropdown
          [side]="side"
          [scrollStrategy]="scrollStrategy"
          [keepOpen]="keepOpen"
          [multiple]="multiple"
          [disabled]="disabled"
        >
          <novo-button theme="secondary" icon="collapse">Actions</novo-button>
          <novo-optgroup label="Engage">
            <novo-option (click)="run('Send Email')">Send Email</novo-option>
            <novo-option (click)="run('Send SMS')">Send SMS</novo-option>
            <novo-option disabled tooltip="Not available">Advertise Shifts</novo-option>
          </novo-optgroup>
          <novo-optgroup label="Manage">
            <novo-option (click)="run('Find Matching Jobs')">Find Matching Jobs</novo-option>
            <novo-option (click)="run('Update Record')">Update Record</novo-option>
          </novo-optgroup>
        </novo-dropdown>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Placements                                                               */
/* -------------------------------------------------------------------------- */

/**
 * The `side` input picks the panel's preferred placement; the overlay falls
 * back to other positions if the preferred one would clip. The relaxed
 * sides (`default`, `right`, `above-below`, `right-above-below`, `center`)
 * flex with available space; the directional sides (`bottom-*`, `top-*`)
 * pin to a single corner.
 */
export const Placements: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Pick a placement that matches the trigger's role on the page. -->
<novo-dropdown side="default">…</novo-dropdown>
<novo-dropdown side="right">…</novo-dropdown>
<novo-dropdown side="above-below">…</novo-dropdown>
<novo-dropdown side="bottom-right">…</novo-dropdown>
<novo-dropdown side="top-left">…</novo-dropdown>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem 1.5rem;
        padding: 4rem 2rem;
        min-height: 480px;
      ">
        <novo-dropdown side="default">
          <novo-button theme="secondary" icon="collapse">default</novo-button>
          <novo-optgroup>
            <novo-option>Action A</novo-option>
            <novo-option>Action B</novo-option>
            <novo-option>Action C</novo-option>
          </novo-optgroup>
        </novo-dropdown>

        <novo-dropdown side="right">
          <novo-button theme="secondary" icon="collapse">right</novo-button>
          <novo-optgroup>
            <novo-option>Action A</novo-option>
            <novo-option>Action B</novo-option>
            <novo-option>Action C</novo-option>
          </novo-optgroup>
        </novo-dropdown>

        <novo-dropdown side="above-below">
          <novo-button theme="secondary" icon="collapse">above-below</novo-button>
          <novo-optgroup>
            <novo-option>Action A</novo-option>
            <novo-option>Action B</novo-option>
            <novo-option>Action C</novo-option>
          </novo-optgroup>
        </novo-dropdown>

        <novo-dropdown side="bottom-left">
          <novo-button theme="secondary" icon="collapse">bottom-left</novo-button>
          <novo-optgroup>
            <novo-option>Action A</novo-option>
            <novo-option>Action B</novo-option>
            <novo-option>Action C</novo-option>
          </novo-optgroup>
        </novo-dropdown>

        <novo-dropdown side="bottom-right">
          <novo-button theme="secondary" icon="collapse">bottom-right</novo-button>
          <novo-optgroup>
            <novo-option>Action A</novo-option>
            <novo-option>Action B</novo-option>
            <novo-option>Action C</novo-option>
          </novo-optgroup>
        </novo-dropdown>

        <novo-dropdown side="center">
          <novo-button theme="secondary" icon="collapse">center</novo-button>
          <novo-optgroup>
            <novo-option>Action A</novo-option>
            <novo-option>Action B</novo-option>
            <novo-option>Action C</novo-option>
          </novo-optgroup>
        </novo-dropdown>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. IconTrigger                                                              */
/* -------------------------------------------------------------------------- */

/**
 * A common kebab-menu pattern: an `icon`-themed button paired with
 * `side="right"` so the panel pops out toward content. Always supply an
 * `aria-label` on icon-only triggers — the icon alone has nothing for
 * screen readers to announce.
 */
export const IconTrigger: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Icon-only triggers must carry aria-label. -->
<novo-dropdown side="right">
  <novo-button theme="icon" icon="more-vert" aria-label="Row actions"></novo-button>
  <novo-optgroup>
    <novo-option (click)="onEdit()">Edit</novo-option>
    <novo-option (click)="onDuplicate()">Duplicate</novo-option>
    <novo-option (click)="onArchive()">Archive</novo-option>
    <novo-option (click)="onDelete()">Delete</novo-option>
  </novo-optgroup>
</novo-dropdown>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 1rem; min-height: 220px;">
        <novo-dropdown side="right">
          <novo-button theme="icon" icon="more-vert" aria-label="Row actions"></novo-button>
          <novo-optgroup>
            <novo-option>Edit</novo-option>
            <novo-option>Duplicate</novo-option>
            <novo-option>Archive</novo-option>
            <novo-option>Delete</novo-option>
          </novo-optgroup>
        </novo-dropdown>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. CustomTrigger                                                            */
/* -------------------------------------------------------------------------- */

/**
 * When a `<novo-button>` won't do, tag any element with the
 * `dropdownTrigger` directive and the dropdown will wire up its
 * click-to-open behaviour. Useful when the trigger needs to render a
 * "current value" alongside a chevron, like a select-style affordance for
 * an action menu.
 */
export const CustomTrigger: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- The [dropdownTrigger] directive turns any element into the trigger. -->
<novo-dropdown>
  <div
    dropdownTrigger
    style="display: inline-flex; align-items: center; gap: 0.5rem;
           padding: 0.5rem 0.75rem; border: 1px solid #d0d3d6;
           border-radius: 4px; background: #fff; cursor: pointer;">
    <strong>Sort by:</strong>
    <span>Most recent</span>
    <novo-icon size="sm">collapse</novo-icon>
  </div>
  <novo-optgroup>
    <novo-option>Most recent</novo-option>
    <novo-option>Oldest</novo-option>
    <novo-option>Alphabetical</novo-option>
  </novo-optgroup>
</novo-dropdown>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 1rem; min-height: 220px;">
        <novo-dropdown>
          <div
            dropdownTrigger
            style="display: inline-flex; align-items: center; gap: 0.5rem;
                   padding: 0.5rem 0.75rem; border: 1px solid #d0d3d6;
                   border-radius: 4px; background: #fff; cursor: pointer;"
          >
            <strong>Sort by:</strong>
            <span>Most recent</span>
            <novo-icon size="sm">collapse</novo-icon>
          </div>
          <novo-optgroup>
            <novo-option>Most recent</novo-option>
            <novo-option>Oldest</novo-option>
            <novo-option>Alphabetical</novo-option>
          </novo-optgroup>
        </novo-dropdown>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. WithHeaderAndFooter                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The panel hosts arbitrary projected content alongside its options — wrap
 * a header (e.g. a section title or a search field) above the
 * `<novo-optgroup>`, and a footer (e.g. an "Add new" action) below it,
 * separating each section with `<novo-divider>`. Set `keepOpen` on the host
 * so the panel doesn't close when the user interacts with the header or
 * footer.
 */
export const WithHeaderAndFooter: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- keepOpen lets the user interact with the header/footer without dismissing the panel. -->
<novo-dropdown keepOpen>
  <novo-button theme="secondary" icon="collapse">Filter</novo-button>

  <div style="padding: 0.5rem 0.75rem; font-weight: 600;">Filter by status</div>
  <novo-divider></novo-divider>

  <novo-optgroup>
    <novo-option>Open</novo-option>
    <novo-option>In progress</novo-option>
    <novo-option>Closed</novo-option>
  </novo-optgroup>

  <novo-divider></novo-divider>
  <div style="padding: 0.5rem 0.75rem;">
    <novo-button theme="dialogue" icon="add-thin">Add custom filter</novo-button>
  </div>
</novo-dropdown>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 1rem; min-height: 320px;">
        <novo-dropdown keepOpen>
          <novo-button theme="secondary" icon="collapse">Filter</novo-button>

          <div style="padding: 0.5rem 0.75rem; font-weight: 600; color: #2d3137;">
            Filter by status
          </div>
          <novo-divider></novo-divider>

          <novo-optgroup>
            <novo-option>Open</novo-option>
            <novo-option>In progress</novo-option>
            <novo-option>Closed</novo-option>
          </novo-optgroup>

          <novo-divider></novo-divider>
          <div style="padding: 0.5rem 0.75rem;">
            <novo-button theme="dialogue" icon="add-thin">Add custom filter</novo-button>
          </div>
        </novo-dropdown>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. ScrollableList                                                           */
/* -------------------------------------------------------------------------- */

/**
 * For long lists, cap the panel with `height` (in px) — the option list
 * scrolls past that point. Pair with `scrollToActiveItemOnOpen` so the
 * panel scrolls the active item into view each time it opens.
 */
export const ScrollableList: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
@Component({ ... })
export class MyLongListDropdown {
  items = Array.from({ length: 25 }, (_, i) => \`Action \${i + 1}\`);
}

// component.html
<!-- height caps the panel; the option list scrolls beyond it. -->
<novo-dropdown [height]="250">
  <novo-button theme="secondary" icon="collapse">Lots of actions</novo-button>
  <novo-optgroup>
    <novo-option *ngFor="let item of items">{{ item }}</novo-option>
  </novo-optgroup>
</novo-dropdown>`,
      },
    },
  },
  render: () => ({
    props: {
      items: Array.from({ length: 25 }, (_, i) => `Action ${i + 1}`),
    },
    template: `
      <div style="padding: 1rem; min-height: 360px;">
        <novo-dropdown [height]="250">
          <novo-button theme="secondary" icon="collapse">Lots of actions</novo-button>
          <novo-optgroup>
            <novo-option *ngFor="let item of items">{{ item }}</novo-option>
          </novo-optgroup>
        </novo-dropdown>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. Multiple                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * `multiple` flips the dropdown into a toggle-list mode — clicking an
 * option marks it selected (a check appears) without closing the panel,
 * so the user can toggle several values in a row. Keyboard shortcuts:
 * `Ctrl + A` toggles all options, `Shift + ↑ / ↓` extends the selection
 * range.
 */
export const Multiple: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- multiple keeps the panel open and lets the user toggle several entries. -->
<novo-dropdown side="right" multiple>
  <novo-button theme="secondary" icon="overview" side="left">Hide / Show columns</novo-button>
  <novo-option>Name</novo-option>
  <novo-option>Email</novo-option>
  <novo-option>Phone</novo-option>
  <novo-option>Status</novo-option>
  <novo-option>Owner</novo-option>
  <novo-option>Last updated</novo-option>
</novo-dropdown>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 1rem; min-height: 300px;">
        <novo-dropdown side="right" multiple>
          <novo-button theme="secondary" icon="overview" side="left">Hide / Show columns</novo-button>
          <novo-option>Name</novo-option>
          <novo-option>Email</novo-option>
          <novo-option>Phone</novo-option>
          <novo-option>Status</novo-option>
          <novo-option>Owner</novo-option>
          <novo-option>Last updated</novo-option>
        </novo-dropdown>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. Opened                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Same dropdown as `Default`, but with a `play` function that clicks the
 * trigger so visual-regression tooling snapshots the **opened** panel. The
 * dropdown's overlay portals to `document.body`, so the assertions query
 * `within(document.body)` rather than the canvas.
 */
export const Opened: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Same dropdown as Default; opened programmatically by clicking the trigger. -->
<novo-dropdown>
  <novo-button theme="secondary" icon="collapse">Actions</novo-button>
  <novo-optgroup label="Engage">
    <novo-option>Send Email</novo-option>
    <novo-option>Send SMS</novo-option>
  </novo-optgroup>
  <novo-optgroup label="Manage">
    <novo-option>Find Matching Jobs</novo-option>
    <novo-option>Update Record</novo-option>
  </novo-optgroup>
</novo-dropdown>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="padding: 1rem; min-height: 320px;">
        <novo-dropdown>
          <novo-button theme="secondary" icon="collapse">Actions</novo-button>
          <novo-optgroup label="Engage">
            <novo-option>Send Email</novo-option>
            <novo-option>Send SMS</novo-option>
          </novo-optgroup>
          <novo-optgroup label="Manage">
            <novo-option>Find Matching Jobs</novo-option>
            <novo-option>Update Record</novo-option>
          </novo-optgroup>
        </novo-dropdown>
      </div>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open the dropdown via its trigger', async () => {
      const trigger = await canvas.findByRole('button', { name: /actions/i });
      await userEvent.click(trigger);
    });

    await step('Panel contents render in the CDK overlay', async () => {
      // The dropdown's panel portals to `document.body`, so the overlay
      // is queried via the document rather than the canvas.
      const overlay = within(document.body);
      await waitFor(async () => {
        await expect(await overlay.findByText('Send Email')).toBeVisible();
      });
      await expect(await overlay.findByText('Send SMS')).toBeVisible();
      await expect(await overlay.findByText('Find Matching Jobs')).toBeVisible();
      await expect(await overlay.findByText('Update Record')).toBeVisible();
    });
  },
};

/* -------------------------------------------------------------------------- */
/* 10. Playground                                                              */
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
        code: `<novo-dropdown side="default">
  <novo-button theme="secondary" icon="collapse">Actions</novo-button>
  <novo-optgroup label="Engage">
    <novo-option>Send Email</novo-option>
    <novo-option>Send SMS</novo-option>
  </novo-optgroup>
  <novo-optgroup label="Manage">
    <novo-option>Update Record</novo-option>
    <novo-option>Archive</novo-option>
  </novo-optgroup>
</novo-dropdown>`,
      },
    },
  },
  args: {
    side: 'default',
    scrollStrategy: 'reposition',
    keepOpen: false,
    multiple: false,
    scrollToActiveItemOnOpen: false,
    height: undefined,
    width: -1,
    containerClass: '',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 1rem; min-height: 320px;">
        <novo-dropdown
          [side]="side"
          [scrollStrategy]="scrollStrategy"
          [keepOpen]="keepOpen"
          [multiple]="multiple"
          [scrollToActiveItemOnOpen]="scrollToActiveItemOnOpen"
          [height]="height"
          [width]="width"
          [containerClass]="containerClass || null"
          [disabled]="disabled"
        >
          <novo-button theme="secondary" icon="collapse">Actions</novo-button>
          <novo-optgroup label="Engage">
            <novo-option>Send Email</novo-option>
            <novo-option>Send SMS</novo-option>
          </novo-optgroup>
          <novo-optgroup label="Manage">
            <novo-option>Update Record</novo-option>
            <novo-option>Archive</novo-option>
          </novo-optgroup>
        </novo-dropdown>
      </div>
    `,
  }),
};
