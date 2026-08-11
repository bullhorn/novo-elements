---
section: Layouts
page: Tabs
title: Examples
order: 4
---

## Standard Tabs

### White

White background tab navigation gets the theme `theme="white"`

<code-example example="tabs-basic"></code-example>

### Color (in Toolbar)

Tabs inside a colored toolbar — no explicit `theme` attribute needed when the toolbar provides the background.

<code-example example="tabs-color"></code-example>

### Color / Neutral (standalone)

Use `theme="color"` or `theme="neutral"` when tabs sit directly on a colored background.

<code-example example="tabs-neutral"></code-example>

## Variants

### Condensed

Condensed tabs to help utilize more space with `condensed="true"`

<code-example example="tabs-condensed"></code-example>

### Vertical

Vertical tabs get a direction attribute `direction="vertical"`

<code-example example="tabs-vertical"></code-example>

### Button Bar

Use `type="button-bar"` for a segmented-control style. Combine with `theme="white"` or `theme="color"`.

<code-example example="tabs-button-bar"></code-example>

## Router Navigation

### Record / Toolbar Style

Use `novo-tab-link` with `router` on `novo-nav` for router-driven tabs — no explicit theme, sits inside a `novo-toolbar-row`.

<code-example example="tabs-nav-link"></code-example>

### Basic Router Example

Follows the same color/white theme as above, but doesn't use the `novo-tabs` tag. The header controls routing and puts content in the `router-outlet`.

<code-example example="tabs-router"></code-example>
