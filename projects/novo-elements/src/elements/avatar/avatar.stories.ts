import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { NovoAvatarElement } from './Avatar';
import { NovoAvatarModule } from './Avatar.module';

/**
 * Stories for `<novo-avatar>` and `<novo-avatar-stack>`. Follows the
 * conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 */
const meta: Meta<NovoAvatarElement> = {
  title: 'Elements/Avatar',
  component: NovoAvatarElement,
  decorators: [
    moduleMetadata({
      imports: [NovoAvatarModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A visual proxy for a user or entity. Prefer a real photo via `image`; fall back to a `source` object ' +
          'with `firstName` / `lastName` (or `name`) and the component will render generated initials on a ' +
          'deterministic gradient. Round shapes read as people, square shapes as organizations.',
      },
    },
  },
  argTypes: {
    image: {
      control: 'text',
      description: 'URL to a profile image. When set, takes precedence over generated initials.',
    },
    source: {
      control: 'object',
      description:
        'Source object backing the avatar. Resolution order: `profileImage` → `logo` → ' +
        'initials from `firstName`+`lastName` → first character of `name` / `username`. ' +
        'Use this when binding a candidate / contact / company record directly.',
    },
    label: {
      control: 'text',
      description:
        'Explicit label text to render as initials. Overrides any initials derived from `source` ' +
        '(use e.g. `"+5"` to render an overflow indicator inside an avatar stack).',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Avatar dimension. Defaults to `medium` (30px).',
      table: { defaultValue: { summary: 'medium' } },
    },
    shape: {
      control: 'radio',
      options: ['round', 'square'],
      description:
        'Container shape. Use `round` for people (users, candidates, contacts) and `square` ' +
        'for entities (companies, jobs).',
      table: { defaultValue: { summary: 'round' } },
    },
    color: {
      control: 'select',
      options: [undefined, 'positive', 'negative', 'warning', 'info', 'bittersweet', 'sunglow', 'aqua', 'grapefruit'],
      description:
        'Background color token applied when no `image` is set. Pulled from the theme color palette.',
    },
    theme: {
      control: 'text',
      description: 'Theme hook for downstream styling (currently informational).',
    },
  },
};

export default meta;
type Story = StoryObj<NovoAvatarElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide — when to use an avatar, how the image / initials
 * fallback works, and the round-vs-square convention.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use an avatar</h2>
        <p style="margin: 0 0 1.25rem;">
          Avatars are visual proxies for a user or entity (such as a company) in
          the product. They're typically squares with rounded edges and are
          often paired with status or presence indicators to give more context.
          Users generally upload their own image; when none is available, the
          component falls back to generated initials on a deterministic
          gradient.
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
              ✓ Use an avatar when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Identifying a person — user, candidate, contact</li>
              <li>Identifying an entity — company, job</li>
              <li>Anchoring a profile menu or quick-actions popover</li>
              <li>Showing membership in a list — use the avatar stack</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use an avatar when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Representing an entity type abstractly — use an icon</li>
              <li>Showing status alone — use a badge or tag</li>
              <li>Conveying brand identity — use a dedicated logo asset</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Shape conventions</h2>
        <ul style="margin: 0 0 1.5rem; padding-left: 1.25rem;">
          <li><strong>Round</strong> — people (users, candidates, contacts).</li>
          <li><strong>Square</strong> — entities (companies, jobs, organizations).</li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Image vs. initials fallback</h2>
        <p style="margin: 0 0 1rem;">
          The avatar resolves its content in a fixed order — the first source
          that produces something wins:
        </p>
        <ol style="margin: 0 0 1.5rem; padding-left: 1.25rem;">
          <li>The <code>image</code> input (a direct URL).</li>
          <li><code>source.profileImage</code> — applied as a background image.</li>
          <li><code>source.logo</code> — used as the <code>&lt;img&gt;</code> src.</li>
          <li>
            Generated initials from <code>label</code>,
            <code>source.firstName</code>+<code>source.lastName</code>, or the
            first character of <code>source.name</code> /
            <code>source.username</code>. Rendered as an SVG on a gradient
            background; the color is deterministic from the first character.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Stacking</h2>
        <p style="margin: 0 0 1.5rem;">
          Wrap a set of avatars in <code>&lt;novo-avatar-stack&gt;</code> to
          overlap them into a compact group — useful for "members of this
          team", "people on this submission", etc. Set <code>total</code> to a
          number larger than the projected avatars to render a trailing
          <code>+N</code> overflow indicator.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            When using a real photo (<code>image</code> /
            <code>source.profileImage</code>), include descriptive
            <code>alt</code> text on the surrounding context — the rendered
            <code>&lt;img&gt;</code> inherits the source URL only.
          </li>
          <li>
            Avatars used as a button (e.g. opening a profile menu) need a
            focusable wrapper with an <code>aria-label</code>.
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
 * The simplest avatar — bind a `source` object and let the component derive
 * initials. All inputs are bound so every control in the panel mutates the
 * render.
 */
export const Default: Story = {
  args: {
    source: { firstName: 'Brian', lastName: 'Kimball' },
  },
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// NovoAvatarModule
@Component({ ... })
export class MyProfileComponent {
  source = { firstName: 'Brian', lastName: 'Kimball' };
}

// template — source resolution: image > source.profileImage > derived initials
<novo-avatar [source]="source"></novo-avatar>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-avatar
        [source]="source"
        [image]="image"
        [label]="label"
        [size]="size"
        [shape]="shape"
        [color]="color"
        [theme]="theme"
      ></novo-avatar>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Sizes                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Three fixed sizes: `small` (20px), `medium` (30px, default), `large` (40px).
 * Omit `size` for the medium default.
 */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoAvatarModule } from 'novo-elements';

@Component({
  selector: 'my-avatar-sizes',
  imports: [NovoAvatarModule],
  templateUrl: './my-avatar-sizes.component.html',
})
export class MyAvatarSizesComponent {
  person = { firstName: 'Aaron', lastName: 'Burr' };
}

// component.html
<novo-avatar size="small" [source]="person"></novo-avatar>
<novo-avatar size="medium" [source]="person"></novo-avatar>
<novo-avatar size="large" [source]="person"></novo-avatar>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <novo-avatar size="small" [source]="{ firstName: 'Aaron', lastName: 'Burr' }"></novo-avatar>
        <novo-avatar size="medium" [source]="{ firstName: 'Aaron', lastName: 'Burr' }"></novo-avatar>
        <novo-avatar size="large" [source]="{ firstName: 'Aaron', lastName: 'Burr' }"></novo-avatar>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Shapes                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * `round` for people, `square` for entities. The shape is just a border-radius
 * change — pick by what the avatar *represents*, not by aesthetics.
 */
export const Shapes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoAvatarModule } from 'novo-elements';

