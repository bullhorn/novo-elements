import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect, waitFor } from 'storybook/test';

import {
  NovoTabbedGroupPickerElement,
  type QuickSelectConfig,
  type TabbedGroupPickerButtonConfig,
  type TabbedGroupPickerTab,
} from './TabbedGroupPicker';
import { NovoTabbedGroupPickerModule } from './TabbedGroupPicker.module';

/**
 * Stories for `<novo-tabbed-group-picker>`. Follows the conventions documented
 * in `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 *
 * `<novo-tabbed-group-picker>` is a dropdown-anchored picker that presents
 * **independent option lists across multiple tabs**, each filtered by a single
 * search input. Tabs can hold either flat option lists (`ChildTab`) or
 * parent/child group lists (`ParentTab`) whose children cascade selection into
 * a referenced child tab. Selections live in the option object itself
 * (`item.selected = true`) and the component emits the full per-tab selected
 * snapshot via `(selectionChange)`. Optional configuration adds a Quick Select
 * column (curated parent-style shortcuts that toggle ranges of options) and an
 * Apply/Cancel footer (deferred-commit mode). Set `[selectionEnabled]="false"`
 * to switch to "activation" mode — checkboxes hide and clicks emit
 * `(activation)` instead.
 */
const meta: Meta<
  NovoTabbedGroupPickerElement & {
    tabs?: TabbedGroupPickerTab[];
    buttonConfig?: TabbedGroupPickerButtonConfig;
    quickSelectConfig?: QuickSelectConfig;
    selectedSummary?: string;
  }
