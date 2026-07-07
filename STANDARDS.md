# Novo-Elements Code Standards

Reference document for code review. Applies to all code in `projects/novo-elements/`.

---

## Code Quality

### Comments

-   Prefer clear, readable code over inline comments — well-named identifiers should speak for themselves
-   Only comment when the WHY is non-obvious: a hidden constraint, a workaround, a subtle invariant
-   No ticket numbers in source code
-   No commented-out code — delete it; version control preserves history

### Naming

-   No single-letter variables — `candidate` not `c`, `response` not `r`, `error` not `e`
-   No abbreviated names — `updateOption` not `updOpt`, `option` not `opt`, `config` not `cfg`, `error` not `err`
-   Descriptive over abbreviated: `searchResults` not `res`, `isLoading` not `loading`
-   Booleans read as assertions: `isLoading`, `hasError`, `canEdit`, `shouldRender`
-   Event handlers prefixed with `on`: `onSave()`, `onCancel()`, `onSelectionChange()`

### Code Style

-   New code must match the conventions of the surrounding file — don't introduce a new pattern mid-file; if updating to a newer pattern, do it uniformly or not at all
-   Always use braces on `if` / `else` blocks — body goes on its own line, never inline:

    ```typescript
    // ❌
    if (!value) return;

    // ✅
    if (!value) {
        return;
    }
    ```

-   Use optional chaining (`?.`) and nullish coalescing (`??`) — avoid verbose null/undefined guard chains
-   Mark injected services and class properties that don't change after construction as `readonly`:

    ```typescript
    // ❌
    private labelService = inject(NovoLabelService);

    // ✅
    private readonly labelService = inject(NovoLabelService);
    ```

-   Use the `override` keyword when overriding a base class method:

    ```typescript
    // ❌ silent dead method if base class renames the method
    class NovoChipsElement extends OutsideClick {
        clickedOutside() { ... }
    }

    // ✅ TypeScript errors immediately if the method is renamed or removed
    class NovoChipsElement extends OutsideClick {
        override clickedOutside() { ... }
    }
    ```

-   Avoid `console.*` in component and service code — reserve it for examples and demos only

### Types

-   Prefer specific types over `any` — use `unknown` when the type truly isn't known
-   No `any` types passed through business logic — `any` is acceptable at raw API response / parse boundaries, but assign a type before it's passed around

### Error Handling

-   No try/catch or fallbacks for scenarios that cannot happen — trust Angular and framework guarantees
-   Only validate at system boundaries: user input, external API responses
-   No null checks for values guaranteed by the framework or constructor injection
-   No empty catch blocks
-   Don't catch, log, and rethrow — that duplicates the base error handler while squelching stack info; catch only when adding recovery logic

### Code Organization

-   Keep functions small and single-purpose — if a function needs a comment to explain its sections, split it
-   Prefer guard clauses over nested `if` blocks — return early for invalid conditions so the happy path reads straight down:

    ```typescript
    // ❌
    if (item) {
        if (item.isActive) {
            process(item);
        }
    }

    // ✅
    if (!item) {
        return;
    }
    if (!item.isActive) {
        return;
    }
    process(item);
    ```

-   Write for testability — functions that depend only on their inputs are easier to test and reuse
-   Avoid mutating input parameters or input values (`@Input()` / `input()`) — treat them as immutable

---

## Labels & User-Facing Strings

All user-visible strings must go through `NovoLabelService` — never hardcode display strings directly in components.

-   Add new string properties to `NovoLabelService` in `src/services/novo-label-service.ts`
-   Inject the service and reference its properties: `this.labels.myNewString`
-   Consumers can override individual label properties to customize display text without rebuilding

---

## Angular Patterns

### Change Detection

-   New components must use `ChangeDetectionStrategy.OnPush`

### Signals & State

-   Use Signals for simple reactive state (`isLoading`, `isOpen`, `hasError`) over `BehaviorSubject`
-   When working in a file that uses `BehaviorSubject` only for simple state, convert the whole file to Signals as part of the same change — exception: if the `BehaviorSubject` is exposed as a public `Observable` property, that's a public API change requiring a deprecation path
-   Prefer `input()`, `output()`, and `model()` over `@Input()` / `@Output()` decorators in new components
-   Use `viewChild()` / `viewChildren()` signal queries over `@ViewChild` / `@ViewChildren` in new components
-   Use `computed()` for derived state — prefer over `BehaviorSubject.pipe(map(...))` chains:

    ```typescript
    // ❌
    private items$ = new BehaviorSubject<Item[]>([]);
    activeItemCount$ = this.items$.pipe(map(items => items.filter(item => item.active).length));

    // ✅
    items = signal<Item[]>([]);
    activeItemCount = computed(() => this.items().filter(item => item.active).length);
    ```

