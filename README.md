# NOVO Elements [![npm version](https://badge.fury.io/js/novo-elements.svg)](http://badge.fury.io/js/novo-elements) [![Build Status](https://travis-ci.org/bullhorn/novo-elements.svg?branch=master)](https://travis-ci.org/bullhorn/novo-elements) [![Coverage Status](https://coveralls.io/repos/github/bullhorn/novo-elements/badge.svg?branch=master)](https://coveralls.io/github/bullhorn/novo-elements?branch=master)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bullhorn/Open-Source?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Dependency Status](https://david-dm.org/bullhorn/novo-elements.svg)](https://david-dm.org/bullhorn/novo-elements)
[![devDependency Status](https://david-dm.org/bullhorn/novo-elements/dev-status.svg)](https://david-dm.org/bullhorn/novo-elements#info=devDependencies)

## Dependencies

- [NodeJS v4.0+](https://nodejs.org/en/)
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
    
## Integrating into a project

    # Install the modile
    npm install --save novo-elements
    
Depending on what system you are using (SystemJS, Webpack, etc..) the setup will vary.

**SystemJS**

> For SystemJS you will need to add some mappings in order to successfully use this library

    // Add a SystemJS Config mapping for novo-elements
    // A MomentJS mapping is required as well
    System.config({
        defaultJSExtensions: true,
        paths: {
            'novo-elements': '/node_modules/novo-elements/lib/novo-elements.js',
            'moment': '/node_modules/moment/moment.js',
            ...
        }
    });
    
**Note:** You can forgo adding the mappings and just include `novo-elements/bundles/novo-elements.js` as a script tag into your `index.html` page instead.
    
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
    
## Scripts

**clean**
Cleans up the generated files/folders.

    npm run clean
    
**compile**
Compiles the main lib and bundles the SystemJS modules

    npm run compile
    
    # This runs the following scripts AUTOMATICALLY
    # npm run compile:lib
    # npm run compile:system
    
**compile:lib**
Compiles the `src` folder into `lib` via babel

**compile:system**
Compiles the SystemJS bundles, adding all required dependencies

**prepublish** / **postpublish**
Hooks into the publish script to compile and deploy to gh-pages

**start**
Starts up the Webpack Dev Server for local development

**test**
Runs all specs via Karma in the `src` folder

**changelog**
Generates the `CHANGELOG.md` file

**github-release**
Generates a github release for the project/version

**preversion** / **version** / **postversion**
Updates the projects version, runs the changelog and commits and pushes

**build:prod**
Builds the `dist` folder for the demo

**pree2e** / **e2e** / **e2e:live**
Runs the protractor automation normally or with the element explorer

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