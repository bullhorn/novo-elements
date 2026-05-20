import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userEvent, waitFor, expect, within } from 'storybook/test';

import { NovoStepper } from './stepper.component';
import { NovoStepperModule } from './stepper.module';
import { NovoButtonModule } from 'novo-elements/elements/button';

/**
 * Stories for `<novo-stepper>` — the multi-step workflow component built on
 * top of `@angular/cdk/stepper`. Two top-level variants are exported:
 * `<novo-horizontal-stepper>` and `<novo-vertical-stepper>`, both sharing the
 * same step API (`<novo-step>`, `[novoStepLabel]`, `[novoStepperNext]`,
 * `[novoStepperPrevious]`).
 *
 * Conventions are documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts`.
 */

const meta: Meta<NovoStepper> = {
  title: 'Elements/Stepper',
  component: NovoStepper,
  decorators: [
    moduleMetadata({
      imports: [NovoStepperModule, NovoButtonModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Guides the user through a multi-step process — sign-up flows, structured wizards, ' +
          'long forms broken into digestible chunks. Pick `<novo-horizontal-stepper>` for short ' +
          'workflows that fit on one screen; reach for `<novo-vertical-stepper>` when each step ' +
          'has more content or when steps are loosely related and benefit from being visible at ' +
          'once. Set `[linear]="true"` to require steps to be completed in order; bind each step ' +
          'to a `[stepControl]` FormGroup to gate progression on validity.',
      },
    },
  },
  argTypes: {
    linear: {
      control: 'boolean',
      description:
        'When `true`, the user can only advance to the next step once the current step is ' +
        'marked complete (typically via a valid `[stepControl]`). When `false`, all steps are ' +
        'navigable at any time.',
      table: { defaultValue: { summary: 'false' } },
    },
    selectedIndex: {
      control: { type: 'number', min: 0 },
      description:
        'Index of the currently selected step. Two-way bindable. Use to drive the stepper ' +
        'programmatically (e.g. resume a saved draft on a specific step).',
    },
  },
};

export default meta;
type Story = StoryObj<NovoStepper>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                              */
/* -------------------------------------------------------------------------- */

/**
 * When to reach for a stepper, when to choose horizontal vs vertical, and the
 * pieces that make it up. The stepper is built on `@angular/cdk/stepper` —
 * most of the public API mirrors the CDK directly.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a stepper</h2>
        <p style="margin: 0 0 1.25rem;">
          A stepper guides the user through a <strong>multi-step process</strong>
          where each step is a discrete chunk of work — filling a form section,
          confirming a choice, reviewing a summary. Show the user where they
          are, where they've been, and what's left. If the task is genuinely
          one piece of work, use a plain form; if the destination is a different
          view, use breadcrumbs or a wizard layout instead.
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
              ✓ Use a stepper when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The task naturally breaks into 3–6 ordered steps</li>
              <li>Each step has its own form / decision / confirmation</li>
              <li>Progress should be visible to the user</li>
              <li>Some steps gate on the previous one being valid</li>
              <li>The flow is recoverable — users can step back and edit</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a stepper when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The task is a single form — just use a form</li>
              <li>Steps don't have a meaningful order — use tabs</li>
              <li>You're navigating across pages — use breadcrumbs / links</li>
              <li>The flow is more than ~7 steps — consider a wizard layout</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Horizontal vs vertical</h2>
        <p style="margin: 0 0 1.25rem;">
          The two variants share an identical API — only the layout differs.
          Pick by the shape of the content, not the platform:
        </p>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong><code>&lt;novo-horizontal-stepper&gt;</code></strong> — step
            headers run across the top, one panel visible at a time. Best when
            each step has a small amount of content and the user benefits from
            a wide canvas (multi-column forms, side-by-side inputs).
          </li>
          <li>
            <strong><code>&lt;novo-vertical-stepper&gt;</code></strong> — step
            headers stack on the left with each panel inline beneath its
            header. Best when steps are uneven in length or you want the user
            to be able to scan past completed steps. Common on narrower
            surfaces like side panels and modals.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Stepper container</strong> —
            <code>&lt;novo-horizontal-stepper&gt;</code> or
            <code>&lt;novo-vertical-stepper&gt;</code>. Carries
            <code>[linear]</code> and exposes <code>next()</code>,
            <code>previous()</code>, <code>reset()</code>, and
            <code>complete()</code>.
          </li>
          <li>
            <strong>Step</strong> — each <code>&lt;novo-step&gt;</code> child.
            Accepts <code>label</code> (string) or a templated label via
            <code>&lt;ng-template novoStepLabel&gt;</code>, plus
            <code>[stepControl]</code> (a <code>FormGroup</code>) to gate
            progression and <code>[optional]</code> to mark a skippable step.
          </li>
          <li>
            <strong>Step header</strong> — renders the step's index (or a
            custom <code>icon</code>) and its label, plus a status icon that
            updates to ✓ once the step is complete.
          </li>
          <li>
            <strong>Step content</strong> — projected into the step. Typically
            a form, plus next/previous controls.
          </li>
          <li>
            <strong>Navigation buttons</strong> — buttons inside a step can
            wear the <code>novoStepperNext</code> /
            <code>novoStepperPrevious</code> attributes to advance / retreat
            automatically (honouring <code>[linear]</code> + step validity).
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Linear mode &amp; validation</h2>
        <p style="margin: 0 0 1.25rem;">
          Set <code>[linear]="true"</code> to force the user through steps in
          order. Bind each step's <code>[stepControl]</code> to a
          <code>FormGroup</code> — the stepper marks the step as complete
          (and unlocks the next one) when the form group becomes valid. Steps
          flagged <code>[optional]="true"</code> can be skipped even in linear
          mode.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            The stepper exposes <code>role="tablist"</code>; each step header
            is a <code>role="tab"</code>. Step content carries
            <code>role="tabpanel"</code> and is linked back to its header via
            <code>aria-labelledby</code>.
          </li>
          <li>
            Arrow keys move focus between step headers; <code>Enter</code> /
            <code>Space</code> selects the focused step (subject to
            <code>[linear]</code>).
          </li>
          <li>
            When you render a custom <code>icon</code> on a step in lieu of
            the index number, make sure the step's label still communicates
            its purpose — the icon alone isn't announced.
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
 * Canonical horizontal stepper — three steps with reactive forms, linear
 * progression, and `novoStepperNext` / `novoStepperPrevious` buttons. This is
 * the shape almost every real-world stepper takes.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ ... })
export class MyStepperComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
  }
}

// component.html
<novo-horizontal-stepper [linear]="true">
  <novo-step [stepControl]="firstFormGroup" label="Fill out your name">
    <form [formGroup]="firstFormGroup">
      <input placeholder="Last name, First name" formControlName="firstCtrl" required />
      <div>
        <button novo-button theme="primary" novoStepperNext>Next</button>
      </div>
    </form>
  </novo-step>

  <novo-step [stepControl]="secondFormGroup">
    <ng-template novoStepLabel>Fill out your address</ng-template>
    <form [formGroup]="secondFormGroup">
      <input placeholder="Address" formControlName="secondCtrl" required />
      <div>
        <button novo-button novoStepperPrevious>Back</button>
        <button novo-button theme="primary" novoStepperNext>Next</button>
      </div>
    </form>
  </novo-step>

  <novo-step>
    <ng-template novoStepLabel>Done</ng-template>
    You are now done.
    <div>
      <button novo-button novoStepperPrevious>Back</button>
      <button novo-button theme="primary">Submit</button>
    </div>
  </novo-step>
</novo-horizontal-stepper>`,
      },
    },
  },
  render: () => {
    const fb = new FormBuilder();
    const firstFormGroup: FormGroup = fb.group({
      firstCtrl: ['', Validators.required],
    });
    const secondFormGroup: FormGroup = fb.group({
      secondCtrl: ['', Validators.required],
    });
    return {
      props: {
        firstFormGroup,
        secondFormGroup,
      },
      template: `
        <novo-horizontal-stepper [linear]="true" data-testid="default-stepper">
          <novo-step [stepControl]="firstFormGroup" label="Fill out your name">
            <form [formGroup]="firstFormGroup">
              <div style="margin: 1rem 0;">
                <input placeholder="Last name, First name" formControlName="firstCtrl" required />
              </div>
              <div>
                <button novo-button theme="primary" novoStepperNext>Next</button>
              </div>
            </form>
          </novo-step>

          <novo-step [stepControl]="secondFormGroup">
            <ng-template novoStepLabel>Fill out your address</ng-template>
            <form [formGroup]="secondFormGroup">
              <div style="margin: 1rem 0;">
                <input placeholder="Address" formControlName="secondCtrl" required />
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button novo-button novoStepperPrevious>Back</button>
                <button novo-button theme="primary" novoStepperNext>Next</button>
              </div>
            </form>
          </novo-step>

          <novo-step>
            <ng-template novoStepLabel>Done</ng-template>
            <p style="margin: 1rem 0;">You are now done.</p>
            <div style="display: flex; gap: 0.5rem;">
              <button novo-button novoStepperPrevious>Back</button>
              <button novo-button theme="primary">Submit</button>
            </div>
          </novo-step>
        </novo-horizontal-stepper>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 3. Horizontal                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Horizontal stepper in non-linear mode — all step headers are clickable from
 * the start, making the flow more like a tabbed wizard. Useful when the user
 * can return to previously-completed steps at will (e.g. a settings review).
 */
export const Horizontal: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-horizontal-stepper>
  <novo-step label="Identity">
    <p>Identity content.</p>
    <button novo-button theme="primary" novoStepperNext>Next</button>
  </novo-step>
  <novo-step label="Account">
    <p>Account content.</p>
    <button novo-button novoStepperPrevious>Back</button>
    <button novo-button theme="primary" novoStepperNext>Next</button>
  </novo-step>
  <novo-step label="Review">
    <p>Review content.</p>
    <button novo-button novoStepperPrevious>Back</button>
  </novo-step>
</novo-horizontal-stepper>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-horizontal-stepper>
        <novo-step label="Identity">
          <p style="margin: 1rem 0;">Identity content.</p>
          <button novo-button theme="primary" novoStepperNext>Next</button>
        </novo-step>
        <novo-step label="Account">
          <p style="margin: 1rem 0;">Account content.</p>
          <div style="display: flex; gap: 0.5rem;">
            <button novo-button novoStepperPrevious>Back</button>
            <button novo-button theme="primary" novoStepperNext>Next</button>
          </div>
        </novo-step>
        <novo-step label="Review">
          <p style="margin: 1rem 0;">Review content.</p>
          <button novo-button novoStepperPrevious>Back</button>
        </novo-step>
      </novo-horizontal-stepper>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Vertical                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Vertical stepper — same API as the horizontal variant, but step headers
 * stack down the left edge with each panel inline beneath its header.
 * Preferred when steps are uneven in length or the workspace is narrow.
 */
export const Vertical: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-vertical-stepper [linear]="true">
  <novo-step label="Personal info">
    <p>Step 1 content.</p>
    <button novo-button theme="primary" novoStepperNext>Next</button>
  </novo-step>
  <novo-step label="Address">
    <p>Step 2 content.</p>
    <button novo-button novoStepperPrevious>Back</button>
    <button novo-button theme="primary" novoStepperNext>Next</button>
  </novo-step>
  <novo-step label="Confirm">
    <p>Step 3 content.</p>
    <button novo-button novoStepperPrevious>Back</button>
  </novo-step>
</novo-vertical-stepper>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-vertical-stepper>
        <novo-step label="Personal info">
          <p style="margin: 0.5rem 0;">Tell us who you are.</p>
          <button novo-button theme="primary" novoStepperNext>Next</button>
        </novo-step>
        <novo-step label="Address">
          <p style="margin: 0.5rem 0;">Where do you live?</p>
          <div style="display: flex; gap: 0.5rem;">
            <button novo-button novoStepperPrevious>Back</button>
            <button novo-button theme="primary" novoStepperNext>Next</button>
          </div>
        </novo-step>
        <novo-step label="Confirm">
          <p style="margin: 0.5rem 0;">Confirm and submit.</p>
          <button novo-button novoStepperPrevious>Back</button>
        </novo-step>
      </novo-vertical-stepper>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Linear                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Linear stepper with form validation — each step is bound to a `FormGroup`
 * via `[stepControl]`. The stepper blocks `novoStepperNext` until the bound
 * form is valid, so the user can't skip ahead with missing data.
 *
 * Mark a step `[optional]="true"` to make it skippable even in linear mode.
 */
export const Linear: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
this.identity = this.fb.group({
  name: ['', Validators.required],
});
this.preferences = this.fb.group({
  channel: [''], // optional step — no required validator
});

// component.html
<novo-vertical-stepper [linear]="true">
  <novo-step [stepControl]="identity" label="Identity">
    <form [formGroup]="identity">
      <input placeholder="Name" formControlName="name" required />
      <button novo-button theme="primary" novoStepperNext>Next</button>
    </form>
  </novo-step>

  <novo-step [stepControl]="preferences" [optional]="true" label="Preferences">
    <form [formGroup]="preferences">
      <input placeholder="Preferred channel" formControlName="channel" />
      <button novo-button novoStepperPrevious>Back</button>
      <button novo-button theme="primary" novoStepperNext>Next</button>
    </form>
  </novo-step>

  <novo-step label="Confirm">
    <p>All done.</p>
    <button novo-button novoStepperPrevious>Back</button>
  </novo-step>
</novo-vertical-stepper>`,
      },
    },
  },
  render: () => {
    const fb = new FormBuilder();
    const identity: FormGroup = fb.group({
      name: ['', Validators.required],
    });
    const preferences: FormGroup = fb.group({
      channel: [''],
    });
    return {
      props: { identity, preferences },
      template: `
        <novo-vertical-stepper [linear]="true">
          <novo-step [stepControl]="identity" label="Identity">
            <form [formGroup]="identity">
              <div style="margin: 0.5rem 0;">
                <input placeholder="Name" formControlName="name" required />
              </div>
              <button novo-button theme="primary" novoStepperNext>Next</button>
            </form>
          </novo-step>

          <novo-step [stepControl]="preferences" [optional]="true" label="Preferences">
            <form [formGroup]="preferences">
              <div style="margin: 0.5rem 0;">
                <input placeholder="Preferred channel" formControlName="channel" />
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button novo-button novoStepperPrevious>Back</button>
                <button novo-button theme="primary" novoStepperNext>Next</button>
              </div>
            </form>
          </novo-step>

          <novo-step label="Confirm">
            <p style="margin: 0.5rem 0;">All done.</p>
            <button novo-button novoStepperPrevious>Back</button>
          </novo-step>
        </novo-vertical-stepper>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 6. WithIcons                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Each step's header icon and accent theme are configurable via the
 * `[icon]` and `[theme]` inputs on `<novo-step>`. The status icon (the small
 * ✓ / circle indicator that tracks completion) is rendered automatically;
 * the step icon replaces the default step number on the header.
 */
export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-horizontal-stepper>
  <novo-step label="Candidate" icon="candidate" theme="candidate">
    <p>Step 1 content.</p>
    <button novo-button theme="primary" novoStepperNext>Next</button>
  </novo-step>
  <novo-step label="Contact" icon="person" theme="contact">
    <p>Step 2 content.</p>
    <button novo-button novoStepperPrevious>Back</button>
    <button novo-button theme="primary" novoStepperNext>Next</button>
  </novo-step>
  <novo-step label="Job" icon="job" theme="job">
    <p>Step 3 content.</p>
    <button novo-button novoStepperPrevious>Back</button>
  </novo-step>
</novo-horizontal-stepper>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-horizontal-stepper>
        <novo-step label="Candidate" icon="candidate" theme="candidate">
          <p style="margin: 1rem 0;">Step 1 content.</p>
          <button novo-button theme="primary" novoStepperNext>Next</button>
        </novo-step>
        <novo-step label="Contact" icon="person" theme="contact">
          <p style="margin: 1rem 0;">Step 2 content.</p>
          <div style="display: flex; gap: 0.5rem;">
            <button novo-button novoStepperPrevious>Back</button>
            <button novo-button theme="primary" novoStepperNext>Next</button>
          </div>
        </novo-step>
        <novo-step label="Job" icon="job" theme="job">
          <p style="margin: 1rem 0;">Step 3 content.</p>
          <button novo-button novoStepperPrevious>Back</button>
        </novo-step>
      </novo-horizontal-stepper>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. CustomButtons                                                           */
/* -------------------------------------------------------------------------- */

/**
 * The `novoStepperNext` / `novoStepperPrevious` directives are the
 * recommended path — they pick up the stepper context, honour
 * `[linear]`-mode gating, and play nicely with keyboard navigation. When you
 * need bespoke behaviour (custom labels, conditional skipping, calling
 * `complete()` instead of `next()` on the last step), call the stepper
 * methods directly via a template reference.
 *
 * `stepper.complete()` marks the current step complete *and* advances —
 * useful for the terminal "Submit" button.
 */
export const CustomButtons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-horizontal-stepper #stepper>
  <novo-step label="One">
    <p>First step.</p>
    <button novo-button theme="primary" (click)="stepper.next()">Continue</button>
  </novo-step>

  <novo-step label="Two">
    <p>Second step.</p>
    <button novo-button (click)="stepper.previous()">Go back</button>
    <button novo-button theme="primary" (click)="stepper.next()">Almost there</button>
  </novo-step>

  <novo-step label="Three">
    <p>All set.</p>
    <button novo-button (click)="stepper.previous()">Go back</button>
    <button novo-button color="success" (click)="stepper.complete()">Finish</button>
    <button novo-button theme="dialogue" (click)="stepper.reset()">Start over</button>
  </novo-step>
</novo-horizontal-stepper>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-horizontal-stepper #stepper>
        <novo-step label="One">
          <p style="margin: 1rem 0;">First step.</p>
          <button novo-button theme="primary" (click)="stepper.next()">Continue</button>
        </novo-step>

        <novo-step label="Two">
          <p style="margin: 1rem 0;">Second step.</p>
          <div style="display: flex; gap: 0.5rem;">
            <button novo-button (click)="stepper.previous()">Go back</button>
            <button novo-button theme="primary" (click)="stepper.next()">Almost there</button>
          </div>
        </novo-step>

        <novo-step label="Three">
          <p style="margin: 1rem 0;">All set.</p>
          <div style="display: flex; gap: 0.5rem;">
            <button novo-button (click)="stepper.previous()">Go back</button>
            <button novo-button color="success" (click)="stepper.complete()">Finish</button>
            <button novo-button theme="dialogue" (click)="stepper.reset()">Start over</button>
          </div>
        </novo-step>
      </novo-horizontal-stepper>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. AdvanceInteraction (play)                                               */
/* -------------------------------------------------------------------------- */

/**
 * Interactive proof that the stepper advances correctly when the user clicks
 * `novoStepperNext`. The `play` function clicks the Next button on step 1
 * and asserts that step 2 becomes the selected step (its panel is the only
 * one with `aria-expanded="true"`).
 */
export const AdvanceInteraction: Story = {
  name: 'Advance Interaction',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-horizontal-stepper>
  <novo-step label="Step One">
    <p>First step.</p>
    <button novo-button theme="primary" novoStepperNext>Next</button>
  </novo-step>
  <novo-step label="Step Two">
    <p>Second step.</p>
    <button novo-button novoStepperPrevious>Back</button>
  </novo-step>
</novo-horizontal-stepper>`,
      },
    },
  },
  render: () => ({
    template: `
      <novo-horizontal-stepper data-testid="advance-stepper">
        <novo-step label="Step One">
          <p style="margin: 1rem 0;">First step content.</p>
          <button novo-button theme="primary" novoStepperNext data-testid="step-one-next">Next</button>
        </novo-step>
        <novo-step label="Step Two">
          <p style="margin: 1rem 0;" data-testid="step-two-content">Second step content.</p>
          <button novo-button novoStepperPrevious>Back</button>
        </novo-step>
      </novo-horizontal-stepper>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify step one is initially selected', async () => {
      await waitFor(async () => {
        const headers = canvasElement.querySelectorAll('novo-step-header');
        await expect(headers.length).toBeGreaterThanOrEqual(2);
        await expect(headers[0].getAttribute('aria-selected')).toBe('true');
        await expect(headers[1].getAttribute('aria-selected')).toBe('false');
      });
    });

    await step('Click the "Next" button on step one', async () => {
      const nextButton = await canvas.findByTestId('step-one-next');
      await userEvent.click(nextButton);
    });

    await step('Verify step two is now the selected step', async () => {
      await waitFor(async () => {
        const headers = canvasElement.querySelectorAll('novo-step-header');
        await expect(headers[0].getAttribute('aria-selected')).toBe('false');
        await expect(headers[1].getAttribute('aria-selected')).toBe('true');
      });
    });
  },
};

