import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { NovoTable } from './table';
import { NovoSimpleTableModule } from './simple-table.module';

/**
 * Stories for `<novo-simple-table>` — the lightweight, content-shaped table
 * primitive. See `projects/novo-elements/src/elements/button/button.stories.ts`
 * for the full convention reference. Most stories use template projection
 * directly (`novoSimpleColumnDef` / `*novoSimpleCellDef`) rather than the
 * `<novo-activity-table>` config-driven wrapper, since simple-table's
 * defining shape is a CDK-style declarative table.
 */

type Person = {
  id: number;
  name: string;
  role: string;
  department: string;
  salary: number;
  startDate: string;
};

const PEOPLE: Person[] = [
  { id: 1, name: 'Aisha Patel', role: 'Recruiter', department: 'Talent', salary: 72000, startDate: '2022-03-14' },
  { id: 2, name: 'Brendan O’Hara', role: 'Account Executive', department: 'Sales', salary: 95000, startDate: '2021-08-02' },
  { id: 3, name: 'Camila Ruiz', role: 'Sourcer', department: 'Talent', salary: 64000, startDate: '2023-01-10' },
  { id: 4, name: 'Devon Walker', role: 'Engineering Manager', department: 'Engineering', salary: 162000, startDate: '2019-11-28' },
  { id: 5, name: 'Eira Lindqvist', role: 'Designer', department: 'Product', salary: 118000, startDate: '2020-06-18' },
  { id: 6, name: 'Faruq Al-Sayed', role: 'Senior Engineer', department: 'Engineering', salary: 148000, startDate: '2018-04-05' },
];

