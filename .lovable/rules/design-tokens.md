# Design Tokens

Token reference for **novo-elements**. Use utility classes and CSS variables — never raw values.

## Colors

Apply with any color utility: `bg-<name>`, `text-<name>`, `border-<name>`, `ring-<name>`, `divide-<name>`, etc.

| Name | CSS variable |
|---|---|
| `button-focus-ring` | `--button-focus-ring` |
| `button-primary-border` | `--button-primary-border` |
| `button-primary-filter-hover` | `--button-primary-filter-hover` |
| `button-primary-filter-active` | `--button-primary-filter-active` |
| `button-secondary-border` | `--button-secondary-border` |
| `button-secondary-border-hover` | `--button-secondary-border-hover` |
| `background-main` | `--background-main` |
| `background-bright` | `--background-bright` |
| `background-dark` | `--background-dark` |
| `background-muted` | `--background-muted` |
| `theme-background-main` | `--theme-background-main` |
| `theme-background-bright` | `--theme-background-bright` |
| `theme-background-dark` | `--theme-background-dark` |
| `theme-background-muted` | `--theme-background-muted` |
| `focus` | `--focus` |
| `border` | `--border` |
| `code` | `--code` |
| `button-background` | `--button-background` |
| `button-hover` | `--button-hover` |
| `form-placeholder` | `--form-placeholder` |
| `variable` | `--variable` |
| `highlight` | `--highlight` |
| `background-overlay` | `--background-overlay` |
| `success-bg` | `--success-bg` |
| `success-hover` | `--success-hover` |
| `success-focus` | `--success-focus` |
| `base-selection-color` | `--base-selection-color` |
| `border-2` | `--border-2` |
| `border-hard` | `--border-hard` |

## Typography

Typography classes (`font-*` for families, `text-*` for sizes):

| Class | CSS variable |
|---|---|
| — | `--button-text-transform` |
| — | `--background-body` |
| — | `--theme-background-body` |
| `text-selection` | `--text-selection` |
| `text-main` | `--text-main` |
| `text-muted` | `--text-muted` |
| `text-disabled` | `--text-disabled` |
| — | `--button-text` |
| — | `--form-text` |
| `text-secondary` | `--text-secondary` |
| `text-inverted` | `--text-inverted` |
| `text-bg-contrast` | `--text-bg-contrast` |
| `font-size-caption` | `--font-size-caption` |
| `font-size-label` | `--font-size-label` |
| `font-size-text` | `--font-size-text` |
| `font-size-button` | `--font-size-button` |
| `font-size-title` | `--font-size-title` |
| `font-size-tab` | `--font-size-tab` |

## Spacing

Apply with any spacing utility: `p-<name>`, `m-<name>`, `gap-<name>`, `space-<name>`, `w-<name>`, `h-<name>`, etc.

| Name | CSS variable |
|---|---|
| `xs` | `--spacing-xs` |
| `sm` | `--spacing-sm` |
| `md` | `--spacing-md` |
| `lg` | `--spacing-lg` |
| `xl` | `--spacing-xl` |
| `2xl` | `--spacing-2xl` |
| `3xl` | `--spacing-3xl` |
| — | `--button-icon-margin` |

## Border Radius

Border-radius classes:

| Class | CSS variable |
|---|---|
| — | `--border-radius-sm` |
| — | `--border-radius-md` |
| — | `--border-radius-pill` |
| — | `--button-radius` |

## Shadows

Box-shadow classes:

| Class | CSS variable |
|---|---|
| — | `--button-shadow` |
| — | `--button-shadow-hover` |
| — | `--button-shadow-active` |
| `shadow-dropdown` | `--shadow-dropdown` |

## Other

Reference via `var(--name)` in inline styles or CSS.

| CSS variable |
|---|
| `--bg-fade-multiplier` |
| `--button-height` |
| `--selection` |
| `--links` |
| `--animation-duration` |
| `--base-selection-lightness` |
| `--scrollbar-thumb` |
| `--scrollbar-thumb-hover` |