/* -------------------------------------------------------------------------- */
/* 9. Playground                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Every meta input wired to a control. Toggle `linear` to see how the gating
 * changes step-header clickability; tweak `selectedIndex` to programmatically
 * jump to a specific step.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    linear: false,
    selectedIndex: 0,
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-horizontal-stepper [linear]="linear" [selectedIndex]="selectedIndex">
  <novo-step label="Step 1">…</novo-step>
  <novo-step label="Step 2">…</novo-step>
  <novo-step label="Step 3">…</novo-step>
</novo-horizontal-stepper>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-horizontal-stepper [linear]="linear" [selectedIndex]="selectedIndex">
        <novo-step label="Step 1">
          <p style="margin: 1rem 0;">Step 1 content.</p>
          <button novo-button theme="primary" novoStepperNext>Next</button>
        </novo-step>
        <novo-step label="Step 2">
          <p style="margin: 1rem 0;">Step 2 content.</p>
          <div style="display: flex; gap: 0.5rem;">
            <button novo-button novoStepperPrevious>Back</button>
            <button novo-button theme="primary" novoStepperNext>Next</button>
          </div>
        </novo-step>
        <novo-step label="Step 3">
          <p style="margin: 1rem 0;">Step 3 content.</p>
          <button novo-button novoStepperPrevious>Back</button>
        </novo-step>
      </novo-horizontal-stepper>
    `,
  }),
};
