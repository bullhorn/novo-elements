# E2E Testing Guide

End-to-end tests for Novo Elements using WebdriverIO (wdio) and Mocha for testing component functionality across the entire application.

## Test Structure/Configuration

- **Test files**: `projects/novo-e2e/src/e2e/`
- **Configuration**: `projects/novo-e2e/wdio.conf.ts`
- **Default URL**: https://bullhorn.github.io/novo-elements/docs/

## Running Tests Locally

### Basic Commands

```bash
# Run tests in headless mode (default)
npm run e2e

# Run tests in headed mode (browser window visible)
npm run e2e:headed

# Run tests in headless mode (explicit)
npm run e2e:headless
```

### Running Specific Tests

```bash
# Run a single test file by name
npm run e2e:single button
# This runs: projects/novo-e2e/src/e2e/button.e2e.ts

# Run a single test file in headed mode (browser window visible)
npm run e2e:single:headed button
# This runs: projects/novo-e2e/src/e2e/button.e2e.ts
```

When running a single test file with `npm run e2e:single` or `npm run e2e:single:headed`, simply provide the filename without the `.e2e.ts` extension. For example:
- `npm run e2e:single button` → runs `projects/novo-e2e/src/e2e/button.e2e.ts` in headless mode
- `npm run e2e:single:headed button` → runs `projects/novo-e2e/src/e2e/button.e2e.ts` with browser visible
- `npm run e2e:single queryBuilder` → runs `projects/novo-e2e/src/e2e/queryBuilder.e2e.ts` in headless mode

## Using a Custom Base URL

By default, e2e tests run against the [published demo](https://bullhorn.github.io/novo-elements/docs/#/home). You can override the base URL using either an environment variable or command line argument.

### Environment Variable

```bash
E2E_BASE_URL=https://your-custom-url npm run e2e
E2E_BASE_URL=https://your-custom-url npm run e2e:headed
E2E_BASE_URL=https://your-custom-url npm run e2e:single button
E2E_BASE_URL=https://your-custom-url npm run e2e:single:headed button
```

### Command Line Argument

```bash
npm run e2e -- --baseUrl=https://your-custom-url
npm run e2e:headed -- --baseUrl=https://your-custom-url
npm run e2e:single button -- --baseUrl=https://your-custom-url
npm run e2e:single:headed button -- --baseUrl=https://your-custom-url
```

### Example

Running tests against a staging environment:
```bash
E2E_BASE_URL=https://staging.example.com npm run e2e
```

To avoid setting the environment variable for every command, you can export it once in your current terminal session:
```bash
export E2E_BASE_URL=https://staging.example.com
npm run e2e
npm run e2e:single button
# Variable remains set for all subsequent commands
```

## Automated Testing

### Pull Request Tests

E2E tests automatically run on pull requests against the Firebase preview deployment. See `.github/workflows/firebase-hosting-pull-request.yml` for details.

### Manual Test Runs

You can manually run E2E tests against any deployment using the "Run E2E Tests" GitHub Action:

#### From GitHub UI

1. Go to the [Actions tab](https://github.com/bullhorn/novo-elements/actions)
2. Select "Run E2E Tests"
3. Click "Run workflow"
4. Optionally enter a custom base URL (defaults to the published demo)
5. Click "Run workflow"
6. Results will be uploaded as artifacts after completion

#### Parameters

- **baseUrl** (optional): The URL to test against
  - Defaults to: `https://bullhorn.github.io/novo-elements/docs`
  - Can be any deployment URL to validate components work correctly

Test results are automatically uploaded and available for 7 days.

See `.github/workflows/run-e2e-tests.yml` for workflow details.
