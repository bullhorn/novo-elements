import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect, waitFor } from 'storybook/test';

import { NovoOptionModule } from 'novo-elements/elements/common';

import { NovoSelectElement } from './Select';
import { NovoSelectModule } from './Select.module';

/**
 * Stories for `<novo-select>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 */
const meta: Meta<NovoSelectElement & { options?: any; selected?: any }> = {
  title: 'Form Controls/Select',
  component: NovoSelectElement,
  decorators: [
    moduleMetadata({
      // `FormsModule` / `ReactiveFormsModule` are provided globally via
      // `.storybook/preview.ts`, so `[(ngModel)]` / `[formControl]` work
      // without per-story imports.
      //
      // `NovoSelectModule` imports `NovoOptionModule` internally for its
      // own templates but doesn't re-export it. Declarative stories that
      // project `<novo-option>` / `<novo-optgroup>` as children need it
      // imported explicitly here.
      imports: [NovoSelectModule, NovoOptionModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A click-to-open dropdown for picking one (or, with `multiple`, several) values from a known list. ' +
          'Drive it declaratively with projected `<novo-option>` elements, or data-driven via the `[options]` ' +
          'input. Integrates with `ngModel` and reactive forms via `ControlValueAccessor`. Reach for ' +
          '`<novo-autocomplete>` instead when the user needs to type-to-search a remote dataset, or ' +
          '`<novo-picker>` for richer item rendering.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Text shown in the trigger when no value is selected.',
      table: { defaultValue: { summary: 'Select...' } },
    },
    multiple: {
      control: 'boolean',
      description:
        'When `true`, the panel stays open after each click and the bound value is an array. ' +
        'Single-select panels close on selection.',
    },
    disabled: {
      control: 'boolean',
      description: 'When `true`, the select is non-interactive and visually muted.',
    },
    required: {
      control: 'boolean',
      description: 'Marks the control as required for form validation. Sets `aria-required="true"`.',
    },
    readonly: {
      control: 'boolean',
      description: 'When `true`, the select renders but cannot be opened or changed.',
    },
    displayIcon: {
      control: 'text',
      description: 'Optional Bullhorn icon (without the `bhi-` prefix) shown alongside the selected value in the trigger.',
    },
    position: {
      control: 'select',
      options: ['above-below', 'above', 'below'],
      description: 'Panel placement relative to the trigger. Forced to `above-below` when `multiple` is set.',
      table: { defaultValue: { summary: 'above-below' } },
    },
    overlayWidth: {
      control: 'number',
      description: 'Optional fixed width for the dropdown panel (in px). Defaults to the trigger width.',
    },
    overlayHeight: {
      control: 'number',
      description: 'Optional fixed maximum height for the dropdown panel (in px).',
    },
    hideLegacyOptions: {
      control: 'boolean',
      description:
        'When `true`, a bound value that is not present in `[options]` is dropped silently. ' +
        'Default (`false`) renders the unknown value as a disabled "legacy" entry so the user sees what was set.',
    },
    name: {
      control: 'text',
      description: 'Native `name` attribute. Defaults to an auto-generated unique id.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoSelectElement & { options?: any; selected?: any }>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for a select over an
 * autocomplete or picker, how the data-driven and declarative authoring modes
 * differ, the multiple-selection contract, and accessibility requirements.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a select</h2>
        <p style="margin: 0 0 1.25rem;">
          A select is a click-to-open dropdown for picking from a
          <strong>known, bounded list</strong> of options. Use it when the
          options fit comfortably on screen and the user can scan them — for
          long or remote lists, or when items need richer rendering, reach for
          a different control.
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
              ✓ Use a select when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The list is short to medium (3–50 items)</li>
              <li>The options are known up-front and don't need to be searched remotely</li>
              <li>The user can scan options visually rather than type-to-find</li>
              <li>You need a simple one-of-many or multi-select picker</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a select when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Options come from a remote, paginated, or open-ended source — use <code>&lt;novo-autocomplete&gt;</code></li>
              <li>Items need rich rendering (avatar, multiple lines) — use <code>&lt;novo-picker&gt;</code></li>
              <li>There are only 2–3 mutually exclusive options visible at once — use a radio group</li>
              <li>The choice is a boolean — use a switch or checkbox</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Select vs autocomplete vs picker</h2>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Select</strong> — closed list, click-to-open. The user
            picks from what's already on screen. Cheapest to author, best when
            options are static.
          </li>
          <li>
            <strong>Autocomplete</strong> — text input with suggestions. Use
            when typing is the primary interaction, when the dataset is large
            enough to need filtering, or when results come from an async
            source.
          </li>
          <li>
            <strong>Picker</strong> — autocomplete's heavier cousin: same
            type-to-filter affordance, but with richer item templates (avatar,
            secondary lines, custom layouts) and the option of multi-select
            chips.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Two authoring modes</h2>
        <p style="margin: 0 0 1rem;">
          The same component supports two equivalent ways of supplying its
          options:
        </p>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Data-driven</strong> — pass an array to
            <code>[options]</code>. Each entry is either a primitive (string /
            number) or an object with <code>&#123; label, value, disabled?,
            tooltip?, divider? &#125;</code>. Cheapest when the options come from
            data.
          </li>
          <li>
            <strong>Declarative</strong> — project
            <code>&lt;novo-option [value]="…"&gt;…&lt;/novo-option&gt;</code>
            children. Choose this when the label needs richer markup, or when
            you want to group entries with <code>&lt;novo-optgroup&gt;</code>.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">The "legacy option" behaviour</h2>
        <p style="margin: 0 0 1.25rem;">
          If the bound value isn't present in <code>[options]</code>, the
          select still renders it — as a <em>disabled</em> entry with a
          "Value is not provided in list of valid options." tooltip. This
          prevents stale data from disappearing without trace. Set
          <code>[hideLegacyOptions]="true"</code> to suppress that fallback
          and silently drop unknown values.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            The host element carries <code>role="combobox"</code>,
            <code>aria-haspopup="true"</code>, and <code>aria-expanded</code>
            tracks the panel's open state — all set by the component.
          </li>
          <li>
            <code>Space</code> / <code>Enter</code> open the panel; arrow keys
            move between options; <code>Esc</code> closes. Type-ahead (250 ms)
            jumps to options by first letter.
          </li>
          <li>
            In <code>multiple</code> mode, <code>Ctrl + A</code> toggles all
            options, and <code>Shift + ↑ / ↓</code> extends the selection
            range.
          </li>
          <li>
            When used inside a <code>&lt;novo-field&gt;</code>, the field's
            <code>&lt;novo-label&gt;</code> is wired to the select via
            <code>aria-labelledby</code> automatically — no extra ARIA needed.
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
 * The simplest select — a data-driven `[options]` array and two-way
 * `[(ngModel)]`. With a primitive-string array, the component renders each
 * entry as both the option label and its bound value.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// NovoSelectModule + FormsModule
@Component({ ... })
export class MyPickerComponent {
  options = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'];
  selected = 'Bravo';
}

// template
<novo-select [options]="options" [(ngModel)]="selected"></novo-select>`,
      },
    },
  },
  args: {
    placeholder: 'Select...',
    multiple: false,
    disabled: false,
    required: false,
    readonly: false,
    hideLegacyOptions: false,
    options: ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'],
    selected: 'Bravo',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 280px;">
        <novo-select
          [options]="options"
          [(ngModel)]="selected"
          [placeholder]="placeholder"
          [multiple]="multiple"
          [disabled]="disabled"
          [required]="required"
          [readonly]="readonly"
          [hideLegacyOptions]="hideLegacyOptions"
        ></novo-select>
        <div style="margin-top: 0.75rem; font-size: 0.875rem; color: #5d6469;">
          Selected: <strong>{{ selected | json }}</strong>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. ObjectOptions                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Object-shaped options. Each entry is `{ label, value, … }`; the `label`
 * drives what's rendered in the panel and trigger, while `value` is what gets
 * written through `ngModel`. Use this when the bound value needs to be an
 * object (e.g. a record from your data layer) rather than a primitive.
 *
 * The list also demonstrates `divider: true` (a separator entry) and
 * `disabled` / `tooltip` for unavailable options.
 */
export const ObjectOptions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// Object-shaped options. label drives display; value flows through ngModel.
// { divider: true } renders a separator; disabled + tooltip greys out an option.
@Component({ ... })
export class MyObjectPickerComponent {
  options = [
    { label: 'One', value: { id: 1, label: 'One' } },
    { label: 'Two', value: { id: 2, label: 'Two' } },
    { divider: true },
    { label: 'Three (disabled)', value: { id: 3, label: 'Three' }, disabled: true, tooltip: 'Not available' },
    { label: 'Four', value: { id: 4, label: 'Four' } },
  ];
  selected = this.options[1].value;
}

// template
<novo-select [options]="options" [(ngModel)]="selected"></novo-select>`,
      },
    },
  },
  render: () => ({
    props: {
      options: [
        { label: 'One', value: { id: 1, label: 'One' } },
        { label: 'Two', value: { id: 2, label: 'Two' } },
        { divider: true },
        { label: 'Three (disabled)', value: { id: 3, label: 'Three' }, disabled: true, tooltip: 'Not available' },
        { label: 'Four', value: { id: 4, label: 'Four' } },
      ],
      selected: { id: 2, label: 'Two' },
    },
    template: `
      <div style="max-width: 280px;">
        <novo-select [options]="options" [(ngModel)]="selected" placeholder="Pick a number"></novo-select>
        <div style="margin-top: 0.75rem; font-size: 0.875rem; color: #5d6469;">
          Selected: <strong>{{ selected | json }}</strong>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Declarative                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Declarative authoring with projected `<novo-option>` children. Use this
 * mode when the option label needs richer markup, or when you want to group
 * related entries via `<novo-optgroup>`. The bound `[value]` on each option
 * can be any type — string, number, or object.
 */
export const Declarative: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoOptionModule, NovoSelectModule } from 'novo-elements';

// Project <novo-option> children directly; wrap groups in
// <novo-optgroup label="..."> for headings.
@Component({
  selector: 'my-declarative-select',
  imports: [FormsModule, NovoSelectModule, NovoOptionModule],
  templateUrl: './my-declarative-select.component.html',
})
export class MyDeclarativeSelectComponent {
  selected: 'cat' | 'dog' | 'otter' | 'hawk' | 'parrot' = 'cat';
}

// component.html
<novo-select [(ngModel)]="selected" placeholder="Pick an animal">
  <novo-optgroup label="Mammals">
    <novo-option value="cat">Cat</novo-option>
    <novo-option value="dog">Dog</novo-option>
    <novo-option value="otter">Otter</novo-option>
  </novo-optgroup>
  <novo-optgroup label="Birds">
    <novo-option value="hawk">Hawk</novo-option>
    <novo-option value="parrot">Parrot</novo-option>
  </novo-optgroup>
</novo-select>`,
      },
    },
  },
  render: () => ({
    props: {
      selected: 'cat',
    },
    template: `
      <div style="max-width: 280px;">
        <novo-select [(ngModel)]="selected" placeholder="Pick an animal">
          <novo-optgroup label="Mammals">
            <novo-option value="cat">Cat</novo-option>
            <novo-option value="dog">Dog</novo-option>
            <novo-option value="otter">Otter</novo-option>
          </novo-optgroup>
          <novo-optgroup label="Birds">
            <novo-option value="hawk">Hawk</novo-option>
            <novo-option value="parrot">Parrot</novo-option>
          </novo-optgroup>
        </novo-select>
        <div style="margin-top: 0.75rem; font-size: 0.875rem; color: #5d6469;">
          Selected: <strong>{{ selected }}</strong>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. MultiSelect                                                              */
/* -------------------------------------------------------------------------- */

/**
 * `multiple` flips the select into multi-select mode. The bound value becomes
 * an **array** of selected values, and the trigger renders the labels joined
 * with `", "`. The panel stays open after each click; use `Ctrl + A` to
 * toggle all options, and `Shift + ↑ / ↓` to range-select.
 */
export const MultiSelect: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// multi-select: bound value becomes an array.
@Component({ ... })
export class MyMultiPickerComponent {
  states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado'];
  selected: string[] = ['Arizona', 'California'];
}

// template
<novo-select [(ngModel)]="selected" multiple placeholder="Select states">
  <novo-option *ngFor="let state of states" [value]="state">{{ state }}</novo-option>
</novo-select>`,
      },
    },
  },
  render: () => ({
    props: {
      states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Delaware', 'Florida', 'Georgia', 'Hawaii'],
      selected: ['Arizona', 'California'],
    },
    template: `
      <div style="max-width: 320px;">
        <novo-select [(ngModel)]="selected" multiple placeholder="Select states">
          <novo-option *ngFor="let state of states" [value]="state">{{ state }}</novo-option>
        </novo-select>
        <div style="margin-top: 0.75rem; font-size: 0.875rem; color: #5d6469;">
          Selected: <strong>{{ selected | json }}</strong>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Disabled                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * `disabled` makes the select non-interactive — the trigger can't be opened
 * and is removed from the tab order. Individual `[options]` entries can
 * also be flagged `disabled: true` (with an optional `tooltip`) to render
 * them greyed out inside the panel.
 */
export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoSelectModule } from 'novo-elements';

// Disable the whole select, or flag individual options with
// { disabled: true, tooltip: '...' }.
@Component({
  selector: 'my-disabled-select',
  imports: [FormsModule, NovoSelectModule],
  templateUrl: './my-disabled-select.component.html',
})
export class MyDisabledSelectComponent {
  options = ['Alpha', 'Bravo', 'Charlie'];
  selected: string | null = 'Bravo';
}

// component.html
<novo-select [options]="options" [(ngModel)]="selected" disabled></novo-select>
<novo-select [options]="options" disabled placeholder="No selection"></novo-select>`,
      },
    },
  },
  render: () => ({
    props: {
      options: ['Alpha', 'Bravo', 'Charlie'],
      selected: 'Bravo',
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 280px;">
        <novo-select [options]="options" [(ngModel)]="selected" disabled></novo-select>
        <novo-select [options]="options" [(ngModel)]="selected" disabled placeholder="No selection" [ngModel]="null"></novo-select>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. WithIcon                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * `displayIcon` renders a Bullhorn glyphicon (without the `bhi-` prefix)
 * alongside the selected value in the trigger. Useful when the select sits
 * in a tight toolbar and the icon helps anchor what's being chosen.
 */
export const WithIcon: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoSelectModule } from 'novo-elements';

// displayIcon takes a Bullhorn icon name (no bhi- prefix).
@Component({
  selector: 'my-icon-select',
  imports: [FormsModule, NovoSelectModule],
  templateUrl: './my-icon-select.component.html',
})
export class MyIconSelectComponent {
  countries = ['United States', 'Canada', 'Mexico', 'United Kingdom'];
  selected = 'United States';
}

// component.html
<novo-select [options]="countries" [(ngModel)]="selected" displayIcon="globe-o"></novo-select>`,
      },
    },
  },
  render: () => ({
    props: {
      options: ['United States', 'Canada', 'Mexico', 'United Kingdom'],
      selected: 'United States',
    },
    template: `
      <div style="max-width: 280px;">
        <novo-select [options]="options" [(ngModel)]="selected" displayIcon="globe-o"></novo-select>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. Opened                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Same select as `Default`, but with a `play` function that clicks the
 * trigger so visual-regression tooling snapshots the **opened** panel. The
 * assertion confirms `aria-expanded` flips to `true` once the overlay is
 * rendered.
 */
export const Opened: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoSelectModule } from 'novo-elements';

// Same as Default; opened programmatically by clicking the trigger.
@Component({
  selector: 'my-opened-select',
  imports: [FormsModule, NovoSelectModule],
  templateUrl: './my-opened-select.component.html',
})
export class MyOpenedSelectComponent {
  options = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'];
  selected = 'Bravo';
}

// component.html
<novo-select [options]="options" [(ngModel)]="selected"></novo-select>`,
      },
    },
  },
  render: () => ({
    props: {
      options: ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'],
      selected: 'Bravo',
    },
    template: `
      <div style="max-width: 280px; min-height: 280px;">
        <novo-select
          [options]="options"
          [(ngModel)]="selected"
          data-testid="opened-select"
        ></novo-select>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('combobox');
    await userEvent.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
  },
};

