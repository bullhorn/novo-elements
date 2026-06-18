import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, UntypedFormBuilder } from '@angular/forms';
import { userEvent, waitFor, expect, within } from 'storybook/test';

import { NovoQueryBuilderModule } from './query-builder.module';
import { CriteriaBuilderComponent } from './criteria-builder/criteria-builder.component';
import { Conjunction } from './query-builder.types';
import type { BaseFieldDef } from './query-builder.types';

/**
 * Stories for `<novo-criteria-builder>` — the visual condition / filter
 * builder exported by `NovoQueryBuilderModule`. Conventions are documented
 * in `projects/novo-elements/src/elements/button/button.stories.ts`.
 *
 * Scope note (Tier 4): the query-builder is hierarchical — a criteria-builder
 * hosts one or more **condition groups** (joined by `AND` / `OR` / `NOT`)
 * and each group hosts a list of **conditions** (leaf rows: field, operator,
 * value). Each condition's render is driven by the field's type via the
 * `editTypeFn` and a registered condition definition (`STRING`, `INTEGER`,
 * `DATE`, `BOOLEAN`, `SELECT`, `ID`, `ADDRESS`, …). These stories cover the
 * default field-type set; consumers wanting custom field types extend
 * `AbstractConditionFieldDef` and content-project the definition.
 */

/* -------------------------------------------------------------------------- */
/* Shared mock dataset                                                        */
/*                                                                            */
/* The criteria-builder is configuration-driven — it needs a `config` object  */
/* whose `fields` array describes scopes (entities) and the fields available  */
/* inside each scope. The shape mirrors what consumers typically derive from  */
/* a backend meta-model.                                                      */
/* -------------------------------------------------------------------------- */

const CANDIDATE_FIELDS: BaseFieldDef[] = [
  { name: 'id', type: 'ID', dataType: 'Integer', label: 'ID' },
  { name: 'firstName', type: 'SCALAR', dataType: 'String', label: 'First Name' },
  { name: 'lastName', type: 'SCALAR', dataType: 'String', label: 'Last Name' },
  { name: 'email', type: 'SCALAR', dataType: 'String', label: 'Email', inputType: 'STRING' },
  { name: 'yearsExperience', type: 'SCALAR', dataType: 'Integer', label: 'Years of Experience' },
  { name: 'salary', type: 'SCALAR', dataType: 'BigDecimal', label: 'Desired Salary' },
  { name: 'isActive', type: 'SCALAR', dataType: 'Boolean', label: 'Active' },
  { name: 'dateAvailable', type: 'SCALAR', dataType: 'Date', label: 'Date Available' },
  {
    name: 'status',
    type: 'SCALAR',
    dataType: 'String',
    inputType: 'SELECT',
    label: 'Status',
    options: [
      { value: 'new', label: 'New Lead' },
      { value: 'active', label: 'Active' },
      { value: 'placed', label: 'Placed' },
      { value: 'archived', label: 'Archived' },
    ],
  },
];

/** Builds a `FieldConfig` (the scope-shaped wrapper expected by `[config]`). */
function buildScope(value: string, label: string, fields: BaseFieldDef[]) {
  return {
    value,
    label,
    entity: value,
    options: fields,
    find: (name: string) => fields.find((f) => f.name === name),
    search: (term: string) =>
      fields.filter(
        (f) =>
          f.name.toLowerCase().includes(term.toLowerCase()) ||
          (f.label ?? '').toLowerCase().includes(term.toLowerCase()),
      ),
  };
}

/** Default editTypeFn — what most consumers write. Returns a string key that */
/* the criteria-builder uppercases and looks up against registered field    */
/* definitions (`STRING`, `INTEGER`, `BOOLEAN`, …).                          */
const editTypeFn = (field: BaseFieldDef) =>
  (field.inputType || field.dataType || field.type).toLowerCase();

/* -------------------------------------------------------------------------- */
/* Wrapper component                                                          */
/*                                                                            */
/* `<novo-criteria-builder>` requires a parent `ControlContainer` (it lives   */
/* inside a `[formGroup]`). Each story wraps the builder in a tiny host       */
/* component that owns the form group and seeds it with an initial criteria  */
/* tree, so stories can declaratively assert the rendered shape.              */
/* -------------------------------------------------------------------------- */

