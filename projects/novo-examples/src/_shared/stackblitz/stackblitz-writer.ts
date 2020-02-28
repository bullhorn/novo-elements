import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExampleData } from '../../examples.data';

const STACKBLITZ_URL = 'https://run.stackblitz.com/api/angular/v1';

const COPYRIGHT = `Copyright 2018 Bullhorn Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license`;

const TEMPLATE_PATH = './assets/stackblitz/';
const TEMPLATE_FILES = ['index.html', 'styles.scss', 'polyfills.ts', 'main.ts'];

const TAGS: string[] = ['angular', 'bullhon', 'novo-elements', 'example'];
const angularVersion = '^7.2.0';

const dependencies = {
  '@angular/cdk': angularVersion,
  '@angular/animations': angularVersion,
  '@angular/common': angularVersion,
  '@angular/compiler': angularVersion,
  '@angular/core': angularVersion,
  '@angular/forms': angularVersion,
  '@angular/http': angularVersion,
  '@angular/platform-browser': angularVersion,
  '@angular/platform-browser-dynamic': angularVersion,
  '@angular/router': angularVersion,
  'novo-elements': '3.6.0',
  'angular-in-memory-web-api': '~0.5.0',
  'core-js': '^2.6.2',
  rxjs: '^6.3.3',
  'rxjs-compat': '^6.3.3',
  '@bullhorn/dragula': '1.0.1',
  'ace-builds': '1.4.2',
  'angular2-text-mask': '9.0.0',
  brace: '0.11.1',
  'classlist.js': '^1.1.20150312',
  'date-fns': '1.30.1',
  'post-robot': '9.0.30',
  'web-animations-js': '^2.3.1',
  'text-mask-addons': '^3.8.0',
  'zone.js': '^0.8.14',
  hammerjs: '^2.0.8',
  moment: '^2.18.1',
};

/**
 * Stackblitz writer, write example files to stackblitz
 *
 * StackBlitz API
 * URL: https://run.stackblitz.com/api/aio/v1/
 * data: {
 *   // File name, directory and content of files
 *   files[file-name1]: file-content1,
 *   files[directory-name/file-name2]: file-content2,
 *   // Can add multiple tags
 *   tags[0]: tag-0,
 *   // Description of stackblitz
 *   description: description,
 *   // Private or not
 *   private: true
 *  // Dependencies
 *  dependencies: dependencies
 * }
 */
@Injectable()
export class StackblitzWriter {
  constructor(private _http: HttpClient) {}

  /**
   * Returns an HTMLFormElement that will open a new stackblitz template with the example data when
   * called with submit().
   */
  constructStackblitzForm(data: ExampleData): Promise<HTMLFormElement> {
    const indexFile = `app%2F${data.indexFilename}.ts`;
    const form = this._createFormElement(indexFile);

    TAGS.forEach((tag, i) => this._appendFormInput(form, `tags[${i}]`, tag));
    this._appendFormInput(form, 'private', 'true');
    this._appendFormInput(form, 'description', data.description);
    this._appendFormInput(form, 'dependencies', JSON.stringify(dependencies));

    return new Promise((resolve) => {
      const templateContents = TEMPLATE_FILES.map((file) => this._readFile(form, data, file, TEMPLATE_PATH));

      const exampleContents = [];
      exampleContents.push(
        Promise.resolve(
          this._addFileToForm(form, data, decodeURIComponent(data.source.tsSource), `app/${data.selectorName}.ts`, TEMPLATE_PATH),
        ),
      );
      exampleContents.push(
        Promise.resolve(
          this._addFileToForm(form, data, decodeURIComponent(data.source.htmlSource), `app/${data.selectorName}.html`, TEMPLATE_PATH),
        ),
      );
      exampleContents.push(
        Promise.resolve(
          this._addFileToForm(form, data, decodeURIComponent(data.source.cssSource), `app/${data.selectorName}.css`, TEMPLATE_PATH),
        ),
      );
      exampleContents.push(
        Promise.resolve(
          this._addFileToForm(form, data, JSON.stringify({ apps: [{ styles: ['styles.scss'] }] }), `.angular-cli.json`, TEMPLATE_PATH),
        ),
      );

      // // TODO(josephperrott): Prevent including assets to be manually checked.
      // if (data.selectorName === 'icon-svg-example') {
      //   this._readFile(form, data, 'assets/img/examples/thumbup-icon.svg', '', false);
      // }

      Promise.all(templateContents.concat(exampleContents)).then(() => {
        resolve(form);
      });
    });
  }

