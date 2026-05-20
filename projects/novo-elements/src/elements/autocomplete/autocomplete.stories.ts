import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect } from 'storybook/test';

import { NovoAutocompleteElement } from './autocomplete.component';
import { NovoAutoCompleteModule } from './autocomplete.module';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/elements/common';
import { NovoChipsModule } from 'novo-elements/elements/chips';

/**
 * Stories for `<novo-autocomplete>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 *
 * Autocomplete is unusual in two respects worth flagging:
 *
 *   1. It is **always rendered inside a `<novo-field>`** alongside a
 *      `novoInput` (or a `<novo-chip-list>` for multi-select). The component
 *      itself doesn't carry the value — the host `NovoField`'s `_control`
 *      does. Stories that render `<novo-autocomplete>` outside a field will
 *      log a "AutoComplete only intended to be used within a NovoField"
 *      warning at runtime.
 *
 *   2. The component **does not own the option source**. Options are projected
 *      as `<novo-option>` content, and consumers are expected to filter the
 *      list themselves (typically via an `Observable` driven by the input's
 *      `valueChanges`). The component handles selection, keyboard navigation,
 *      and panel open/close — nothing else.
 */
const meta: Meta<NovoAutocompleteElement> = {
  title: 'Form Controls/Autocomplete',
  component: NovoAutocompleteElement,
  decorators: [
    moduleMetadata({
      // NovoAutoCompleteModule only exports the autocomplete component itself.
      // The stories below also render `<novo-field>`, `<novo-label>`,
      // `novoInput`, `<novo-option>`, and (for the chips variant)
      // `<novo-chip-list>` — each needs its own module pulled in explicitly.
      imports: [NovoAutoCompleteModule, NovoFieldModule, NovoCommonModule, NovoOptionModule, NovoChipsModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Type-ahead suggestion panel that pairs with a `novoInput` (or a `<novo-chip-list>`) inside a ' +
          '`<novo-field>`. Options are projected as `<novo-option>` children — consumers control the source list ' +
          'and filtering. The component handles selection, keyboard navigation, and panel open/close.',
      },
    },
  },
  argTypes: {
    multiple: {
      control: 'boolean',
      description:
        'Allow multiple options to be selected. The panel stays open after a selection and the field control receives an array of values.',
      table: { defaultValue: { summary: 'false' } },
    },
    makeFirstItemActive: {
      control: 'boolean',
      description:
        'When `true`, the first option is activated whenever the option list changes — so pressing `Enter` selects it immediately. Commonly paired with multi-select chip inputs.',
    },
    disabled: {
      control: 'boolean',
      description:
        'Disables the autocomplete trigger. Inherited from the host `<novo-field>`\'s control when unset.',
    },
    displayWith: {
      control: false,
      description:
        'Optional `(value) => string` mapper used when the selected option\'s `value` is an object and the input should display a derived string. Defaults to the option\'s projected text.',
    },
    triggerOn: {
      control: false,
      description:
        'Predicate that decides whether the panel should auto-open from a control state change. Defaults to `(control) => control.focused`. Override (e.g. for textareas) when "focus" isn\'t the right trigger.',
    },
    ariaLabel: {
      control: 'text',
      description: '`aria-label` for the autocomplete panel.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoAutocompleteElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for autocomplete over select
 * or picker, the anatomy of the control, and accessibility requirements.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use autocomplete</h2>
        <p style="margin: 0 0 1.25rem;">
          Autocomplete is a free-text input that <strong>suggests</strong>
          values as the user types. Unlike a select or picker, the input
          doesn't constrain the user to one of the suggested options — the
          field's value is whatever the user typed, with the option list
          serving as a hint.
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
              ✓ Use autocomplete when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>A list of possible values is known but the user can also enter their own</li>
              <li>Suggesting common entries while still accepting free text (tags, locations, search terms)</li>
              <li>Speeding up typing in a long-form field where matches are useful but not required</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use autocomplete when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The value <em>must</em> be one of a predefined set — use <code>select</code> or <code>picker</code></li>
              <li>The full option list is short and always worth showing — use <code>select</code></li>
              <li>The user is choosing between just a few options — use radios or chips</li>
              <li>You need to pre-validate against an entity (candidate, company) — use a <code>picker</code></li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Field</strong> — a <code>&lt;novo-field&gt;</code> wraps
            the input, the label, and the autocomplete. The field owns the
            value via its <code>FormControl</code> / <code>ngModel</code>.
          </li>
          <li>
            <strong>Input</strong> — a <code>novoInput</code> (or a
            <code>novoChipInput</code> inside a
            <code>&lt;novo-chip-list&gt;</code> for multi-select). Set
            <code>autocomplete="off"</code> on native browsers to suppress the
            browser's competing dropdown.
          </li>
          <li>
            <strong>Autocomplete panel</strong> — the
            <code>&lt;novo-autocomplete&gt;</code> projects
            <code>&lt;novo-option&gt;</code> children. Filter the option list
            yourself (typically via an RxJS pipeline driven by the input's
            <code>valueChanges</code>).
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Filtering</h2>
        <p style="margin: 0 0 1.25rem;">
          The component does not filter the option list — it renders whatever
          options you project. The standard pattern is an
          <code>Observable&lt;Option[]&gt;</code> derived from the form
          control's <code>valueChanges</code>, piped through your filter and
          rendered with <code>*ngFor</code> + <code>async</code>.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            Follow the
            <a href="https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html" target="_blank" rel="noreferrer">ARIA combobox pattern</a>:
            the input has role <code>combobox</code>, the panel has role
            <code>listbox</code>, and arrow keys navigate the options.
          </li>
          <li>
            <code>ArrowUp</code> / <code>ArrowDown</code> move the active
            option; <code>Enter</code> selects it; <code>Escape</code> closes
            the panel.
          </li>
          <li>
            Provide a visible <code>&lt;novo-label&gt;</code> inside the
            field. If you must hide the label, use <code>aria-label</code> on
            the input — not on the autocomplete.
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
 * The simplest autocomplete — a static option list with no filtering, bound
 * to a story arg via `[(ngModel)]`. Open the panel by focusing the input.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// NovoAutoCompleteModule + NovoFieldModule + NovoOptionModule + FormsModule.
// <novo-autocomplete> must sit inside <novo-field>; the field owns the input.
@Component({ ... })
export class MyAutocompleteComponent {
  options = ['One', 'Two', 'Three'];
  value = '';
}

// template
<novo-field>
  <novo-label>Number</novo-label>
  <input type="text" novoInput autocomplete="off" [(ngModel)]="value" />
  <novo-autocomplete>
    <novo-option *ngFor="let opt of options" [value]="opt">{{ opt }}</novo-option>
  </novo-autocomplete>
</novo-field>`,
      },
    },
  },
  args: {
    multiple: false,
    makeFirstItemActive: false,
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      value: '',
      options: ['One', 'Two', 'Three'],
    },
    template: `
      <novo-field style="width: 280px;">
        <novo-label>Number</novo-label>
        <input
          type="text"
          novoInput
          placeholder="Pick one"
          autocomplete="off"
          [(ngModel)]="value" />
        <novo-autocomplete
          [multiple]="multiple"
          [makeFirstItemActive]="makeFirstItemActive"
          [disabled]="disabled">
          <novo-option *ngFor="let opt of options" [value]="opt">{{ opt }}</novo-option>
        </novo-autocomplete>
      </novo-field>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Filtered (with `play`)                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Demonstrates the canonical pattern: as the user types, the projected option
 * list shrinks to matches. The `play` function focuses the input, types
 * `"ap"`, and asserts that only the matching options are rendered.
 *
 * This is also the story that captures the "open + filtered" frame for
 * visual regression — the dropdown's interesting state is post-typing, not
 * the closed initial render.
 */
export const Filtered: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// Consumers own the filtering — typing into the input drives a method
// (or Observable + debounce) that returns the visible options.
@Component({ ... })
export class MyFilteredAutocompleteComponent {
  allOptions = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Grape'];
  value = '';

  filter(): string[] {
    const q = this.value.toLowerCase();
    return this.allOptions.filter((opt) => opt.toLowerCase().includes(q));
  }
}

// template
<novo-field>
  <novo-label>Fruit</novo-label>
  <input type="text" novoInput autocomplete="off" [(ngModel)]="value" />
  <novo-autocomplete>
    <novo-option *ngFor="let opt of filter()" [value]="opt">{{ opt }}</novo-option>
  </novo-autocomplete>
</novo-field>`,
      },
    },
  },
  render: () => ({
    props: {
      value: '',
      allOptions: ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Orange', 'Pear'],
      filter(): string[] {
        const v = (this.value || '').toString().toLowerCase();
        return this.allOptions.filter((opt: string) => opt.toLowerCase().includes(v));
      },
    },
    template: `
      <novo-field style="width: 280px;">
        <novo-label>Fruit</novo-label>
        <input
          type="text"
          novoInput
          placeholder="Start typing…"
          autocomplete="off"
          [(ngModel)]="value" />
        <novo-autocomplete>
          <novo-option *ngFor="let opt of filter()" [value]="opt">{{ opt }}</novo-option>
        </novo-autocomplete>
      </novo-field>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    // The autocomplete panel renders in a CDK overlay (outside `canvasElement`),
    // so reach for it via `document` rather than `within(canvasElement)`.
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Start typing…') as HTMLInputElement;

    await step('Focus and type a filter prefix', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'ap');
    });

    await step('Filtered options appear in the overlay', async () => {
      // Two fruits match "ap": Apple and Apricot. Grape contains "ap" too —
      // include it in the expected matches.
      const overlay = within(document.body);
      await expect(await overlay.findByText('Apple')).toBeVisible();
      await expect(await overlay.findByText('Apricot')).toBeVisible();
      await expect(await overlay.findByText('Grape')).toBeVisible();
      // A non-match should not be in the panel.
      await expect(overlay.queryByText('Cherry')).toBeNull();
    });
  },
};