/* -------------------------------------------------------------------------- */
/* 9. Playground                                                               */
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
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoSelectModule } from 'novo-elements';

@Component({
  selector: 'my-select-playground',
  imports: [FormsModule, NovoSelectModule],
  templateUrl: './my-select-playground.component.html',
})
export class MySelectPlaygroundComponent {
  options = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'];
  selected: string | string[] | null = null;
  placeholder = 'Select...';
  multiple = false;
  disabled = false;
  required = false;
}

// component.html
<novo-select
  [options]="options"
  [(ngModel)]="selected"
  [placeholder]="placeholder"
  [multiple]="multiple"
  [disabled]="disabled"
  [required]="required"
></novo-select>`,
      },
    },
  },
  args: {
    placeholder: 'Select...',
    multiple: false,
    disabled: false,
    required: false,
    readonly: false,
    hideLegacyOptions: false,
    displayIcon: '',
    position: 'above-below',
    overlayWidth: undefined,
    overlayHeight: undefined,
    name: '',
    options: ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'],
    selected: null,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 320px;">
        <novo-select
          [options]="options"
          [(ngModel)]="selected"
          [placeholder]="placeholder"
          [multiple]="multiple"
          [disabled]="disabled"
          [required]="required"
          [readonly]="readonly"
          [hideLegacyOptions]="hideLegacyOptions"
          [displayIcon]="displayIcon || null"
          [position]="position"
          [overlayWidth]="overlayWidth"
          [overlayHeight]="overlayHeight"
          [name]="name || null"
        ></novo-select>
        <div style="margin-top: 0.75rem; font-size: 0.875rem; color: #5d6469;">
          Selected: <strong>{{ selected | json }}</strong>
        </div>
      </div>
    `,
  }),
};
