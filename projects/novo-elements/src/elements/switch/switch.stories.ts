import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

import { NovoSwitchElement } from './Switch';
import { NovoSwitchModule } from './Switch.module';

/**
 * Stories for `<novo-switch>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 */
const meta: Meta<NovoSwitchElement> = {
  title: 'Form Controls/Switch',
  component: NovoSwitchElement,
  decorators: [
    moduleMetadata({
      imports: [NovoSwitchModule, FormsModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A binary on/off toggle. Switches commit immediately — the value flips as soon as the user activates the ' +
          'control, with no separate confirm step. Pair with `[(ngModel)]` for two-way binding, and use the `theme` ' +
          'input to pick the active-state color.',
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: [
        'ocean',
        'aqua',
        'mint',
        'grass',
        'sunflower',
        'bittersweet',
        'grapefruit',
        'carnation',
        'lavender',
        'mountain',
        'dark',
        'light',
      ],
      description:
        'Color theme applied when the switch is in the **on** state. Defaults to `ocean`. Accepts any analytics color ' +
        'name plus `dark` / `light`.',
      table: { defaultValue: { summary: 'ocean' } },
    },
    icons: {
      control: 'object',
      description:
        'Tuple of two Bullhorn icon names (without the `bhi-` prefix) rendered inside the thumb. Index `0` shows in the ' +
        '**off** state, index `1` shows in the **on** state.',
      table: { defaultValue: { summary: "['x', 'check']" } },
    },
    disabled: {
      control: 'boolean',
      description:
        'When `true`, the switch is non-interactive. Automatically applies `aria-disabled="true"` and dims the control.',
    },
    onChange: {
      action: 'onChange',
      description: 'Emits the new boolean value whenever the switch toggles. Fires after `ngModel` updates.',
      table: { category: 'Outputs' },
    },
  },
};

export default meta;
type Story = StoryObj<NovoSwitchElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for a switch versus a checkbox
 * or radio group, and the accessibility characteristics consumers should be
 * aware of.
 *
 * This is a docs-only story — it renders narrative content rather than a
 * single component variant.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a switch</h2>
        <p style="margin: 0 0 1.25rem;">
          A switch is a binary toggle that commits the change <strong>immediately</strong>.
          Use it when the user is flipping an option on or off with instant
          effect — like enabling a setting, activating a filter, or turning a
          feature on. If the change needs to be confirmed by a save action, use
          a checkbox instead.
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
              ✓ Use a switch when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Toggling a setting on or off (instant effect)</li>
              <li>Activating or deactivating a feature</li>
              <li>Showing/hiding a section or panel</li>
              <li>Flipping a binary preference where on/off framing reads naturally</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a switch when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The change requires a separate Save action — use a checkbox</li>
              <li>Selecting one of three or more options — use radios or a select</li>
              <li>Selecting multiple items from a list — use checkboxes</li>
              <li>Triggering an action (rather than setting state) — use a button</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          A switch is composed of a <strong>track</strong>, a <strong>thumb</strong>
          (which slides between off and on positions), and an optional projected
          <strong>label</strong>. The thumb carries a small icon — by default an
          <code>x</code> when off and a <code>check</code> when on. Override the
          pair with the <code>icons</code> input.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            The host element has <code>role="checkbox"</code> and exposes its
            state via <code>aria-checked</code>.
          </li>
          <li>
            <code>Space</code> activates the switch when focused.
          </li>
          <li>
            When <code>disabled</code> is set, <code>aria-disabled="true"</code>
            is applied automatically and pointer events are suppressed.
          </li>
          <li>
            If the switch is not adjacent to descriptive text, project a label
            into the component (<code>&lt;novo-switch&gt;Notify me&lt;/novo-switch&gt;</code>)
            so screen readers can announce its purpose.
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
 * The simplest switch — two-way bound to a local `checked` flag via
 * `[(ngModel)]`. Toggle the control to flip the bound value; every input is
 * wired so the Controls panel mutates the render.
 */
export const Default: Story = {
  args: {
    theme: 'ocean',
    icons: ['x', 'check'],
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// NovoSwitchModule + FormsModule
@Component({ ... })
export class MyToggleComponent {
  checked = false;
}

// template
<novo-switch [(ngModel)]="checked">Notify me</novo-switch>`,
      },
    },
  },
  render: (args) => ({
    props: { ...args, checked: false },
    template: `
      <novo-switch
        [(ngModel)]="checked"
        [theme]="theme"
        [icons]="icons"
        [disabled]="disabled"
        (onChange)="onChange($event)"
      >
        Notify me
      </novo-switch>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Themes                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * The active-state color is set via `theme`. Defaults to `ocean`. Any analytics
 * color name works, plus `dark` and `light`. Pick by intent — e.g. `grapefruit`
 * for destructive or warning-style toggles, `grass` for success-flavored
 * settings.
 */
export const Themes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoSwitchModule } from 'novo-elements';

// theme sets the active-state color (analytics palette + dark/light).
@Component({
  selector: 'my-switch-themes',
  imports: [FormsModule, NovoSwitchModule],
  templateUrl: './my-switch-themes.component.html',
})
export class MySwitchThemesComponent {
  checked = true;
}

// component.html
<novo-switch [(ngModel)]="checked" theme="ocean">Ocean (default)</novo-switch>
<novo-switch [(ngModel)]="checked" theme="mint">Mint</novo-switch>
<novo-switch [(ngModel)]="checked" theme="grapefruit">Grapefruit</novo-switch>
<novo-switch [(ngModel)]="checked" theme="lavender">Lavender</novo-switch>
<!-- Any analytics color works: aqua, grass, sunflower, bittersweet, carnation, mountain, dark, light -->`,
      },
    },
  },
  render: () => ({
    props: { checked: true },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, max-content); gap: 0.5rem 1.5rem; align-items: center;">
        <novo-switch [(ngModel)]="checked" theme="ocean">Ocean (default)</novo-switch>
        <novo-switch [(ngModel)]="checked" theme="aqua">Aqua</novo-switch>
        <novo-switch [(ngModel)]="checked" theme="mint">Mint</novo-switch>
        <novo-switch [(ngModel)]="checked" theme="grass">Grass</novo-switch>
        <novo-switch [(ngModel)]="checked" theme="sunflower">Sunflower</novo-switch>
        <novo-switch [(ngModel)]="checked" theme="bittersweet">Bittersweet</novo-switch>
        <novo-switch [(ngModel)]="checked" theme="grapefruit">Grapefruit</novo-switch>
        <novo-switch [(ngModel)]="checked" theme="carnation">Carnation</novo-switch>
        <novo-switch [(ngModel)]="checked" theme="lavender">Lavender</novo-switch>
        <novo-switch [(ngModel)]="checked" theme="mountain">Mountain</novo-switch>
        <novo-switch [(ngModel)]="checked" theme="dark">Dark</novo-switch>
        <novo-switch [(ngModel)]="checked" theme="light">Light</novo-switch>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. States                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Off, on, and disabled. The disabled state dims the switch and ignores
 * click / keyboard input — both an off and an on disabled variant are shown
 * since the active-state color still applies when checked.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoSwitchModule } from 'novo-elements';

@Component({
  selector: 'my-switch-states',
  imports: [FormsModule, NovoSwitchModule],
  templateUrl: './my-switch-states.component.html',
})
export class MySwitchStatesComponent {
  off = false;
  on = true;
}

// component.html
<novo-switch [(ngModel)]="off">Off</novo-switch>
<novo-switch [(ngModel)]="on">On</novo-switch>
<novo-switch [ngModel]="false" disabled>Disabled (off)</novo-switch>
<novo-switch [ngModel]="true" disabled>Disabled (on)</novo-switch>`,
      },
    },
  },
  render: () => ({
    props: { off: false, on: true },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, max-content); gap: 0.5rem 1.5rem; align-items: center;">
        <novo-switch [(ngModel)]="off">Off</novo-switch>
        <novo-switch [(ngModel)]="on">On</novo-switch>
        <novo-switch [ngModel]="false" disabled>Disabled (off)</novo-switch>
        <novo-switch [ngModel]="true" disabled>Disabled (on)</novo-switch>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. WithLabel                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Project any markup into `<novo-switch>` to render a label next to the track.
 * Without a projected label, supply an external `<label>` or `aria-label` so
 * the control has an accessible name.
 */
export const WithLabel: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoSwitchModule } from 'novo-elements';

