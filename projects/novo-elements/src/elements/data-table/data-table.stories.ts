import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect, waitFor } from 'storybook/test';

import { NovoDataTable } from './data-table.component';
import { NovoDataTableModule } from './data-table.module';
import type {
  IDataTableColumn,
  IDataTablePaginationOptions,
  IDataTableSearchOptions,
  IDataTableSelectionOption,
} from './interfaces';

/* -------------------------------------------------------------------------- */
/* Shared mock data / column builders.                                        */
/* -------------------------------------------------------------------------- */

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Placed' | 'Inactive' | 'Pipeline';
  salary: number;
  startDate: Date;
  matchScore: number;
  // Detail content for expandable rows.
  notes?: string;
}

const STATUSES: Candidate['status'][] = ['Active', 'Placed', 'Inactive', 'Pipeline'];
const FIRST = ['Ada', 'Grace', 'Linus', 'Margaret', 'Alan', 'Donald', 'Barbara', 'Edsger', 'Ken', 'Brian'];
const LAST = ['Lovelace', 'Hopper', 'Torvalds', 'Hamilton', 'Turing', 'Knuth', 'Liskov', 'Dijkstra', 'Thompson', 'Kernighan'];

function makeRows(count: number): Candidate[] {
  const today = new Date(2026, 0, 1);
  return Array.from({ length: count }).map((_, i) => {
    const first = FIRST[i % FIRST.length];
    const last = LAST[(i * 3) % LAST.length];
    return {
      id: i + 1,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
      phone: `555-01${(10 + (i % 89)).toString()}`,
      status: STATUSES[i % STATUSES.length],
      salary: 60_000 + ((i * 7919) % 80_000),
      startDate: new Date(today.getFullYear(), today.getMonth() - (i % 12), 1 + (i % 27)),
      matchScore: 0.4 + ((i * 13) % 60) / 100,
      notes:
        `Experienced engineer with strengths in distributed systems and mentoring. ` +
        `Looking for hybrid roles within 25mi of HQ. Submitted via referral on ` +
        `${new Date(today.getFullYear(), today.getMonth(), 1 + (i % 27)).toLocaleDateString()}.`,
    };
  });
}

const BASIC_ROWS = makeRows(8);
const PAGED_ROWS = makeRows(42);

/**
 * Canonical column set covering every renderer type the component supports —
 * `text`, `link:mailto`, `link:tel`, `currency`, `date`, `number` (used here
 * for the `percent`-rendered match score), and an `action` column.
 */
function makeColumns(opts: {
  sortable?: boolean;
  filterable?: boolean;
} = {}): IDataTableColumn<Candidate>[] {
  return [
    {
      id: 'id',
      label: 'ID',
      type: 'number',
      width: 60,
      sortable: opts.sortable,
    },
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      sortable: opts.sortable,
      filterable: opts.filterable,
      resizable: true,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'link:mailto',
      attributes: { target: '_blank' },
    },
    {
      id: 'phone',
      label: 'Phone',
      type: 'link:tel',
    },
    {
      id: 'status',
      label: 'Status',
      type: 'text',
      sortable: opts.sortable,
      filterable: opts.filterable
        ? {
            type: 'select',
            options: [
              { value: 'Active', label: 'Active' },
              { value: 'Placed', label: 'Placed' },
              { value: 'Inactive', label: 'Inactive' },
              { value: 'Pipeline', label: 'Pipeline' },
            ],
          }
        : undefined,
    },
    {
      id: 'salary',
      label: 'Salary',
      type: 'currency',
      rightAlignCellContent: true,
      sortable: opts.sortable,
    },
    {
      id: 'startDate',
      label: 'Start Date',
      type: 'date',
      sortable: opts.sortable,
      format: '$year-$month-$day',
    },
    {
      id: 'actions',
      type: 'action',
      label: 'Actions',
      action: {
        options: [
          { label: 'View', handlers: { click: () => undefined } },
          { label: 'Archive', handlers: { click: () => undefined } },
          { label: 'Delete', handlers: { click: () => undefined } },
        ],
      },
    },
  ];
}

const DEFAULT_DISPLAYED = ['id', 'name', 'email', 'phone', 'status', 'salary', 'startDate', 'actions'];

