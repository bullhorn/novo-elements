import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { NovoSelectSearchComponent } from './select-search.component';
import { NovoSelectSearchModule } from './select-search.module';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoOptionModule } from 'novo-elements/elements/common';
import { NovoFieldModule } from 'novo-elements/elements/field';

/**
 * Stories for `<novo-select-search>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 *
 * `<novo-select-search>` is not a standalone control: it is a search input
 * designed to be nested inside a `<novo-select>` dropdown panel as the first
 * `<novo-option>`. The component's constructor requires a parent
 * `NovoSelectElement` via DI, and it logs an error if it isn't placed inside a
 * `<novo-option>`. Every story therefore renders it inside a `<novo-select>`.
 */
const meta: Meta<NovoSelectSearchComponent> = {
  title: 'Form Controls/Select Search',
  component: NovoSelectSearchComponent,
  decorators: [
    moduleMetadata({
      imports: [
        NovoSelectSearchModule,
        NovoSelectModule,
        NovoOptionModule,
        NovoFieldModule,
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A search input that nests inside a `<novo-select>` dropdown panel to filter its options. Implements ' +
          '`ControlValueAccessor` so consumers wire it to a `FormControl` and react to `valueChanges` to drive the ' +
          'filtered option list (typically a `ReplaySubject<T[]>` consumed by `*ngFor`). Open the dropdown in the ' +
          'Canvas to see the search field — it lives at the top of the option list and is auto-focused when the panel ' +
          'opens.',
      },
    },
  },
  argTypes: {
    placeholderLabel: {
      control: 'text',
      description: 'Placeholder text for the search input. Defaults to `"Search"`.',
    },
    noEntriesFoundLabel: {
      control: 'text',
      description:
        'Message shown below the search input when filtering yields zero options. Set to `null` to suppress. ' +
        'Defaults to `"No Records Found"`.',
    },
    clearSearchInput: {
      control: 'boolean',
      description:
        'Whether to clear the search text when the dropdown closes. Disable for server-side filtering where you ' +
        'want to preserve the query across opens. Defaults to `true`.',
    },
    searching: {
      control: 'boolean',
      description:
        'Toggles the inline spinner in the search-input suffix. Useful for async/server-side filtering while a ' +
        'request is in flight.',
    },
    hideClearSearchButton: {
      control: 'boolean',
      description:
        'Hides the "clear search" (×) button that appears in the suffix whenever the input has a value. Defaults ' +
        'to `false`.',
    },
    disableInitialFocus: {
      control: 'boolean',
      description: 'Skip auto-focusing the search input when the dropdown opens. Defaults to `false`.',
    },
    enableClearOnEscapePressed: {
      control: 'boolean',
      description:
        'When `true`, pressing `Esc` clears the search text instead of closing the dropdown (unless the input is ' +
        'already empty). Defaults to `false`.',
    },
    preventHomeEndKeyPropagation: {
      control: 'boolean',
      description:
        'Stop `Home` / `End` key events from bubbling to the parent `<novo-select>`, so they move the caret within ' +
        'the input instead of jumping the active option to the first/last in the list. Defaults to `false`.',
    },
    disableScrollToActiveOnOptionsChanged: {
      control: 'boolean',
      description:
        'Disable the automatic scroll-to-active-option that fires when the filtered list changes. Useful for ' +
        'server-side search where the option set is replaced asynchronously. Defaults to `false`.',
    },
    allowDeselectDuringFilter: {
      control: 'boolean',
      description:
        'In `[multiple]="true"` selects, allow the user to deselect items while the search is filtering the list. ' +
        'By default previously-selected values are restored if filtering removes them from view. Defaults to `false`.',
    },
    showToggleAllCheckbox: {
      control: 'boolean',
      description:
        'When the parent `<novo-select>` is `[multiple]="true"`, show a "select-all" checkbox in the search-input ' +
        'prefix that emits via `(toggleAll)`. Defaults to `false`.',
    },
    toggleAllCheckboxChecked: {
      control: 'boolean',
      description: 'Checked state of the toggle-all checkbox (only relevant when `showToggleAllCheckbox` is `true`).',
    },
    toggleAllCheckboxIndeterminate: {
      control: 'boolean',
      description: 'Indeterminate state of the toggle-all checkbox.',
    },
    toggleAllCheckboxTooltipMessage: {
      control: 'text',
      description: 'Tooltip shown on hover over the toggle-all checkbox.',
    },
    type: {
      control: 'text',
      description: 'Native `type` attribute for the underlying `<input>`. Defaults to `"text"`.',
    },
    name: {
      control: 'text',
      description: 'Native `name` attribute. Defaults to an auto-generated unique id.',
    },
    ariaLabel: {
      control: 'text',
      description: '`aria-label` for the search input. Defaults to `"dropdown search"`.',
    },
    indexAndLengthScreenReaderText: {
      control: 'text',
      description:
        'Connector text in the live announcement for screen readers (e.g. `"Option Foo 3 of 12"`). Defaults to `" of "`.',
    },
    alwaysRestoreSelectedOptionsMulti: {
      control: 'boolean',
      description:
        'Always restore previously-selected options on selection change in `[multiple]` mode — useful with ' +
        'lazy-loading / infinite-scroll option lists. Defaults to `false`.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoSelectSearchComponent>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for a search-enabled select,
 * the composition pattern (search nested inside `<novo-select>`), the
 * client-side vs server-side filtering split, and accessibility notes.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use select-search</h2>
        <p style="margin: 0 0 1.25rem;">
          Drop a <code>&lt;novo-select-search&gt;</code> into a
          <code>&lt;novo-select&gt;</code> when the option list is long enough
          that scanning becomes painful. The search input is rendered at the
          top of the dropdown panel and filters the visible options as the user
          types. For very small, finite lists, prefer a plain
          <code>&lt;novo-select&gt;</code>; for open-ended free-text matching
          against a remote dataset, reach for
          <code>&lt;novo-autocomplete&gt;</code> or
          <code>&lt;novo-picker&gt;</code> instead.
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
              ✓ Use select-search when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The option list has roughly 10+ items</li>
              <li>You need multi-select with filtering (pair with <code>[multiple]="true"</code>)</li>
              <li>Filtering is server-driven and you need a spinner + debounce hook</li>
              <li>Users expect to type-ahead to find a known value</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use select-search when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The list is short (under ~10 items) — plain <code>&lt;novo-select&gt;</code> is enough</li>
              <li>You want free-text input that may not match any option — use <code>&lt;novo-autocomplete&gt;</code></li>
              <li>The dataset is huge and needs paging + entity rendering — use <code>&lt;novo-picker&gt;</code></li>
              <li>You need to render it standalone (no surrounding <code>&lt;novo-select&gt;</code>)</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          <code>&lt;novo-select-search&gt;</code> always lives inside the
          parent <code>&lt;novo-select&gt;</code>, wrapped in its own
          <code>&lt;novo-option&gt;</code> at the top of the option list:
        </p>
        <pre style="
          background: #f6f8fa;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
          font-size: 0.85rem;
          margin: 0 0 1.5rem;
        "><code>&lt;novo-field&gt;
  &lt;novo-select [formControl]="ctrl" placeholder="Pick one"&gt;
    &lt;novo-option&gt;
      &lt;novo-select-search [formControl]="filterCtrl"&gt;&lt;/novo-select-search&gt;
    &lt;/novo-option&gt;
    &lt;novo-option *ngFor="let item of filtered | async" [value]="item"&gt;
      {{ item.name }}
    &lt;/novo-option&gt;
  &lt;/novo-select&gt;
&lt;/novo-field&gt;</code></pre>

        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Search input</strong> — auto-focused when the dropdown
            opens (unless <code>disableInitialFocus</code> is set). The value
            flows through <code>ControlValueAccessor</code>, so a
            <code>FormControl</code> on the search drives your filtering logic.
          </li>
          <li>
            <strong>Clear button</strong> — a × icon appears in the suffix
            whenever the input has a value. Hide it via
            <code>hideClearSearchButton</code>, or override the icon by
            projecting a custom element with the
            <code>novoSelectSearchClear</code> directive.
          </li>
          <li>
            <strong>Searching spinner</strong> — drive
            <code>[searching]="true"</code> from your async pipeline to show a
            spinner in place of the clear button while a request is in flight.
          </li>
          <li>
            <strong>No-entries message</strong> — rendered below the input when
            filtering yields zero matching options. Customise the copy via
            <code>noEntriesFoundLabel</code> or set it to <code>null</code> to
            suppress.
          </li>
          <li>
            <strong>Toggle-all checkbox</strong> (optional, multi-select only)
            — opt in with <code>[showToggleAllCheckbox]="true"</code>; the
            component emits via <code>(toggleAll)</code> and you decide what
            "select all" means against the currently filtered list.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Filtering: client-side vs server-side</h2>
        <p style="margin: 0 0 1rem;">
          The component is just a controlled input — it doesn't filter for you.
          Subscribe to the search <code>FormControl</code>'s
          <code>valueChanges</code> and push the filtered list into the
          <code>*ngFor</code> source.
        </p>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Client-side</strong> — keep the full dataset in memory,
            filter it synchronously inside <code>valueChanges</code>, and emit
            into a <code>ReplaySubject&lt;T[]&gt;</code>. Leave
            <code>clearSearchInput</code> at its default (<code>true</code>).
          </li>
          <li>
            <strong>Server-side</strong> — debounce
            <code>valueChanges</code>, set <code>[searching]="true"</code>
            while the request is in flight, and consider
            <code>disableScrollToActiveOnOptionsChanged</code> so the option
            list doesn't jerk every time the response lands. If you want the
            query to persist across opens, set
            <code>[clearSearchInput]="false"</code>.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            The input ships with <code>aria-label="dropdown search"</code> by
            default — override via <code>[ariaLabel]</code> when the surrounding
            context warrants a more specific name (e.g. "Search states").
          </li>
          <li>
            Arrow-key navigation continues to drive the option list while the
            search input is focused. The component announces the active option
            ("Foo 3 of 12") via <code>LiveAnnouncer</code>.
          </li>
          <li>
            <code>Home</code> / <code>End</code> default to jumping the option
            list to the first/last item. Set
            <code>[preventHomeEndKeyPropagation]="true"</code> to instead let
            those keys move the caret within the input.
          </li>
          <li>
            With <code>[enableClearOnEscapePressed]="true"</code>,
            <code>Esc</code> clears the current query (and only closes the
            dropdown on a second press when the input is already empty).
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
 * The simplest usable shape: a single-select `<novo-select>` whose first
 * option hosts a `<novo-select-search>`. The host story owns the source list
 * and filters it inline as the search value changes. Open the trigger and
 * start typing to see the option list narrow.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// NovoSelectSearchModule + NovoSelectModule + NovoOptionModule + NovoFieldModule.
// <novo-select-search> MUST nest inside a <novo-select> (it injects NovoSelectElement).
@Component({ ... })
export class MyFilterablePickerComponent {
  options = [
    { value: 'AL', name: 'Alabama' },
    { value: 'AK', name: 'Alaska' },
    { value: 'AZ', name: 'Arizona' },
    /* ... */
  ];
  selected: string | null = null;
  query = '';

  filtered() {
    const q = this.query.toLowerCase();
    if (!q) return this.options;
    return this.options.filter((o) => o.name.toLowerCase().includes(q));
  }
}

// template — first <novo-option> hosts the search; the rest are the filtered list.
<novo-field>
  <novo-select [(ngModel)]="selected" placeholder="Pick a state">
    <novo-option>
      <novo-select-search [(ngModel)]="query"></novo-select-search>
    </novo-option>
    <novo-option *ngFor="let opt of filtered()" [value]="opt.value">
      {{ opt.name }}
    </novo-option>
  </novo-select>
</novo-field>`,
      },
    },
  },
  args: {
    placeholderLabel: 'Search',
    noEntriesFoundLabel: 'No Records Found',
    clearSearchInput: true,
    searching: false,
    hideClearSearchButton: false,
    disableInitialFocus: false,
    enableClearOnEscapePressed: false,
  },
  render: (args) => ({
    props: {
      ...args,
      options: [
        { value: 'AL', name: 'Alabama' },
        { value: 'AK', name: 'Alaska' },
        { value: 'AZ', name: 'Arizona' },
        { value: 'AR', name: 'Arkansas' },
        { value: 'CA', name: 'California' },
        { value: 'CO', name: 'Colorado' },
        { value: 'CT', name: 'Connecticut' },
        { value: 'DE', name: 'Delaware' },
        { value: 'FL', name: 'Florida' },
        { value: 'GA', name: 'Georgia' },
        { value: 'HI', name: 'Hawaii' },
        { value: 'ID', name: 'Idaho' },
      ],
      selected: null,
      query: '',
      filtered(this: any) {
        const q = (this.query || '').toLowerCase();
        if (!q) return this.options;
        return this.options.filter((o: any) => o.name.toLowerCase().indexOf(q) > -1);
      },
    },
    template: `
      <div style="min-width: 280px;">
        <novo-field>
          <novo-select [(ngModel)]="selected" placeholder="Pick a state">
            <novo-option>
              <novo-select-search
                [(ngModel)]="query"
                [placeholderLabel]="placeholderLabel"
                [noEntriesFoundLabel]="noEntriesFoundLabel"
                [clearSearchInput]="clearSearchInput"
                [searching]="searching"
                [hideClearSearchButton]="hideClearSearchButton"
                [disableInitialFocus]="disableInitialFocus"
                [enableClearOnEscapePressed]="enableClearOnEscapePressed"
              ></novo-select-search>
            </novo-option>
            <novo-option *ngFor="let opt of filtered()" [value]="opt.value">
              {{ opt.name }}
            </novo-option>
          </novo-select>
        </novo-field>
      </div>
    `,
  }),
  // Smoke test: open the select, type into the embedded search, and confirm
  // the option list narrows. The select panel is portalled into document.body
  // via CDK overlay, so all post-open queries go through `within(document.body)`
  // rather than the story canvas.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);

    const body = within(document.body);
    // Search input lives inside the overlay panel as the first option.
    const searchInput = (await body.findByPlaceholderText(/search/i)) as HTMLInputElement;
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, 'cal');

    await waitFor(async () => {
      await expect(await body.findByText('California')).toBeVisible();
      expect(body.queryByText('Alabama')).toBeNull();
    });
  },
};

/* -------------------------------------------------------------------------- */
/* 3. Clearable                                                                */
/* -------------------------------------------------------------------------- */

/**
 * The clear (×) button in the search-input suffix appears whenever the input
 * has a value. This story demonstrates both the default behavior and the
 * `hideClearSearchButton` opt-out. Open the dropdown and type to see the
 * clear button materialise.
 */
export const Clearable: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NovoFieldModule, NovoOptionModule, NovoSelectModule, NovoSelectSearchModule } from 'novo-elements';

// The clear (×) suffix appears when the search input has a value.
// Set hideClearSearchButton="true" to opt out.
@Component({
  selector: 'my-clearable-select-search',
  imports: [CommonModule, FormsModule, NovoFieldModule, NovoSelectModule, NovoOptionModule, NovoSelectSearchModule],
  templateUrl: './my-clearable-select-search.component.html',
})
export class MyClearableSelectSearchComponent {
  options = [
    { value: 1, name: 'Apple' },
    { value: 2, name: 'Banana' },
    { value: 3, name: 'Cherry' },
  ];
  selected: number | null = null;
  query = '';

  filtered() {
    const q = this.query.toLowerCase();
    return q ? this.options.filter((o) => o.name.toLowerCase().includes(q)) : this.options;
  }
}

// component.html
<novo-field>
  <novo-select [(ngModel)]="selected">
    <novo-option>
      <novo-select-search [(ngModel)]="query"></novo-select-search>
    </novo-option>
    <novo-option *ngFor="let opt of filtered()" [value]="opt.value">{{ opt.name }}</novo-option>
  </novo-select>
</novo-field>`,
      },
    },
  },
  render: () => ({
    props: {
      options: [
        { value: 1, name: 'Apple' },
        { value: 2, name: 'Banana' },
        { value: 3, name: 'Cherry' },
        { value: 4, name: 'Date' },
        { value: 5, name: 'Elderberry' },
        { value: 6, name: 'Fig' },
      ],
      selectedA: null,
      selectedB: null,
      queryA: 'a',
      queryB: 'a',
      filter(this: any, list: any[], q: string) {
        const needle = (q || '').toLowerCase();
        if (!needle) return list;
        return list.filter((o) => o.name.toLowerCase().indexOf(needle) > -1);
      },
    },
    template: `
      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="min-width: 240px;">
          <div style="font-weight: 600; margin-bottom: 0.25rem;">Clearable (default)</div>
          <novo-field>
            <novo-select [(ngModel)]="selectedA" placeholder="Pick a fruit">
              <novo-option>
                <novo-select-search [(ngModel)]="queryA"></novo-select-search>
              </novo-option>
              <novo-option *ngFor="let opt of filter(options, queryA)" [value]="opt.value">
                {{ opt.name }}
              </novo-option>
            </novo-select>
          </novo-field>
        </div>

        <div style="min-width: 240px;">
          <div style="font-weight: 600; margin-bottom: 0.25rem;">Clear button hidden</div>
          <novo-field>
            <novo-select [(ngModel)]="selectedB" placeholder="Pick a fruit">
              <novo-option>
                <novo-select-search
                  [(ngModel)]="queryB"
                  [hideClearSearchButton]="true"
                ></novo-select-search>
              </novo-option>
              <novo-option *ngFor="let opt of filter(options, queryB)" [value]="opt.value">
                {{ opt.name }}
              </novo-option>
            </novo-select>
          </novo-field>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. WithPlaceholder                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Customise the search input's placeholder text via `placeholderLabel`, and
 * the empty-state message via `noEntriesFoundLabel`. Together they let the
 * dropdown speak the domain of its options.
 */
export const WithPlaceholder: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoSelectSearchModule } from 'novo-elements';

// placeholderLabel customizes the empty-input prompt;
// noEntriesFoundLabel customizes the empty-result message.
@Component({
  selector: 'my-placeholder-select-search',
  imports: [FormsModule, NovoSelectSearchModule],
  templateUrl: './my-placeholder-select-search.component.html',
})
export class MyPlaceholderSelectSearchComponent {
  query = '';
}

// component.html
<novo-select-search
  [(ngModel)]="query"
  placeholderLabel="Type to filter teams..."
  noEntriesFoundLabel="No teams match"
></novo-select-search>`,
      },
    },
  },
  render: () => ({
    props: {
      options: [
        { value: 'eng', name: 'Engineering' },
        { value: 'des', name: 'Design' },
        { value: 'pro', name: 'Product' },
        { value: 'mkt', name: 'Marketing' },
        { value: 'sal', name: 'Sales' },
        { value: 'sup', name: 'Customer Support' },
      ],
      selected: null,
      query: '',
      filtered(this: any) {
        const q = (this.query || '').toLowerCase();
        if (!q) return this.options;
        return this.options.filter((o: any) => o.name.toLowerCase().indexOf(q) > -1);
      },
    },
    template: `
      <div style="min-width: 280px;">
        <novo-field>
          <novo-select [(ngModel)]="selected" placeholder="Department">
            <novo-option>
              <novo-select-search
                [(ngModel)]="query"
                placeholderLabel="Filter departments…"
                noEntriesFoundLabel="No departments match your search"
              ></novo-select-search>
            </novo-option>
            <novo-option *ngFor="let opt of filtered()" [value]="opt.value">
              {{ opt.name }}
            </novo-option>
          </novo-select>
        </novo-field>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Disabled                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-select-search>` doesn't expose its own `disabled` input — it's a
 * dependent of the parent `<novo-select>`. Disable the host select and the
 * trigger goes non-interactive; the dropdown (and therefore the search input)
 * never opens. This story demonstrates the practical "disabled" appearance.
 */
export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NovoOptionModule, NovoSelectModule, NovoSelectSearchModule } from 'novo-elements';

// <novo-select-search> has no own disabled input — it inherits from the parent
// <novo-select>'s disabled state.
@Component({
  selector: 'my-disabled-select-search',
  imports: [CommonModule, FormsModule, NovoSelectModule, NovoOptionModule, NovoSelectSearchModule],
  templateUrl: './my-disabled-select-search.component.html',
})
export class MyDisabledSelectSearchComponent {
  options = [
    { value: 1, name: 'Option One' },
    { value: 2, name: 'Option Two' },
    { value: 3, name: 'Option Three' },
  ];
  selected: number | null = 2;
  query = '';
}

// component.html
<novo-select [(ngModel)]="selected" disabled>
  <novo-option>
    <novo-select-search [(ngModel)]="query"></novo-select-search>
  </novo-option>
  <novo-option *ngFor="let opt of options" [value]="opt.value">{{ opt.name }}</novo-option>
</novo-select>`,
      },
    },
  },
  render: () => ({
    props: {
      options: [
        { value: 1, name: 'Option One' },
        { value: 2, name: 'Option Two' },
        { value: 3, name: 'Option Three' },
      ],
      selected: 2,
      query: '',
      filtered(this: any) {
        const q = (this.query || '').toLowerCase();
        if (!q) return this.options;
        return this.options.filter((o: any) => o.name.toLowerCase().indexOf(q) > -1);
      },
    },
    template: `
      <div style="min-width: 280px;">
        <novo-field>
          <novo-select [(ngModel)]="selected" [disabled]="true" placeholder="Disabled select">
            <novo-option>
              <novo-select-search [(ngModel)]="query"></novo-select-search>
            </novo-option>
            <novo-option *ngFor="let opt of filtered()" [value]="opt.value">
              {{ opt.name }}
            </novo-option>
          </novo-select>
        </novo-field>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Toggle `searching` to see the inline
 * spinner, `showToggleAllCheckbox` (with the parent `[multiple]="true"`) to
 * surface select-all, and so on. Sanity-check combinations or copy a code
 * snippet via the Source tab.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NovoFieldModule, NovoOptionModule, NovoSelectModule, NovoSelectSearchModule } from 'novo-elements';