const meta: Meta<NovoTable<Person>> = {
  title: 'Data/Simple Table',
  component: NovoTable,
  decorators: [
    moduleMetadata({
      imports: [NovoSimpleTableModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A lightweight tabular layout primitive. `<novo-simple-table>` extends Angular CDK’s `<cdk-table>` ' +
          'with Bullhorn styling — alternating row stripes, borders, and a small set of cell components for ' +
          'checkbox / action / sortable header columns. Use it whenever you want a *content-shaped* table without ' +
          'the data-table machinery (sorting, filtering, pagination, virtual scroll, row grouping, etc.). For full ' +
          'data-grid behavior, reach for `<novo-data-table>` instead.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<NovoTable<Person>>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. The defining question for simple-table is *"do I
 * actually need a data-grid?"* — if the answer is no, simple-table is the
 * right primitive. If you find yourself reaching for sorting, filtering,
 * pagination, virtual scroll, or row grouping, you want `<novo-data-table>`.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use simple-table</h2>
        <p style="margin: 0 0 1.25rem;">
          <code>&lt;novo-simple-table&gt;</code> is a content-shaped table primitive built on
          Angular CDK’s <code>&lt;cdk-table&gt;</code>. It exists for layouts that
          <em>look</em> like a table but don’t need the heavy grid machinery
          — sorting, filtering, pagination, virtual scroll, row grouping, and
          server-driven data binding all live on <code>&lt;novo-data-table&gt;</code>.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">simple-table vs. data-table</h2>
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
              ✓ Reach for simple-table when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The dataset is small (typically &lt; 50 rows) and fully in-memory.</li>
              <li>You want a styled table for static or near-static content.</li>
              <li>You’re displaying a summary inside a detail view, modal, or aside.</li>
              <li>The user doesn’t need to slice the data — they just read it.</li>
              <li>You want full template control over each cell.</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Use data-table instead when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>You need column sorting, filtering, or pagination.</li>
              <li>The dataset comes from a remote service or is large.</li>
              <li>You need row selection with bulk actions.</li>
              <li>You need column resizing, freezing, or reordering.</li>
              <li>You need expandable detail rows or row grouping out of the box.</li>
              <li>You need virtual scroll for performance.</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          A simple-table is composed of column definitions and row definitions
          — the same shape as Angular CDK’s <code>&lt;cdk-table&gt;</code>, with
          Bullhorn-styled cell directives.
        </p>
        <ul style="margin: 0 0 1.5rem; padding-left: 1.25rem;">
          <li><strong><code>[dataSource]</code></strong> — accepts a plain array, an <code>Observable&lt;T[]&gt;</code>, or a CDK <code>DataSource</code>.</li>
          <li><strong><code>novoSimpleColumnDef</code></strong> — names a column. Wraps its header and cell templates.</li>
          <li><strong><code>*novoSimpleHeaderCellDef</code></strong> — the header cell template for the column.</li>
          <li><strong><code>*novoSimpleCellDef</code></strong> — the cell template per row; gets <code>let row</code>.</li>
          <li><strong><code>*novoSimpleHeaderRowDef</code></strong> / <strong><code>*novoSimpleRowDef</code></strong> — declare which columns to render and in what order.</li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Sortable columns</h2>
        <p style="margin: 0 0 1rem;">
          Sortable headers are supplied by <code>&lt;novo-simple-header-cell&gt;</code>
          paired with the <code>[novo-simple-cell-config]</code> directive
          (<code>sortable: true</code>) and the <code>novoSortFilter</code>
          directive on the table host. When you only need the lightweight
          template-projected form, skip the cell-config directive and write
          your own header cell.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Density &amp; striping</h2>
        <p style="margin: 0 0 1rem;">
          The shipped styles include alternating row backgrounds out of the
          box (odd rows get a subtle tint). Borders are applied on header
          cells. Compact/dense layouts aren’t a first-class variant — wrap the
          table in a custom CSS scope and override the cell padding when you
          need a denser layout.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>The host renders a semantic <code>&lt;table&gt;</code> with <code>role="table"</code>; CDK fills in <code>rowgroup</code>/<code>row</code>/<code>columnheader</code>/<code>gridcell</code> roles automatically.</li>
          <li>For sortable headers, supply a clear text label and let the sort icon convey direction — do not rely on color alone.</li>
          <li>Empty and loading states should be announced via a sibling element with <code>role="status"</code> when the table is empty for content reasons.</li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Heads up</h2>
        <p style="margin: 0 0 1rem;">
          The <code>&lt;novo-activity-table&gt;</code> wrapper around simple-table is
          deprecated in favor of <code>&lt;novo-data-table&gt;</code>. For new code, use
          <code>&lt;novo-simple-table&gt;</code> directly (template-projected form) for
          static layouts, or migrate to <code>&lt;novo-data-table&gt;</code> for anything
          interactive.
        </p>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 2. Default                                                                 */
/* -------------------------------------------------------------------------- */

const DEFAULT_SOURCE = `<!-- NovoSimpleTableModule -->
<novo-simple-table [dataSource]="people">
  <ng-container novoSimpleColumnDef="name">
    <novo-simple-header-cell *novoSimpleHeaderCellDef>Name</novo-simple-header-cell>
    <novo-simple-cell *novoSimpleCellDef="let row">
      <span>{{ row.name }}</span>
    </novo-simple-cell>
  </ng-container>

  <ng-container novoSimpleColumnDef="role">
    <novo-simple-header-cell *novoSimpleHeaderCellDef>Role</novo-simple-header-cell>
    <novo-simple-cell *novoSimpleCellDef="let row">
      <span>{{ row.role }}</span>
    </novo-simple-cell>
  </ng-container>

  <ng-container novoSimpleColumnDef="department">
    <novo-simple-header-cell *novoSimpleHeaderCellDef>Department</novo-simple-header-cell>
    <novo-simple-cell *novoSimpleCellDef="let row">
      <span>{{ row.department }}</span>
    </novo-simple-cell>
  </ng-container>

  <novo-simple-header-row *novoSimpleHeaderRowDef="['name', 'role', 'department']"></novo-simple-header-row>
  <novo-simple-row *novoSimpleRowDef="let row; columns: ['name', 'role', 'department']"></novo-simple-row>
</novo-simple-table>`;

/**
 * A minimal three-column table over an in-memory array. This is the recipe
 * you want for *most* simple-table use cases — declarative column defs,
 * a plain array on `[dataSource]`, no sort/filter machinery.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: { language: 'html', code: DEFAULT_SOURCE },
    },
  },
  render: () => ({
    props: { people: PEOPLE.slice(0, 4) },
    template: `
      <novo-simple-table [dataSource]="people">
        <ng-container novoSimpleColumnDef="name">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Name</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.name }}</span></novo-simple-cell>
        </ng-container>

        <ng-container novoSimpleColumnDef="role">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Role</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.role }}</span></novo-simple-cell>
        </ng-container>

        <ng-container novoSimpleColumnDef="department">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Department</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.department }}</span></novo-simple-cell>
        </ng-container>

        <novo-simple-header-row *novoSimpleHeaderRowDef="['name', 'role', 'department']"></novo-simple-header-row>
        <novo-simple-row *novoSimpleRowDef="let row; columns: ['name', 'role', 'department']"></novo-simple-row>
      </novo-simple-table>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Striped (out-of-the-box)                                                */
/* -------------------------------------------------------------------------- */

/**
 * Out-of-the-box, simple-table renders alternating row backgrounds (odd
 * rows tinted, even rows white). This is the default behavior — no
 * configuration is needed.
 */
export const Striped: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Row striping is on by default; no opt-in needed. -->
<novo-simple-table [dataSource]="people"> … </novo-simple-table>`,
      },
    },
  },
  render: () => ({
    props: { people: PEOPLE },
    template: `
      <novo-simple-table [dataSource]="people">
        <ng-container novoSimpleColumnDef="name">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Name</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.name }}</span></novo-simple-cell>
        </ng-container>
        <ng-container novoSimpleColumnDef="role">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Role</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.role }}</span></novo-simple-cell>
        </ng-container>
        <ng-container novoSimpleColumnDef="department">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Department</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.department }}</span></novo-simple-cell>
        </ng-container>

        <novo-simple-header-row *novoSimpleHeaderRowDef="['name', 'role', 'department']"></novo-simple-header-row>
        <novo-simple-row *novoSimpleRowDef="let row; columns: ['name', 'role', 'department']"></novo-simple-row>
      </novo-simple-table>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Compact density (override)                                              */
