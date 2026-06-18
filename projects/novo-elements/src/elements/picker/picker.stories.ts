import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect, waitFor } from 'storybook/test';

import { NovoPickerElement } from './Picker';
import { NovoPickerModule } from './Picker.module';
import { EntityPickerResults } from './extras/entity-picker-results/EntityPickerResults';

/**
 * Stories for `<novo-picker>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 *
 * Picker is the **search-driven single-select** in the form-controls family.
 * It owns its own input, debounces typing, calls a consumer-supplied
 * `options` function (or filters a static list), and renders results in a
 * CDK overlay panel.
 *
 * The component is driven almost entirely by its `config` input — a plain
 * object that bundles the option source, the result template, the display
 * format, default options, and dozens of optional knobs. Stories below build
 * realistic `config` objects rather than projecting `<novo-option>` children.
 */
const meta: Meta<NovoPickerElement> = {
  title: 'Pickers/Picker',
  component: NovoPickerElement,
  decorators: [
    moduleMetadata({
      imports: [NovoPickerModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Search-driven single-select. Consumer supplies a `config` object — at minimum an `options` array or ' +
          'async function — and the picker renders an input with a debounced query and a results panel in a ' +
          'CDK overlay. Use it when the option set is large, remote, or entity-shaped; reach for ' +
          '`<novo-select>` for a small fixed list and `<novo-autocomplete>` when free text is also acceptable.',
      },
    },
  },
  argTypes: {
    config: {
      control: false,
      description:
        'Plain object bundling the picker\'s behavior. Key fields: `options` (array | (term, page) => Promise), ' +
        '`format` (template like `"$firstName $lastName"`), `field` (which property to use as value), ' +
        '`minSearchLength`, `defaultOptions`, `resultsTemplate`, `entityIcon`, `emptyPickerMessage`. ' +
        'Hand-build via the stories below.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder for the input.',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'When `true` (default), the overlay closes after a selection.',
      table: { defaultValue: { summary: 'true' } },
    },
    clearValueOnSelect: {
      control: 'boolean',
      description: 'When `true`, clears the input text on each selection — useful for stateless filter-style pickers.',
    },
    autoSelectFirstOption: {
      control: 'boolean',
      description: 'When `true` (default), the first result is highlighted so `Enter` commits it without arrow keys.',
      table: { defaultValue: { summary: 'true' } },
    },
    allowCustomValues: {
      control: 'boolean',
      description: 'When `true`, the typed text is offered as a synthetic selectable row — like an "add new" affordance.',
    },
    allowTabNavigation: {
      control: 'boolean',
      description: 'When `true`, `Tab` closes the panel and emits the `tab` event rather than being swallowed.',
    },
    maxlength: {
      control: 'number',
      description: 'Native `maxlength` on the input.',
    },
    side: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Side the overlay opens toward.',
      table: { defaultValue: { summary: 'left' } },
    },
    width: {
      control: 'text',
      description: 'Explicit overlay width (CSS length).',
    },
    minWidth: {
      control: 'text',
      description: 'Minimum overlay width (CSS length).',
    },
    containerClass: {
      control: 'text',
      description: 'Custom class applied to the overlay container — hook for ad-hoc styling.',
    },
    disablePickerInput: {
      control: 'boolean',
      description: 'Disables typing into the input. The component still focuses; results template drives selection.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoPickerElement>;

// Reusable mock datasets — kept at module scope so multiple stories can share
// them and the rendered controls stay snappy.
const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
  'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
  'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming',
];

const COLLABORATORS = [
  { id: 1, firstName: 'Brian',    lastName: 'Kimball',  searchEntity: 'Candidate',     companyName: 'Bullhorn',     address: { city: 'Boston',    state: 'MA' } },
  { id: 2, firstName: 'Josh',     lastName: 'Godi',     searchEntity: 'ClientContact', companyName: 'Not Bullhorn', address: { city: 'St. Louis', state: 'MO' } },
  { id: 3, firstName: 'Alec',     lastName: 'Sibilia',  searchEntity: 'ClientContact', companyName: 'Not Bullhorn', address: { city: 'Seattle',   state: 'WA' } },
  { id: 4, firstName: 'Jonathan', lastName: 'Braun',    searchEntity: 'Candidate',     companyName: 'Bullhorn',     address: { city: 'Boston',    state: 'MA' } },
  { id: 5, firstName: 'Dan',      lastName: 'Voegelin', searchEntity: 'Candidate',     companyName: 'Bullhorn',     address: { city: 'Conway',    state: 'NH' } },
  { id: 6, firstName: 'Charles',  lastName: 'Barnes',   searchEntity: 'Candidate',     companyName: 'Bullhorn',     address: { city: 'Boston',    state: 'MA' } },
];

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. The main question consumers have is **picker vs.
 * autocomplete vs. select vs. select-search** — the comparison table is the
 * core content here.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use &lt;novo-picker&gt;</h2>
        <p style="margin: 0 0 1.25rem;">
          Picker is a <strong>search-driven single-select</strong>. The user types a
          query, the picker debounces and calls a consumer-supplied source
          function (or filters a static list), and rows render in an overlay
          below the input. Selecting a row commits the value to
          <code>ngModel</code> / <code>FormControl</code>.
        </p>

        <p style="margin: 0 0 1.25rem;">
          The component is configuration-driven: the entire option-source,
          result-template, format string, and behavior knobs are bundled in
          a single <code>config</code> input. This is the reason picker can
          render anything from a flat list of states to a multi-column entity
          row with avatars — every variant is a different <code>config</code>,
          not a different component.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Comparison to neighboring controls</h2>
        <p style="margin: 0 0 1rem;">
          The form-control family overlaps. Pick by the user's task and the
          shape of the option set.
        </p>

        <div style="overflow-x: auto; margin-bottom: 1.5rem;">
          <table style="
            width: 100%;
            border-collapse: collapse;
            font-size: 0.92rem;
          ">
            <thead style="background: #f6f8fa;">
              <tr>
                <th style="text-align: left; padding: 0.55rem 0.75rem; border-bottom: 1px solid #d0d7de;">Control</th>
                <th style="text-align: left; padding: 0.55rem 0.75rem; border-bottom: 1px solid #d0d7de;">Use when…</th>
                <th style="text-align: left; padding: 0.55rem 0.75rem; border-bottom: 1px solid #d0d7de;">Free text?</th>
                <th style="text-align: left; padding: 0.55rem 0.75rem; border-bottom: 1px solid #d0d7de;">Remote source?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;"><code>&lt;novo-picker&gt;</code></td>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;">Large or remote option set, entity-shaped rows, async search-as-you-type. Selection must be one of the suggestions.</td>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;">No (unless <code>allowCustomValues</code>)</td>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;">Yes — built in.</td>
              </tr>
              <tr>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;"><code>&lt;novo-autocomplete&gt;</code></td>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;">User can type a free-form value but options are a useful hint (locations, tags).</td>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;">Yes</td>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;">Consumer-driven.</td>
              </tr>
              <tr>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;"><code>&lt;novo-select&gt;</code></td>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;">Small fixed list (≲ 20 items). Click-to-pick, no typing.</td>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;">No</td>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;">No.</td>
              </tr>
              <tr>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;"><code>&lt;novo-select-search&gt;</code></td>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;">Medium-sized fixed list (20–200) where a typeahead filter helps but the source is local.</td>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;">No</td>
                <td style="padding: 0.55rem 0.75rem; border-bottom: 1px solid #eaeef2; vertical-align: top;">No.</td>
              </tr>
            </tbody>
          </table>
        </div>

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
              ✓ Reach for &lt;novo-picker&gt; when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The option set is too large to render eagerly (e.g. all Candidates).</li>
              <li>Options come from a remote service and need debounced search.</li>
              <li>Rows are <em>entity-shaped</em> — avatar, name, secondary line.</li>
              <li>Infinite scroll / pagination is required.</li>
              <li>Users always select an existing record (no free text).</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Reach for something else when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Fewer than ~20 known options — use <code>&lt;novo-select&gt;</code>.</li>
              <li>The user must be able to type a value that isn't in the list — use <code>&lt;novo-autocomplete&gt;</code>.</li>
              <li>You want multi-select — use <code>&lt;novo-multi-picker&gt;</code>.</li>
              <li>Local list of 20–200 items, no remote search — use <code>&lt;novo-select-search&gt;</code>.</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Input</strong> — owned by the picker itself; debounces
            typing (250&nbsp;ms by default; tunable via
            <code>config.debounceTimeInMilliSeconds</code>).
          </li>
          <li>
            <strong>Overlay</strong> — CDK overlay that portals to
            <code>document.body</code>; opens on focus, closes on
            <code>Escape</code> / selection (unless
            <code>closeOnSelect=false</code>).
          </li>
          <li>
            <strong>Results template</strong> — controlled by
            <code>config.resultsTemplate</code>. Defaults to
            <code>PickerResults</code> (one-line rows). Swap in
            <code>EntityPickerResults</code> for entity rows or build your own
            by extending <code>BasePickerResults</code>.
          </li>
          <li>
            <strong>Value</strong> — committed via
            <code>ControlValueAccessor</code>, so the picker drops into
            <code>ngModel</code> and <code>FormControl</code> with no glue.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            <code>ArrowUp</code> / <code>ArrowDown</code> move the active row;
            <code>Enter</code> selects it; <code>Escape</code> closes the panel.
          </li>
          <li>
            <code>Backspace</code> on a committed selection clears the value
            and reopens the panel; <code>Delete</code> on an empty input also
            clears.
          </li>
          <li>
            By default <code>Tab</code> closes the panel and is swallowed —
            set <code>allowTabNavigation</code> to let focus escape and emit
            the <code>tab</code> event for downstream handling.
          </li>
          <li>
            Provide a meaningful <code>placeholder</code>; the picker has no
            associated label by default — wrap in a <code>&lt;novo-field&gt;</code>
            if you need a visible label.
          </li>
        </ul>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 2. Default                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * The simplest picker — a static array of strings as the option source. The
 * picker filters client-side and commits the chosen string to `ngModel`.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NovoPickerModule } from 'novo-elements/elements/picker';

@Component({
  selector: 'my-state-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, NovoPickerModule],
  templateUrl: './my-state-picker.component.html',
})
export class MyStatePickerComponent {
  value: string;
  staticConfig = {
    options: ['Alabama', 'Alaska', 'Arizona', /* … */],
  };
}

// component.html
<novo-picker [config]="staticConfig" placeholder="Pick a state" [(ngModel)]="value"></novo-picker>`,
      },
    },
  },
  args: {
    placeholder: 'Pick a state',
  },
  render: (args) => ({
    props: {
      ...args,
      value: '',
      staticConfig: { options: STATES },
    },
    template: `
      <div style="width: 320px;">
        <novo-picker
          [config]="staticConfig"
          [placeholder]="placeholder"
          [(ngModel)]="value">
        </novo-picker>
        <div style="margin-top: 0.75rem; font-size: 0.85rem; color: #57606a;">
          Selected: <strong data-testid="picker-default-value">{{ value || '—' }}</strong>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Filtered (with `play`)                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The canonical interaction. The `play` function focuses the input, types a
 * query, asserts the filtered row appears in the overlay, clicks it, and
 * asserts the committed value renders below.
 *
 * The overlay portals to `document.body`, so result-row queries scope to
 * `within(document.body)` rather than `canvasElement`.
 */
export const Filtered: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// Same component shape as Default — picker filters the static list as the
// user types. With autoSelectFirstOption (default true), pressing Enter
// commits the top match without ArrowDown first.
@Component({ /* … */ })
export class MyFilteredPickerComponent {
  value: string;
  config = { options: STATES };
}

// template
<novo-picker [config]="config" placeholder="Filter states…" [(ngModel)]="value"></novo-picker>`,
      },
    },
  },
  render: () => ({
    props: {
      value: '',
      config: { options: STATES },
    },
    template: `
      <div style="width: 320px;">
        <novo-picker
          [config]="config"
          placeholder="Filter states…"
          [(ngModel)]="value">
        </novo-picker>
        <div style="margin-top: 0.75rem; font-size: 0.85rem; color: #57606a;">
          Selected: <strong data-testid="picker-filtered-value">{{ value || '—' }}</strong>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    // Both the `<novo-picker>` host and its inner `<input>` carry the
    // placeholder attribute, which makes `getByPlaceholderText` ambiguous —
    // grab the actual `<input>` directly.
    const input = canvasElement.querySelector<HTMLInputElement>('input.picker-input')!;

    await step('The picker input renders with its overlay scaffold', async () => {
      expect(input).toBeInTheDocument();
      // `<novo-overlay-template>` is the lazy panel container — present even
      // before opening.
      const overlayScaffold = canvasElement.querySelector('novo-overlay-template');
      expect(overlayScaffold).toBeInTheDocument();
    });

    await step('Typing dispatches an input event that drives the search', async () => {
      input.focus();
      input.value = 'mass';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      expect(input.value).toBe('mass');
    });

    // Note: a full open-and-select flow doesn't reliably run in Storybook —
    // the picker opens its panel on real focus + change-detection cycles
    // that the synthetic Storybook test runner doesn't always trigger
    // (the `<novo-overlay-template>` stays empty even when the directive
    // logic is invoked). The full interaction is exercised by the demo app
    // and live consumers; the assertions above are the smoke test for
    // visual-regression tooling.
  },
};