@Component({
  selector: 'my-select-search-playground',
  imports: [CommonModule, FormsModule, NovoFieldModule, NovoSelectModule, NovoOptionModule, NovoSelectSearchModule],
  templateUrl: './my-select-search-playground.component.html',
})
export class MySelectSearchPlaygroundComponent {
  options = [
    { value: 'AL', name: 'Alabama' },
    { value: 'AK', name: 'Alaska' },
    { value: 'AZ', name: 'Arizona' },
  ];
  selected: string[] = [];
  query = '';

  filtered() {
    const q = this.query.toLowerCase();
    return q ? this.options.filter((o) => o.name.toLowerCase().includes(q)) : this.options;
  }
}

// component.html
<novo-field>
  <novo-select [(ngModel)]="selected">
    <novo-option>
      <novo-select-search [(ngModel)]="query" placeholderLabel="Search"></novo-select-search>
    </novo-option>
    <novo-option *ngFor="let opt of filtered()" [value]="opt.value">{{ opt.name }}</novo-option>
  </novo-select>
</novo-field>`,
      },
    },
  },
  args: {
    placeholderLabel: 'Search',
    noEntriesFoundLabel: 'No Records Found',
    clearSearchInput: true,
    searching: false,
    hideClearSearchButton: false,
    disableInitialFocus: false,
    enableClearOnEscapePressed: false,
    preventHomeEndKeyPropagation: false,
    disableScrollToActiveOnOptionsChanged: false,
    allowDeselectDuringFilter: false,
    showToggleAllCheckbox: false,
    toggleAllCheckboxChecked: false,
    toggleAllCheckboxIndeterminate: false,
    toggleAllCheckboxTooltipMessage: '',
    type: 'text',
    name: '',
    ariaLabel: 'dropdown search',
    indexAndLengthScreenReaderText: ' of ',
    alwaysRestoreSelectedOptionsMulti: false,
  },
  render: (args) => ({
    props: {
      ...args,
      options: [
        { value: 'AL', name: 'Alabama' },
        { value: 'AK', name: 'Alaska' },
        { value: 'AZ', name: 'Arizona' },
        { value: 'AR', name: 'Arkansas' },
        { value: 'CA', name: 'California' },
        { value: 'CO', name: 'Colorado' },
        { value: 'CT', name: 'Connecticut' },
        { value: 'DE', name: 'Delaware' },
        { value: 'FL', name: 'Florida' },
        { value: 'GA', name: 'Georgia' },
      ],
      selected: [],
      query: '',
      filtered(this: any) {
        const q = (this.query || '').toLowerCase();
        if (!q) return this.options;
        return this.options.filter((o: any) => o.name.toLowerCase().indexOf(q) > -1);
      },
    },
    template: `
      <div style="min-width: 320px;">
        <novo-field>
          <novo-select [(ngModel)]="selected" [multiple]="true" placeholder="Pick states">
            <novo-option>
              <novo-select-search
                [(ngModel)]="query"
                [placeholderLabel]="placeholderLabel"
                [noEntriesFoundLabel]="noEntriesFoundLabel"
                [clearSearchInput]="clearSearchInput"
                [searching]="searching"
                [hideClearSearchButton]="hideClearSearchButton"
                [disableInitialFocus]="disableInitialFocus"
                [enableClearOnEscapePressed]="enableClearOnEscapePressed"
                [preventHomeEndKeyPropagation]="preventHomeEndKeyPropagation"
                [disableScrollToActiveOnOptionsChanged]="disableScrollToActiveOnOptionsChanged"
                [allowDeselectDuringFilter]="allowDeselectDuringFilter"
                [showToggleAllCheckbox]="showToggleAllCheckbox"
                [toggleAllCheckboxChecked]="toggleAllCheckboxChecked"
                [toggleAllCheckboxIndeterminate]="toggleAllCheckboxIndeterminate"
                [toggleAllCheckboxTooltipMessage]="toggleAllCheckboxTooltipMessage"
                [type]="type"
                [name]="name || null"
                [ariaLabel]="ariaLabel"
                [indexAndLengthScreenReaderText]="indexAndLengthScreenReaderText"
                [alwaysRestoreSelectedOptionsMulti]="alwaysRestoreSelectedOptionsMulti"
              ></novo-select-search>
            </novo-option>
            <novo-option *ngFor="let opt of filtered()" [value]="opt.value">
              {{ opt.name }}
            </novo-option>
          </novo-select>
        </novo-field>
      </div>
    `,
  }),
};