/* -------------------------------------------------------------------------- */

/**
 * The library doesn’t ship a first-class density variant; for a denser
 * layout, wrap the table in a CSS scope and override cell padding. This
 * pattern keeps the override local so it can’t leak into other tables.
 */
export const Compact: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Wrap in a scope and tighten cell padding via CSS. -->
<div class="compact-table">
  <novo-simple-table [dataSource]="people"> … </novo-simple-table>
</div>

<style>
.compact-table .novo-simple-cell,
.compact-table .novo-simple-header-cell {
  padding: 4px 8px;
  min-width: 0;
}
</style>`,
      },
    },
  },
  render: () => ({
    props: { people: PEOPLE },
    template: `
      <style>
        .sb-compact-table .novo-simple-cell,
        .sb-compact-table .novo-simple-header-cell {
          padding: 4px 8px;
          min-width: 0;
        }
        .sb-compact-table .novo-simple-cell > span {
          min-width: 0;
          max-width: none;
        }
      </style>
      <div class="sb-compact-table">
        <novo-simple-table [dataSource]="people">
          <ng-container novoSimpleColumnDef="name">
            <novo-simple-header-cell *novoSimpleHeaderCellDef>Name</novo-simple-header-cell>
            <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.name }}</span></novo-simple-cell>
          </ng-container>
          <ng-container novoSimpleColumnDef="role">
            <novo-simple-header-cell *novoSimpleHeaderCellDef>Role</novo-simple-header-cell>
            <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.role }}</span></novo-simple-cell>
          </ng-container>
          <ng-container novoSimpleColumnDef="department">
            <novo-simple-header-cell *novoSimpleHeaderCellDef>Department</novo-simple-header-cell>
            <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.department }}</span></novo-simple-cell>
          </ng-container>

          <novo-simple-header-row *novoSimpleHeaderRowDef="['name', 'role', 'department']"></novo-simple-header-row>
          <novo-simple-row *novoSimpleRowDef="let row; columns: ['name', 'role', 'department']"></novo-simple-row>
        </novo-simple-table>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Sortable columns                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Sortable columns are wired by adding `novoSortFilter` to the table host and
 * setting `[novo-simple-cell-config]="{ sortable: true }"` on each sortable
 * header. The cell-header directive renders a sort icon that toggles
 * `asc` → `desc` on click. Click the **Name** header to sort.
 *
 * Note that simple-table’s sort directive emits state changes through its
 * internal `NovoActivityTableState`; consumers wanting the post-sort data
 * shape should reach for `<novo-data-table>` or implement the reactive
 * binding themselves. The story below shows the on-screen affordance.
 */
export const Sortable: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-simple-table [dataSource]="people" novoSortFilter>
  <ng-container novoSimpleColumnDef="name">
    <novo-simple-header-cell
      *novoSimpleHeaderCellDef
      [column]="{ id: 'name', label: 'Name', renderer: r => r.name }"
      [novo-simple-cell-config]="{ sortable: true }"
    >Name</novo-simple-header-cell>
    <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.name }}</span></novo-simple-cell>
  </ng-container>
  …
