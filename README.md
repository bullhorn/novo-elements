# NOVO Elements [![npm version](https://badge.fury.io/js/novo-elements.svg)](http://badge.fury.io/js/novo-elements) [![Build Status](https://travis-ci.org/bullhorn/novo-elements.svg?branch=master)](https://travis-ci.org/bullhorn/novo-elements) [![Coverage Status](https://coveralls.io/repos/github/bullhorn/novo-elements/badge.svg?branch=master)](https://coveralls.io/github/bullhorn/novo-elements?branch=master)

[![Greenkeeper badge](https://badges.greenkeeper.io/bullhorn/novo-elements.svg)](https://greenkeeper.io/)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bullhorn/Open-Source?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Dependency Status](https://david-dm.org/bullhorn/novo-elements.svg)](https://david-dm.org/bullhorn/novo-elements)
[![devDependency Status](https://david-dm.org/bullhorn/novo-elements/dev-status.svg)](https://david-dm.org/bullhorn/novo-elements#info=devDependencies)

## Dependencies

- [NodeJS v6.9+](https://nodejs.org/en/)
- [NPM v3.0+](https://github.com/npm/npm)

## Quick Start

    # Clone the project
    git clone git@github.com:bullhorn/novo-elements.git

    # Change directory
    cd novo-elements

    # Install
    npm install

    # Start
    npm start

    # Access the Demo in your browser at
    http://localhost:3000/

## Integrating into a project

    # Install the module
    npm install --save novo-elements

Depending on what system you are using (SystemJS, Webpack, etc..) the setup will vary.

If using SCSS/SASS you will need to include the following includes: `node_modules/novo-elements/lib` and `node_modules/hint.css/src`.

## Build/Release/Publish

> Automatically runs the tests, updates the `package.json` version, generates the `CHANGELOG.md`, generates a GitHub release, uploads the demo to GH-Pages and publishes.

    # Bump the version up via NPM
    npm version patch|major|minor

    # This runs the following scripts AUTOMATICALLY
    # npm test
    # npm run changelog (pushes git)
    # npm run github-release
    # npm run clean
    # npm run compile (demo/bundles)
    # npm run deploy:gh-pages
    # npm publish

## Customizing Labels

With Novo Elements there are a few hard coded labels throughout the library. To override these labels with your own, you will simply extend the `NovoLabelService` and override any labels that you wish.

To make Angular2 use this new class over the default one you can provide in the bootstrapping of your application as a provider.

```
{ provide: NovoLabelService, useClass: MyLabelService }
```

To use the default labels, you will need to provide the `NOVO_ELEMENTS_LABELS_PROVIDERS` via

```
import {NOVO_ELEMENTS_LABELS_PROVIDERS} from 'novo-elements';
bootstrap(MyApp [..NOVO_ELEMENTS_LABELS_PROVIDERS]);
```

## Contribute

There are many ways to **[contribute](https://github.com/bullhorn/novo-elements/blob/master/CONTRIBUTING.md)** to our OpenSource projects.
* **[Submit bugs](https://github.com/bullhorn/novo-elements/issues)** and help us verify fixes as they are checked in.
* Review **[source code changes](https://github.com/bullhorn/novo-elements/pulls)**.
* **[Contribute bug fixes](https://github.com/bullhorn/novo-elements/blob/master/CONTRIBUTING.md)**.

> TL;DR; Fork this repository, make any required change and then submit a PR :)

# License

Copyright (c) forever [Bullhorn](http://www.bullhorn.com).

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.