-   `BehaviorSubject` is acceptable for complex async flows with multiple consumers

### Observables

-   Never use `toPromise()` — it is deprecated; use `firstValueFrom()` or `lastValueFrom()` instead; replace existing usages when working in a file that contains them
-   Avoid `new Promise()` — it is rarely needed; `async` functions auto-wrap return values, and static helpers cover most other cases: `Promise.resolve(value)`, `Promise.reject(error)`, `Promise.all([...])`
-   Do not use `toObservable(signal)` in tests — Angular's effect scheduler is unreliable under `isolate: false`; read signals directly or test the underlying logic instead
-   Prefer `takeUntilDestroyed()` or `DestroyRef` over a manual `Subject` + `takeUntil` pattern for subscription cleanup

### Template Control Flow

-   Use built-in control flow: `@if`, `@for`, `@switch`
-   Flag `*ngIf`, `*ngFor`, `*ngSwitch` in new code — legacy; should migrate
-   When working in a template that uses `*ngIf`, `*ngFor`, or `*ngSwitch`, migrate the whole template to built-in control flow as part of the same change
-   `@for` blocks must include a `track` expression

### Dependency Injection

-   Prefer `inject()` over constructor parameter injection: `private readonly myService = inject(MyService)`
-   Flag constructor-injected dependencies in new code — legacy pattern, not preferred

### Lifecycle

-   `ngOnDestroy` must unsubscribe from all manual subscriptions
-   Avoid side effects in constructors — simple reactive initialization (signals, `computed()`, `toSignal()`) belongs at class field level; lifecycle-dependent or async setup goes in `ngOnInit`

---

## Components & Templates

-   No embedded templates longer than one line — use `templateUrl` pointing to a separate `.html` file
-   Expose reactive state via signals or `computed()` signals rather than subscribing in the component and storing in plain fields
-   No complex expressions or method calls in templates — they run on every change detection cycle; use `computed()` signals for derived state:
    ```html
    <!-- ❌ complex expression -->
    {{ items.filter(i => i.active).length }}
    <!-- ❌ method call -->
    {{ getActiveCount() }}
    <!-- ✅ computed signal -->
    {{ activeItemCount() }}
    ```
-   No direct service calls in templates — expose values through component properties:
    ```html
    <!-- ❌ -->
    {{ labelService.getLabel(item) }}
    <!-- ✅ -->
    {{ itemLabel }}
    ```

---

## Public API

-   All intended public exports go through `src/index.ts` and the relevant `src/elements/[name]/index.ts`
-   Do not add internal implementation details to the public API without intent — once exported, they become part of the contract
-   Do not remove or rename existing public exports without a deprecation path — downstream consumers depend on this API
-   Use subpath imports in new code: `from 'novo-elements/elements/button'` not `from 'novo-elements'`

---

## Testing

### Coverage

-   All new and changed code must have full unit test coverage

### Module-Scope State

`isolate: false` is the default. Signals, Subjects, and Maps declared at `describe` scope persist across files. Always initialize in `beforeEach`:

```typescript
// ❌ persists across files
const subject = new Subject<string>();

// ✅ fresh per test
let subject: Subject<string>;
beforeEach(() => { subject = new Subject<string>(); });
```

### Other Rules

-   Every changed file must have a corresponding `*.spec.ts` in the same directory
-   No commented-out or disabled tests — fix or delete them; `.skip` is not acceptable as a permanent state
-   No `beforeAll`
-   No `.only` — remove before pushing

---

## Demo & Examples

-   New components must include a corresponding example in `projects/novo-examples/`
-   New behaviors or configuration options added to existing components must be demonstrated in the relevant example
-   When adding or updating a component or its demo, add or update UI e2e automation tests in `projects/demo/` to cover the new behavior

---

## Architecture

### Module Boundaries

-   `projects/novo-elements/` must not import from `projects/novo-examples/` or `projects/demo/`
-   Cross-element imports go through each element's `index.ts`, not deep internal paths
-   The public `src/index.ts` is the library boundary — internal modules should not be referenced directly by consumers