// round for people, square for entities — pick by what the avatar represents.
@Component({
  selector: 'my-avatar-shapes',
  imports: [NovoAvatarModule],
  templateUrl: './my-avatar-shapes.component.html',
})
export class MyAvatarShapesComponent {
  person = { firstName: 'Alexander', lastName: 'Hamilton' };
  company = { name: 'Central Bank' };
}

// component.html
<novo-avatar shape="round" [source]="person"></novo-avatar>
<novo-avatar shape="square" [source]="company"></novo-avatar>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <novo-avatar size="large" shape="round" [source]="{ firstName: 'Alexander', lastName: 'Hamilton' }"></novo-avatar>
        <novo-avatar size="large" shape="square" [source]="{ name: 'Central Bank' }"></novo-avatar>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. WithInitials                                                             */
/* -------------------------------------------------------------------------- */

/**
 * When no image is provided, the avatar derives initials from `source` (or
 * from a literal `label`). The gradient color is deterministic from the first
 * character of the initials, so the same person always renders in the same
 * color.
 */
export const WithInitials: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoAvatarModule } from 'novo-elements';

// Initials derived from source.firstName + lastName, source.name's first
// character, or a literal [label]. The gradient color is deterministic from
// the first initial.
@Component({
  selector: 'my-avatar-initials',
  imports: [CommonModule, NovoAvatarModule],
  templateUrl: './my-avatar-initials.component.html',
})
export class MyAvatarInitialsComponent {
  people = [
    { firstName: 'Aaron', lastName: 'Burr' },
    { firstName: 'Ben', lastName: 'Franklin' },
    { firstName: 'Thomas', lastName: 'Jefferson' },
  ];
  company = { name: 'Central Bank' };
}