// Project any markup as the label; or supply an aria-label for unlabelled toggles.
@Component({
  selector: 'my-switch-with-label',
  imports: [FormsModule, NovoSwitchModule],
  templateUrl: './my-switch-with-label.component.html',
})
export class MySwitchWithLabelComponent {
  emailEnabled = true;
  showArchived = false;
  blockSharing = true;
}

// component.html
<novo-switch [(ngModel)]="emailEnabled">Email notifications</novo-switch>
<novo-switch [(ngModel)]="showArchived">Show archived records</novo-switch>
<novo-switch [(ngModel)]="blockSharing" theme="grapefruit">Block external sharing</novo-switch>`,
      },
    },
  },
  render: () => ({
    props: { a: true, b: false, c: true },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start;">
        <novo-switch [(ngModel)]="a">Email notifications</novo-switch>
        <novo-switch [(ngModel)]="b">Show archived records</novo-switch>
        <novo-switch [(ngModel)]="c" theme="grapefruit">Block external sharing</novo-switch>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. CustomIcons                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Override the icon pair via `[icons]`. The tuple is `[offIcon, onIcon]`; both
 * must be Bullhorn icon names (no `bhi-` prefix). Keep the metaphors crisp —
 * the thumb is small, so subtle distinctions won't read.
 */
export const CustomIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoSwitchModule } from 'novo-elements';

// [icons] is [offIcon, onIcon]; both are Bullhorn icon names (no bhi- prefix).
@Component({
  selector: 'my-switch-custom-icons',
  imports: [FormsModule, NovoSwitchModule],
  templateUrl: './my-switch-custom-icons.component.html',
})
export class MySwitchCustomIconsComponent {
  locked = true;
  previewing = false;
  audio = true;
}

// component.html
<novo-switch [(ngModel)]="locked" [icons]="['lock', 'unlock']">Lock record</novo-switch>
<novo-switch [(ngModel)]="previewing" [icons]="['eye-closed', 'eye']" theme="aqua">Show preview</novo-switch>
<novo-switch [(ngModel)]="audio" [icons]="['mute', 'speaker']" theme="grass">Audio alerts</novo-switch>`,
      },
    },
  },
  render: () => ({
    props: { a: true, b: false, c: true },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start;">
        <novo-switch [(ngModel)]="a" [icons]="['lock', 'unlock']">Lock record</novo-switch>
        <novo-switch [(ngModel)]="b" [icons]="['eye-closed', 'eye']" theme="aqua">Show preview</novo-switch>
        <novo-switch [(ngModel)]="c" [icons]="['mute', 'speaker']" theme="grass">Audio alerts</novo-switch>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Toggle the switch live or mutate inputs via
 * the panel; the Source tab gives a copy-pasteable snippet.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `@Component({ ... })
export class MyToggleComponent {
  checked = true;
}

// template
<novo-switch
  [(ngModel)]="checked"
  theme="ocean"
  [icons]="['x', 'check']"
>
  Playground
</novo-switch>`,
      },
    },
  },
  args: {
    theme: 'ocean',
    icons: ['x', 'check'],
    disabled: false,
  },
  render: (args) => ({
    props: { ...args, checked: true },
    template: `
      <novo-switch
        [(ngModel)]="checked"
        [theme]="theme"
        [icons]="icons"
        [disabled]="disabled"
        (onChange)="onChange($event)"
      >
        Playground
      </novo-switch>
    `,
  }),
};