/* -------------------------------------------------------------------------- */
/* 4. WithChips                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Multi-select pattern: pair the autocomplete with a `<novo-chip-list>` so
 * each selected option becomes a removable chip. The autocomplete is given
 * `multiple` (so the panel stays open after selection) and
 * `makeFirstItemActive` (so Enter selects the highlighted match immediately).
 *
 * The chip-list's `FormControl` holds the selected values; the search
 * input's `FormControl` drives the filter.
 */
export const WithChips: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// Adds NovoChipsModule. With multiple set, selecting an option adds a chip
// rather than setting the field's value. The chip-list FormControl holds the
// selected values; the search input FormControl drives the filter.
@Component({ ... })
export class MyChipAutocompleteComponent {
  fruits = ['Apple', 'Banana', 'Cherry', 'Lemon', 'Mango', 'Pear'];
  selected = new FormControl<string[]>(['Lemon']);
  search = new FormControl('');

  filtered() {
    const q = this.search.value?.toLowerCase() ?? '';
    return this.fruits.filter((f) => f.toLowerCase().includes(q));
  }
}

// template
<novo-field>
  <novo-chip-list [formControl]="selected">
    <novo-chip *ngFor="let v of selected.value" removable>
      {{ v }}
      <novo-icon novoChipRemove>times</novo-icon>
    </novo-chip>
    <input novoInput [formControl]="search" />
  </novo-chip-list>
  <novo-autocomplete multiple makeFirstItemActive>
    <novo-option *ngFor="let opt of filtered()" [value]="opt">{{ opt }}</novo-option>
  </novo-autocomplete>