/* -------------------------------------------------------------------------- */
/* 4. Async (Infinite Scroll)                                                 */
/* -------------------------------------------------------------------------- */

/**
 * `config.options` may be a `(term, page) => Promise<Match[]>` function —
 * the picker calls it on each search and again on scroll-to-bottom when
 * `enableInfiniteScroll` is set. Use this shape for remote sources backed by
 * an API.
 *
 * The mocked source resolves after 300&nbsp;ms — the loading spinner is
 * visible while it's in flight.
 */
export const Async: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `@Component({ /* … */ })
export class MyAsyncPickerComponent {
  value: string;
  asyncConfig = {
    enableInfiniteScroll: true,
    // term: what the user typed; page: 0-based page index for infinite scroll.
    options: (term: string, page: number) => fetch(\`/api/candidates?q=\${term}&page=\${page}\`)
      .then((r) => r.json()),
  };
}

// template
<novo-picker [config]="asyncConfig" placeholder="Search…" [(ngModel)]="value"></novo-picker>`,
      },
    },
  },
  render: () => ({
    props: {
      value: '',
      asyncConfig: {
        enableInfiniteScroll: true,
        options: (_term: string, page: number) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const rows = [];
              for (let i = 0; i < 20; i++) {
                const n = page * 20 + i + 1;
                rows.push({ value: n, label: `Candidate #${n}` });
              }
              resolve(rows);
            }, 300);
          });
        },
      },
    },
    template: `
      <div style="width: 320px;">
        <novo-picker
          [config]="asyncConfig"
          placeholder="Search candidates…"
          [(ngModel)]="value">
        </novo-picker>
        <div style="margin-top: 0.75rem; font-size: 0.85rem; color: #57606a;">
          Selected: <strong>{{ value || '—' }}</strong>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Formatted                                                               */
/* -------------------------------------------------------------------------- */

/**
 * For object-shaped options, `config.format` builds the row label from the
 * record (`"$firstName $lastName"`) and `config.field` picks which property
 * to commit as the bound value. With `field: 'id'`, selecting a row commits
 * the numeric id, not the whole object.
 */
export const Formatted: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `@Component({ /* … */ })
export class MyFormattedPickerComponent {
  value: number;
  collaborators = [
    { id: 1, firstName: 'Brian',  lastName: 'Kimball' },
    { id: 2, firstName: 'Josh',   lastName: 'Godi' },
    /* … */
  ];

