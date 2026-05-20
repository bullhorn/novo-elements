import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { userEvent, within, expect, waitFor } from 'storybook/test';

import { NovoButtonModule } from 'novo-elements/elements/button';

import { NovoModalElement } from './modal.component';
import { NovoModalModule } from './modal.module';
import { NovoModalRef } from './modal-ref';
import { NovoModalService } from './modal.service';

/* -------------------------------------------------------------------------- */
/* Helper components — declared in moduleMetadata below.                       */
/* -------------------------------------------------------------------------- */

/**
 * Canonical `<novo-modal>` content. The host component (the one the
 * consumer passes to `modalService.open()`) is the modal body — its
 * template must contain a `<novo-modal>` (or `<novo-notification>`) root.
 */
@Component({
  selector: 'demo-edit-modal',
  template: `
    <novo-modal>
      <header>
        <h2 style="margin: 0;">Edit Candidate</h2>
      </header>
      <section>
        <p>Update the candidate's contact information below.</p>
        <p style="color: #6b7280; font-size: 0.875rem;">
          Form fields would render here in a real workflow.
        </p>
      </section>
      <novo-button theme="standard" (click)="close()">Cancel</novo-button>
      <novo-button theme="primary" icon="check" (click)="save()">Save</novo-button>
    </novo-modal>
  `,
  standalone: false,
})
class DemoEditModalComponent {
  constructor(private modalRef: NovoModalRef) {}
  close() {
    this.modalRef.close();
  }
  save() {
    this.modalRef.close('saved');
  }
}

/**
 * Sized variant — demonstrates that the consumer controls the modal's
 * width/height via CSS on the projected content (the library does not
 * expose a `size` input on `<novo-modal>`).
 */
@Component({
  selector: 'demo-sized-modal',
  template: `
    <novo-modal [style.width.px]="width">
      <header>
        <h2 style="margin: 0;">{{ heading }}</h2>
      </header>
      <section>
        <p>{{ body }}</p>
      </section>
      <novo-button theme="primary" (click)="close()">Close</novo-button>
    </novo-modal>
  `,
  standalone: false,
})
class DemoSizedModalComponent {
  @Input() width = 480;
  @Input() heading = 'Sized Modal';
  @Input() body = 'Width controlled via [style.width.px] on novo-modal.';
  constructor(private modalRef: NovoModalRef) {}
  close() {
    this.modalRef.close();
  }
}

/** Notification — success. */
@Component({
  selector: 'demo-success-notification',
  template: `
    <novo-notification type="success">
      <h1>Saved successfully</h1>
      <h2>Your changes have been written.</h2>
      <novo-button theme="primary" icon="check" (click)="close()">Got it</novo-button>
    </novo-notification>
  `,
  standalone: false,
})
class DemoSuccessNotificationComponent {
  constructor(private modalRef: NovoModalRef) {}
  close() {
    this.modalRef.close();
  }
}

/** Notification — warning (destructive confirmation). */
@Component({
  selector: 'demo-warning-notification',
  template: `
    <novo-notification type="warning">
      <h1>This action will delete 25 records.</h1>
      <h2>Are you sure you wish to continue?</h2>
      <novo-button theme="standard" (click)="close()">Cancel</novo-button>
      <novo-button theme="primary" color="negative" icon="delete" (click)="close()">Delete</novo-button>
    </novo-notification>
  `,
  standalone: false,
})
class DemoWarningNotificationComponent {
  constructor(private modalRef: NovoModalRef) {}
  close() {
    this.modalRef.close();
  }
}

/** Notification — error. */
@Component({
  selector: 'demo-error-notification',
  template: `
    <novo-notification type="error">
      <h1>Something went wrong.</h1>
      <h2>The request failed. Please try again.</h2>
      <novo-button theme="primary" icon="refresh-o" (click)="close()">Retry</novo-button>
    </novo-notification>
  `,
  standalone: false,
})
class DemoErrorNotificationComponent {
  constructor(private modalRef: NovoModalRef) {}
  close() {
    this.modalRef.close();
  }
}

/** Notification — custom icon. */
@Component({
  selector: 'demo-custom-notification',
  template: `
    <novo-notification type="custom" icon="trending-up">
      <h1>Trending content</h1>
      <h2>The custom type accepts any Bullhorn icon name.</h2>
      <novo-button theme="primary" icon="check" (click)="close()">Sweet</novo-button>
    </novo-notification>
  `,
  standalone: false,
})
class DemoCustomNotificationComponent {
  constructor(private modalRef: NovoModalRef) {}
  close() {
    this.modalRef.close();
  }
}