// component.html
<novo-avatar *ngFor="let person of people" [source]="person"></novo-avatar>
<novo-avatar [source]="company" shape="square"></novo-avatar>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <novo-avatar size="large" [source]="{ firstName: 'Aaron', lastName: 'Burr' }"></novo-avatar>
        <novo-avatar size="large" [source]="{ firstName: 'Ben', lastName: 'Franklin' }"></novo-avatar>
        <novo-avatar size="large" [source]="{ firstName: 'Thomas', lastName: 'Jefferson' }"></novo-avatar>
        <novo-avatar size="large" [source]="{ name: 'Central Bank' }" shape="square"></novo-avatar>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. WithImage                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Supply an `image` URL directly, or bind a `source` whose `profileImage`
 * (people) or `logo` (companies) is set. The image takes precedence over any
 * derivable initials.
 */
export const WithImage: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoAvatarModule } from 'novo-elements';

// [image] is a direct URL; source.profileImage (people) and source.logo
// (companies) also work. Image takes precedence over derivable initials.
@Component({
  selector: 'my-avatar-image',
  imports: [NovoAvatarModule],
  templateUrl: './my-avatar-image.component.html',
})
export class MyAvatarImageComponent {
  profileUrl = 'https://robohash.org/jgodi';
  logoUrl = '/assets/images/logo.svg';
  alex = { profileImage: 'https://robohash.org/alex' };
}

// component.html
<novo-avatar [image]="profileUrl"></novo-avatar>
<novo-avatar shape="square" [image]="logoUrl"></novo-avatar>
<novo-avatar [source]="alex"></novo-avatar>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <novo-avatar
          size="large"
          image="https://robohash.org/jgodi"
        ></novo-avatar>
        <novo-avatar
          size="large"
          shape="square"
          image="https://www.bullhorn.com/wp-content/uploads/2021/08/bullhorn_bull.svg"
        ></novo-avatar>
        <novo-avatar
          size="large"
          [source]="{ profileImage: 'https://robohash.org/alex' }"
        ></novo-avatar>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Colors                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * `color` paints the avatar background when no image and no derived initials
 * are present. Use sparingly — when you have a real person's `source`, the
 * generated-initials gradient is preferable because it's deterministic from
 * the person's name.
 *
 * Implementation note: pass an empty-`profileImage` sentinel via `source` so
 * the component skips initials generation and the host's color class is
 * actually visible. (Required because the component reads `source.profileImage`
 * unconditionally on init.)
 */
export const Colors: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoAvatarModule } from 'novo-elements';

// WORKAROUND: pass [source]="{ profileImage: '' }" so the component skips
// initials generation. Without this the host's color class is hidden by the
// initials SVG. Tracked in the avatar improvements Jira ticket.
@Component({
  selector: 'my-avatar-colors',
  imports: [CommonModule, NovoAvatarModule],
  templateUrl: './my-avatar-colors.component.html',
})
export class MyAvatarColorsComponent {
  colors = ['positive', 'negative', 'warning', 'info'];
  emptySource = { profileImage: '' };
}

// component.html
<novo-avatar
  *ngFor="let c of colors"
  [color]="c"
  [source]="emptySource"
