import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

import { NovoColorInputElement } from './color-input.component';
import { NovoColorPickerModule } from './color-picker.module';

/**
 * Stories for the color-picker component family. Follows the conventions
 * documented in `projects/novo-elements/src/elements/button/button.stories.ts`.
 *
 * Three primary components ship in this family:
 *
 * - `<novo-color-input>` — the standard form-control surface. A text field
 *   showing the current hex; clicking the trigger icon (or focusing the input)
 *   opens the picker in a CDK overlay anchored to the field.
 * - `<novo-color-picker>` — the picker panel itself: a live preview, a swatch
 *   row, and a hex input. Can be embedded inline when an overlay isn't wanted.
 * - `<novo-color-swatch>` — a single color tile, used internally by the picker
 *   but also exported for ad-hoc swatch rendering (e.g. a palette UI).
 */
const meta: Meta<NovoColorInputElement> = {
  title: 'Form Controls/Color Picker',
  component: NovoColorInputElement,
  decorators: [
    moduleMetadata({
      imports: [NovoColorPickerModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Family of color-selection controls. `<novo-color-input>` is the form-control surface; it wraps ' +
          'a hex text input plus an overlay-mounted `<novo-color-picker>` palette. The picker can also be ' +
          'used standalone (inline), and `<novo-color-swatch>` exposes a single tile for ad-hoc palette UIs. ' +
          'The value emitted by `ngModel` is a hex string (e.g. `#4A89DC`); the underlying picker also ' +
          'accepts RGB / HSL / HSV objects via its `[color]` input.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Native input `name` attribute. Defaults to an auto-generated unique id.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown in the hex input when no color is selected.',
    },
    value: {
      control: 'text',
      description:
        'Currently selected color, as a hex string (e.g. `#4A89DC`). Two-way bindable via `ngModel`.',
    },
    disabled: {
      control: 'boolean',
      description: 'When `true`, the input is non-interactive and the picker overlay will not open.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoColorInputElement & { color: any; preset: string[] }>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for a color picker, the
 * anatomy of the three components in the family, and the value shapes the
 * picker understands.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a color picker</h2>
        <p style="margin: 0 0 1.25rem;">
          Reach for a color picker when the user needs to pick a
          <strong>color value</strong> as data — typically a small accent
          (tag color, calendar category, branding hint) tied to an entity in
          the system. The novo-elements picker is intentionally constrained:
          a curated row of swatches plus a hex input. It's <em>not</em> a
          full-fidelity art-tool color picker.
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
              ✓ Use a color picker when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Tagging an entity with a user-chosen color (categories, labels)</li>
              <li>Letting an admin theme small visual accents in their workspace</li>
              <li>Capturing a color value as form data alongside other fields</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a color picker when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The choice is among a small fixed set — use a radio or chips group</li>
              <li>You need full-spectrum art-tool precision (HSV wheel, eyedropper)</li>
              <li>You're choosing a system status — colors there are theme-defined, not user-picked</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          The family ships three components. Most consumers want the
          <code>&lt;novo-color-input&gt;</code> form control; the others
          exist for embedding the picker inline or building bespoke palette
          UIs.
        </p>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong><code>&lt;novo-color-input&gt;</code></strong> — the
            standard form control: a hex text field plus a trigger icon that
            opens the picker overlay. Implements
            <code>ControlValueAccessor</code>, so it works with
            <code>ngModel</code> and reactive forms.
          </li>
          <li>
            <strong><code>&lt;novo-color-picker&gt;</code></strong> — the
            picker panel: live color preview, a row of swatches, and a hex
            input. Use directly when you want the picker inline (no
            overlay).
          </li>
          <li>
            <strong><code>&lt;novo-color-swatch&gt;</code></strong> — one
            color tile. Useful when you want a bespoke palette layout that
            doesn't fit the picker's swatch row.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Value shape</h2>
        <p style="margin: 0 0 1rem;">
          <code>&lt;novo-color-input&gt;</code> emits a
          <strong>hex string</strong> (e.g. <code>#4A89DC</code>) through
          <code>ngModel</code>. The underlying picker is more permissive on
          input — its <code>[color]</code> input also accepts:
        </p>
        <ul style="margin: 0 0 1.25rem; padding-left: 1.25rem;">
          <li>Hex strings — <code>'#4A89DC'</code></li>
          <li>RGB / RGBA objects — <code>&#123; r: 218, g: 66, b: 83 &#125;</code></li>
          <li>HSL / HSLA objects — <code>&#123; h: 250, s: 0.5, l: 0.2, a: 1 &#125;</code></li>
          <li>HSV / HSVA objects</li>
        </ul>
        <p style="margin: 0 0 1.25rem;">
          Persist the hex string when you can — it's the cheapest round-trip
          and the form control already gives you that for free.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Customising the swatch palette</h2>
        <p style="margin: 0 0 1.25rem;">
          The picker ships a 10-color default palette. Override it by
          passing <code>[colors]</code> with your own hex array — handy when
          your product has brand-specific tag colors.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            The trigger is a real text input, so screen readers announce it
            normally. Provide a <code>placeholder</code> or surrounding
            label so the field has a name.
          </li>
          <li>
            Swatches in the picker are focusable (<code>tabindex="0"</code>)
            and respond to <code>Enter</code>; tab through them to inspect
            the palette by keyboard.
          </li>
          <li>
            Don't rely on the swatch alone to convey meaning — pair the
            color with a textual label (the tag's name, the category's
            title) so non-color-perceiving users still understand the
            assignment.
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
 * The standard form-control surface — `<novo-color-input>` bound to a hex
 * string via `ngModel`. Focusing the input or clicking the trigger icon
 * opens the picker overlay; choosing a swatch writes back to the bound value.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// NovoColorPickerModule + FormsModule.
@Component({ ... })
export class MyColorPickerComponent {
  hex = '#4A89DC';
}

// template — <novo-color-input> is a ControlValueAccessor; opens picker on focus.
<novo-color-input [(ngModel)]="hex" name="brandColor"></novo-color-input>`,
      },
    },
  },
  args: {
    value: '#4A89DC',
    placeholder: '#ffffff',
    disabled: false,
  },
  render: (args) => ({
    props: { ...args, hex: args.value },
    template: `
      <novo-color-input
        [(ngModel)]="hex"
        [name]="name"
        [placeholder]="placeholder"
        [disabled]="disabled"
      ></novo-color-input>
      <div style="margin-top: 0.75rem; font-family: monospace; color: #657786;">
        value: {{ hex }}
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Swatch                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-color-swatch>` exposes a single color tile. Useful when you need a
 * bespoke palette layout that doesn't fit the picker's built-in swatch row —
 * e.g. a category-color picker rendered as a grid. Each swatch emits
 * `(onClick)` with the selected hex.
 */
export const Swatch: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoColorPickerModule } from 'novo-elements';

// <novo-color-swatch> renders a single tile. Wrap in a sized container — the
// swatch fills 100% of its parent. (onClick) emits the clicked hex.
@Component({
  selector: 'my-color-swatch',
  imports: [CommonModule, NovoColorPickerModule],
  templateUrl: './my-color-swatch.component.html',
})
export class MyColorSwatchComponent {
  palette = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3'];

  onPick(hex: string) {
    console.log('picked', hex);
  }
}

// component.html
<div *ngFor="let c of palette" style="width: 32px; height: 32px;">
  <novo-color-swatch [color]="c" (onClick)="onPick($event)"></novo-color-swatch>
</div>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      palette: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'],
    },
    // <novo-color-swatch> fills 100% of its parent — size the wrapping div
    // rather than the swatch itself. (An earlier version bound `[style]` to a
    // JS object here, which Angular doesn't apply that way; the swatches
    // rendered unstyled. Use the wrapper-sizing pattern instead.)
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; max-width: 360px;">
        <div *ngFor="let c of palette" style="width: 32px; height: 32px; border-radius: 4px; overflow: hidden;">
          <novo-color-swatch [color]="c"></novo-color-swatch>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. WithPreset                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The inline `<novo-color-picker>` accepts a `[colors]` array to override the
 * default 10-color palette — use this to surface your product's brand or
 * tag colors. The picker is rendered inline here (no overlay) because the
 * surrounding context already provides one.
 */
export const WithPreset: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoColorPickerModule } from 'novo-elements';

// The inline <novo-color-picker> uses [(color)] (NOT ngModel). Override the
// default swatch palette via [colors].
@Component({
  selector: 'my-color-preset',
  imports: [NovoColorPickerModule],
  templateUrl: './my-color-preset.component.html',
})
export class MyColorPresetComponent {
  hex = '#1565C0';
  preset = ['#1565C0', '#2E7D32', '#EF6C00', '#C62828', '#6A1B9A', '#00838F'];
}

// component.html
<novo-color-picker [(color)]="hex" [colors]="preset"></novo-color-picker>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      color: '#1565C0',
      preset: ['#1565C0', '#2E7D32', '#EF6C00', '#C62828', '#6A1B9A', '#00838F', '#37474F', '#F9A825'],
    },
    template: `
      <novo-color-picker [color]="color" [colors]="preset"></novo-color-picker>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Disabled                                                                */
/* -------------------------------------------------------------------------- */

/**
 * A disabled color input is visually muted and won't open its overlay on
 * focus or trigger click. The bound value is still readable through
 * `ngModel`, but the user can't change it.
 */
export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoColorPickerModule } from 'novo-elements';

@Component({
  selector: 'my-disabled-color-input',
  imports: [FormsModule, NovoColorPickerModule],
  templateUrl: './my-disabled-color-input.component.html',
})
export class MyDisabledColorInputComponent {
  hex = '#4A89DC';
}

// component.html
<novo-color-input [(ngModel)]="hex" disabled></novo-color-input>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: { hex: '#4A89DC' },
    template: `
      <novo-color-input [(ngModel)]="hex" [disabled]="true"></novo-color-input>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Opened                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Same as `Default`, but the `play` function focuses the input to drive the
 * overlay open. The picker panel is portalled to `document.body` via the
 * CDK overlay, so the assertion queries `document.body` rather than the
 * story canvas. This is the frame visual-regression tooling should snapshot.
 */
export const Opened: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoColorPickerModule } from 'novo-elements';

// Same as Default; the panel opens on focus or click of the trigger.
@Component({
  selector: 'my-opened-color-input',
  imports: [FormsModule, NovoColorPickerModule],
  templateUrl: './my-opened-color-input.component.html',
})
export class MyOpenedColorInputComponent {
  hex = '#4A89DC';
}

// component.html
<novo-color-input [(ngModel)]="hex"></novo-color-input>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: { hex: '#4A89DC' },
    template: `
      <div style="padding: 1rem; min-height: 360px;">
        <novo-color-input [(ngModel)]="hex"></novo-color-input>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.click(input);
    // The picker is portalled into document.body via CDK overlay — assert
    // the overlay panel renders there, not in the story canvas.
    const body = within(document.body);
    await expect(await body.findByRole('listbox')).toBeVisible();
  },
};

/* -------------------------------------------------------------------------- */
/* 7. Playground                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Every input on `<novo-color-input>` wired to a control. Sanity-check
 * combinations or copy a snippet via the Source tab.
 */
export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoColorPickerModule } from 'novo-elements';

@Component({
  selector: 'my-color-input-playground',
  imports: [FormsModule, NovoColorPickerModule],
  templateUrl: './my-color-input-playground.component.html',
})
export class MyColorInputPlaygroundComponent {
  hex = '#4A89DC';
  placeholder = '#ffffff';
  disabled = false;
}

// component.html
<novo-color-input
  [(ngModel)]="hex"
  [placeholder]="placeholder"
  [disabled]="disabled"
></novo-color-input>`,
      },
    },
  },
  name: '🎮 Playground',
  args: {
    value: '#4A89DC',
    placeholder: '#ffffff',
    name: '',
    disabled: false,
  },
  render: (args) => ({
    props: { ...args, hex: args.value },
    template: `
      <novo-color-input
        [(ngModel)]="hex"
        [name]="name"
        [placeholder]="placeholder"
        [disabled]="disabled"
      ></novo-color-input>
      <div style="margin-top: 0.75rem; font-family: monospace; color: #657786;">
        value: {{ hex }}
      </div>
    `,
  }),
};