</novo-simple-table>`,
      },
    },
  },
  render: () => ({
    props: {
      people: PEOPLE,
      nameColumn: { id: 'name', label: 'Name', renderer: (r: Person) => r.name, config: { sortable: true } },
      roleColumn: { id: 'role', label: 'Role', renderer: (r: Person) => r.role, config: { sortable: true } },
      deptColumn: { id: 'department', label: 'Department', renderer: (r: Person) => r.department },
      sortableCfg: { sortable: true },
      noSortCfg: { sortable: false },
    },
    template: `
      <novo-simple-table [dataSource]="people" novoSortFilter>
        <ng-container novoSimpleColumnDef="name">
          <novo-simple-header-cell
            *novoSimpleHeaderCellDef
            [column]="nameColumn"
            [novo-simple-cell-config]="sortableCfg"
            data-testid="sortable-header-name"
          >Name</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row" [column]="nameColumn" [row]="row"></novo-simple-cell>
        </ng-container>

        <ng-container novoSimpleColumnDef="role">
          <novo-simple-header-cell
            *novoSimpleHeaderCellDef
            [column]="roleColumn"
            [novo-simple-cell-config]="sortableCfg"
          >Role</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row" [column]="roleColumn" [row]="row"></novo-simple-cell>
        </ng-container>

        <ng-container novoSimpleColumnDef="department">
          <novo-simple-header-cell
            *novoSimpleHeaderCellDef
            [column]="deptColumn"
            [novo-simple-cell-config]="noSortCfg"
          >Department</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row" [column]="deptColumn" [row]="row"></novo-simple-cell>
        </ng-container>

        <novo-simple-header-row *novoSimpleHeaderRowDef="['name', 'role', 'department']"></novo-simple-header-row>
        <novo-simple-row *novoSimpleRowDef="let row; columns: ['name', 'role', 'department']"></novo-simple-row>
      </novo-simple-table>
    `,
  }),
  /**
   * Click the Name column header and assert the sort icon flips to its
   * active "sort-asc" state. The cell-header debounces the click by 300ms
   * before mutating state, so we `waitFor` the icon change.
   */
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = await canvas.findByTestId('sortable-header-name');
    // The sort `<novo-button>` host renders an inner `<novo-icon>` with
    // `pointer-events: none` (so the icon doesn't swallow clicks). That
    // makes testing-library's pointer-interaction guard refuse the click
    // because the hit-test resolves to the icon. Use the host's native
    // `.click()` to fire the host-attached listener directly.
    const sortButton = within(header).getAllByRole('button')[0] as HTMLElement;
    sortButton.click();
    // Sort state changes are debounced ~300ms inside NovoSimpleCellHeader.
    await waitFor(
      async () => {
        const icon = header.querySelector('[data-automation-id="novo-activity-table-sort"] i, [data-automation-id="novo-activity-table-sort"]');
        expect(icon).toBeTruthy();
        // The active sort flips the icon class from "bhi-sortable" to "bhi-sort-asc".
        const html = header.outerHTML;
        expect(html).toMatch(/sort-asc|sort-desc/);
      },
      { timeout: 1500 },
    );
  },
};

/* -------------------------------------------------------------------------- */
/* 6. Custom cell renderers                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Cells are just templates — use whatever markup you like inside
 * `*novoSimpleCellDef`. This is the main reason to choose simple-table over
 * data-table: full control over the cell renderer without column-config
 * gymnastics.
 */
export const CustomCells: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<ng-container novoSimpleColumnDef="salary">
  <novo-simple-header-cell *novoSimpleHeaderCellDef>Salary</novo-simple-header-cell>
  <novo-simple-cell *novoSimpleCellDef="let row">
    <span>{{ row.salary | currency:'USD':'symbol':'1.0-0' }}</span>
  </novo-simple-cell>
</ng-container>

<ng-container novoSimpleColumnDef="startDate">
  <novo-simple-header-cell *novoSimpleHeaderCellDef>Started</novo-simple-header-cell>
  <novo-simple-cell *novoSimpleCellDef="let row">
    <span>{{ row.startDate | date:'mediumDate' }}</span>
  </novo-simple-cell>
</ng-container>`,
      },
    },
  },
  render: () => ({
    props: { people: PEOPLE },
    template: `
      <novo-simple-table [dataSource]="people">
        <ng-container novoSimpleColumnDef="name">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Name</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row">
            <span style="font-weight: 600;">{{ row.name }}</span>
          </novo-simple-cell>
        </ng-container>

        <ng-container novoSimpleColumnDef="department">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Department</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row">
            <span style="
              display: inline-block;
              padding: 2px 8px;
              border-radius: 10px;
              background: #e8eef5;
              color: #2d3137;
              font-size: 0.85em;
            ">{{ row.department }}</span>
          </novo-simple-cell>
        </ng-container>

        <ng-container novoSimpleColumnDef="salary">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Salary</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row">
            <span>{{ row.salary | currency:'USD':'symbol':'1.0-0' }}</span>
          </novo-simple-cell>
        </ng-container>

        <ng-container novoSimpleColumnDef="startDate">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Started</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row">
            <span>{{ row.startDate | date:'mediumDate' }}</span>
          </novo-simple-cell>
        </ng-container>

        <novo-simple-header-row *novoSimpleHeaderRowDef="['name', 'department', 'salary', 'startDate']"></novo-simple-header-row>
        <novo-simple-row *novoSimpleRowDef="let row; columns: ['name', 'department', 'salary', 'startDate']"></novo-simple-row>
      </novo-simple-table>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Expandable rows (composition)                                           */
/* -------------------------------------------------------------------------- */

/**
 * simple-table doesn’t ship an expandable-row primitive — if you need first-
 * class detail rows, reach for `<novo-data-table>`. For lightweight expand-on-
 * click behavior inside a content layout, compose it yourself: render an
 * `expand`/`collapse` icon in a cell template and conditionally show detail
 * markup below the row. The example below uses an inline expanded panel
 * inside the cell so it stays within the table’s natural row structure.
 */
export const ExpandableRows: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- The "expanded" set is owned by the host component. -->
<novo-simple-table [dataSource]="people">
  <ng-container novoSimpleColumnDef="expand">
    <novo-simple-header-cell *novoSimpleHeaderCellDef></novo-simple-header-cell>
    <novo-simple-cell *novoSimpleCellDef="let row">
      <novo-button theme="icon"
        [icon]="expanded.has(row.id) ? 'collapse' : 'expand'"
        (click)="toggle(row.id)"
        [attr.aria-label]="(expanded.has(row.id) ? 'Collapse' : 'Expand') + ' ' + row.name">
      </novo-button>
    </novo-simple-cell>
  </ng-container>
  …
</novo-simple-table>`,
      },
    },
  },
  render: () => {
    const expanded = new Set<number>([2]);
    return {
      props: {
        people: PEOPLE.slice(0, 4),
        expanded,
        toggle(id: number) {
          if (expanded.has(id)) {
            expanded.delete(id);
          } else {
            expanded.add(id);
          }
        },
        isExpanded(id: number) {
          return expanded.has(id);
        },
      },
      template: `
        <novo-simple-table [dataSource]="people">
          <ng-container novoSimpleColumnDef="expand">
            <novo-simple-header-cell *novoSimpleHeaderCellDef><span></span></novo-simple-header-cell>
            <novo-simple-cell *novoSimpleCellDef="let row" style="flex: 0 0 56px; min-width: 56px;">
              <novo-button
                theme="icon"
                [icon]="isExpanded(row.id) ? 'collapse' : 'expand'"
                (click)="toggle(row.id)"
                [attr.aria-label]="(isExpanded(row.id) ? 'Collapse ' : 'Expand ') + row.name"
              ></novo-button>
            </novo-simple-cell>
          </ng-container>

          <ng-container novoSimpleColumnDef="name">
            <novo-simple-header-cell *novoSimpleHeaderCellDef>Name</novo-simple-header-cell>
            <novo-simple-cell *novoSimpleCellDef="let row">
              <span style="font-weight: 600;">{{ row.name }}</span>
              <div *ngIf="isExpanded(row.id)" style="
                margin-top: 6px;
                padding: 8px 10px;
                background: #f6f8fa;
                border-left: 3px solid #2c6bed;
                font-size: 0.9em;
                color: #545b66;
                max-width: 480px;
              ">
                <div><strong>Role:</strong> {{ row.role }}</div>
                <div><strong>Department:</strong> {{ row.department }}</div>
                <div><strong>Started:</strong> {{ row.startDate }}</div>
              </div>
            </novo-simple-cell>
          </ng-container>

          <ng-container novoSimpleColumnDef="role">
            <novo-simple-header-cell *novoSimpleHeaderCellDef>Role</novo-simple-header-cell>
            <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.role }}</span></novo-simple-cell>
          </ng-container>

          <novo-simple-header-row *novoSimpleHeaderRowDef="['expand', 'name', 'role']"></novo-simple-header-row>
          <novo-simple-row *novoSimpleRowDef="let row; columns: ['expand', 'name', 'role']"></novo-simple-row>
        </novo-simple-table>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 8. Footer summary                                                          */
/* -------------------------------------------------------------------------- */

/**
 * A footer row is declared by adding a `*cdkFooterCellDef` template inside
 * each column-def and a `*cdkFooterRowDef` on the table. simple-table inherits
 * footer support from CDK — the Bullhorn-styled cells are body/header-only,
 * so the footer uses CDK’s `<cdk-footer-cell>` and `<cdk-footer-row>`
 * directly.
 */
export const WithFooter: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<ng-container novoSimpleColumnDef="salary">
  <novo-simple-header-cell *novoSimpleHeaderCellDef>Salary</novo-simple-header-cell>
  <novo-simple-cell *novoSimpleCellDef="let row">
    <span>{{ row.salary | currency:'USD':'symbol':'1.0-0' }}</span>
  </novo-simple-cell>
  <cdk-footer-cell *cdkFooterCellDef>
    <strong>{{ total | currency:'USD':'symbol':'1.0-0' }}</strong>
  </cdk-footer-cell>
</ng-container>

<cdk-footer-row *cdkFooterRowDef="['label', 'salary']"></cdk-footer-row>`,
      },
    },
  },
  render: () => ({
    props: {
      people: PEOPLE,
      total: PEOPLE.reduce((sum, p) => sum + p.salary, 0),
    },
    template: `
      <style>
        .sb-footer-table cdk-footer-row {
          display: flex;
          flex-direction: row;
          font-weight: 600;
          border-top: 2px solid #d3d8dd;
        }
        .sb-footer-table cdk-footer-cell {
          flex: 1;
          padding: 10px;
        }
      </style>
      <div class="sb-footer-table">
        <novo-simple-table [dataSource]="people">
          <ng-container novoSimpleColumnDef="name">
            <novo-simple-header-cell *novoSimpleHeaderCellDef>Name</novo-simple-header-cell>
            <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.name }}</span></novo-simple-cell>
            <cdk-footer-cell *cdkFooterCellDef><strong>Total</strong></cdk-footer-cell>
          </ng-container>

          <ng-container novoSimpleColumnDef="role">
            <novo-simple-header-cell *novoSimpleHeaderCellDef>Role</novo-simple-header-cell>
            <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.role }}</span></novo-simple-cell>
            <cdk-footer-cell *cdkFooterCellDef></cdk-footer-cell>
          </ng-container>

          <ng-container novoSimpleColumnDef="salary">
            <novo-simple-header-cell *novoSimpleHeaderCellDef>Salary</novo-simple-header-cell>
            <novo-simple-cell *novoSimpleCellDef="let row">
              <span>{{ row.salary | currency:'USD':'symbol':'1.0-0' }}</span>
            </novo-simple-cell>
            <cdk-footer-cell *cdkFooterCellDef>
              <strong>{{ total | currency:'USD':'symbol':'1.0-0' }}</strong>
            </cdk-footer-cell>
          </ng-container>

          <novo-simple-header-row *novoSimpleHeaderRowDef="['name', 'role', 'salary']"></novo-simple-header-row>
          <novo-simple-row *novoSimpleRowDef="let row; columns: ['name', 'role', 'salary']"></novo-simple-row>
          <cdk-footer-row *cdkFooterRowDef="['name', 'role', 'salary']"></cdk-footer-row>
        </novo-simple-table>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. Empty state                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Pass an empty array to `[dataSource]`. simple-table itself doesn’t render an
 * empty-state message — author one yourself next to the table. (The
 * `<novo-activity-table>` wrapper does ship one, but that wrapper is
 * deprecated; do not build new code against it.)
 */
export const EmptyState: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<ng-container *ngIf="people.length; else emptyState">
  <novo-simple-table [dataSource]="people"> … </novo-simple-table>
</ng-container>
<ng-template #emptyState>
  <div role="status" class="empty-state">No records to display.</div>
</ng-template>`,
      },
    },
  },
  render: () => ({
    props: { people: [] as Person[] },
    template: `
      <div *ngIf="people.length === 0; else withRows" role="status" style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 32px 16px;
        background: #f6f8fa;
        border: 1px dashed #c1c7cd;
        border-radius: 6px;
        color: #545b66;
      ">
        <i class="bhi-search-question" style="font-size: 1.5rem;"></i>
        <strong>No records to display</strong>
        <span style="font-size: 0.9em;">Try widening the filter, or add a new record to get started.</span>
      </div>
      <ng-template #withRows>
        <novo-simple-table [dataSource]="people">
          <ng-container novoSimpleColumnDef="name">
            <novo-simple-header-cell *novoSimpleHeaderCellDef>Name</novo-simple-header-cell>
            <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.name }}</span></novo-simple-cell>
          </ng-container>
          <novo-simple-header-row *novoSimpleHeaderRowDef="['name']"></novo-simple-header-row>
          <novo-simple-row *novoSimpleRowDef="let row; columns: ['name']"></novo-simple-row>
        </novo-simple-table>
      </ng-template>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 10. Playground                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Toggle which columns are visible and the row count. Useful for
 * sanity-checking column ordering and how the table behaves with different
 * row densities.
 */
export const Playground: StoryObj<{ rowCount: number; columns: string[] }> = {
  name: '🎮 Playground',
  argTypes: {
    rowCount: {
      control: { type: 'range', min: 0, max: 6, step: 1 },
      description: 'How many rows from the sample dataset to render.',
    },
    columns: {
      control: 'check',
      options: ['name', 'role', 'department', 'salary', 'startDate'],
      description: 'Which columns to display, in the order checked.',
    },
  },
  args: {
    rowCount: 4,
    columns: ['name', 'role', 'department', 'salary'],
  },
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoSimpleTableModule } from 'novo-elements';

@Component({
  selector: 'my-simple-table',
  imports: [NovoSimpleTableModule],
  templateUrl: './my-simple-table.component.html',
})
export class MySimpleTableComponent {
  people = [/* … */];
  displayedColumns = ['name', 'role', 'department', 'salary'];
}

// component.html
<novo-simple-table [dataSource]="people">
  <ng-container novoSimpleColumnDef="name">
    <novo-simple-header-cell *novoSimpleHeaderCellDef>Name</novo-simple-header-cell>
    <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.name }}</span></novo-simple-cell>
  </ng-container>
  <!-- … other columns … -->

  <novo-simple-header-row *novoSimpleHeaderRowDef="displayedColumns"></novo-simple-header-row>
  <novo-simple-row *novoSimpleRowDef="let row; columns: displayedColumns"></novo-simple-row>
</novo-simple-table>`,
      },
    },
  },
  render: (args) => ({
    props: {
      people: PEOPLE.slice(0, args.rowCount),
      displayedColumns: args.columns?.length ? args.columns : ['name'],
    },
    template: `
      <novo-simple-table [dataSource]="people">
        <ng-container novoSimpleColumnDef="name">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Name</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.name }}</span></novo-simple-cell>
        </ng-container>

        <ng-container novoSimpleColumnDef="role">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Role</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.role }}</span></novo-simple-cell>
        </ng-container>

        <ng-container novoSimpleColumnDef="department">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Department</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row"><span>{{ row.department }}</span></novo-simple-cell>
        </ng-container>

        <ng-container novoSimpleColumnDef="salary">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Salary</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row">
            <span>{{ row.salary | currency:'USD':'symbol':'1.0-0' }}</span>
          </novo-simple-cell>
        </ng-container>

        <ng-container novoSimpleColumnDef="startDate">
          <novo-simple-header-cell *novoSimpleHeaderCellDef>Started</novo-simple-header-cell>
          <novo-simple-cell *novoSimpleCellDef="let row">
            <span>{{ row.startDate | date:'mediumDate' }}</span>
          </novo-simple-cell>
        </ng-container>

        <novo-simple-header-row *novoSimpleHeaderRowDef="displayedColumns"></novo-simple-header-row>
        <novo-simple-row *novoSimpleRowDef="let row; columns: displayedColumns"></novo-simple-row>
      </novo-simple-table>
    `,
  }),
};
