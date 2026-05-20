import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect, waitFor } from 'storybook/test';

import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoOptionModule } from 'novo-elements/elements/common';
import { NovoDividerModule } from 'novo-elements/elements/divider';
import { NovoIconModule } from 'novo-elements/elements/icon';

import { MenuComponent } from './menu.component';
import { NovoMenuModule } from './menu.module';

/**
 * Stories for `<novo-menu>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 */
const meta: Meta<MenuComponent> = {
  title: 'Overlays/Menu',
  component: MenuComponent,
  decorators: [
    moduleMetadata({
      // `NovoMenuModule` imports `NovoIconModule` and `NovoCommonModule`
      // internally but doesn't re-export them. Stories that project
      // `<novo-icon>` or `<novo-divider>` need their own module imports.
      //
      // The menu is opened by a sibling trigger element carrying the
      // `[menu]` directive — `<novo-button>` is the canonical trigger, so
      // we always pull `NovoButtonModule` in. `<novo-option>` is the
      // expected child of every `*menuItem`, so `NovoOptionModule` is
      // always required too.
      imports: [
        NovoMenuModule,
        NovoButtonModule,
        NovoOptionModule,
        NovoDividerModule,
        NovoIconModule,
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A click-to-open action list anchored to a trigger element. Compose by pairing a trigger ' +
          '(typically `<novo-button>`) carrying the `[menu]` directive with a sibling `<novo-menu>` template ' +
          'that projects `*menuItem` entries. Each `*menuItem` wraps a `<novo-option>` for the row content. ' +
          'Reach for `<novo-menu>` when the user is invoking a row/object action (Edit, Delete, Duplicate, ' +
          'Choose…) — for picking a value, use `<novo-select>`; for short toggles, use a `<novo-switch>` ' +
          'or radio group.',
      },
    },
  },
  argTypes: {
    menuClass: {
      control: 'text',
      description: 'Extra class applied to the floating menu container — use it to scope custom styling.',
    },
    autoFocus: {
      control: 'boolean',
      description: 'When `true`, the menu container takes focus on open so arrow keys drive navigation immediately.',
    },
    disabled: {
      control: 'boolean',
      description: 'When `true`, the menu refuses to open — useful for read-only contexts that still need to render the trigger.',
    },
  },
};

export default meta;
type Story = StoryObj<MenuComponent>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to use a menu over a select, the menu
 * anatomy (trigger + items + dividers + submenus), the contextual-action
 * pattern, and accessibility requirements.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a menu</h2>
        <p style="margin: 0 0 1.25rem;">
          A menu groups a small set of <strong>actions</strong> behind a
          single trigger — most often a row's "more" affordance, or a
          page-level Actions button. Each entry runs a command rather than
          selecting a value. If the user is picking <em>data</em>, reach for
          <code>&lt;novo-select&gt;</code> or <code>&lt;novo-autocomplete&gt;</code>
          instead.
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
              ✓ Use a menu when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Grouping row actions (Edit, Duplicate, Delete) behind a "more" trigger</li>
              <li>Offering page-level Actions (Export, Print, Archive)</li>
              <li>Replacing a long horizontal toolbar in a tight layout</li>
              <li>Nesting a small "Choose…" sub-decision inside a parent action set</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a menu when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The user is selecting a value — use <code>&lt;novo-select&gt;</code></li>
              <li>The list of actions is two items long — surface them as buttons</li>
              <li>The action needs rich form input — open a <code>&lt;novo-modal&gt;</code> instead</li>
              <li>You need a tooltip — use <code>&lt;novo-tooltip&gt;</code></li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          A menu is composed of three pieces, wired together by template
          references:
        </p>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Trigger</strong> — any element carrying
            <code>[menu]="menuRef"</code>. Defaults to opening on
            <code>click</code>; switch via <code>[trigger]="'contextmenu'"</code>
            or <code>'mouseenter'</code>. Pass row data with
            <code>[menuContext]="item"</code> to receive it back in each
            item's template variable.
          </li>
          <li>
            <strong>Template</strong> —
            <code>&lt;novo-menu #menuRef&gt;</code> declares the floating
            list. It renders nothing inline; the menu service portals the
            content into the CDK overlay when the trigger fires.
          </li>
          <li>
            <strong>Items</strong> — each row is a
            <code>*menuItem</code> wrapping a
            <code>&lt;novo-option&gt;</code>. Add
            <code>&lt;novo-divider&gt;</code> for separators. For sub-menus,
            point an item at another <code>&lt;novo-menu&gt;</code> via
            <code>[menu]="subMenuRef"</code>.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Per-item state</h2>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <code>disabled</code> on the projected <code>&lt;novo-option&gt;</code>
            greys out a row and blocks its click handler — use it for actions
            the user can see but cannot run right now.
          </li>
          <li>
            <code>*menuItem="let item; visible: predicate"</code> hides the
            row entirely when the predicate returns falsy. Pair with
            <code>[menuContext]</code> on the trigger so the predicate
            receives the row's data.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            The opened panel listens for arrow keys, <code>Enter</code> /
            <code>Space</code> to activate the focused row,
            <code>ArrowRight</code> to open a submenu, and
            <code>Escape</code> / <code>ArrowLeft</code> to close.
          </li>
          <li>
            Clicking outside the panel — or mousing past it — closes the
            menu automatically; you don't need to wire up an outside-click
            handler.
          </li>
          <li>
            When the trigger is icon-only (e.g. a "more" kebab), add an
            <code>aria-label</code> so screen-reader users know what the
            menu controls.
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
 * The simplest menu: a button trigger paired with a `<novo-menu>` template of
 * three `*menuItem` rows. Each row is a `<novo-option>` with a `(click)`
 * handler that runs the action. This is the recipe to copy when starting a
 * new menu.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import {
  NovoButtonModule,
  NovoMenuModule,
  NovoOptionModule,
} from 'novo-elements';

@Component({
  selector: 'my-basic-menu',
  imports: [NovoButtonModule, NovoMenuModule, NovoOptionModule],
  templateUrl: './my-basic-menu.component.html',
})
export class MyBasicMenuComponent {
  selectAction(action: string) {
    console.log('selected:', action);
  }
}

// component.html
<novo-button theme="secondary" icon="collapse" [menu]="actions">Actions</novo-button>

<novo-menu #actions>
  <novo-option *menuItem (click)="selectAction('Preview')">Preview</novo-option>
  <novo-option *menuItem (click)="selectAction('Edit')">Edit</novo-option>
  <novo-option *menuItem (click)="selectAction('Delete')">Delete</novo-option>
</novo-menu>`,
      },
    },
  },
  render: () => ({
    props: {
      selectAction: (action: string) => {
        console.log('selected:', action);
      },
    },
    template: `
      <div style="min-height: 240px;">
        <novo-button theme="secondary" icon="collapse" [menu]="actions" data-testid="default-menu-trigger">
          Actions
        </novo-button>

        <novo-menu #actions>
          <novo-option *menuItem (click)="selectAction('Preview')">Preview</novo-option>
          <novo-option *menuItem (click)="selectAction('Edit')">Edit</novo-option>
          <novo-option *menuItem (click)="selectAction('Delete')">Delete</novo-option>
        </novo-menu>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. WithIcons                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Action rows often read more clearly when paired with an icon. Project
 * `<novo-icon>` inside each `<novo-option>` (with `novoSuffix` for trailing
 * icons) — the menu makes no assumptions about the option's inner layout.
 */
export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button theme="icon" icon="more" [menu]="iconMenu" aria-label="Row actions"></novo-button>

<novo-menu #iconMenu>
  <novo-option *menuItem (click)="run('preview')">
    <novo-icon>preview</novo-icon>
    <span>Preview</span>
  </novo-option>
  <novo-option *menuItem (click)="run('edit')">
    <novo-icon>edit</novo-icon>
    <span>Edit</span>
  </novo-option>
  <novo-divider *menuItem></novo-divider>
  <novo-option *menuItem class="red" (click)="run('delete')">
    <novo-icon>delete-o</novo-icon>
    <span>Delete</span>
  </novo-option>
</novo-menu>`,
      },
    },
  },
  render: () => ({
    props: {
      run: (action: string) => console.log('action:', action),
    },
    template: `
      <div style="min-height: 240px;">
        <novo-button theme="icon" icon="more" [menu]="iconMenu" aria-label="Row actions"></novo-button>

        <novo-menu #iconMenu>
          <novo-option *menuItem (click)="run('preview')">
            <novo-icon>preview</novo-icon>
            <span>Preview</span>
          </novo-option>
          <novo-option *menuItem (click)="run('edit')">
            <novo-icon>edit</novo-icon>
            <span>Edit</span>
          </novo-option>
          <novo-divider *menuItem></novo-divider>
          <novo-option *menuItem class="red" (click)="run('delete')">
            <novo-icon>delete-o</novo-icon>
            <span>Delete</span>
          </novo-option>
        </novo-menu>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. WithDividers                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Group related actions with `<novo-divider *menuItem>` separators. Each
 * divider is itself a menu item — it needs the `*menuItem` directive so the
 * menu service treats it as a row. Dividers don't take focus.
 */
export const WithDividers: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button theme="secondary" icon="collapse" [menu]="grouped">Actions</novo-button>

<novo-menu #grouped>
  <novo-option *menuItem (click)="run('preview')">Preview</novo-option>
  <novo-option *menuItem (click)="run('edit')">Edit</novo-option>
  <novo-option *menuItem (click)="run('duplicate')">Duplicate</novo-option>
  <novo-divider *menuItem></novo-divider>
  <novo-option *menuItem (click)="run('export')">Export</novo-option>
  <novo-option *menuItem (click)="run('archive')">Archive</novo-option>
  <novo-divider *menuItem></novo-divider>
  <novo-option *menuItem (click)="run('delete')">
    <span>Delete</span>
    <novo-icon novoSuffix>delete-o</novo-icon>
  </novo-option>
</novo-menu>`,
      },
    },
  },
  render: () => ({
    props: {
      run: (action: string) => console.log('action:', action),
    },
    template: `
      <div style="min-height: 320px;">
        <novo-button theme="secondary" icon="collapse" [menu]="grouped">Actions</novo-button>

        <novo-menu #grouped>
          <novo-option *menuItem (click)="run('preview')">Preview</novo-option>
          <novo-option *menuItem (click)="run('edit')">Edit</novo-option>
          <novo-option *menuItem (click)="run('duplicate')">Duplicate</novo-option>
          <novo-divider *menuItem></novo-divider>
          <novo-option *menuItem (click)="run('export')">Export</novo-option>
          <novo-option *menuItem (click)="run('archive')">Archive</novo-option>
          <novo-divider *menuItem></novo-divider>
          <novo-option *menuItem (click)="run('delete')">
            <span>Delete</span>
            <novo-icon novoSuffix>delete-o</novo-icon>
          </novo-option>
        </novo-menu>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. DisabledItems                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Individual rows can be flagged `disabled` on the projected
 * `<novo-option>`. The row stays visible but is non-interactive and visually
 * muted — use it for actions the user should know exist but currently can't
 * run.
 */
export const DisabledItems: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button theme="secondary" icon="collapse" [menu]="mixed">Actions</novo-button>

<novo-menu #mixed>
  <novo-option *menuItem (click)="run('preview')">Preview</novo-option>
  <novo-option *menuItem (click)="run('edit')" disabled>Edit (no permission)</novo-option>
  <novo-option *menuItem (click)="run('duplicate')">Duplicate</novo-option>
  <novo-option *menuItem (click)="run('delete')" disabled>Delete (locked)</novo-option>
</novo-menu>`,
      },
    },
  },
  render: () => ({
    props: {
      run: (action: string) => console.log('action:', action),
    },
    template: `
      <div style="min-height: 260px;">
        <novo-button theme="secondary" icon="collapse" [menu]="mixed">Actions</novo-button>

        <novo-menu #mixed>
          <novo-option *menuItem (click)="run('preview')">Preview</novo-option>
          <novo-option *menuItem (click)="run('edit')" disabled>Edit (no permission)</novo-option>
          <novo-option *menuItem (click)="run('duplicate')">Duplicate</novo-option>
          <novo-option *menuItem (click)="run('delete')" disabled>Delete (locked)</novo-option>
        </novo-menu>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. NestedSubMenu                                                            */
/* -------------------------------------------------------------------------- */

/**
 * A `*menuItem` can carry its own `[menu]` reference to open a sub-menu. The
 * directive auto-detects the parent <code>&lt;novo-menu&gt;</code> and
 * switches the sub-menu trigger to `mouseenter`, so hovering the item opens
 * the sibling list. Nest a second `<novo-menu>` inside the first to keep the
 * template references local.
 */
export const NestedSubMenu: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button theme="secondary" icon="collapse" [menu]="root">Actions</novo-button>

<novo-menu #root>
  <novo-option *menuItem (click)="run('preview')">Preview</novo-option>
  <novo-option *menuItem (click)="run('edit')">Edit</novo-option>
  <novo-option *menuItem [menu]="status">Set status&hellip;</novo-option>
  <novo-menu #status>
    <novo-option *menuItem (click)="run('available')">Available</novo-option>
    <novo-option *menuItem (click)="run('away')">Away</novo-option>
    <novo-option *menuItem (click)="run('busy')">Busy</novo-option>
  </novo-menu>
</novo-menu>`,
      },
    },
  },
  render: () => ({
    props: {
      run: (action: string) => console.log('action:', action),
    },
    template: `
      <div style="min-height: 280px;">
        <novo-button theme="secondary" icon="collapse" [menu]="root">Actions</novo-button>

        <novo-menu #root>
          <novo-option *menuItem (click)="run('preview')">Preview</novo-option>
          <novo-option *menuItem (click)="run('edit')">Edit</novo-option>
          <novo-option *menuItem [menu]="status">Set status&hellip;</novo-option>
          <novo-menu #status>
            <novo-option *menuItem (click)="run('available')">Available</novo-option>
            <novo-option *menuItem (click)="run('away')">Away</novo-option>
            <novo-option *menuItem (click)="run('busy')">Busy</novo-option>
          </novo-menu>
        </novo-menu>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. WithContext                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Share a single `<novo-menu>` template across multiple triggers by passing
 * each trigger's row data through `[menuContext]`. Inside the menu, the data
 * is captured via `*menuItem="let item"` and can drive `(click)` handlers,
 * `disabled` predicates, and `visible` predicates.
 */
export const WithContext: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
@Component({ ... })
export class MyContextMenuComponent {
  apple = { id: 1, kind: 'apple', label: 'Apple' };
  orange = { id: 2, kind: 'orange', label: 'Orange' };

  isOrange = (item: { kind: string }) => item.kind === 'orange';

  run(item: { label: string }, action: string) {
    console.log(action, 'on', item.label);
  }
}

// component.html
<novo-button theme="secondary" [menu]="rowMenu" [menuContext]="apple">Apple</novo-button>
<novo-button theme="secondary" [menu]="rowMenu" [menuContext]="orange">Orange</novo-button>

<novo-menu #rowMenu>
  <novo-option *menuItem="let item" (click)="run(item, 'preview')">Preview</novo-option>
  <novo-option *menuItem="let item" (click)="run(item, 'edit')">Edit</novo-option>
  <novo-option *menuItem="let item" [disabled]="isOrange(item)">Edit (apples only)</novo-option>
  <novo-option *menuItem="let item; visible: isOrange">Squeeze (oranges only)</novo-option>
</novo-menu>`,
      },
    },
  },
  render: () => ({
    props: {
      apple: { id: 1, kind: 'apple', label: 'Apple' },
      orange: { id: 2, kind: 'orange', label: 'Orange' },
      isOrange: (item: { kind: string }) => item.kind === 'orange',
      run: (item: { label: string }, action: string) => {
        console.log(action, 'on', item.label);
      },
    },
    template: `
      <div style="display: flex; gap: 0.5rem; min-height: 280px;">
        <novo-button theme="secondary" [menu]="rowMenu" [menuContext]="apple">Apple</novo-button>
        <novo-button theme="secondary" [menu]="rowMenu" [menuContext]="orange">Orange</novo-button>

        <novo-menu #rowMenu>
          <novo-option *menuItem="let item" (click)="run(item, 'preview')">Preview</novo-option>
          <novo-option *menuItem="let item" (click)="run(item, 'edit')">Edit</novo-option>
          <novo-option *menuItem="let item" [disabled]="isOrange(item)">Edit (apples only)</novo-option>
          <novo-option *menuItem="let item; visible: isOrange">Squeeze (oranges only)</novo-option>
        </novo-menu>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. DisabledMenu                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Setting `[disabled]="true"` on the `<novo-menu>` itself makes the trigger a
 * no-op — clicks don't open the panel. Use this in read-only contexts where
 * the row affordance should still render but actions are unavailable.
 */
export const DisabledMenu: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button theme="secondary" icon="collapse" [menu]="locked">Actions</novo-button>

<novo-menu #locked [disabled]="true">
  <novo-option *menuItem>Preview</novo-option>
  <novo-option *menuItem>Edit</novo-option>
  <novo-option *menuItem>Delete</novo-option>
</novo-menu>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="min-height: 120px;">
        <novo-button theme="secondary" icon="collapse" [menu]="locked">Actions</novo-button>

        <novo-menu #locked [disabled]="true">
          <novo-option *menuItem>Preview</novo-option>
          <novo-option *menuItem>Edit</novo-option>
          <novo-option *menuItem>Delete</novo-option>
        </novo-menu>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. Opened (play function)                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Same recipe as `Default`, plus a `play` function that clicks the trigger
 * and asserts the menu items render in the CDK overlay. The menu portals to
 * `document.body`, so queries must run via `within(document.body)` rather
 * than `within(canvasElement)`. The play also clicks the first row to
 * exercise the action callback.
 */
export const Opened: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-button theme="secondary" icon="collapse" [menu]="actions">Actions</novo-button>

<novo-menu #actions>
  <novo-option *menuItem (click)="selectAction('Preview')">Preview</novo-option>
  <novo-option *menuItem (click)="selectAction('Edit')">Edit</novo-option>
  <novo-option *menuItem (click)="selectAction('Delete')">Delete</novo-option>
</novo-menu>`,
      },
    },
  },
  render: () => ({
    props: {
      lastAction: '',
      selectAction(this: { lastAction: string }, action: string) {
        this.lastAction = action;
      },
    },
    template: `
      <div style="min-height: 280px;">
        <novo-button
          theme="secondary"
          icon="collapse"
          [menu]="actions"
          data-testid="opened-menu-trigger"
        >Actions</novo-button>

        <novo-menu #actions>
          <novo-option *menuItem (click)="selectAction('Preview')" data-testid="menu-item-preview">Preview</novo-option>
          <novo-option *menuItem (click)="selectAction('Edit')" data-testid="menu-item-edit">Edit</novo-option>
          <novo-option *menuItem (click)="selectAction('Delete')" data-testid="menu-item-delete">Delete</novo-option>
        </novo-menu>

        <p style="margin-top: 0.75rem; font-size: 0.875rem; color: #5d6469;">
          Last action: <strong data-testid="last-action">{{ lastAction || '(none)' }}</strong>
        </p>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // 1. Open the menu via the trigger button.
    const trigger = await canvas.findByTestId('opened-menu-trigger');
    await userEvent.click(trigger);

    // 2. The CDK overlay portals menu items into document.body — assert
    //    all three rows render there.
    await waitFor(async () => {
      await body.findByTestId('menu-item-preview');
      await body.findByTestId('menu-item-edit');
      await body.findByTestId('menu-item-delete');
    });

    const previewItem = await body.findByTestId('menu-item-preview');
    await expect(previewItem).toBeInTheDocument();
    await expect(previewItem).toHaveTextContent(/Preview/);

    // 3. Click a row and confirm the action callback fired.
    await userEvent.click(previewItem);
    await waitFor(() => expect(canvas.getByTestId('last-action')).toHaveTextContent('Preview'));
  },
};