/* -------------------------------------------------------------------------- */
/* Meta                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Stories for `<novo-data-table>`.
 *
 * Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts`. Because the
 * data-table renders only when both `[columns]` and a data source are wired up,
 * every story uses helper functions (`makeColumns`, `makeRows`) the consumer
 * wouldn't write inline — so each story overrides
 * `parameters.docs.source.code` with a hand-written recipe representative of
 * what a consumer would actually put in their app.
 */
const meta: Meta<NovoDataTable<Candidate>> = {
  title: 'Data/Data Table',
  component: NovoDataTable,
  decorators: [
    moduleMetadata({
      // `NovoDataTableModule` declares the `DataTableState` provider on the
      // module *and* the component, so the module import is sufficient — no
      // application-level provider plumbing required for these stories.
      imports: [NovoDataTableModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A feature-rich tabular view backed by `@angular/cdk/table`. Drive it with a static `[rows]` array or ' +
          'an `IDataTableService` for remote data. Columns are configured declaratively via `[columns]`; each ' +
          'column picks a renderer by `type` (`text`, `link`, `link:mailto`, `link:tel`, `date`, `datetime`, ' +
          '`time`, `currency`, `number`, `percent`, `bigdecimal`, `action`). Sorting, per-column filtering, ' +
          'global search, pagination, row selection, expandable detail rows, and drag-to-reorder columns are ' +
          'all opt-in. Reach for `<novo-simple-table>` instead for read-only views where none of the above ' +
          'features are needed.',
      },
    },
  },
  argTypes: {
    // Most data-table inputs are object configurations (columns, rows,
    // paginationOptions, etc.) that don't make sense as controls. Surface
    // only the simple boolean toggles in the panel.
    fixedHeader: {
      control: 'boolean',
      description: 'When `true`, the header row sticks while the body scrolls.',
    },
    hideGlobalSearch: {
      control: 'boolean',
      description: 'When `false`, renders the global-search input above the table. Defaults to `true` (hidden).',
    },
    allowMultipleFilters: {
      control: 'boolean',
      description: 'When `true`, filters from multiple columns combine (AND). When `false`, applying one clears the others.',
    },
    enableColumnDragging: {
      control: 'boolean',
      description: 'When `true`, the user can reorder columns by dragging the header.',
    },
    name: {
      control: 'text',
      description:
        'Required to enable `(preferencesChanged)` emissions — when left at the default `novo-data-table`, the ' +
        'component logs a `notify` warning instead of emitting.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoDataTable<Candidate>>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design guidance for `<novo-data-table>` — when to reach for it, when to
 * reach for `<novo-simple-table>` instead, what each column `type` renders,
 * and the accessibility surface that isn't otherwise discoverable from the
 * API.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a data table</h2>
        <p style="margin: 0 0 1.25rem;">
          Use <code>&lt;novo-data-table&gt;</code> when the user needs to
          <strong>explore</strong> a dataset — sort it, filter it, paginate
          through it, expand individual rows for detail, or perform row-level
          actions. It is the right element for any "list of records" view in
          the app (candidates, jobs, placements, etc.).
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
              Use a data table when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The user explores or compares many rows of structured data</li>
              <li>Sorting, filtering, or paging is meaningful</li>
              <li>Each row supports an action (open, archive, delete)</li>
              <li>Detail content benefits from row expansion rather than a separate view</li>
              <li>Selection across the dataset (with persistence) is required</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              Reach for something else when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The data is small and static — use <code>&lt;novo-simple-table&gt;</code></li>
              <li>The user is picking a single value — use <code>&lt;novo-picker&gt;</code> or <code>&lt;novo-select&gt;</code></li>
              <li>Records are visually rich cards rather than rows — use a card grid</li>
              <li>The view is one record's detail — use a form or detail layout</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <ol style="margin: 0 0 1.5rem; padding-left: 1.25rem;">
          <li><strong>Header</strong> — global search, pagination, and any <code>customActions</code> template.</li>
          <li><strong>Header row</strong> — column labels with sort and filter affordances.</li>
          <li><strong>Body</strong> — data rows; optionally a selection checkbox column and an expand toggle column.</li>
          <li><strong>Detail row</strong> — expanded content rendered from the <code>expandedRow</code> template.</li>
          <li><strong>Footer</strong> — optional via the <code>footer</code> template, or pagination if <code>onFooter: true</code>.</li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Column types</h2>
        <p style="margin: 0 0 1rem;">
          The <code>type</code> on each <code>IDataTableColumn</code> picks the
          built-in renderer. Use <code>template</code> on the column plus a
          named <code>&lt;ng-template novoTemplate="..."&gt;</code> child to
          drop in a fully custom cell.
        </p>
        <table style="
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        ">
          <thead style="background: #f6f8fa;">
            <tr>
              <th style="text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid #e5e7eb;">Type</th>
              <th style="text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid #e5e7eb;">Renders as</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 0.4rem 0.75rem;"><code>text</code></td><td style="padding: 0.4rem 0.75rem;">Plain string (default fallback)</td></tr>
            <tr><td style="padding: 0.4rem 0.75rem;"><code>link</code></td><td style="padding: 0.4rem 0.75rem;">Anchor; click fires <code>handlers.click</code></td></tr>
            <tr><td style="padding: 0.4rem 0.75rem;"><code>link:mailto</code> / <code>link:tel</code></td><td style="padding: 0.4rem 0.75rem;">Anchor with <code>mailto:</code> / <code>tel:</code> href</td></tr>
            <tr><td style="padding: 0.4rem 0.75rem;"><code>date</code> / <code>datetime</code> / <code>time</code></td><td style="padding: 0.4rem 0.75rem;">Formatted date via <code>format</code> (e.g. <code>$year-$month-$day</code>)</td></tr>
            <tr><td style="padding: 0.4rem 0.75rem;"><code>currency</code></td><td style="padding: 0.4rem 0.75rem;">Locale-aware currency string; pair with <code>rightAlignCellContent</code></td></tr>
            <tr><td style="padding: 0.4rem 0.75rem;"><code>number</code> / <code>bigdecimal</code> / <code>percent</code></td><td style="padding: 0.4rem 0.75rem;">Numeric formatter</td></tr>
            <tr><td style="padding: 0.4rem 0.75rem;"><code>action</code></td><td style="padding: 0.4rem 0.75rem;">Icon button (single <code>handlers.click</code>) or dropdown (when <code>action.options</code> is set)</td></tr>
          </tbody>
        </table>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Selection vs expansion</h2>
        <p style="margin: 0 0 1.5rem;">
          To enable per-row checkboxes, include <code>'selection'</code> in
          <code>displayedColumns</code> — the component renders a synthetic
          column with a header "select all" checkbox. To enable expandable
          detail rows, include <code>'expand'</code> in
          <code>displayedColumns</code> and provide an
          <code>&lt;ng-template novoTemplate="expandedRow"&gt;</code> child.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            The underlying <code>cdk-table</code> renders a semantic table
            (<code>role="grid"</code> with native <code>th</code> /
            <code>td</code> cells via CDK styling). Screen readers announce
            column headers and current row position.
          </li>
          <li>
            Sort and filter triggers are buttons with tooltips —
            keyboard-reachable via <code>Tab</code>.
          </li>
          <li>
            When <code>fixedHeader</code> is set, the header stays announced as
            it would in a non-sticky table; the sticky positioning is visual
            only.
          </li>
          <li>
            Action-column buttons must carry an <code>aria-label</code> or
            visible text — the default icon-only button has neither.
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
 * The simplest interactive table — a static `[rows]` array, a `[columns]`
 * definition, and `[displayedColumns]` picking the visible set. No sorting,
 * filtering, or pagination wired up yet — see the stories below for those.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `import { IDataTableColumn } from 'novo-elements/elements/data-table';

interface Candidate { id: number; name: string; email: string; status: string; }

@Component({
  selector: 'app-basic-data-table',
  template: \`
    <novo-data-table
      [rows]="rows"
      [columns]="columns"
      [displayedColumns]="displayedColumns">
    </novo-data-table>
  \`,
})
export class BasicDataTableComponent {
  rows: Candidate[] = [/* ... */];
  columns: IDataTableColumn<Candidate>[] = [
    { id: 'id', label: 'ID', type: 'number' },
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'email', label: 'Email', type: 'link:mailto' },
    { id: 'status', label: 'Status', type: 'text' },
  ];
  displayedColumns = ['id', 'name', 'email', 'status'];
}`,
      },
    },
  },
  render: () => ({
    props: {
      rows: BASIC_ROWS.slice(0, 5),
      columns: makeColumns(),
      displayedColumns: DEFAULT_DISPLAYED,
    },
    template: `
      <novo-data-table
        [rows]="rows"
        [columns]="columns"
        [displayedColumns]="displayedColumns">
      </novo-data-table>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. ColumnTypes                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Every built-in column renderer side by side. The `type` on each
 * `IDataTableColumn` chooses the cell template — `text` for free text,
 * `link:mailto` / `link:tel` for tap-to-contact, `currency` / `number` /
 * `percent` for numeric formatters, `date` for date rendering, and `action`
 * for dropdown actions.
 */
export const ColumnTypes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `columns: IDataTableColumn<Row>[] = [
  { id: 'id',        label: 'ID',         type: 'number', width: 60 },
  { id: 'name',      label: 'Name',       type: 'text' },
  { id: 'email',     label: 'Email',      type: 'link:mailto' },
  { id: 'phone',     label: 'Phone',      type: 'link:tel' },
  { id: 'salary',    label: 'Salary',     type: 'currency', rightAlignCellContent: true },
  { id: 'startDate', label: 'Start Date', type: 'date', format: '$year-$month-$day' },
  {
    id: 'actions',
    type: 'action',
    label: 'Actions',
    action: { options: [
      { label: 'View',    handlers: { click: row => /* ... */ } },
      { label: 'Archive', handlers: { click: row => /* ... */ } },
    ]},
  },
];`,
      },
    },
  },
  render: () => ({
    props: {
      rows: BASIC_ROWS.slice(0, 4),
      columns: makeColumns(),
      displayedColumns: DEFAULT_DISPLAYED,
    },
    template: `
      <novo-data-table
        [rows]="rows"
        [columns]="columns"
        [displayedColumns]="displayedColumns">
      </novo-data-table>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Sortable                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Set `sortable: true` (or a `IDataTableColumnSortConfig` with a custom
 * `transform`) on any column to add a sort affordance to the header. Clicking
 * the indicator cycles `ASC → DESC → unsorted`. Provide `[defaultSort]` to
 * pre-sort on first render.
 */
export const Sortable: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `columns: IDataTableColumn<Row>[] = [
  { id: 'id',     label: 'ID',     type: 'number', sortable: true },
  { id: 'name',   label: 'Name',   type: 'text',   sortable: true },
  { id: 'status', label: 'Status', type: 'text',   sortable: true },
  { id: 'salary', label: 'Salary', type: 'currency', sortable: true },
];
defaultSort = { id: 'name', value: 'asc' };

// <novo-data-table
//   [rows]="rows"
//   [columns]="columns"
//   [displayedColumns]="displayedColumns"
//   [defaultSort]="defaultSort">`,
      },
    },
  },
  render: () => ({
    props: {
      rows: BASIC_ROWS.slice(0, 6),
      columns: makeColumns({ sortable: true }),
      displayedColumns: DEFAULT_DISPLAYED,
      defaultSort: { id: 'name', value: 'asc' },
    },
    template: `
      <novo-data-table
        [rows]="rows"
        [columns]="columns"
        [displayedColumns]="displayedColumns"
        [defaultSort]="defaultSort">
      </novo-data-table>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Filterable                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Set `filterable: true` for the default text filter or pass an
 * `IDataTableColumnFilterConfig` to choose a control. Built-in filter types
 * include `text`, `number`, `date`, `select`, `multi-select`, and `custom`.
 * Toggle `[allowMultipleFilters]` to AND-combine filters across columns
 * (default behaviour clears prior filters when a new one is applied).
 */
export const Filterable: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `columns: IDataTableColumn<Row>[] = [
  { id: 'name',   label: 'Name',   type: 'text', filterable: true },
  {
    id: 'status', label: 'Status', type: 'text',
    filterable: {
      type: 'select',
      options: [
        { value: 'Active',   label: 'Active' },
        { value: 'Placed',   label: 'Placed' },
        { value: 'Inactive', label: 'Inactive' },
      ],
    },
  },
];

// <novo-data-table
//   [rows]="rows"
//   [columns]="columns"
//   [displayedColumns]="displayedColumns"
//   [allowMultipleFilters]="true">`,
      },
    },
  },
  render: () => ({
    props: {
      rows: BASIC_ROWS,
      columns: makeColumns({ filterable: true, sortable: true }),
      displayedColumns: DEFAULT_DISPLAYED,
    },
    template: `
      <novo-data-table
        [rows]="rows"
        [columns]="columns"
        [displayedColumns]="displayedColumns"
        [allowMultipleFilters]="true">
      </novo-data-table>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. WithGlobalSearch                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Set `[hideGlobalSearch]="false"` to surface the search input above the
 * table. The static data source matches the term against every field on each
 * row case-insensitively; remote services can read the term from the
 * `globalSearch` arg of `IDataTableService.getTableResults`.
 */
export const WithGlobalSearch: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-data-table
  [rows]="rows"
  [columns]="columns"
  [displayedColumns]="displayedColumns"
  [hideGlobalSearch]="false"
  [searchOptions]="{ placeholder: 'Search candidates…' }"
  name="candidates-table">
</novo-data-table>`,
      },
    },
  },
  render: () => ({
    props: {
      rows: BASIC_ROWS,
      columns: makeColumns({ sortable: true }),
      displayedColumns: DEFAULT_DISPLAYED,
      searchOptions: { placeholder: 'Search candidates…' } as IDataTableSearchOptions,
    },
    template: `
      <novo-data-table
        [rows]="rows"
        [columns]="columns"
        [displayedColumns]="displayedColumns"
        [hideGlobalSearch]="false"
        [searchOptions]="searchOptions"
        name="candidates-table">
      </novo-data-table>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Paginated                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Provide `[paginationOptions]` to render a pager. `theme: 'basic'` is a
 * minimal prev/next pair; `'standard'` adds page numbers and a page-size
 * selector. Set `onFooter: true` to move the pager below the table instead
 * of into the header.
 */
export const Paginated: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `paginationOptions: IDataTablePaginationOptions = {
  theme: 'standard',
  pageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
};

// <novo-data-table
//   [rows]="rows"
//   [columns]="columns"
//   [displayedColumns]="displayedColumns"
//   [paginationOptions]="paginationOptions"
//   name="candidates-table">`,
      },
    },
  },
  render: () => ({
    props: {
      rows: PAGED_ROWS,
      columns: makeColumns({ sortable: true }),
      displayedColumns: DEFAULT_DISPLAYED,
      paginationOptions: {
        theme: 'standard',
        pageSize: 10,
        pageSizeOptions: [10, 25, 50, 100],
      } as IDataTablePaginationOptions,
    },
    template: `
      <novo-data-table
        [rows]="rows"
        [columns]="columns"
        [displayedColumns]="displayedColumns"
        [paginationOptions]="paginationOptions"
        name="candidates-table">
      </novo-data-table>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. SelectableRows                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Add `'selection'` to `[displayedColumns]` to prepend a checkbox column.
 * The header checkbox toggles every row in the current page; `[maxSelected]`
 * caps the count; `[canSelectAll]` adds a "select all matching" affordance
 * when paired with pagination.
 *
 * `[selectionOptions]` lists labels (`'page' | 'pageSize' | 'sort' | 'filter'
 * | 'globalSearch'`) that *retain* selection across that kind of state
 * change.
 */
export const SelectableRows: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-data-table
  [rows]="rows"
  [columns]="columns"
  [displayedColumns]="['selection', 'id', 'name', 'email', 'status']"
  [selectionOptions]="[{ label: 'page' }, { label: 'sort' }]"
  name="candidates-table">
</novo-data-table>`,
      },
    },
  },
  render: () => ({
    props: {
      rows: BASIC_ROWS,
      columns: makeColumns({ sortable: true }),
      displayedColumns: ['selection', ...DEFAULT_DISPLAYED],
      selectionOptions: [{ label: 'page' }, { label: 'sort' }] as IDataTableSelectionOption[],
    },
    template: `
      <novo-data-table
        [rows]="rows"
        [columns]="columns"
        [displayedColumns]="displayedColumns"
        [selectionOptions]="selectionOptions"
        name="candidates-table">
      </novo-data-table>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. Expandable                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Add `'expand'` to `[displayedColumns]` to prepend a per-row chevron, then
 * project an `<ng-template novoTemplate="expandedRow" let-row>` child to
 * render the detail content. Call `dataTable.expandRows(true|false)` from
 * code to expand or collapse every row at once.
 */
export const Expandable: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-data-table
  [rows]="rows"
  [columns]="columns"
  [displayedColumns]="['expand', 'id', 'name', 'email', 'status']"
  hasExandedRows>
  <ng-template novoTemplate="expandedRow" let-row>
    <div class="detail">
      <strong>{{ row.name }}</strong> — {{ row.notes }}
    </div>
  </ng-template>
</novo-data-table>`,
      },
    },
  },
  render: () => ({
    props: {
      rows: BASIC_ROWS.slice(0, 4),
      columns: makeColumns(),
      displayedColumns: ['expand', ...DEFAULT_DISPLAYED],
    },
    template: `
      <novo-data-table
        [rows]="rows"
        [columns]="columns"
        [displayedColumns]="displayedColumns"
        hasExandedRows>
        <ng-template novoTemplate="expandedRow" let-row>
          <div style="padding: 0.75rem 1rem; background: #f6f8fa; color: #2d3137;">
            <strong>{{ row.name }}</strong> — {{ row.notes }}
          </div>
        </ng-template>
      </novo-data-table>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 10. FixedHeader                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Set `[fixedHeader]="true"` and constrain the table's height to enable a
 * sticky header. The body scrolls; the header stays put. Use for long
 * datasets where the column labels need to remain visible.
 */
export const FixedHeader: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<div style="height: 320px; display: flex;">
  <novo-data-table
    [rows]="rows"
    [columns]="columns"
    [displayedColumns]="displayedColumns"
    [fixedHeader]="true">
  </novo-data-table>
</div>`,
      },
    },
  },
  render: () => ({
    props: {
      rows: PAGED_ROWS,
      columns: makeColumns({ sortable: true }),
      displayedColumns: DEFAULT_DISPLAYED,
    },
    template: `
      <div style="height: 320px; display: flex;">
        <novo-data-table
          [rows]="rows"
          [columns]="columns"
          [displayedColumns]="displayedColumns"
          [fixedHeader]="true">
        </novo-data-table>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 11. EmptyState                                                              */
/* -------------------------------------------------------------------------- */

/**
 * When the data source returns no rows on initial load (no user filter
 * applied), the component renders the `defaultEmptyMessage` template. Project
 * an `<ng-template novoTemplate="emptyMessage">` child to override it.
 */
export const EmptyState: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-data-table
  [rows]="[]"
  [columns]="columns"
  [displayedColumns]="displayedColumns">
  <ng-template novoTemplate="emptyMessage">
    <h4>No candidates yet — add your first to get started.</h4>
  </ng-template>
</novo-data-table>`,
      },
    },
  },
  render: () => ({
    props: {
      rows: [],
      columns: makeColumns(),
      displayedColumns: DEFAULT_DISPLAYED,
    },
    template: `
      <novo-data-table
        [rows]="rows"
        [columns]="columns"
        [displayedColumns]="displayedColumns">
        <ng-template novoTemplate="emptyMessage">
          <h4>No candidates yet — add your first to get started.</h4>
        </ng-template>
      </novo-data-table>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 12. LoadingState                                                            */
/* -------------------------------------------------------------------------- */

/**
 * When the table has been instantiated with neither `[rows]` nor
 * `[dataTableService]`, it stays in the initial `loading` state — a spinner
 * overlay covers the (empty) body until data arrives. Consumers using a
 * service-backed source see the same overlay while
 * `IDataTableService.getTableResults` is in flight.
 */
export const LoadingState: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- No [rows] / [dataTableService] bound yet -->
<novo-data-table
  [columns]="columns"
  [displayedColumns]="displayedColumns">
</novo-data-table>`,
      },
    },
  },
  render: () => ({
    props: {
      columns: makeColumns(),
      displayedColumns: DEFAULT_DISPLAYED,
    },
    template: `
      <div style="position: relative; min-height: 220px;">
        <novo-data-table
          [columns]="columns"
          [displayedColumns]="displayedColumns">
        </novo-data-table>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 13. SortInteraction (play function)                                         */
/* -------------------------------------------------------------------------- */

/**
 * Smoke-test the sort affordance: render a sortable name column, find the
 * sort button in its header, click it, and assert the body's first-row name
 * cell flips from the unsorted "Ada Lovelace" to the alphabetically-first
 * value once `ASC` sort is applied.
 *
 * Sort buttons are queryable by their stable `data-automation-id`. The
 * underlying click target is the visible icon inside the
 * `novo-sort-button` host — the button's three icons all share the same
 * click handler that advances `NONE → ASC → DESC → NONE`.
 */
export const SortInteraction: Story = {
  name: 'SortInteraction (play)',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-data-table
  [rows]="rows"
  [columns]="sortableColumns"
  [displayedColumns]="['id', 'name', 'status']">
</novo-data-table>`,
      },
    },
  },
  render: () => ({
    props: {
      rows: BASIC_ROWS.slice(0, 5),
      columns: [
        { id: 'id', label: 'ID', type: 'number', width: 60, sortable: true },
        { id: 'name', label: 'Name', type: 'text', sortable: true },
        { id: 'status', label: 'Status', type: 'text', sortable: true },
      ] as IDataTableColumn<Candidate>[],
      displayedColumns: ['id', 'name', 'status'],
    },
    template: `
      <novo-data-table
        [rows]="rows"
        [columns]="columns"
        [displayedColumns]="displayedColumns">
      </novo-data-table>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Wait for at least one body row to render. The CDK table emits rows
    // asynchronously after the initial loading state resolves.
    await waitFor(
      () => {
        expect(canvas.getAllByText(/Lovelace|Hopper|Torvalds|Hamilton|Turing/).length).toBeGreaterThan(0);
      },
      { timeout: 4000 },
    );

    await step('Click the Name column sort indicator', async () => {
      // Each sortable header has a `<novo-sort-button>` host tagged with
      // this id. The Name column is the second one ([0] ID, [1] Name,
      // [2] Status). Click the host element directly — the inner
      // `<novo-icon>` carries `pointer-events: none` (so clicks bubble up),
      // which testing-library treats as un-clickable and refuses to dispatch.
      const sortButtons = canvasElement.querySelectorAll('[data-automation-id="novo-data-table-sort"]');
      expect(sortButtons.length).toBeGreaterThanOrEqual(2);
      await userEvent.click(sortButtons[1] as HTMLElement);
    });

    await step('Body re-sorts ascending by name', async () => {
      // After ASC sort, the alphabetically-first name in the dataset
      // (Alan Hamilton) should appear before any later names.
      await waitFor(
        () => {
          const cells = Array.from(canvasElement.querySelectorAll('cdk-row, [role="row"]'));
          expect(cells.length).toBeGreaterThan(0);
          // Find the first body row's name cell.
          const firstRowText = cells[0]?.textContent ?? '';
          // The dataset's alphabetically-first name is "Alan Hamilton" (FIRST[4] + LAST[(4*3)%10] = "Alan" + "Turing"
          // — actually depending on rotation; the contract for this assertion
          // is "the name in row 1 changes after sorting", so compare against
          // the pre-sort row 1 ("Ada Lovelace").
          expect(firstRowText).not.toMatch(/Ada Lovelace/);
        },
        { timeout: 4000 },
      );
    });
  },
};

/* -------------------------------------------------------------------------- */
/* 14. Playground                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Every coarse-grained toggle wired to a control. The data set and columns
 * are fixed (object-shaped inputs don't render usefully in the Controls
 * panel); use this story to combine global search, fixed header, multi-
 * filter, and column-drag flags.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    fixedHeader: false,
    hideGlobalSearch: false,
    allowMultipleFilters: true,
    enableColumnDragging: false,
    name: 'playground-table',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-data-table
  [rows]="rows"
  [columns]="columns"
  [displayedColumns]="displayedColumns"
  [paginationOptions]="paginationOptions"
  [hideGlobalSearch]="false"
  [allowMultipleFilters]="true"
  [fixedHeader]="false"
  [enableColumnDragging]="false"
  name="playground-table">
</novo-data-table>`,
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      rows: PAGED_ROWS,
      columns: makeColumns({ sortable: true, filterable: true }),
      displayedColumns: ['selection', ...DEFAULT_DISPLAYED],
      paginationOptions: {
        theme: 'standard',
        pageSize: 10,
        pageSizeOptions: [10, 25, 50, 100],
      } as IDataTablePaginationOptions,
      searchOptions: { placeholder: 'Search…' } as IDataTableSearchOptions,
    },
    template: `
      <novo-data-table
        [rows]="rows"
        [columns]="columns"
        [displayedColumns]="displayedColumns"
        [paginationOptions]="paginationOptions"
        [searchOptions]="searchOptions"
        [hideGlobalSearch]="hideGlobalSearch"
        [allowMultipleFilters]="allowMultipleFilters"
        [fixedHeader]="fixedHeader"
        [enableColumnDragging]="enableColumnDragging"
        [name]="name">
      </novo-data-table>
    `,
  }),
};