/**
 * Generic "open this modal" trigger button. Each story passes the
 * component class to open via `[component]`. The wrapper injects
 * `NovoModalService` (globally `providedIn: 'root'`) and calls
 * `.open()` on click.
 */
@Component({
  selector: 'demo-modal-trigger',
  template: `
    <novo-button theme="secondary" (click)="open()">{{ label }}</novo-button>
  `,
  standalone: false,
})
class DemoModalTriggerComponent {
  @Input() component: any;
  @Input() label = 'Open modal';
  @Input() params: Record<string, any> = {};
  constructor(private modalService: NovoModalService) {}
  open() {
    this.modalService.open(this.component, this.params);
  }
}

/* -------------------------------------------------------------------------- */
/* Meta                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Stories for `<novo-modal>` and the `NovoModalService`. Follows the
 * conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts`.
 *
 * Modal is **service-driven**: the consumer calls
 * `modalService.open(MyComponent)` rather than dropping `<novo-modal>` into
 * a template directly. The story uses a small `<demo-modal-trigger>` wrapper
 * that injects the service and calls `.open()` on click.
 */
const meta: Meta<NovoModalElement> = {
  title: 'Overlays/Modal',
  component: NovoModalElement,
  decorators: [
    moduleMetadata({
      // `NovoModalService` is `providedIn: 'root'`, so it does not need
      // to be registered here. Forms / animations / HttpClient are
      // provided globally via `.storybook/preview.ts`.
      imports: [NovoModalModule, NovoButtonModule],
      declarations: [
        DemoEditModalComponent,
        DemoSizedModalComponent,
        DemoSuccessNotificationComponent,
        DemoWarningNotificationComponent,
        DemoErrorNotificationComponent,
        DemoCustomNotificationComponent,
        DemoModalTriggerComponent,
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A pop-up dialog that appears on top of the main content, requiring the user to focus only on the ' +
          "content the modal presents. Use to inform the user of something critical, force a decision, or " +
          'extend a series of tasks. Open via `NovoModalService.open(MyComponent, params)` — the returned ' +
          '`NovoModalRef` exposes `close(result)`, `afterClosed()`, and `beforeClose()`. The opened component ' +
          'must use `<novo-modal>` (workflow) or `<novo-notification>` (confirmation) as its template root.',
      },
    },
  },
  // `<novo-modal>` itself has no inputs — the documented API is the service.
  argTypes: {},
};

export default meta;
type Story = StoryObj<NovoModalElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide for the Modal family. Covers when to reach for a
 * modal vs. a toast or slideout, the anatomy of workflow and notification
 * modals, and the accessibility expectations (focus trap, Escape to close,
 * `role="alertdialog"`).
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a modal</h2>
        <p style="margin: 0 0 1.25rem;">
          A modal is a pop-up dialog that appears on top of the main content,
          requiring the user to focus only on the content the modal presents.
          Use to inform of something critical, force a decision, or extend a
          series of tasks. There are two categories: <strong>workflow</strong>
          (multi-input tasks related to the underlying screen) and
          <strong>notification</strong> (single confirmation, success, warning,
          or error).
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
              ✓ Use a modal when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Confirming an irreversible action (delete, navigate away from unsaved work)</li>
              <li>Warning that an action will affect other records</li>
              <li>Running a task directly related to the main content (e.g. assigning candidates to a shift)</li>
              <li>Forcing the user to pick between mutually exclusive options before they continue</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a modal when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Confirming an action that has already completed — use a <strong>toast</strong></li>
              <li>The task is unrelated to the main content — open a new page or use a <strong>slideout</strong></li>
              <li>The content requires significant scrolling — promote to a full page</li>
              <li>The user needs to see the underlying screen to make a decision — use a popover</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          A workflow modal projects three slots: <code>header</code>,
          <code>section</code>, and a footer of buttons. A notification modal
          uses <code>&lt;novo-notification&gt;</code> instead and projects a
          label, headings, copy, and buttons.
        </p>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li><strong>Container</strong> — provided by <code>&lt;novo-modal&gt;</code> / <code>&lt;novo-notification&gt;</code>. Centered over the page with a backdrop.</li>
          <li><strong>Header</strong> — title row. For workflow modals, project a <code>&lt;header&gt;</code>. For notifications, project a <code>&lt;label&gt;</code>.</li>
          <li><strong>Icon</strong> (notification only) — set automatically from <code>type</code> (<code>success</code>, <code>warning</code>, <code>error</code>) or via <code>icon</code> when <code>type="custom"</code>.</li>
          <li><strong>Content</strong> — the body. For workflow, a <code>&lt;section&gt;</code>. For notifications, projected <code>&lt;h1&gt;</code> / <code>&lt;h2&gt;</code> / <code>&lt;p&gt;</code>.</li>
          <li><strong>Footer</strong> — one or more <code>&lt;novo-button&gt;</code> elements. Use a Primary + Standard pair; switch the Primary to <code>color="negative"</code> for destructive actions.</li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Opening a modal</h2>
        <p style="margin: 0 0 1rem;">
          The modal is service-driven. Inject <code>NovoModalService</code>
          and call <code>.open(MyComponent, params)</code>. The returned
          <code>NovoModalRef</code> exposes <code>close(result)</code>,
          <code>afterClosed()</code>, and <code>beforeClose()</code>. The
          component you pass becomes the dialog body — its template must
          contain a <code>&lt;novo-modal&gt;</code> or
          <code>&lt;novo-notification&gt;</code> root.
        </p>
        <pre style="
          background: #f6f8fa;
          padding: 1rem;
          border-radius: 6px;
          overflow-x: auto;
          margin: 0 0 2rem;
        "><code>// host.component.ts
constructor(private modalService: NovoModalService) &#123;&#125;

openEdit() &#123;
  const ref = this.modalService.open(EditCandidateModal, &#123; candidateId: 42 &#125;);
  ref.afterClosed().subscribe(result =&gt; &#123; /* handle result */ &#125;);
&#125;</code></pre>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li><strong>Escape</strong> closes the modal (CDK overlay default).</li>
          <li>Clicking the backdrop closes the modal.</li>
          <li>Focus should move into the modal when it opens and return to the trigger when it closes.</li>
          <li>Convey meaning via icon and copy — not just color. Red Primary alone is not enough to flag a destructive action.</li>
        </ul>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 2. Default                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Canonical workflow modal — header, body, and footer buttons. Click the
 * trigger to open. The host component (`DemoEditModalComponent` in this
 * story) is what you'd write in your own app; the trigger button injects
 * `NovoModalService` and calls `.open()`.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// edit-candidate-modal.component.ts
import { Component } from '@angular/core';
import { NovoModalRef } from 'novo-elements';

@Component({
  selector: 'edit-candidate-modal',
  template: \`
    <novo-modal>
      <header>
        <h2>Edit Candidate</h2>
      </header>
      <section>
        <p>Update the candidate's contact information below.</p>
      </section>
      <novo-button theme="standard" (click)="close()">Cancel</novo-button>
      <novo-button theme="primary" icon="check" (click)="save()">Save</novo-button>
    </novo-modal>
  \`,
})
export class EditCandidateModal {
  constructor(private modalRef: NovoModalRef) {}
  close() { this.modalRef.close(); }
  save()  { this.modalRef.close('saved'); }
}

// host.component.ts
import { Component } from '@angular/core';
import { NovoModalService } from 'novo-elements';
import { EditCandidateModal } from './edit-candidate-modal.component';

@Component({
  selector: 'my-host',
  template: \`<novo-button theme="secondary" (click)="open()">Edit Candidate</novo-button>\`,
})
export class MyHost {
  constructor(private modalService: NovoModalService) {}
  open() { this.modalService.open(EditCandidateModal); }
}`,
      },
    },
  },
  render: () => ({
    props: {
      modalComponent: DemoEditModalComponent,
    },
    template: `
      <demo-modal-trigger
        [component]="modalComponent"
        label="Edit Candidate"
        data-testid="open-default-modal"
      ></demo-modal-trigger>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // `<novo-button>` does not render a native `<button>` — it sets
    // `role="button"` on its own host. The `(click)` listener is on the
    // novo-button, so clicking the wrapper would bubble *up* and miss the
    // handler entirely. Click the role-button element directly.
    const trigger = await canvas.findByRole('button', { name: /edit candidate/i });
    await userEvent.click(trigger);
    // CDK overlay portals to document.body. Scope queries to the overlay
    // container to avoid colliding with the trigger button text (which
    // also says "Edit Candidate") elsewhere in document.body.
    const overlay = await waitFor(() => {
      const el = document.querySelector<HTMLElement>('.cdk-overlay-container');
      if (!el) throw new Error('cdk-overlay-container not yet rendered');
      return el;
    });
    const inOverlay = within(overlay);
    await expect(await inOverlay.findByText(/Update the candidate's contact information/)).toBeInTheDocument();
    await expect(await inOverlay.findByRole('button', { name: /save/i })).toBeInTheDocument();
  },
};

/* -------------------------------------------------------------------------- */
/* 3. WithActions                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The footer projects any `<novo-button>` children. Pair a Primary
 * confirm with a Standard cancel; use `color="negative"` on the Primary
 * when the action is destructive.
 */
export const WithActions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-modal>
  <header><h2>Delete Candidate</h2></header>
  <section><p>This will permanently remove the record.</p></section>
  <novo-button theme="standard" (click)="close()">Cancel</novo-button>
  <novo-button theme="primary" color="negative" icon="delete" (click)="confirm()">Delete</novo-button>
</novo-modal>`,
      },
    },
  },
  render: () => ({
    props: {
      modalComponent: DemoWarningNotificationComponent,
    },
    template: `
      <demo-modal-trigger
        [component]="modalComponent"
        label="Open destructive confirmation"
      ></demo-modal-trigger>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. NotificationVariants                                                     */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-notification>` is a compact single-purpose modal for confirmations
 * and status messages. `type` selects the indicator icon: `success`,
 * `warning`, `error`, or `custom` (paired with an `icon` input). A close
 * `x` is rendered automatically in the top-right.
 */
export const NotificationVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- success -->
<novo-notification type="success">
  <h1>Saved successfully</h1>
  <h2>Your changes have been written.</h2>
  <novo-button theme="primary" icon="check" (click)="close()">Got it</novo-button>
</novo-notification>

<!-- warning -->
<novo-notification type="warning">
  <h1>This action will delete 25 records.</h1>
  <h2>Are you sure you wish to continue?</h2>
  <novo-button theme="standard" (click)="close()">Cancel</novo-button>
  <novo-button theme="primary" color="negative" icon="delete" (click)="close()">Delete</novo-button>
</novo-notification>

<!-- error -->
<novo-notification type="error">
  <h1>Something went wrong.</h1>
  <h2>The request failed. Please try again.</h2>
  <novo-button theme="primary" icon="refresh-o" (click)="close()">Retry</novo-button>
</novo-notification>

<!-- custom icon -->
<novo-notification type="custom" icon="trending-up">
  <h1>Trending content</h1>
  <h2>The custom type accepts any Bullhorn icon name.</h2>
  <novo-button theme="primary" icon="check" (click)="close()">Sweet</novo-button>
</novo-notification>`,
      },
    },
  },
  render: () => ({
    props: {
      successModal: DemoSuccessNotificationComponent,
      warningModal: DemoWarningNotificationComponent,
      errorModal: DemoErrorNotificationComponent,
      customModal: DemoCustomNotificationComponent,
    },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <demo-modal-trigger [component]="successModal" label="Success"></demo-modal-trigger>
        <demo-modal-trigger [component]="warningModal" label="Warning"></demo-modal-trigger>
        <demo-modal-trigger [component]="errorModal" label="Error"></demo-modal-trigger>
        <demo-modal-trigger [component]="customModal" label="Custom icon"></demo-modal-trigger>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Sizes                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The library doesn't expose a `size` input — the consumer controls the
 * modal's footprint via CSS on the projected content. A wider modal helps
 * multi-column workflow forms; a narrower one keeps a confirmation focused.
 */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Width is set by the consumer; the library has no size input. -->
<novo-modal [style.width.px]="360">
  <header><h2>Compact</h2></header>
  <section><p>360px wide.</p></section>
  <novo-button theme="primary" (click)="close()">Close</novo-button>
</novo-modal>

<novo-modal [style.width.px]="720">
  <header><h2>Wide</h2></header>
  <section><p>720px wide — good for multi-column forms.</p></section>
  <novo-button theme="primary" (click)="close()">Close</novo-button>
</novo-modal>`,
      },
    },
  },
  render: () => ({
    props: {
      sizedModal: DemoSizedModalComponent,
      smallParams: { width: 360, heading: 'Compact modal', body: '360px wide — single-column confirmation footprint.' },
      mediumParams: { width: 520, heading: 'Default modal', body: '520px wide — typical workflow body.' },
      wideParams: { width: 720, heading: 'Wide modal', body: '720px wide — multi-column form-heavy workflows.' },
    },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <demo-modal-trigger [component]="sizedModal" [params]="smallParams" label="Small (360px)"></demo-modal-trigger>
        <demo-modal-trigger [component]="sizedModal" [params]="mediumParams" label="Medium (520px)"></demo-modal-trigger>
        <demo-modal-trigger [component]="sizedModal" [params]="wideParams" label="Wide (720px)"></demo-modal-trigger>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. CustomContent                                                            */
/* -------------------------------------------------------------------------- */

/**
 * The modal body is whatever the host component renders inside the
 * `<section>` slot — typically a `<novo-form>` for edit workflows, but any
 * markup works. The footer accepts any number of `<novo-button>`
 * children.
 */
export const CustomContent: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// Any component template root'd in <novo-modal> works.
@Component({
  template: \`
    <novo-modal>
      <header><h2>Custom layout</h2></header>
      <section>
        <novo-form [form]="myForm">
          <novo-control [form]="myForm" [control]="nameControl"></novo-control>
          <novo-control [form]="myForm" [control]="emailControl"></novo-control>
        </novo-form>
      </section>
      <novo-button theme="standard" (click)="close()">Cancel</novo-button>
      <novo-button theme="primary" (click)="save()">Save</novo-button>
    </novo-modal>
  \`,
})
export class MyCustomModal { /* ... */ }`,
      },
    },
  },
  render: () => ({
    props: { modalComponent: DemoEditModalComponent },
    template: `
      <demo-modal-trigger
        [component]="modalComponent"
        label="Open workflow modal"
      ></demo-modal-trigger>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Opened (play function)                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Same notification modal as `NotificationVariants` (success), but with a
 * `play` function that clicks the trigger so visual-regression tooling
 * snapshots the **opened** state. The assertions confirm the modal renders
 * into `document.body` (CDK overlay) and projects the expected copy.
 */
export const Opened: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// Opened programmatically by clicking the trigger; see Default for the
// full recipe. Asserts the modal is rendered into document.body.`,
      },
    },
  },
  render: () => ({
    props: { modalComponent: DemoSuccessNotificationComponent },
    template: `
      <demo-modal-trigger
        [component]="modalComponent"
        label="Open success notification"
        data-testid="open-opened-modal"
      ></demo-modal-trigger>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Click the `<novo-button>` (role="button") rather than the wrapper —
    // see the note in the Default story's play function.
    const trigger = await canvas.findByRole('button', { name: /open success notification/i });
    await userEvent.click(trigger);
    // CDK overlay portals to document.body — query from there, not canvasElement.
    const body = within(document.body);
    await waitFor(async () => {
      await expect(await body.findByText('Saved successfully')).toBeInTheDocument();
    });
    await expect(await body.findByText('Your changes have been written.')).toBeInTheDocument();
    await expect(await body.findByRole('button', { name: /got it/i })).toBeInTheDocument();
  },
};

/* -------------------------------------------------------------------------- */
/* 8. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Pick a modal variant to open and click the trigger. The Source tab shows
 * the canonical service-driven recipe.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// host.component.ts
import { Component } from '@angular/core';
import { NovoModalService } from 'novo-elements';
import { MyModal } from './my-modal.component';

@Component({
  selector: 'my-host',
  template: \`<novo-button theme="secondary" (click)="open()">Open</novo-button>\`,
})
export class MyHost {
  constructor(private modalService: NovoModalService) {}
  open() {
    const ref = this.modalService.open(MyModal);
    ref.afterClosed().subscribe(result => { /* ... */ });
  }
}`,
      },
    },
  },
  argTypes: {
    // Synthetic arg — drives which modal the trigger opens.
    variant: {
      control: 'select',
      options: ['workflow', 'success', 'warning', 'error', 'custom-icon'],
      description: 'Which sample modal to open. Not a real `<novo-modal>` input — modal is service-driven.',
    },
  } as any,
  args: {
    variant: 'workflow',
  } as any,
  render: (args: any) => ({
    props: {
      variant: args.variant,
      pick: (v: string) => {
        switch (v) {
          case 'success': return DemoSuccessNotificationComponent;
          case 'warning': return DemoWarningNotificationComponent;
          case 'error': return DemoErrorNotificationComponent;
          case 'custom-icon': return DemoCustomNotificationComponent;
          case 'workflow':
          default:
            return DemoEditModalComponent;
        }
      },
    },
    template: `
      <demo-modal-trigger
        [component]="pick(variant)"
        [label]="'Open ' + variant + ' modal'"
      ></demo-modal-trigger>
    `,
  }),
};