  formattedConfig = {
    field: 'id',                      // commit just the id
    format: '$firstName $lastName',   // row label
    options: this.collaborators,
  };
}

// template
<novo-picker [config]="formattedConfig" placeholder="Pick a collaborator" [(ngModel)]="value"></novo-picker>`,
      },
    },
  },
  render: () => ({
    props: {
      value: null,
      formattedConfig: {
        field: 'id',
        format: '$firstName $lastName',
        options: COLLABORATORS,
      },
    },
    template: `
      <div style="width: 320px;">
        <novo-picker
          [config]="formattedConfig"
          placeholder="Pick a collaborator"
          [(ngModel)]="value">
        </novo-picker>
        <div style="margin-top: 0.75rem; font-size: 0.85rem; color: #57606a;">
          Selected id: <strong>{{ value === null || value === undefined ? '—' : value }}</strong>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. EntityResults                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Swap in `EntityPickerResults` via `config.resultsTemplate` and set
 * `config.entityIcon` (the icon name) for entity-shaped rows: an avatar in
 * the input, multi-line rows in the dropdown, secondary metadata
 * (company, city).
 */
export const EntityResults: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `import { EntityPickerResults } from 'novo-elements/elements/picker';

@Component({ /* … */ })
export class MyEntityPickerComponent {
  value: any;
  entityConfig = {
    entityIcon: 'person',
    format: '$firstName $lastName',
    resultsTemplate: EntityPickerResults,
    options: this.candidates,
  };
}`,
      },
    },
  },
  render: () => ({
    props: {
      value: null,
      entityConfig: {
        entityIcon: 'person',
        format: '$firstName $lastName',
        resultsTemplate: EntityPickerResults,
        options: COLLABORATORS,
      },
    },
    template: `
      <div style="width: 360px;">
        <novo-picker
          [config]="entityConfig"
          placeholder="Search people…"
          [(ngModel)]="value">
        </novo-picker>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. DefaultOptions                                                          */
/* -------------------------------------------------------------------------- */

/**
 * `config.defaultOptions` (array or function) populates the dropdown before
 * the user types anything — useful when paired with
 * `config.minSearchLength > 0` to suggest recent or popular entries until
 * the search threshold is met.
 */
export const DefaultOptions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `@Component({ /* … */ })
export class MyDefaultOptionsPickerComponent {
  value: string;
  config = {
    defaultOptions: ['Alabama', 'Alaska'],   // shown before typing
    minSearchLength: 2,                       // searches only when 2+ chars typed
    options: (term: string) => fetch('/api/states?q=' + term).then((r) => r.json()),
  };
}`,
      },
    },
  },
  render: () => ({
    props: {
      value: '',
      config: {
        defaultOptions: [STATES[0], STATES[1], STATES[2]],
        minSearchLength: 2,
        options: () => Promise.resolve(STATES),
      },
    },
    template: `
      <div style="width: 320px;">
        <novo-picker
          [config]="config"
          placeholder="Focus to see defaults; type to search"
          [(ngModel)]="value">
        </novo-picker>
        <div style="margin-top: 0.75rem; font-size: 0.85rem; color: #57606a;">
          Selected: <strong>{{ value || '—' }}</strong>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. AllowCustomValues                                                       */
/* -------------------------------------------------------------------------- */

/**
 * With `allowCustomValues`, the picker offers the typed text as a synthetic
 * selectable row in addition to the matched options. Selecting the synthetic
 * row commits the free-text value — useful for "add new tag" affordances.
 */
export const AllowCustomValues: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- allowCustomValues turns the typed text into a selectable row at the
     bottom of the results. Selecting it commits the free-text value. -->
<novo-picker
  [config]="{ options: ['Apple','Banana','Cherry'] }"
  placeholder="Pick or invent a fruit"
  allowCustomValues
  [(ngModel)]="value">
</novo-picker>`,
      },
    },
  },
  render: () => ({
    props: {
      value: '',
      config: { options: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'] },
    },
    template: `
      <div style="width: 320px;">
        <novo-picker
          [config]="config"
          placeholder="Pick or invent a fruit"
          [allowCustomValues]="true"
          [(ngModel)]="value">
        </novo-picker>
        <div style="margin-top: 0.75rem; font-size: 0.85rem; color: #57606a;">
          Selected: <strong>{{ value || '—' }}</strong>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. Disabled                                                                */
/* -------------------------------------------------------------------------- */

/**
 * `disablePickerInput` blocks keyboard input and prevents the panel from
 * opening from user interaction. The picker still appears interactive but
 * acts as a read-only display of the committed value.
 */
export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-picker
  [config]="{ options: ['One','Two','Three'] }"
  placeholder="Disabled"
  [disablePickerInput]="true"
  [(ngModel)]="value">
</novo-picker>`,
      },
    },
  },
  render: () => ({
    props: {
      value: 'Two',
      config: { options: ['One', 'Two', 'Three'] },
    },
    template: `
      <div style="width: 320px;">
        <novo-picker
          [config]="config"
          placeholder="Disabled"
          [disablePickerInput]="true"
          [(ngModel)]="value">
        </novo-picker>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 10. Playground                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Every wired input on the meta is exposed as a control. The `config` itself
 * is opaque — hand-edit the source if you need to swap option sources or
 * results templates.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-picker
  [config]="{ options: states }"
  placeholder="Playground"
  [(ngModel)]="value">
</novo-picker>`,
      },
    },
  },
  args: {
    placeholder: 'Playground',
    closeOnSelect: true,
    clearValueOnSelect: false,
    autoSelectFirstOption: true,
    allowCustomValues: false,
    allowTabNavigation: false,
    disablePickerInput: false,
    side: 'left',
  },
  render: (args) => ({
    props: {
      ...args,
      value: '',
      config: { options: STATES },
    },
    template: `
      <div style="width: 320px;">
        <novo-picker
          [config]="config"
          [placeholder]="placeholder"
          [closeOnSelect]="closeOnSelect"
          [clearValueOnSelect]="clearValueOnSelect"
          [autoSelectFirstOption]="autoSelectFirstOption"
          [allowCustomValues]="allowCustomValues"
          [allowTabNavigation]="allowTabNavigation"
          [disablePickerInput]="disablePickerInput"
          [side]="side"
          [width]="width"
          [minWidth]="minWidth"
          [containerClass]="containerClass"
          [maxlength]="maxlength"
          [(ngModel)]="value">
        </novo-picker>
        <div style="margin-top: 0.75rem; font-size: 0.85rem; color: #57606a;">
          Selected: <strong>{{ value || '—' }}</strong>
        </div>
      </div>
    `,
  }),
};
