# Novo-Elements E2E Automation Standards

Reference document for writing e2e tests in `projects/novo-e2e/`. Applies to all code under `projects/novo-e2e/src/`.

---

## File Organization

-   Test files: `projects/novo-e2e/src/e2e/*.e2e.ts` — one file per demo page
-   Component-specific selectors and helpers: `projects/novo-e2e/src/utils/*Util.ts` — one file per component
-   Component URLs belong in `COMPONENT_URLS` in `EnvironmentUtil.ts`
-   Do not define helper functions or selectors inline in a test file
-   Functions and selectors that are not component-specific belong in a shared util (e.g. `SelectorUtil.ts`, `VerifyUtil.ts`, `GetElementUtil.ts`)

---

## Util Files

Util files hold component-specific selectors and scoping helpers.

### Selectors object

Before adding new selectors, check `SelectorUtil.ts` — it already exports common element selectors (`elements`, `Attributes`, `Classes`, etc.) that should be reused rather than duplicated. Truly generic selectors belong there; component-specific ones belong in the component util file.

Group component-specific `data-automation-id` selectors into a named const in the component util:

```typescript
import { automationId } from './SelectorUtil';

export const myComponent = {
    container: automationId('my-component-container'),
    trigger: automationId('my-component-trigger'),
    display: automationId('my-component-display'),
};
```

### Scoping helpers

-   No raw or concatenated selector strings in test files — selector construction belongs in util functions
-   When inner elements lack `data-automation-id`, expose them through named scoping functions in the util file rather than building the selector inline in the test

Util files can also contain component-specific action helpers (e.g. `sortTableColumn`, `filterTableColumn`) and component-specific verify functions (e.g. `verifyCalendarDateSelected`) when those are reusable across multiple tests. The only things that do not belong in util files are `describe`/`it`/`before`/`after` test structure blocks.

---

## Test File Structure

-   Top-level `before` navigates to the page; top-level `after` navigates home
-   `browser.refresh()` at the start of each nested `before` resets state between describe blocks
-   `scrollIntoView` before interacting with elements below the fold
-   Group tests by example section using nested `describe` blocks
-   Always start with a **Page Elements** describe that verifies the page title and each example section is present

### Reducing repetition with loops

When multiple `it` blocks share the same structure and differ only in their data, collapse them into a `forEach` over a typed array. This keeps the test count intact (each item generates its own named `it`) while eliminating structural duplication.

```typescript
// ❌ three structurally identical tests
it('should display candidate icon', async () => {
    await verifyPresent(basicIcon('candidate'));
});
it('should display job icon', async () => {
    await verifyPresent(basicIcon('job'));
});
it('should display company icon', async () => {
    await verifyPresent(basicIcon('company'));
});

// ✅ data-driven
const icons = ['candidate', 'job', 'company'];
icons.forEach((name) => {
    it(`should display ${name} icon`, async () => {
        await verifyPresent(basicIcon(name));
    });
});
```

When verifying that a set of items share a common property (rather than testing each item independently), use a `for...of` loop inside a single `it`:

```typescript
// ✅ one assertion about a shared property across all items
it('should display all service trigger buttons', async () => {
    const triggerIds = ['toast-trigger', 'toast-trigger-bottom', 'toast-trigger-growl-top-right'];
    for (const id of triggerIds) {
        await verifyPresent(automationId(id));
    }
});
```

Use `forEach` → `it` when each item deserves its own test result. Use `for...of` inside a single `it` when the items are collectively testing one shared behavior.

---

## Selector Strategy

Prefer in this order:

1. **`automationId('...')`** — for elements with a `data-automation-id` attribute. This is the primary strategy.
2. **`codeExample('example-name')`** — to scope to a specific demo section.
3. **CSS class or element type selectors scoped to a parent** — when internal elements lack `data-automation-id` (e.g. `novo-toast.fixedBottom h5`). Wrap these in a util helper function; do not write the concatenated string inline in the test.

### Checking for data-automation-id gaps

Before writing tests, read the example templates in `projects/novo-examples/`. If elements that need to be tested lack `data-automation-id`, add them there.

### Disambiguating duplicate automation IDs

If two demo sections render the same `data-automation-id` values, scope the selector to the correct section:

```typescript
// Both 'section-a' and 'section-b' have a button with automation ID 'submit-trigger'
await click(`${codeExample('section-b')} ${automationId('submit-trigger')}`);
```

---

## Verification

### Use shared verification utilities

| Goal | Function |
|---|---|
| Element exists in the DOM | `verifyPresent(selector)` |
| Element does not exist | `verifyAbsent(selector)` |
| Element has a CSS class | `verifyClassPresent(selector, 'class-name')` |
| Element does not have a CSS class | `verifyClassAbsent(selector, 'class-name')` |
| Element text matches | `verifyText(selector, 'exact text', 'friendly name')` |
| Element text contains a substring | `verifyTextIncludes(selector, 'substring', 'friendly name')` |
| Input value matches | `verifyInputValue(selector, 'value')` |

---

## Code Style

### Naming

Follow the same naming rules as the top-level `STANDARDS.md`:

-   No single-letter variables — `section` not `s`, `trigger` not `t`
-   No abbreviated names — `container` not `cont`, `selector` not `sel`
-   Booleans read as assertions: `isVisible`, `hasClass`, `canDismiss`

`describe` blocks name the feature or section under test. `it` blocks complete the sentence "it should ...":

```typescript
// ❌
describe('test stuff', () => {
    it('works', async () => { ... });
});

// ✅
describe('Toast Options', () => {
    it('should switch to growl appearance', async () => { ... });
});
```

### Comments

Default to no comments. Only add one when the WHY is non-obvious: a hidden constraint, a workaround, a subtle invariant that would surprise a reader.

```typescript
// ❌ obvious from the test name and the selector
// Click the close button to dismiss the toast
await click(toastCloseButtonIn('novo-toast.fixedTop'));
```