></novo-avatar>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <novo-avatar size="large" color="positive" [source]="{ profileImage: '' }"></novo-avatar>
        <novo-avatar size="large" color="negative" [source]="{ profileImage: '' }"></novo-avatar>
        <novo-avatar size="large" color="warning" [source]="{ profileImage: '' }"></novo-avatar>
        <novo-avatar size="large" color="info" [source]="{ profileImage: '' }"></novo-avatar>
        <novo-avatar size="large" color="bittersweet" [source]="{ profileImage: '' }"></novo-avatar>
        <novo-avatar size="large" color="aqua" [source]="{ profileImage: '' }"></novo-avatar>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. Stack                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-avatar-stack>` overlaps a set of avatars to represent a group — team
 * members, submission participants, watchers. Set `total` to a number larger
 * than the projected avatars to render a trailing `+N` overflow indicator.
 *
 * Controls are disabled here because the stack is a fixed matrix of children.
 */
export const Stack: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoAvatarModule } from 'novo-elements';

// Overlap a group of avatars. [total] adds a +N overflow indicator when total
// exceeds the projected avatar count.
// NOTE: there's a known bug where the +N label is currently hardcoded to "+5"
// regardless of the actual overflow — tracked in BH-101192.
@Component({
  selector: 'my-avatar-stack',
  imports: [CommonModule, NovoAvatarModule],
  templateUrl: './my-avatar-stack.component.html',
})
export class MyAvatarStackComponent {
  people = [
    { firstName: 'Aaron', lastName: 'Burr' },
    { firstName: 'Alexander', lastName: 'Hamilton' },
    { firstName: 'Ben', lastName: 'Franklin' },
    { firstName: 'Thomas', lastName: 'Jefferson' },
  ];
}

// component.html
<novo-avatar-stack>
  <novo-avatar *ngFor="let p of people" [source]="p"></novo-avatar>
</novo-avatar-stack>

<novo-avatar-stack [total]="8">
  <novo-avatar *ngFor="let p of people.slice(0, 3)" [source]="p"></novo-avatar>
</novo-avatar-stack>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
        <novo-avatar-stack>
          <novo-avatar [source]="{ firstName: 'Aaron', lastName: 'Burr' }"></novo-avatar>
          <novo-avatar [source]="{ firstName: 'Alexander', lastName: 'Hamilton' }"></novo-avatar>
          <novo-avatar [source]="{ firstName: 'Ben', lastName: 'Franklin' }"></novo-avatar>
          <novo-avatar [source]="{ firstName: 'Thomas', lastName: 'Jefferson' }"></novo-avatar>
        </novo-avatar-stack>

        <novo-avatar-stack [total]="8">
          <novo-avatar [source]="{ firstName: 'Aaron', lastName: 'Burr' }"></novo-avatar>
          <novo-avatar [source]="{ firstName: 'Alexander', lastName: 'Hamilton' }"></novo-avatar>
          <novo-avatar [source]="{ firstName: 'Ben', lastName: 'Franklin' }"></novo-avatar>
        </novo-avatar-stack>
      </div>
    `,
  }),
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
import { NovoAvatarModule } from 'novo-elements';

@Component({
  selector: 'my-avatar-playground',
  imports: [NovoAvatarModule],
  templateUrl: './my-avatar-playground.component.html',
})
export class MyAvatarPlaygroundComponent {
  source = { firstName: 'Brian', lastName: 'Kimball' };
  image = '';
  label = '';
  size: 'small' | 'medium' | 'large' = 'large';
  shape: 'round' | 'square' = 'round';
  color?: string;
}

// component.html
<novo-avatar
  [source]="source"
  [image]="image"
  [label]="label"
  [size]="size"
  [shape]="shape"
  [color]="color"
></novo-avatar>`,
      },
    },
  },
  args: {
    source: { firstName: 'Brian', lastName: 'Kimball' },
    image: '',
    label: '',
    size: 'large',
    shape: 'round',
    color: undefined,
    theme: undefined,
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-avatar
        [source]="source"
        [image]="image"
        [label]="label"
        [size]="size"
        [shape]="shape"
        [color]="color"
        [theme]="theme"
      ></novo-avatar>
    `,
  }),
};
