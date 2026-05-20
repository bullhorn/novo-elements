import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from 'storybook/test';

import { NovoSliderElement } from './Slider';
import { NovoSliderModule } from './Slider.module';

/**
 * Stories for `<novo-slider>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 *
 * Note: despite the name, `<novo-slider>` is **not** a numeric range slider —
 * it is a content carousel / slideshow. It projects a fixed number of
 * `<div slide="…">` children, exposes Back/Next controls plus an indicator
 * dot row, and tracks the current slide internally. There is no value model,
 * no `ngModel` / `ControlValueAccessor`, no min/max/step, no orientation
 * option, no disabled state, no `label` input. The only public input is
 * `slides` — the **count** of slide children.
 */
const meta: Meta<NovoSliderElement> = {
  title: 'Elements/Slider',
  component: NovoSliderElement,
  decorators: [
    moduleMetadata({
      imports: [NovoSliderModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A content carousel that paginates through a fixed set of projected slides. Renders Back/Next controls ' +
          'and a row of indicator dots; the current slide is tracked internally. The single public input is ' +
          '`slides` (the count of `<div slide="…">` children); each slide is provided via `<ng-content>`. The Next ' +
          'button on the final slide can be replaced by projecting a `<button>` as the last child.',
      },
    },
  },
  argTypes: {
    slides: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description:
        'Total number of slides being projected. Must match the number of `<div slide="…">` children. ' +
        'Drives the count of indicator dots and the back/next button visibility.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoSliderElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Clarifies what `<novo-slider>` is (a content
 * carousel) and what it is **not** (a numeric range input), covers when it's
 * the right control, and lists accessibility caveats.
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
        <div style="
          background: #fff8e1;
          border-left: 4px solid #f0b400;
          padding: 0.75rem 1rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
        ">
          <strong>Heads up — naming.</strong> Despite the component name,
          <code>&lt;novo-slider&gt;</code> is a <em>content carousel</em>, not
          a numeric range slider. There is no <code>ngModel</code> value, no
          min/max/step, and no orientation toggle. If you need a value
          selector, use <code>&lt;novo-slider-input&gt;</code> (when
          available) or <code>&lt;input type="number"&gt;</code> inside a
          <code>&lt;novo-field&gt;</code>.
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use the slider</h2>
        <p style="margin: 0 0 1.25rem;">
          Use <code>&lt;novo-slider&gt;</code> to walk a user through a small,
          ordered sequence of panels — an onboarding tour, a multi-step
          informational walkthrough, a feature highlight reel. The user always
          progresses linearly via the built-in Back / Next controls.
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
              ✓ Use a slider when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Walking the user through a short onboarding tour</li>
              <li>Showcasing 2–5 product highlights in a fixed order</li>
              <li>Presenting a guided informational sequence (the user shouldn't skip ahead)</li>
              <li>Embedding marketing or empty-state content inside a card</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a slider when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>You need a numeric value input — use a number field or stepper</li>
              <li>You need to pick a range — use two number inputs or a range picker</li>
              <li>You want a multi-step <em>form</em> — use <code>&lt;novo-stepper&gt;</code></li>
              <li>You're displaying a long, unbounded list — use scroll or pagination</li>
              <li>The user needs to jump to any panel directly — use tabs</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Slides</strong> — projected as
            <code>&lt;div slide="0"&gt;</code>,
            <code>&lt;div slide="1"&gt;</code>, etc. The
            <code>slide</code> attribute is the zero-based index; only one
            slide is visible at a time and the component animates a CSS
            translate between them.
          </li>
          <li>
            <strong>Indicators</strong> — one dot per slide, automatically
            generated from the <code>slides</code> count. The active dot is
            filled.
          </li>
          <li>
            <strong>Back / Next buttons</strong> — automatically shown unless
            the user is on the first / last slide. The Next label is sourced
            from <code>NovoLabelService.next</code>.
          </li>
          <li>
            <strong>End button (optional)</strong> — project a
            <code>&lt;button&gt;</code> as the last child to replace the
            default Next on the final slide (typical pattern: a "Finish" or
            "Get Started" CTA).
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">API at a glance</h2>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li><code>slides</code> (input) — total slide count.</li>
          <li>No value model. The component is uncontrolled.</li>
          <li>No <code>disabled</code>, no <code>label</code>, no orientation.</li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            The component intercepts <kbd>Tab</kbd> inside its host element —
            be deliberate about what focusable content lives inside each
            slide.
          </li>
          <li>
            The indicator row is decorative; it is not keyboard-interactive.
            Users advance only via the Back / Next buttons.
          </li>
          <li>
            Provide a meaningful label on any projected end-button
            (Finish / Done / Get Started) so screen readers announce the
            terminal action.
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
 * The simplest slider — two projected slides and the built-in Back / Next
 * controls. Adjust the `slides` arg to add or remove slides; the dot row
 * updates to match.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoSliderModule } from 'novo-elements';

// <novo-slider> is a content-projected carousel; [slides] is the count of
// projected children.
@Component({
  selector: 'my-slider-demo',
  imports: [NovoSliderModule],
  templateUrl: './my-slider-demo.component.html',
})
export class MySliderDemoComponent {
  slides = 2;
}

// component.html
<novo-slider [slides]="slides">
  <div slide="0">First slide</div>
  <div slide="1">Second slide</div>
</novo-slider>`,
      },
    },
  },
  args: {
    slides: 2,
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-slider [slides]="slides">
        <div slide="0">SLIDE #1</div>
        <div slide="1">SLIDE #2</div>
      </novo-slider>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. ThreeSlides                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Three slides — the indicator row scales with the `slides` count. Each
 * `<div slide="i">` is projected; the component handles the translate
 * animation between them.
 */
export const ThreeSlides: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoSliderModule } from 'novo-elements';

@Component({
  selector: 'my-three-slides',
  imports: [NovoSliderModule],
  templateUrl: './my-three-slides.component.html',
})
export class MyThreeSlidesComponent {}

// component.html
<novo-slider [slides]="3">
  <div slide="0">First slide</div>
  <div slide="1">Second slide</div>
  <div slide="2">Third slide</div>
</novo-slider>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <novo-slider [slides]="3">
        <div slide="0">
          <h3 style="margin: 0;">Welcome</h3>
          <p>Start here for a quick tour.</p>
        </div>
        <div slide="1">
          <h3 style="margin: 0;">Highlights</h3>
          <p>The features you'll use most often.</p>
        </div>
        <div slide="2">
          <h3 style="margin: 0;">You're ready</h3>
          <p>Jump in and start working.</p>
        </div>
      </novo-slider>
    `,
  }),
  // Structural smoke test: three indicator dots render and slot 0 is active.
  //
  // We can't drive the carousel from here because `NovoSliderElement`
  // initialises both `start = true` and `end = true` and only flips them
  // inside `changeSlide()` — so the prev/next buttons (`*ngIf="!start"` /
  // `*ngIf="!end"`) are missing from the DOM on first render. See the
  // ISSUES_BACKLOG entry for "novo-slider start/end initial state". Once
  // that's fixed, extend this play to click Next and assert the indicator
  // advances.
  play: async ({ canvasElement }) => {
    const indicators = canvasElement.querySelectorAll('.indicator-circle');
    await expect(indicators.length).toBe(3);
    await expect(indicators[0].classList.contains('active')).toBe(true);
  },
};