@Component({
  selector: 'sb-criteria-builder-host',
  standalone: false,
  template: `
    <form [formGroup]="queryForm" data-automation-id="criteria-builder-form">
      <novo-criteria-builder
        #builder
        controlName="criteria"
        [config]="config"
        [editTypeFn]="editTypeFn"
        [allowedGroupings]="allowedGroupings"
        [hideFirstOperator]="hideFirstOperator"
        [canBeEmpty]="canBeEmpty"
        data-automation-id="criteria-builder"
      ></novo-criteria-builder>

      <div
        *ngIf="showOutput"
        style="
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          background: #f6f8fa;
          border-radius: 4px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.8rem;
          color: #2d3137;
          white-space: pre-wrap;
        "
      >
        <strong style="display: block; margin-bottom: 0.25rem;">queryForm.value</strong>
        {{ queryForm.value | json }}
      </div>
    </form>
  `,
})
class CriteriaBuilderHostComponent implements OnInit {
  @Input() config: any = null;
  @Input() initialCriteria: any[] = [];
  @Input() allowedGroupings: Conjunction[] = [Conjunction.AND, Conjunction.OR, Conjunction.NOT];
  @Input() hideFirstOperator = true;
  @Input() canBeEmpty = false;
  @Input() showOutput = true;
  @Input() editTypeFn = editTypeFn;

  queryForm!: AbstractControl;

  constructor(private fb: UntypedFormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.queryForm = this.fb.group({ criteria: [this.initialCriteria] });
    // Force a tick so condition-builder picks up the seeded form value
    // before its content-children pass — without this, the seeded
    // operator/value can lose their bindings on first render.
    Promise.resolve().then(() => this.cdr.detectChanges());
  }
}

/* -------------------------------------------------------------------------- */
/* Story-source recipe (shared)                                               */
/* -------------------------------------------------------------------------- */

const RECIPE_SOURCE = `// component.ts
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, AbstractControl } from '@angular/forms';
import { Conjunction } from 'novo-elements';

@Component({ /* ... */ })
export class CandidateFilterComponent implements OnInit {
  queryForm!: AbstractControl;

  // Each scope wraps a list of field definitions. \`find\` and \`search\`
  // are the only required functions — the builder calls them to resolve
  // a field by name and to power the field-picker autocomplete.
  config = {
    fields: [{
      value: 'Candidate',
      label: 'Candidate',
      entity: 'Candidate',
      options: CANDIDATE_FIELDS,
      find: (name: string) => CANDIDATE_FIELDS.find(f => f.name === name),
      search: (term: string) =>
        CANDIDATE_FIELDS.filter(f =>
          f.name.toLowerCase().includes(term.toLowerCase())),
    }],
  };

  editTypeFn = (field) =>
    (field.inputType || field.dataType || field.type).toLowerCase();

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.queryForm = this.fb.group({
      criteria: [[
        {
          $and: [
            { field: 'status', operator: 'includeAny',
              scope: 'Candidate', entity: 'Candidate',
              value: ['active'] },
            { field: 'yearsExperience', operator: 'greaterThan',
              scope: 'Candidate', entity: 'Candidate',
              value: 3 },
          ],
        },
      ]],
    });
  }
}

// component.html
<form [formGroup]="queryForm">
  <novo-criteria-builder
    controlName="criteria"
    [config]="config"
    [editTypeFn]="editTypeFn"
    [allowedGroupings]="[Conjunction.AND, Conjunction.OR]">
  </novo-criteria-builder>
</form>`;

/* -------------------------------------------------------------------------- */
/* Meta                                                                       */
/* -------------------------------------------------------------------------- */