  /** Constructs a new form element that will navigate to the stackblitz url. */
  _createFormElement(indexFile: string): HTMLFormElement {
    const form = document.createElement('form');
    form.action = `${STACKBLITZ_URL}?file=${indexFile}`;
    form.method = 'post';
    form.target = '_blank';
    return form;
  }

  /** Appends the name and value as an input to the form. */
  _appendFormInput(form: HTMLFormElement, name: string, value: string): void {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  /**
   * Reads the file and adds its text to the form
   * @param form the html form you are appending to
   * @param data example metadata about the example
   * @param filename file name of the example
   * @param path path to the src
   * @param prependApp whether to prepend the 'app' prefix to the path
   */
  _readFile(form: HTMLFormElement, data: ExampleData, filename: string, path: string, prependApp = true): void {
    this._http
      .get(path + filename, { responseType: 'text' })
      .subscribe((response) => this._addFileToForm(form, data, response, filename, path, prependApp), (error) => console.log(error));
  }

  /**
   * Adds the file text to the form.
   * @param form the html form you are appending to
   * @param data example metadata about the example
   * @param content file contents
   * @param filename file name of the example
   * @param path path to the src
   * @param prependApp whether to prepend the 'app' prefix to the path
   */
  _addFileToForm(form: HTMLFormElement, data: ExampleData, content: string, filename: string, path: string, prependApp = true) {
    if (path === TEMPLATE_PATH) {
      content = this._replaceExamplePlaceholderNames(data, filename, content);
    } else if (prependApp) {
      filename = 'app/' + filename;
    }
    this._appendFormInput(form, `files[${filename}]`, this._appendCopyright(filename, content));
  }

  /**
   * The stackblitz template assets contain placeholder names for the examples:
   * "<novo-docs-example>" and "NovoDocsExample".
   * This will replace those placeholders with the names from the example metadata,
   * e.g. "<basic-button-example>" and "BasicButtonExample"
   */
  _replaceExamplePlaceholderNames(data: ExampleData, fileName: string, fileContent: string): string {
    if (fileName === 'index.html') {
      // Replace the component selector in `index,html`.
      // For example, <novo-docs-example></novo-docs-example> will be replaced as
      // <button-demo></button-demo>
      fileContent = fileContent.replace(/novo-docs-example/g, data.selectorName);
      fileContent = fileContent.replace(/{{version}}/g, 'latest');
    } else if (fileName === 'main.ts') {
      // Replace the component name in `main.ts`.
      // Replace `import {NovoDocsExample} from 'novo-docs-example'`
      // will be replaced as `import {ButtonDemo} from './button-demo'`
      fileContent = fileContent.replace(/{ NovoDocsExample }/g, `{ ${data.componentName} }`);

      // Replace `declarations: [NovoDocsExample]`
      // will be replaced as `declarations: [ButtonDemo]`
      fileContent = fileContent.replace(/declarations: \[NovoDocsExample\]/g, `declarations: [${data.componentName}]`);

      // Replace `entryComponents: [NovoDocsExample]`
      // will be replaced as `entryComponents: [DialogContent]`
      fileContent = fileContent.replace(/entryComponents: \[NovoDocsExample\]/g, `entryComponents: [${data.componentName}]`);

      // Replace `bootstrap: [NovoDocsExample]`
      // will be replaced as `bootstrap: [ButtonDemo]`
      // This assumes the first component listed in the main component
      const componentList = (data.componentName || '').split(',')[0];
      fileContent = fileContent.replace(/bootstrap: \[NovoDocsExample\]/g, `bootstrap: [${componentList}]`);

      fileContent = fileContent.replace(/novo-docs-example/g, data.indexFilename);
    }
    return fileContent;
  }

  _appendCopyright(filename: string, content: string) {
    if (filename.indexOf('.ts') > -1 || filename.indexOf('.scss') > -1) {
      content = `${content}\n\n/**  ${COPYRIGHT} */`;
    } else if (filename.indexOf('.html') > -1) {
      content = `${content}\n\n<!-- ${COPYRIGHT} -->`;
    }
    return content;
  }
}