/* -------------------------------------------------------------------------- */
/* 4. WithImages                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Each slide can hold arbitrary projected content, including imagery. The
 * `<section class="slides">` container constrains the layout via flexbox —
 * keep individual slide markup self-contained.
 */
export const WithImages: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoSliderModule } from 'novo-elements';

@Component({
  selector: 'my-slider-with-images',
  imports: [NovoSliderModule],
  templateUrl: './my-slider-with-images.component.html',
})
export class MySliderWithImagesComponent {}

// component.html
<novo-slider [slides]="3">
  <div slide="0"><img src="/assets/images/slide-1.png" alt="Slide 1" /></div>
  <div slide="1"><img src="/assets/images/slide-2.png" alt="Slide 2" /></div>
  <div slide="2"><img src="/assets/images/slide-3.png" alt="Slide 3" /></div>
</novo-slider>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <novo-slider [slides]="3">
        <div slide="0">
          <img src="/assets/images/ButtonAnatomy.png" alt="" style="max-width: 320px;" />
          <p style="text-align: center;">Anatomy of a button</p>
        </div>
        <div slide="1">
          <img src="/assets/images/ButtonTypes.png" alt="" style="max-width: 320px;" />
          <p style="text-align: center;">Button treatments</p>
        </div>
        <div slide="2">
          <img src="/assets/images/ButtonOverview.png" alt="" style="max-width: 320px;" />
          <p style="text-align: center;">Color × treatment matrix</p>
        </div>
      </novo-slider>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. WithEndButton                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Project a `<button>` as the final child to replace the built-in Next on
 * the last slide. The typical pattern is a terminal call-to-action — Finish,
 * Done, Get Started — emitting its own click event for the host page to
 * handle (close a modal, navigate, etc.).
 */
export const WithEndButton: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoButtonModule, NovoSliderModule } from 'novo-elements';

// Project a <button> as the final child to override the built-in Next button
// on the last slide. The button can fire any handler the host needs.
@Component({
  selector: 'my-slider-end-button',
  imports: [NovoButtonModule, NovoSliderModule],
  templateUrl: './my-slider-end-button.component.html',
})
export class MySliderEndButtonComponent {
  finish() {
    console.log('finished');
  }
}

// component.html
<novo-slider [slides]="3">
  <div slide="0">Welcome</div>
  <div slide="1">Tell us about you</div>
  <div slide="2">All set!</div>
  <button theme="primary" (click)="finish()">Get started</button>
</novo-slider>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <novo-slider [slides]="2">
        <div slide="0">
          <h3 style="margin: 0;">All set?</h3>
          <p>Two slides, with a custom final CTA.</p>
        </div>
        <div slide="1">
          <h3 style="margin: 0;">Last slide</h3>
          <p>The Next button below is projected, not built-in.</p>
        </div>
        <button theme="primary">Get Started</button>
      </novo-slider>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. The slide markup is fixed at four; change
 * the `slides` count to see how the indicator row, Back, and Next buttons
 * react when the count doesn't match the projected children (the component
 * trusts the input, so mismatches are real bugs in consumer code).
 */
export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoSliderModule } from 'novo-elements';

@Component({
  selector: 'my-slider-playground',
  imports: [NovoSliderModule],
  templateUrl: './my-slider-playground.component.html',
})
export class MySliderPlaygroundComponent {
  slides = 4;
}

// component.html
<novo-slider [slides]="slides">
  <div slide="0">Slide 1</div>
  <div slide="1">Slide 2</div>
  <div slide="2">Slide 3</div>
  <div slide="3">Slide 4</div>
</novo-slider>`,
      },
    },
  },
  name: '🎮 Playground',
  args: {
    slides: 4,
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-slider [slides]="slides">
        <div slide="0">Slide #1</div>
        <div slide="1">Slide #2</div>
        <div slide="2">Slide #3</div>
        <div slide="3">Slide #4</div>
      </novo-slider>
    `,
  }),
};