const meta: Meta<CriteriaBuilderComponent> = {
  title: 'Data/Query Builder',
  component: CriteriaBuilderComponent,
  decorators: [
    moduleMetadata({
      imports: [NovoQueryBuilderModule],
      declarations: [CriteriaBuilderHostComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`<novo-criteria-builder>` is a hierarchical filter/condition builder. ' +
          'Conditions (field + operator + value rows) are grouped under a conjunction ' +
          '(`$and` / `$or` / `$not`); groups are themselves joined by a conjunction. ' +
          'Each condition\'s value editor is selected by the field\'s type — strings get a ' +
          'text input, dates get a date picker, picker fields get a select, etc. The ' +
          'builder writes its tree back to a `FormControl` named via `[controlName]`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<CriteriaBuilderComponent>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                              */
/* -------------------------------------------------------------------------- */

/**
 * When to reach for `<novo-criteria-builder>` vs. simpler filter UIs, the
 * shape of the configuration object, and the moving parts that turn a field
 * definition into a rendered condition row.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a criteria builder</h2>
        <p style="margin: 0 0 1.25rem;">
          Reach for <code>&lt;novo-criteria-builder&gt;</code> when users need
          to compose <strong>boolean queries</strong> over a known schema —
          candidate filters, advanced search, saved-search definitions. Each
          row is a typed condition (field, operator, value); rows compose into
          AND / OR / NOT groups; groups compose into a tree.
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
              ✓ Use a criteria builder when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Users need to build multi-condition queries against a known schema</li>
              <li>Conditions span heterogeneous types (string, number, date, picker, address)</li>
              <li>You want AND / OR / NOT composition over the user's rows</li>
              <li>The query gets saved and replayed (e.g. saved searches)</li>
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
              <li>You only need a free-text search box — use <code>&lt;novo-search-box&gt;</code></li>
              <li>You only need one filter row — use <code>&lt;novo-condition-builder&gt;</code> directly</li>
              <li>The query is a fixed set of toggles — use <code>&lt;novo-form&gt;</code> + control configs</li>
              <li>You need to display query results — pair this with <code>&lt;novo-data-table&gt;</code></li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <ol style="margin: 0 0 1.5rem; padding-left: 1.25rem;">
          <li>
            <strong>Field configuration</strong> — a <code>QueryBuilderConfig</code>
            with one or more <em>scopes</em>. Each scope carries a list of
            <code>BaseFieldDef</code> field definitions plus <code>find(name)</code>
            and <code>search(term)</code> helpers the builder calls to resolve
            and filter fields.
          </li>
          <li>
            <strong><code>editTypeFn</code></strong> — maps a field definition
            to a registered condition-definition key (<code>STRING</code>,
            <code>INTEGER</code>, <code>BOOLEAN</code>, <code>DATE</code>,
            <code>TIMESTAMP</code>, <code>SELECT</code>, <code>ID</code>,
            <code>ADDRESS</code>). The default uses
            <code>field.inputType || field.dataType || field.type</code>.
          </li>
          <li>
            <strong><code>&lt;novo-criteria-builder&gt;</code></strong> — owns
            the top-level group list. Renders <code>&lt;novo-condition-group&gt;</code>
            children, each of which is a conjunction (<code>$and</code> /
            <code>$or</code> / <code>$not</code>) over a list of conditions.
          </li>
          <li>
            <strong><code>&lt;novo-condition-group&gt;</code></strong> — a
            conjunction container. Holds a list of condition rows plus the
            "Add condition" button and the conjunction-selector dropdown.
          </li>
          <li>
            <strong><code>&lt;novo-condition-builder&gt;</code></strong> — a
            single row: field picker + operator picker + value input. Picks
            its operator/value templates from the registered condition def
            for the field's type.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Output shape</h2>
        <p style="margin: 0 0 0.5rem;">
          The builder writes a list of condition groups to the named control.
          Each group is a single-key object whose key is the conjunction
          (<code>$and</code>, <code>$or</code>, <code>$not</code>) and whose
          value is the list of conditions:
        </p>
        <pre style="
          margin: 0 0 1.5rem;
          padding: 0.75rem 1rem;
          background: #f6f8fa;
          border-radius: 4px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.85rem;
          color: #2d3137;
          overflow-x: auto;
        ">{{ '{' }}
  criteria: [
    {{ '{' }} $and: [
      {{ '{' }} field: 'status',   operator: 'includeAny',  scope: 'Candidate', value: ['active'] {{ '}' }},
      {{ '{' }} field: 'yearsExperience', operator: 'greaterThan', scope: 'Candidate', value: 3 {{ '}' }}
    ] {{ '}' }}
  ]
{{ '}' }}</pre>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            Each condition row is a labelled set of form controls — field
            picker, operator picker, value input. Each value editor inherits
            the accessibility characteristics of the underlying novo-elements
            control (text input, date picker, select, …).
          </li>
          <li>
            The "Add condition" button uses an icon-prefixed label so screen
            readers announce its action.
          </li>
          <li>
            Delete buttons are icon-only — they carry an <code>aria-label</code>
            via the underlying <code>&lt;novo-button theme="icon"&gt;</code>.
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
 * A small canonical recipe: one group with two conditions joined by AND. The
 * first condition uses a `SELECT` operator on a picker field; the second uses
 * a numeric `greaterThan` comparison. The form's value is rendered below the
 * builder so you can see the round-tripped tree.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: { language: 'typescript', code: RECIPE_SOURCE },
    },
  },
  render: () => ({
    props: {
      config: { fields: [buildScope('Candidate', 'Candidate', CANDIDATE_FIELDS)] },
      initialCriteria: [
        {
          $and: [
            {
              field: 'status',
              operator: 'includeAny',
              scope: 'Candidate',
              entity: 'Candidate',
              value: ['active'],
            },
            {
              field: 'yearsExperience',
              operator: 'greaterThan',
              scope: 'Candidate',
              entity: 'Candidate',
              value: 3,
            },
          ],
        },
      ],
    },
    template: `
      <sb-criteria-builder-host
        [config]="config"
        [initialCriteria]="initialCriteria">
      </sb-criteria-builder-host>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. AndOrComposition                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Multiple condition groups joined by different conjunctions. The first
 * group is an `$and`; the second is an `$or`. The dropdown on each row
 * (after the first) lets the user flip the conjunction.
 *
 * Set `[allowedGroupings]` to restrict the available conjunctions —
 * `[AND, OR]` is a common pick for read/write filter UIs where NOT would
 * surprise users.
 */
export const AndOrComposition: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Two groups joined by an AND/OR mix; NOT excluded. -->
<novo-criteria-builder
  controlName="criteria"
  [config]="config"
  [editTypeFn]="editTypeFn"
  [allowedGroupings]="[Conjunction.AND, Conjunction.OR]"
  [hideFirstOperator]="false">
</novo-criteria-builder>`,
      },
    },
  },
  render: () => ({
    props: {
      config: { fields: [buildScope('Candidate', 'Candidate', CANDIDATE_FIELDS)] },
      initialCriteria: [
        {
          $and: [
            {
              field: 'firstName',
              operator: 'startsWith',
              scope: 'Candidate',
              entity: 'Candidate',
              value: 'A',
            },
            {
              field: 'lastName',
              operator: 'startsWith',
              scope: 'Candidate',
              entity: 'Candidate',
              value: 'B',
            },
          ],
        },
        {
          $or: [
            {
              field: 'status',
              operator: 'includeAny',
              scope: 'Candidate',
              entity: 'Candidate',
              value: ['active'],
            },
            {
              field: 'status',
              operator: 'includeAny',
              scope: 'Candidate',
              entity: 'Candidate',
              value: ['placed'],
            },
          ],
        },
      ],
      allowedGroupings: [Conjunction.AND, Conjunction.OR],
    },
    template: `
      <sb-criteria-builder-host
        [config]="config"
        [initialCriteria]="initialCriteria"
        [allowedGroupings]="allowedGroupings"
        [hideFirstOperator]="false">
      </sb-criteria-builder-host>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. MixedFieldTypes                                                         */
/* -------------------------------------------------------------------------- */

/**
 * The same group hosting conditions on every supported field type — string,
 * integer, decimal, boolean, date, picker. Each row demonstrates how the
 * value editor swaps based on the field's resolved condition definition.
 */
export const MixedFieldTypes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- editTypeFn maps each field to a registered condition def: -->
<!--   String -> STRING,  Integer/BigDecimal -> INTEGER/BIGDECIMAL, -->
<!--   Boolean -> BOOLEAN, Date -> DATE, options[] -> SELECT.       -->
<novo-criteria-builder
  controlName="criteria"
  [config]="config"
  [editTypeFn]="editTypeFn">
</novo-criteria-builder>`,
      },
    },
  },
  render: () => ({
    props: {
      config: { fields: [buildScope('Candidate', 'Candidate', CANDIDATE_FIELDS)] },
      initialCriteria: [
        {
          $and: [
            {
              field: 'firstName',
              operator: 'startsWith',
              scope: 'Candidate',
              entity: 'Candidate',
              value: 'Jor',
            },
            {
              field: 'yearsExperience',
              operator: 'greaterThan',
              scope: 'Candidate',
              entity: 'Candidate',
              value: 5,
            },
            {
              field: 'salary',
              operator: 'lessThan',
              scope: 'Candidate',
              entity: 'Candidate',
              value: 120000,
            },
            {
              field: 'isActive',
              operator: 'equalTo',
              scope: 'Candidate',
              entity: 'Candidate',
              value: true,
            },
            {
              field: 'dateAvailable',
              operator: 'within',
              scope: 'Candidate',
              entity: 'Candidate',
              value: '-30',
            },
            {
              field: 'status',
              operator: 'includeAny',
              scope: 'Candidate',
              entity: 'Candidate',
              value: ['active', 'placed'],
            },
          ],
        },
      ],
    },
    template: `
      <sb-criteria-builder-host
        [config]="config"
        [initialCriteria]="initialCriteria">
      </sb-criteria-builder-host>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. NestedScopes                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Configure multiple scopes (entities) and the builder switches to a
 * "Add condition" tabbed-group-picker — each tab is a scope, each row inside
 * a tab is a field. Conditions added under different scopes land in
 * separate groups in the output tree.
 */
export const NestedScopes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Two scopes means the criteria-builder renders a tabbed-group  -->
<!-- picker for the Add Condition button. Each scope produces its own group. -->
<novo-criteria-builder
  controlName="criteria"
  [config]="multiScopeConfig"
  [editTypeFn]="editTypeFn">
</novo-criteria-builder>`,
      },
    },
  },
  render: () => ({
    props: {
      config: {
        fields: [
          buildScope('Candidate', 'Candidate', CANDIDATE_FIELDS),
          buildScope('Note', 'Note', [
            {
              name: 'notes.action',
              type: 'SCALAR',
              dataType: 'String',
              inputType: 'SELECT',
              label: 'Action',
              options: [
                { value: 'call', label: 'Phone Call' },
                { value: 'message', label: 'Left Message' },
                { value: 'meeting', label: 'Meeting' },
              ],
            },
            { name: 'notes.dateAdded', type: 'SCALAR', dataType: 'Date', label: 'Date Added' },
          ]),
        ],
      },
      initialCriteria: [
        {
          $and: [
            {
              field: 'status',
              operator: 'includeAny',
              scope: 'Candidate',
              entity: 'Candidate',
              value: ['active'],
            },
          ],
        },
        {
          $not: [
            {
              field: 'notes.action',
              operator: 'includeAny',
              scope: 'Note',
              entity: 'Note',
              value: ['message'],
            },
            {
              field: 'notes.dateAdded',
              operator: 'within',
              scope: 'Note',
              entity: 'Note',
              value: '-7',
            },
          ],
        },
      ],
    },
    template: `
      <sb-criteria-builder-host
        [config]="config"
        [initialCriteria]="initialCriteria">
      </sb-criteria-builder-host>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. RestrictedGroupings                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Restrict the allowed conjunctions to `AND` only. The conjunction-selector
 * dropdown is collapsed into a static label, so users can't change the
 * grouping — useful when the back-end query language only supports
 * conjunction-of-conditions semantics.
 */
export const RestrictedGroupings: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- AND-only mode collapses the dropdown to a static label. -->
<novo-criteria-builder
  controlName="criteria"
  [config]="config"
  [editTypeFn]="editTypeFn"
  [allowedGroupings]="[Conjunction.AND]">
</novo-criteria-builder>`,
      },
    },
  },
  render: () => ({
    props: {
      config: { fields: [buildScope('Candidate', 'Candidate', CANDIDATE_FIELDS)] },
      initialCriteria: [
        {
          $and: [
            {
              field: 'firstName',
              operator: 'startsWith',
              scope: 'Candidate',
              entity: 'Candidate',
              value: 'A',
            },
            {
              field: 'yearsExperience',
              operator: 'greaterThan',
              scope: 'Candidate',
              entity: 'Candidate',
              value: 1,
            },
          ],
        },
      ],
      allowedGroupings: [Conjunction.AND],
    },
    template: `
      <sb-criteria-builder-host
        [config]="config"
        [initialCriteria]="initialCriteria"
        [allowedGroupings]="allowedGroupings"
        [hideFirstOperator]="false">
      </sb-criteria-builder-host>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. EmptyState                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Initial empty form. The criteria-builder seeds an empty condition row so
 * the user always has somewhere to add a field — set `[canBeEmpty]="true"`
 * to allow the user to delete the final row entirely.
 */
export const EmptyState: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- canBeEmpty=true lets the user remove the final row. -->
<novo-criteria-builder
  controlName="criteria"
  [config]="config"
  [editTypeFn]="editTypeFn"
  [canBeEmpty]="true">
</novo-criteria-builder>`,
      },
    },
  },
  render: () => ({
    props: {
      config: { fields: [buildScope('Candidate', 'Candidate', CANDIDATE_FIELDS)] },
      initialCriteria: [],
    },
    template: `
      <sb-criteria-builder-host
        [config]="config"
        [initialCriteria]="initialCriteria"
        [canBeEmpty]="true">
      </sb-criteria-builder-host>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. AddConditionInteraction                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Drives the "Add condition" button to verify that clicking it appends a new
 * empty row to the active group. Asserts the row count increases.
 *
 * Notes on the play function:
 *  - The criteria-builder's "Add condition" button carries
 *    `data-automation-id="add-advanced-search-condition"`. Click it via
 *    that attribute — the visible label varies by locale.
 *  - Each condition row gets its own `<novo-condition-builder>` host; the
 *    row count equals the number of those elements.
 *  - Condition rendering involves several deferred passes (form-array
 *    push, content-child wiring, embedded view creation for operator /
 *    input templates), so wait with `findByRole`-style polling rather
 *    than expecting the row immediately.
 */
export const AddConditionInteraction: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Click the "Add condition" button to append a new row. -->
<novo-criteria-builder
  controlName="criteria"
  [config]="config"
  [editTypeFn]="editTypeFn">
</novo-criteria-builder>`,
      },
    },
  },
  render: () => ({
    props: {
      config: { fields: [buildScope('Candidate', 'Candidate', CANDIDATE_FIELDS)] },
      initialCriteria: [
        {
          $and: [
            {
              field: 'firstName',
              operator: 'startsWith',
              scope: 'Candidate',
              entity: 'Candidate',
              value: 'A',
            },
          ],
        },
      ],
      showOutput: false,
    },
    template: `
      <sb-criteria-builder-host
        [config]="config"
        [initialCriteria]="initialCriteria"
        [showOutput]="showOutput">
      </sb-criteria-builder-host>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    // Wait for the criteria-builder to render the seeded row before
    // attempting any interaction. Several Promise-microtask hops happen
    // during init.
    await step('Wait for the initial condition row to render', async () => {
      await waitFor(async () => {
        const rows = canvasElement.querySelectorAll('novo-condition-builder');
        await expect(rows.length).toBe(1);
      });
    });

    await step('Click the Add Condition button', async () => {
      const addBtn = canvasElement.querySelector(
        '[data-automation-id="add-advanced-search-condition"]',
      ) as HTMLElement | null;
      await expect(addBtn).not.toBeNull();
      await userEvent.click(addBtn!);
    });

    await step('A second row appears', async () => {
      await waitFor(async () => {
        const rows = canvasElement.querySelectorAll('novo-condition-builder');
        await expect(rows.length).toBe(2);
      });
    });
  },
};

/* -------------------------------------------------------------------------- */
/* 9. ChangeOperatorInteraction                                               */
/* -------------------------------------------------------------------------- */

/**
 * Walks the user through changing the operator on a numeric condition. The
 * play function opens the operator select via its overlay portal (CDK
 * portals to `document.body`, so the assertion has to scope to the overlay
 * container, not the canvas).
 */
export const ChangeOperatorInteraction: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Operators on a numeric field: equalTo / greaterThan / lessThan / between -->
<novo-criteria-builder
  controlName="criteria"
  [config]="config"
  [editTypeFn]="editTypeFn">
</novo-criteria-builder>`,
      },
    },
  },
  render: () => ({
    props: {
      config: { fields: [buildScope('Candidate', 'Candidate', CANDIDATE_FIELDS)] },
      initialCriteria: [
        {
          $and: [
            {
              field: 'yearsExperience',
              operator: 'greaterThan',
              scope: 'Candidate',
              entity: 'Candidate',
              value: 3,
            },
          ],
        },
      ],
      showOutput: false,
    },
    template: `
      <sb-criteria-builder-host
        [config]="config"
        [initialCriteria]="initialCriteria"
        [showOutput]="showOutput">
      </sb-criteria-builder-host>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    await step('Wait for the operator select to render', async () => {
      await waitFor(async () => {
        const triggers = canvasElement.querySelectorAll('novo-select');
        // field picker + operator select on the same row; we expect ≥ 2
        await expect(triggers.length).toBeGreaterThanOrEqual(2);
      });
    });

    await step('Open the operator dropdown', async () => {
      // The operator <novo-select> is the second select in the row — first is
      // the field picker. Open it by clicking its trigger element.
      const selects = canvasElement.querySelectorAll('novo-select');
      const operatorSelect = selects[1] as HTMLElement;
      await expect(operatorSelect).toBeTruthy();
      await userEvent.click(operatorSelect);
    });

    await step('Operator options appear in the overlay container', async () => {
      // CDK overlay portals to document.body — scope the assertion there.
      const overlay = within(document.body);
      await waitFor(async () => {
        const options = await overlay.findAllByRole('option');
        await expect(options.length).toBeGreaterThan(0);
      });
    });
  },
};

/* -------------------------------------------------------------------------- */
/* 10. Playground                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Every wired input bound to a control. Toggle the conjunction set, the
 * "hide first operator" rendering, and the "can be empty" guard to see how
 * each one affects the live builder.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-criteria-builder
  controlName="criteria"
  [config]="config"
  [editTypeFn]="editTypeFn"
  [allowedGroupings]="allowedGroupings"
  [hideFirstOperator]="hideFirstOperator"
  [canBeEmpty]="canBeEmpty">
</novo-criteria-builder>`,
      },
    },
  },
  argTypes: {
    allowedGroupings: {
      control: 'check',
      options: [Conjunction.AND, Conjunction.OR, Conjunction.NOT],
      description: 'Which conjunctions appear in the group-selector dropdown.',
    },
    hideFirstOperator: {
      control: 'boolean',
      description: 'When true, the first row hides its conjunction selector (default).',
    },
    canBeEmpty: {
      control: 'boolean',
      description: 'When true, the user can delete the final row entirely (default false).',
    },
  },
  args: {
    allowedGroupings: [Conjunction.AND, Conjunction.OR, Conjunction.NOT],
    hideFirstOperator: true,
    canBeEmpty: false,
  },
  render: (args) => ({
    props: {
      ...args,
      config: { fields: [buildScope('Candidate', 'Candidate', CANDIDATE_FIELDS)] },
      initialCriteria: [
        {
          $and: [
            {
              field: 'status',
              operator: 'includeAny',
              scope: 'Candidate',
              entity: 'Candidate',
              value: ['active'],
            },
          ],
        },
      ],
    },
    template: `
      <sb-criteria-builder-host
        [config]="config"
        [initialCriteria]="initialCriteria"
        [allowedGroupings]="allowedGroupings"
        [hideFirstOperator]="hideFirstOperator"
        [canBeEmpty]="canBeEmpty">
      </sb-criteria-builder-host>
    `,
  }),
};