/* -------------------------------------------------------------------------- */
/* 10. Playground                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Every menu-level input wired to a control. Per-item state (`disabled`,
 * `visible`) is exercised by the dedicated stories above — the menu
 * component itself only carries a few inputs.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-button theme="secondary" icon="collapse" [menu]="playground">Actions</novo-button>

<novo-menu #playground [menuClass]="menuClass" [autoFocus]="autoFocus" [disabled]="disabled">
  <novo-option *menuItem (click)="run('Preview')">Preview</novo-option>
  <novo-option *menuItem (click)="run('Edit')">Edit</novo-option>
  <novo-option *menuItem (click)="run('Delete')">Delete</novo-option>
</novo-menu>`,
      },
    },
  },
  args: {
    menuClass: '',
    autoFocus: false,
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      run: (action: string) => console.log('action:', action),
    },
    template: `
      <div style="min-height: 240px;">
        <novo-button theme="secondary" icon="collapse" [menu]="playground">Actions</novo-button>

        <novo-menu
          #playground
          [menuClass]="menuClass"
          [autoFocus]="autoFocus"
          [disabled]="disabled"
        >
          <novo-option *menuItem (click)="run('Preview')">Preview</novo-option>
          <novo-option *menuItem (click)="run('Edit')">Edit</novo-option>
          <novo-option *menuItem (click)="run('Delete')">Delete</novo-option>
        </novo-menu>
      </div>
    `,
  }),
};
