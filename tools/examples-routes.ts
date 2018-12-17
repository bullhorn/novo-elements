import { sync as glob } from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import * as Markdown from 'markdown-it';

interface PageMetadata {
  id: string;
  name: string;
  title: string;
  section: string;
  template: string;
  route: string;
}

const md = new Markdown({
  html: true,
});

/** Path to find the examples */
const examplesPath = path.join('./projects/', 'novo-examples', 'src');

/** Output path of the module that is being created */
const outputSourceFilename = path.join(examplesPath, 'examples.routes.ts');

/**
 * Build the list of components template
 */
function buildListTemplate(metadata: PageMetadata): string {
  return `${metadata.name}Page`;
}

/**
 * Builds the template for the examples module
 */
function generatePageComponent(metadata: PageMetadata): string {
  return `
@Component({
  selector: '${metadata.id}-page',
  template: \`${metadata.template}\`
})
export class ${metadata.name}Page {}
`;
}

/**
 * Builds the template for the examples module
 */
function generatePageRoute(metadata: PageMetadata): string {
  return `  { path: '${metadata.route}', component: ${metadata.name}Page, data: { title: '${metadata.title}', section: '${
    metadata.section
  }' } },
`;
}

/**
 * Builds the template for the examples module
 */
function generatePageModule(extractedMetadata: PageMetadata[]): string {
  return `
/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED 'build-examples-module' */
import {NgModule, Component} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoExamplesModule } from './examples.module';
import { NovoExamplesSharedModule } from './_shared/shared.module';

${extractedMetadata
    .map((r) => generatePageComponent(r))
    .join('\n')
    .trim()}

const routes: Routes = [
  //{ path: '', component: Home, data: {} },
  ${extractedMetadata
    .map((r) => generatePageRoute(r))
    .join('')
    .trim()}
  // Catch All
  { path: '**', redirectTo: '/home', data: {} },
];

export const PAGE_LIST = [
  ${extractedMetadata
    .map((r) => buildListTemplate(r))
    .join(',')
    .trim()}
];

@NgModule({
  declarations: PAGE_LIST,
  entryComponents: PAGE_LIST,
  imports: [RouterModule.forRoot(routes, { useHash: true }), NovoExamplesModule, NovoExamplesSharedModule],
  exports: [RouterModule],
})
export class NovoExamplesRoutesModule {}
`;
}

/**
 * Given a string that is a camel or pascal case,
 * this function will convert to dash case.
 */
function convertToDashCase(name: string): string {
  name = name.replace(/[A-Z]/g, ' $&');
  name = name.toLowerCase().trim();
  return name.split(' ').join('-');
}

/**
 * Given a string that is a camel or pascal case,
 * this function will convert to dash case.
 */
function convertToCamelCase(name: string): string {
  return name
    .replace(/(\b[a-z]+\b)/g, function(a, b) {
      return b[0].toUpperCase() + b.slice(1);
    })
    .replace(/-/g, '');
}

/**
 * Given a string that is a camel or pascal case,
 * this function will convert to dash case.
 */
function convertToSentence(name: string): string {
  return name
    .replace(/(\b[a-z]+\b)/g, function(a, b) {
      return b[0].toUpperCase() + b.slice(1);
    })
    .replace(/-/g, ' ');
}

/**
 * Parse the AST of a file and get metadata about it
 */
function parsePageMetadata(filePath: string, sourceContent: string): PageMetadata {
  const markup = md.render(sourceContent).replace(/\n/g, '');
  const fileName = path.basename(filePath, '.md');
  return {
    id: fileName,
    name: convertToCamelCase(fileName),
    title: convertToSentence(fileName),
    section: path
      .dirname(filePath)
      .split('/') // Platform specific File separator doesn't apply
      .slice(-2, -1)[0],
    template: markup,
    route: path
      .dirname(filePath)
      .split('/')
      .slice(3)
      .join('/'),
  };
}

/**
 * Creates the examples module and metadata
 */
const task = () => {
  const results: PageMetadata[] = [];
  const matchedFiles = glob(path.join(examplesPath, '**/*.md'));

  for (const sourcePath of matchedFiles) {
    console.log('source', sourcePath);
    const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
    const metadata = parsePageMetadata(sourcePath, sourceContent);
    results.push(metadata);
  }

  const generatedModuleFile = generatePageModule(results);
  fs.writeFileSync(outputSourceFilename, generatedModuleFile);
};

task();
