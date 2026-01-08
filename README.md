# NOVO Elements [![npm version](https://badge.fury.io/js/novo-elements.svg)](http://badge.fury.io/js/novo-elements) [![Build Status](https://travis-ci.org/bullhorn/novo-elements.svg?branch=master)](https://travis-ci.org/bullhorn/novo-elements) [![Coverage Status](https://coveralls.io/repos/github/bullhorn/novo-elements/badge.svg?branch=master)](https://coveralls.io/github/bullhorn/novo-elements?branch=master)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bullhorn/Open-Source?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Dependency Status](https://david-dm.org/bullhorn/novo-elements.svg)](https://david-dm.org/bullhorn/novo-elements)
[![devDependency Status](https://david-dm.org/bullhorn/novo-elements/dev-status.svg)](https://david-dm.org/bullhorn/novo-elements#info=devDependencies)

## Dependencies

- [NodeJS v20+](https://nodejs.org/en/)

## Quick Start

    # Clone the project
    git clone git@github.com:bullhorn/novo-elements.git

    # Change directory
    cd novo-elements

    # Install
    npm install

    # Start (you will need two terminals)
    npm run build (builds the library, alternatively you can use npm run build:watch for live-reload)
    npm start (starts the demo)

    # Access the Demo in your browser at
    http://localhost:4200/

## Integrating into a project

    # Install the module from NPM
    npm install --save novo-elements

Depending on what system you are using (SystemJS, Webpack, etc.) the setup will vary.

If using SCSS/SASS you will need to include the following includes: `node_modules/novo-elements/lib`.

## Building Examples

> All examples can be added to the appropriate directory in the `novo-examples` project. Each markdown file will be converted to a demo page and a route will automatically be added to the demo. You can import any example project by using the angular selector, or inject it using the `code-example` tag, i.e. `<code-example example="demo-name"></code-example>`.

    # Compile markdown, generate routes, and AOT build the project
    npm run build:examples

    # Automatically rebuild changes to the examples project
    npm run build:examples:watch

## E2E Testing

The project includes end-to-end tests using WebdriverIO (wdio) and Mocha for testing component functionality across the entire application.

### E2E Test Structure/Configuration

- E2E tests are located in `projects/novo-e2e/src/e2e/`
- Tests are configured in `projects/novo-e2e/wdio.conf.ts`
- Run against the published demo at `https://bullhorn.github.io/novo-elements/docs/`

### Running E2E Tests

```bash
# Run tests in headless mode (default)
npm run e2e

# Run tests in headed mode (browser window visible)
npm run e2e:headed

# Run tests in headless mode (explicit)
npm run e2e:headless
```

## Customizing Labels

With Novo Elements there are a few hard-coded labels throughout the library. To override these labels with your own, you will simply extend the `NovoLabelService` and override any labels that you wish.

To make Angular use this new class over the default one you can provide in the bootstrapping of your application as a provider.

```ts
{ provide: NovoLabelService, useClass: MyLabelService }
```

To use the default labels, you will need to provide the `NOVO_ELEMENTS_LABELS_PROVIDERS` via

```ts
import { NOVO_ELEMENTS_LABELS_PROVIDERS } from 'novo-elements';
bootstrap(MyApp [..NOVO_ELEMENTS_LABELS_PROVIDERS]);
```

## Upgrading Novo Elements

### To Version 6

> Note: Ensure your tsconfig.app.json `include` property references all the ts files the migrations should be run against.  You can add a glob then remove it to ensure your build system works the same as before.

```
npm install --save timezone-support@2 novo-design-tokens@0 angular-imask@6 imask@6
npm install --save novo-elements@6
ng update novo-elements --migrate-only --from=0.0.0 --to=6.0.0 --force --allow-dirty  
```


## Contribute

There are many ways to **[contribute](https://github.com/bullhorn/novo-elements/blob/master/CONTRIBUTING.md)** to our OpenSource projects.

- **[Submit bugs](https://github.com/bullhorn/novo-elements/issues)** and help us verify fixes as they are checked in.
- Review **[source code changes](https://github.com/bullhorn/novo-elements/pulls)**.
- **[Contribute bug fixes](https://github.com/bullhorn/novo-elements/blob/master/CONTRIBUTING.md)**.

> TL;DR: Fork this repository, make any required change and then submit a PR :)

# License

Copyright (c) forever [Bullhorn](http://www.bullhorn.com).

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