> = {
  title: 'Pickers/Tabbed Group Picker',
  component: NovoTabbedGroupPickerElement,
  decorators: [
    moduleMetadata({
      imports: [NovoTabbedGroupPickerModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A dropdown-anchored picker that presents multiple independent option lists as tabs, ' +
          'all filtered by a single search box. Tabs may be flat (`ChildTab`) or parent/child ' +
          '(`ParentTab` linked to a child tab via `childTypeName`). Optional Quick Select and ' +
          'Apply/Cancel footer modes are supported. Reach for `<novo-multi-picker>` instead when ' +
          'you need free-typed type-ahead search across remote datasets, or `<novo-picker>` when ' +
          'the dataset is a single flat list with rich item rendering.',
      },
    },
  },
  argTypes: {
    tabs: {
      control: false,
      description:
        'Array of tab descriptors. Each tab declares `typeName`, `typeLabel`, `valueField`, ' +
        '`labelField`, and a `data` array. Parent tabs additionally declare `childTypeName` to ' +
        'link selection into a sibling child tab.',
    },
    buttonConfig: {
      control: false,
      description:
        'Configures the trigger button rendered by the picker: `{ theme, side, icon, label, size? }`.',
    },
    quickSelectConfig: {
      control: false,
      description:
        'Optional curated shortcut column. `{ label, items: [{ label, childTypeName, children | all }] }`.',
    },
    showFooter: {
      control: 'boolean',
      description:
        'When `true`, renders an Apply/Cancel footer and switches to deferred-commit mode. ' +
        'Selections are staged until the user clicks Apply (emits `applyChange`) or reverted on ' +
        'Cancel (emits `cancelChange`).',
    },
    selectionEnabled: {
      control: 'boolean',
      description:
        'When `false`, hides per-row checkboxes and switches to activation mode — clicking a row ' +
        'emits `activation` with the row payload but does not mutate `selected` state.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;
type Story = StoryObj<
  NovoTabbedGroupPickerElement & {
    tabs?: TabbedGroupPickerTab[];
    buttonConfig?: TabbedGroupPickerButtonConfig;
    quickSelectConfig?: QuickSelectConfig;
    selectedSummary?: string;
  }
>;

/* -------------------------------------------------------------------------- */
/* Shared mock data                                                            */
/* -------------------------------------------------------------------------- */

const buildAnimals = () =>
  ['Dog', 'Cat', 'Mouse', 'Horse', 'Cow', 'Chicken', 'Pig', 'Sheep', 'Goat', 'Goose'].map((name, index) => ({
    name,
    animalId: index + 1,
  }));

const buildPlaces = () =>
  [
    ['Roma', 'Rome'],
    ['Firenze', 'Florence'],
    ['Munchen', 'Munich'],
    ['Paris', 'Paris'],
    ['Sevilla', 'Seville'],
    ['Athinai', 'Athens'],
  ].map(([localName, englishName]) => ({ localName, englishName }));

const buildColors = () =>
  [
    ['255,0,0', 'Red'],
    ['0,255,0', 'Green'],
    ['0,0,255', 'Blue'],
    ['0,0,0', 'Black'],
    ['255,255,255', 'White'],
  ].map(([rgb, colorName]) => ({ rgb, colorName }));

const buildAnimalCategories = () => {
  const animals = buildAnimals();
  const birds = ['Chicken', 'Goose'].map((n) => animals.find((a) => a.name === n));
  const livestock = ['Cow', 'Pig', 'Sheep', 'Goat'].map((n) => animals.find((a) => a.name === n));
  return [
    { name: 'Birds', groupId: 1, children: birds },
    { name: 'Livestock', groupId: 2, children: livestock },
  ];
};

const defaultButtonConfig: TabbedGroupPickerButtonConfig = {
  theme: 'select',
  side: 'right',
  icon: 'collapse',
  label: 'Open picker',
};

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for tabbed-group-picker over
 * the simpler picker/multi-picker, the parent/child tab linking model, the
 * Quick Select shortcut column, deferred-commit (footer) mode, and the
 * activation-only mode for read-only menus.
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
        max-width: 960px;
        line-height: 1.55;
      ">
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a tabbed group picker</h2>
        <p style="margin: 0 0 1.25rem;">
          Use <code>&lt;novo-tabbed-group-picker&gt;</code> when the user needs
          to pick from <strong>multiple independent option lists at once</strong> —
          e.g. choose any combination of Departments, Office Locations, and
          Employee Types in a single popover. Each list lives on its own tab,
          all tabs share one search input, and the component emits one
          consolidated selection payload covering every tab.
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
              ✓ Use a tabbed group picker when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The user picks across 2+ logically distinct option lists</li>
              <li>You want a single trigger and a single search input for all of them</li>
              <li>Some lists have hundreds of rows (virtual scrolling is built in)</li>
              <li>You need parent/child cascades (selecting a group toggles its members)</li>
              <li>You want curated Quick Select shortcuts above the lists</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use it when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>You have one flat list of options — use <code>&lt;novo-picker&gt;</code> or <code>&lt;novo-select&gt;</code></li>
              <li>You need type-ahead search across multiple remote datasets — use <code>&lt;novo-multi-picker&gt;</code></li>
              <li>Options need rich rendering (avatars, multi-line items) — use <code>&lt;novo-picker&gt;</code></li>
              <li>The choice is binary or 2–3 mutually exclusive options — use a switch / radio</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li><strong>Trigger button</strong> — configured via <code>[buttonConfig]</code>. Theme, side, icon, label, and (optional) size flow through to a <code>&lt;novo-button&gt;</code>.</li>
          <li><strong>Search input</strong> — single shared filter; debounced 300 ms; filters every tab's data simultaneously by <code>labelField</code> or <code>valueField</code>.</li>
          <li><strong>Tab rail</strong> (left column) — one row per tab descriptor with a live count <code>(n)</code> reflecting the filtered length.</li>
          <li><strong>Option list</strong> (right column) — virtual-scrolled list of the active tab's options. Each row is a <code>&lt;novo-option&gt;</code> with a checkbox.</li>
          <li><strong>Quick Select</strong> (optional) — curated <code>&lt;novo-optgroup&gt;</code> rendered above the active tab; only visible when there is no filter text.</li>
          <li><strong>Clear / Apply / Cancel</strong> — Clear All button when anything is selected; Apply/Cancel footer when <code>[showFooter]</code>.</li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Tab descriptors</h2>
        <p style="margin: 0 0 1rem;">A tab is one of two shapes:</p>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Child tab</strong> — flat list. Shape:
            <code>&#123; typeName, typeLabel, valueField, labelField, data: any[] &#125;</code>.
            <code>data</code> entries are arbitrary objects whose <code>selected</code> flag the picker mutates.
          </li>
          <li>
            <strong>Parent tab</strong> — group list whose rows reference rows on another tab. Adds
            <code>childTypeName</code> (the linked child tab's <code>typeName</code>) and gives each row a
            <code>children</code> array (either the full child objects or just their <code>valueField</code> values).
            Toggling a parent row toggles every linked child; parents reflect <code>selected</code> /
            <code>indeterminate</code> states automatically.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Selection model</h2>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li><strong>Selection lives on the data</strong> — each option object grows a <code>selected: true</code> property when chosen. There is no separate model array.</li>
          <li><strong>Multi-select per tab</strong> — every tab independently holds its own selected items; the component is always in multi-select mode.</li>
          <li><strong>Cross-tab cascade</strong> — selecting a parent row writes <code>selected: true</code> onto every linked child object, and vice versa: selecting all of a child group's members marks the parent <code>selected</code>; partial selection sets <code>indeterminate</code>.</li>
          <li><strong>Output payload</strong> — <code>(selectionChange)</code> emits an array shaped like <code>[&#123; ...tab, data: data.filter(x =&gt; x.selected) &#125;, …]</code> — same descriptor, filtered <code>data</code>.</li>
          <li><strong>Activation mode</strong> — <code>[selectionEnabled]="false"</code> hides checkboxes; rows emit <code>(activation)</code> on click with the row payload plus <code>scope</code> = the tab's <code>typeName</code> (or <code>'quickselect'</code>).</li>
          <li><strong>Deferred commit</strong> — <code>[showFooter]="true"</code> stages selections until Apply (<code>applyChange</code>) or Cancel (<code>cancelChange</code> rolls back to the snapshot).</li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>The trigger is a <code>&lt;novo-button&gt;</code> (<code>role="button"</code>); the panel is a CDK overlay portalled to <code>document.body</code>.</li>
          <li>Tab navigation: arrow keys move between tabs in the vertical <code>&lt;novo-nav&gt;</code>; pressing a tab refocuses the search input.</li>
          <li>Search is always focused on open; press <code>Space</code> on a row to toggle.</li>
          <li>The Clear All / Apply / Cancel buttons are reachable via the normal tab order — no custom keymap.</li>
        </ul>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 2. Default                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The canonical recipe: three flat tabs (Animals, Places, Colors), no
 * parent/child cascade and no quick-select column. Selection emits an array
 * with one entry per tab; the consumer derives any UI labels from it.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import {
  ChildTab,
  NovoTabbedGroupPickerModule,
  TabbedGroupPickerTab,
} from 'novo-elements';

@Component({
  selector: 'my-tabbed-picker',
  imports: [NovoTabbedGroupPickerModule],
  templateUrl: './my-tabbed-picker.component.html',
})
export class MyTabbedPickerComponent {
  tabs: TabbedGroupPickerTab[] = [
    {
      typeName: 'animals',
      typeLabel: 'Animals',
      valueField: 'animalId',
      labelField: 'name',
      data: [/* { animalId, name } */],
    },
    {
      typeName: 'places',
      typeLabel: 'Places',
      valueField: 'localName',
      labelField: 'englishName',
      data: [/* { localName, englishName } */],
    },
    {
      typeName: 'colors',
      typeLabel: 'Colors',
      valueField: 'rgb',
      labelField: 'colorName',
      data: [/* { rgb, colorName } */],
    },
  ];

  buttonConfig = { theme: 'select', side: 'right', icon: 'collapse', label: 'Open picker' };

  onSelectionChange(selected: TabbedGroupPickerTab[]) {
    const animals = (selected.find(t => t.typeName === 'animals') as ChildTab).data;
    // ...
  }
}

// component.html
<novo-tabbed-group-picker
  [tabs]="tabs"
  [buttonConfig]="buttonConfig"
  (selectionChange)="onSelectionChange($event)">
</novo-tabbed-group-picker>`,
      },
    },
  },
  render: () => {
    const tabs: TabbedGroupPickerTab[] = [
      {
        typeName: 'animals',
        typeLabel: 'Animals',
        valueField: 'animalId',
        labelField: 'name',
        data: buildAnimals(),
      },
      {
        typeName: 'places',
        typeLabel: 'Places',
        valueField: 'localName',
        labelField: 'englishName',
        data: buildPlaces(),
      },
      {
        typeName: 'colors',
        typeLabel: 'Colors',
        valueField: 'rgb',
        labelField: 'colorName',
        data: buildColors(),
      },
    ];

    return {
      props: {
        tabs,
        buttonConfig: { ...defaultButtonConfig, label: 'Nothing Selected' },
        selectedSummary: 'Nothing Selected',
        onSelectionChange(this: { buttonConfig: TabbedGroupPickerButtonConfig; selectedSummary: string }, selected: TabbedGroupPickerTab[]) {
          const parts: string[] = [];
          for (const tab of selected) {
            const count = (tab as any).data.length;
            if (count) parts.push(`${tab.typeLabel} (${count})`);
          }
          this.selectedSummary = parts.join(', ') || 'Nothing Selected';
          this.buttonConfig = { ...this.buttonConfig, label: this.selectedSummary };
        },
      },
      template: `
        <div style="min-height: 460px;">
          <novo-tabbed-group-picker
            [tabs]="tabs"
            [buttonConfig]="buttonConfig"
            (selectionChange)="onSelectionChange($event)"
          ></novo-tabbed-group-picker>
          <div style="margin-top: 1rem; font-size: 0.875rem; color: #5d6469;">
            Summary: <strong>{{ selectedSummary }}</strong>
          </div>
        </div>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 3. WithGroups                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Parent tab linked to a child tab via `childTypeName`. Each parent row carries
 * a `children` array of child rows (by reference or by `valueField`). Toggling
 * a parent toggles every linked child; mixed child selection promotes the
 * parent to `indeterminate`.
 */
export const WithGroups: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts — parent tab references child tab via childTypeName
tabs: TabbedGroupPickerTab[] = [
  {
    typeName: 'animals',
    typeLabel: 'Animals',
    valueField: 'animalId',
    labelField: 'name',
    data: animals,
  },
  {
    typeName: 'animalCategories',
    typeLabel: 'Animal Categories',
    valueField: 'groupId',
    labelField: 'name',
    childTypeName: 'animals',
    data: [
      { name: 'Birds',     groupId: 1, children: birds /* refs into animals */ },
      { name: 'Livestock', groupId: 2, children: livestock },
    ],
  },
];

// component.html
<novo-tabbed-group-picker
  [tabs]="tabs"
  [buttonConfig]="buttonConfig"
  (selectionChange)="onSelectionChange($event)">
</novo-tabbed-group-picker>`,
      },
    },
  },
  render: () => {
    const tabs: TabbedGroupPickerTab[] = [
      {
        typeName: 'animals',
        typeLabel: 'Animals',
        valueField: 'animalId',
        labelField: 'name',
        data: buildAnimals(),
      },
      {
        typeName: 'animalCategories',
        typeLabel: 'Animal Categories',
        valueField: 'groupId',
        labelField: 'name',
        childTypeName: 'animals',
        data: buildAnimalCategories() as any,
      } as TabbedGroupPickerTab,
    ];

    return {
      props: {
        tabs,
        buttonConfig: { ...defaultButtonConfig, label: 'Nothing Selected' },
      },
      template: `
        <div style="min-height: 460px;">
          <novo-tabbed-group-picker
            [tabs]="tabs"
            [buttonConfig]="buttonConfig"
          ></novo-tabbed-group-picker>
          <div style="margin-top: 1rem; font-size: 0.875rem; color: #5d6469;">
            Toggle a row on the <em>Animal Categories</em> tab — its members on the
            <em>Animals</em> tab flip together.
          </div>
        </div>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 4. QuickSelect                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Adds a curated **Quick Select** column above the active tab. Each item targets
 * a `childTypeName` and either lists `children` (specific values) or sets
 * `all: true` (the entire tab). Quick-select checkboxes synchronise with the
 * underlying data checkboxes in both directions. The quick-select panel hides
 * automatically while the user is filtering.
 */
export const QuickSelect: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
quickSelectConfig: QuickSelectConfig = {
  label: 'Quick Select',
  items: [
    { label: 'Pure Evil', childTypeName: 'animals', children: [2] },           // Cat
    { label: 'My Pets',   childTypeName: 'animals', children: [1, 6, 9] },     // Dog, Chicken, Goat
    { label: 'All Animals', childTypeName: 'animals', all: true },
  ],
};

// component.html
<novo-tabbed-group-picker
  [tabs]="tabs"
  [buttonConfig]="buttonConfig"
  [quickSelectConfig]="quickSelectConfig">
</novo-tabbed-group-picker>`,
      },
    },
  },
  render: () => {
    const tabs: TabbedGroupPickerTab[] = [
      {
        typeName: 'animals',
        typeLabel: 'Animals',
        valueField: 'animalId',
        labelField: 'name',
        data: buildAnimals(),
      },
    ];
    const quickSelectConfig: QuickSelectConfig = {
      label: 'Quick Select',
      items: [
        { label: 'Pure Evil', childTypeName: 'animals', children: [2] },
        { label: 'My Pets', childTypeName: 'animals', children: [1, 6, 9] },
        { label: 'All Animals', childTypeName: 'animals', all: true },
      ],
    };

    return {
      props: {
        tabs,
        buttonConfig: { ...defaultButtonConfig, label: 'Animals' },
        quickSelectConfig,
      },
      template: `
        <div style="min-height: 460px;">
          <novo-tabbed-group-picker
            [tabs]="tabs"
            [buttonConfig]="buttonConfig"
            [quickSelectConfig]="quickSelectConfig"
          ></novo-tabbed-group-picker>
        </div>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 5. WithFooter                                                               */
/* -------------------------------------------------------------------------- */

/**
 * `[showFooter]="true"` switches the picker to **deferred-commit** mode.
 * Selections are staged in-panel until the user clicks Apply (emits
 * `applyChange` and closes) or Cancel (emits `cancelChange` and reverts every
 * tab to its last applied snapshot).
 */
export const WithFooter: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.html
<novo-tabbed-group-picker
  [tabs]="tabs"
  [buttonConfig]="buttonConfig"
  [showFooter]="true"
  (applyChange)="onApply($event)"
  (cancelChange)="onCancel($event)">
</novo-tabbed-group-picker>`,
      },
    },
  },
  render: () => {
    const tabs: TabbedGroupPickerTab[] = [
      {
        typeName: 'animals',
        typeLabel: 'Animals',
        valueField: 'animalId',
        labelField: 'name',
        data: buildAnimals(),
      },
      {
        typeName: 'animalCategories',
        typeLabel: 'Animal Categories',
        valueField: 'groupId',
        labelField: 'name',
        childTypeName: 'animals',
        data: buildAnimalCategories() as any,
      } as TabbedGroupPickerTab,
    ];

    return {
      props: {
        tabs,
        buttonConfig: { ...defaultButtonConfig, label: 'Open picker' },
      },
      template: `
        <div style="min-height: 500px;">
          <novo-tabbed-group-picker
            [tabs]="tabs"
            [buttonConfig]="buttonConfig"
            [showFooter]="true"
          ></novo-tabbed-group-picker>
        </div>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 6. ActivationMode (selectionEnabled = false)                                */
/* -------------------------------------------------------------------------- */

/**
 * `[selectionEnabled]="false"` removes per-row checkboxes and turns the picker
 * into a read-only menu — clicks emit `(activation)` with the row payload and
 * the tab's `typeName` as `scope`, without mutating any `selected` state.
 * Useful for "run this action on this item" surfaces (e.g. a tools menu).
 */
export const ActivationMode: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.html
<novo-tabbed-group-picker
  [tabs]="tabs"
  [buttonConfig]="buttonConfig"
  [selectionEnabled]="false"
  (activation)="onActivation($event)">
</novo-tabbed-group-picker>`,
      },
    },
  },
  render: () => {
    const tabs: TabbedGroupPickerTab[] = [
      {
        typeName: 'actions',
        typeLabel: 'Actions',
        valueField: 'actionId',
        labelField: 'name',
        data: ['Run', 'Jump', 'Swim', 'Climb', 'Walk', 'Fly'].map((name, index) => ({
          name,
          actionId: index + 1,
        })),
      },
    ];

    return {
      props: {
        tabs,
        buttonConfig: { ...defaultButtonConfig, label: 'Open action menu' },
        lastActivation: '(none yet)',
        onActivation(this: { lastActivation: string }, event: { name: string; scope: string }) {
          this.lastActivation = `${event.name} (scope: ${event.scope})`;
        },
      },
      template: `
        <div style="min-height: 420px;">
          <novo-tabbed-group-picker
            [tabs]="tabs"
            [buttonConfig]="buttonConfig"
            [selectionEnabled]="false"
            (activation)="onActivation($event)"
          ></novo-tabbed-group-picker>
          <div style="margin-top: 1rem; font-size: 0.875rem; color: #5d6469;">
            Last activation: <strong>{{ lastActivation }}</strong>
          </div>
        </div>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 7. LargeDataset (virtual scroll)                                            */
/* -------------------------------------------------------------------------- */

/**
 * Large flat tab (1,000 rows) demonstrating the built-in virtual scrolling.
 * Only the visible window of `<novo-option>` elements is rendered; the buffer
 * sizes scale with the panel height (`minBufferPx` / `maxBufferPx` are derived
 * from the measured viewport on open).
 */
export const LargeDataset: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
items = Array.from({ length: 1000 }, (_, i) => ({ id: i + 1, label: 'Item ' + (i + 1) }));

tabs: TabbedGroupPickerTab[] = [
  {
    typeName: 'items',
    typeLabel: 'Items',
    valueField: 'id',
    labelField: 'label',
    data: this.items,
  },
];

// component.html
<novo-tabbed-group-picker [tabs]="tabs" [buttonConfig]="buttonConfig"></novo-tabbed-group-picker>`,
      },
    },
  },
  render: () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({ id: i + 1, label: `Item ${i + 1}` }));
    const tabs: TabbedGroupPickerTab[] = [
      {
        typeName: 'items',
        typeLabel: 'Items',
        valueField: 'id',
        labelField: 'label',
        data: items,
      },
    ];

    return {
      props: {
        tabs,
        buttonConfig: { ...defaultButtonConfig, label: '1,000 items' },
      },
      template: `
        <div style="min-height: 480px;">
          <novo-tabbed-group-picker
            [tabs]="tabs"
            [buttonConfig]="buttonConfig"
          ></novo-tabbed-group-picker>
        </div>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 8. Opened (play function)                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Same picker as `Default`, but `play` opens the panel, switches between tabs,
 * filters by text, and toggles a row. The picker's overlay portals to
 * `document.body`, so overlay queries scope to `.cdk-overlay-container`.
 */
export const Opened: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// Same setup as Default — play function below opens the picker,
// switches tabs, filters, and toggles a row.
<novo-tabbed-group-picker
  [tabs]="tabs"
  [buttonConfig]="buttonConfig"
  (selectionChange)="onSelectionChange($event)">
</novo-tabbed-group-picker>`,
      },
    },
  },
  render: () => {
    const tabs: TabbedGroupPickerTab[] = [
      {
        typeName: 'animals',
        typeLabel: 'Animals',
        valueField: 'animalId',
        labelField: 'name',
        data: buildAnimals(),
      },
      {
        typeName: 'places',
        typeLabel: 'Places',
        valueField: 'localName',
        labelField: 'englishName',
        data: buildPlaces(),
      },
      {
        typeName: 'colors',
        typeLabel: 'Colors',
        valueField: 'rgb',
        labelField: 'colorName',
        data: buildColors(),
      },
    ];

    return {
      props: {
        tabs,
        buttonConfig: { ...defaultButtonConfig, label: 'Open picker' },
        lastSelection: '(none)',
        onSelectionChange(this: { lastSelection: string }, selected: TabbedGroupPickerTab[]) {
          const parts: string[] = [];
          for (const tab of selected) {
            const count = (tab as any).data.length;
            if (count) parts.push(`${tab.typeLabel}:${count}`);
          }
          this.lastSelection = parts.join(' ') || '(none)';
        },
      },
      template: `
        <div style="min-height: 500px;">
          <novo-tabbed-group-picker
            [tabs]="tabs"
            [buttonConfig]="buttonConfig"
            (selectionChange)="onSelectionChange($event)"
          ></novo-tabbed-group-picker>
          <div style="margin-top: 1rem; font-size: 0.875rem; color: #5d6469;">
            Selection: <strong data-testid="selection-summary">{{ lastSelection }}</strong>
          </div>
        </div>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Open the picker via its trigger button.
    const trigger = await canvas.findByRole('button', { name: /open picker/i });
    await userEvent.click(trigger);

    // Overlay lives outside canvasElement.
    const overlayContainer = document.querySelector('.cdk-overlay-container') as HTMLElement;
    await waitFor(() => expect(overlayContainer).toBeInTheDocument());
    const overlay = within(overlayContainer);

    // The default tab is the first one (Animals) — its data-automation-id is
    // present on the tab rail and on the rendered options.
    await waitFor(() => expect(overlay.getByText(/Animals \(\d+\)/)).toBeInTheDocument());

    // 2. Switch to the "Places" tab.
    const placesTab = await overlay.findByText(/Places \(\d+\)/);
    await userEvent.click(placesTab);
    await waitFor(() => expect(overlay.getByText('Rome')).toBeInTheDocument());

    // 3. Type into the shared search box — filters across every tab. The
    //    component debounces input by 300 ms, so wait for the result to settle.
    const searchInput = overlayContainer.querySelector(
      '[data-automation-id="tabbed-group-picker-search"] input',
    ) as HTMLInputElement;
    expect(searchInput).toBeTruthy();
    await userEvent.type(searchInput, 'ath');
    await waitFor(
      () => {
        expect(overlay.getByText('Athens')).toBeInTheDocument();
        // Florence should have been filtered out.
        expect(overlay.queryByText('Florence')).toBeNull();
      },
      { timeout: 2000 },
    );

    // 4. Toggle the Athens row.
    await userEvent.click(overlay.getByText('Athens'));

    // 5. The host emits selectionChange; the bound consumer prints the summary.
    const summary = await canvas.findByTestId('selection-summary');
    await waitFor(() => expect(summary).toHaveTextContent(/Places:1/));
  },
};

/* -------------------------------------------------------------------------- */
/* 9. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every meaningful input wired to a control. Toggle the footer, flip activation
 * mode, or swap the trigger label — the picker re-renders against the same
 * dataset.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  argTypes: {
    showFooter: { control: 'boolean' },
    selectionEnabled: { control: 'boolean' },
  },
  args: {
    showFooter: false,
    selectionEnabled: true,
  },
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.html
<novo-tabbed-group-picker
  [tabs]="tabs"
  [buttonConfig]="buttonConfig"
  [quickSelectConfig]="quickSelectConfig"
  [showFooter]="showFooter"
  [selectionEnabled]="selectionEnabled"
  (selectionChange)="onSelectionChange($event)"
  (applyChange)="onApply($event)"
  (cancelChange)="onCancel($event)"
  (activation)="onActivation($event)">
</novo-tabbed-group-picker>`,
      },
    },
  },
  render: (args) => {
    const tabs: TabbedGroupPickerTab[] = [
      {
        typeName: 'animals',
        typeLabel: 'Animals',
        valueField: 'animalId',
        labelField: 'name',
        data: buildAnimals(),
      },
      {
        typeName: 'animalCategories',
        typeLabel: 'Animal Categories',
        valueField: 'groupId',
        labelField: 'name',
        childTypeName: 'animals',
        data: buildAnimalCategories() as any,
      } as TabbedGroupPickerTab,
    ];
    const quickSelectConfig: QuickSelectConfig = {
      label: 'Quick Select',
      items: [
        { label: 'Pure Evil', childTypeName: 'animals', children: [2] },
        { label: 'My Pets', childTypeName: 'animals', children: [1, 6, 9] },
        { label: 'All Animals', childTypeName: 'animals', all: true },
      ],
    };

    return {
      props: {
        ...args,
        tabs,
        quickSelectConfig,
        buttonConfig: { ...defaultButtonConfig, label: 'Playground' },
      },
      template: `
        <div style="min-height: 520px;">
          <novo-tabbed-group-picker
            [tabs]="tabs"
            [buttonConfig]="buttonConfig"
            [quickSelectConfig]="quickSelectConfig"
            [showFooter]="showFooter"
            [selectionEnabled]="selectionEnabled"
          ></novo-tabbed-group-picker>
        </div>
      `,
    };
  },
};