</novo-field>`,
      },
    },
  },
  render: () => ({
    props: {
      selected: ['Lemon'],
      search: '',
      allFruits: ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'],
      filtered(): string[] {
        const q = (this.search || '').toString().toLowerCase();
        return this.allFruits.filter((f: string) => f.toLowerCase().includes(q));
      },
    },
    template: `
      <novo-field style="width: 360px;">
        <novo-label>Favorite Fruits</novo-label>
        <novo-chip-list #chipList aria-label="Fruit selection" [(ngModel)]="selected">
          <novo-chip *ngFor="let fruit of chipList.value" [value]="fruit">
            {{ fruit }}
          </novo-chip>
          <input
            novoChipInput
            placeholder="New fruit…"
            autocomplete="off"
            [(ngModel)]="search" />
        </novo-chip-list>
        <novo-autocomplete makeFirstItemActive multiple>
          <novo-option *ngFor="let fruit of filtered()" [value]="fruit">{{ fruit }}</novo-option>
        </novo-autocomplete>
      </novo-field>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. MakeFirstItemActive                                                      */
/* -------------------------------------------------------------------------- */

/**
 * With `makeFirstItemActive`, the topmost option is highlighted whenever the
 * filtered options list changes — so a quick `Enter` selects the best match
 * without pressing `ArrowDown` first. Common in chip-style multi-selects.
 *
 * Type one or two letters to watch the highlighted row shift as the list
 * filters. The first match is always pre-highlighted; pressing `Enter`
 * commits it. With no input, all cities are shown and `Boston` (the first
 * alphabetical entry) is the active row.
 */
export const MakeFirstItemActive: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NovoAutocompleteModule, NovoFieldModule, NovoInputModule, NovoOptionModule } from 'novo-elements';

// makeFirstItemActive pre-highlights the top option whenever the filtered list
// changes, so Enter commits the best match without ArrowDown first.
@Component({
  selector: 'my-first-active-autocomplete',
  imports: [CommonModule, FormsModule, NovoFieldModule, NovoInputModule, NovoAutocompleteModule, NovoOptionModule],
  templateUrl: './my-first-active-autocomplete.component.html',
})
export class MyFirstActiveAutocompleteComponent {
  value = '';
  cities = ['Boston', 'Chicago', 'Dallas', 'Denver', 'Detroit', 'Houston', 'Miami', 'Seattle'];

  filter(): string[] {
    const q = this.value.toLowerCase();
    return this.cities.filter((c) => c.toLowerCase().includes(q));
  }
}

// component.html
<novo-field>
  <novo-label>City</novo-label>
  <input type="text" novoInput autocomplete="off" [(ngModel)]="value" />
  <novo-autocomplete makeFirstItemActive>
    <novo-option *ngFor="let opt of filter()" [value]="opt">{{ opt }}</novo-option>
  </novo-autocomplete>
</novo-field>`,
      },
    },
  },
  render: () => ({
    props: {
      value: '',
      allOptions: [
        'Boston',
        'Chicago',
        'Dallas',
        'Denver',
        'Detroit',
        'Houston',
        'Los Angeles',
        'Miami',
        'New York',
        'Seattle',
      ],
      filter(): string[] {
        const v = (this.value || '').toString().toLowerCase();
        return this.allOptions.filter((opt: string) => opt.toLowerCase().includes(v));
      },
    },
    template: `
      <novo-field style="width: 280px;">
        <novo-label>City</novo-label>
        <input
          type="text"
          novoInput
          placeholder="Type then press Enter"
          autocomplete="off"
          [(ngModel)]="value" />
        <novo-autocomplete makeFirstItemActive>
          <novo-option *ngFor="let opt of filter()" [value]="opt">{{ opt }}</novo-option>
        </novo-autocomplete>
      </novo-field>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Disabled                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * When `disabled` is set on the autocomplete (or on the field's control), the
 * input is non-interactive and the panel will not open.
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
import { NovoAutocompleteModule, NovoFieldModule, NovoInputModule, NovoOptionModule } from 'novo-elements';

// disabled on <novo-autocomplete> also disables the field's input.
@Component({
  selector: 'my-disabled-autocomplete',
  imports: [CommonModule, FormsModule, NovoFieldModule, NovoInputModule, NovoAutocompleteModule, NovoOptionModule],
  templateUrl: './my-disabled-autocomplete.component.html',
})
export class MyDisabledAutocompleteComponent {
  value = '';
  options = ['One', 'Two', 'Three'];
}

// component.html
<novo-field>
  <novo-label>Number</novo-label>
  <input type="text" novoInput [(ngModel)]="value" />
  <novo-autocomplete disabled>
    <novo-option *ngFor="let opt of options" [value]="opt">{{ opt }}</novo-option>
  </novo-autocomplete>
</novo-field>`,
      },
    },
  },
  render: () => ({
    props: {
      options: ['One', 'Two', 'Three'],
    },
    template: `
      <novo-field style="width: 280px;">
        <novo-label>Number</novo-label>
        <input
          type="text"
          novoInput
          placeholder="Disabled"
          autocomplete="off"
          disabled />
        <novo-autocomplete [disabled]="true">
          <novo-option *ngFor="let opt of options" [value]="opt">{{ opt }}</novo-option>
        </novo-autocomplete>
      </novo-field>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every controllable input wired to a control. Sanity-check combinations or
 * copy a code snippet via the Source tab.
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
import { NovoAutocompleteModule, NovoFieldModule, NovoInputModule, NovoOptionModule } from 'novo-elements';

@Component({
  selector: 'my-autocomplete-playground',
  imports: [CommonModule, FormsModule, NovoFieldModule, NovoInputModule, NovoAutocompleteModule, NovoOptionModule],
  templateUrl: './my-autocomplete-playground.component.html',
})
export class MyAutocompletePlaygroundComponent {
  value = '';
  options = ['One', 'Two', 'Three', 'Four', 'Five'];
  multiple = false;
  makeFirstItemActive = false;
  disabled = false;
}

// component.html
<novo-field>
  <novo-label>Number</novo-label>
  <input type="text" novoInput autocomplete="off" [(ngModel)]="value" />
  <novo-autocomplete
    [multiple]="multiple"
    [makeFirstItemActive]="makeFirstItemActive"
    [disabled]="disabled">
    <novo-option *ngFor="let opt of options" [value]="opt">{{ opt }}</novo-option>
  </novo-autocomplete>
</novo-field>`,
      },
    },
  },
  args: {
    multiple: false,
    makeFirstItemActive: false,
    disabled: false,
    ariaLabel: 'Pick a number',
  },
  render: (args) => ({
    props: {
      ...args,
      value: '',
      options: ['One', 'Two', 'Three', 'Four', 'Five'],
    },
    template: `
      <novo-field style="width: 280px;">
        <novo-label>Number</novo-label>
        <input
          type="text"
          novoInput
          placeholder="Playground"
          autocomplete="off"
          [(ngModel)]="value" />
        <novo-autocomplete
          [multiple]="multiple"
          [makeFirstItemActive]="makeFirstItemActive"
          [disabled]="disabled"
          [attr.aria-label]="ariaLabel || null">
          <novo-option *ngFor="let opt of options" [value]="opt">{{ opt }}</novo-option>
        </novo-autocomplete>
      </novo-field>
    `,
  }),
};
