import { sync as glob } from 'glob';
import * as fs from 'fs';
import * as path from 'path';

const srcPath = path.join('./demo/', 'app/pages/elements');
/** Path to find the examples */
const examplesPath = path.join('./projects/', 'novo-examples/src');

/**
 * Builds the template for the examples module
 */
function generateTSTemplate(selector: string): string {
  let description = convertToSentence(selector);
  let name = convertToCamelCase(selector);
  return `
import {Component} from '@angular/core';

/**
 * @title ${description}
 */
@Component({
  selector: '${selector}',
  templateUrl: '${selector}.html',
  styleUrls: ['${selector}.css'],
})
export class ${name} {}
`;
}

/**
 * Builds the template for the examples module
 */
function generateCSSTemplate(selector: string): string {
  return `
/** No CSS for this example */
`;
}

/**
 * Builds the template for the examples module
 */
function generateHTMLTemplate(selector: string): string {
  return `
<div>Example Template</div>
`;
}

/**
 * Builds the template for the examples module
 */
function generateMDTemplate(selector: string): string {
  return `
${selector}
=============
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
 * Creates the examples files
 */
const task = () => {
  let example = process.argv[2];
  console.log(example);

  const matchedFiles = glob(path.join(srcPath, example, 'templates/**/*.html'));

  let dir = path.join(examplesPath, example);
  fs.mkdirSync(dir);

  const mdTmp = generateMDTemplate(example);
  let mdOutputFile = path.join(dir, `${example}.md`);
  fs.writeFileSync(mdOutputFile, mdTmp);

  for (const sourcePath of matchedFiles) {
    console.log('source', sourcePath);
    let fileName = path.basename(sourcePath, '.html');
    let name = convertToDashCase(fileName.replace('Demo', ''));
    let exdir = path.join(dir, `${name}`);
    fs.mkdirSync(exdir);

    let selector = `${name}-example`;
    let tsTmp = generateTSTemplate(selector);
    let tsOutputFile = path.join(exdir, `${selector}.ts`);
    fs.writeFileSync(tsOutputFile, tsTmp);

    let cssTmp = generateCSSTemplate(selector);
    let cssOutputFile = path.join(exdir, `${selector}.css`);
    fs.writeFileSync(cssOutputFile, cssTmp);

    let htmlTmp = fs.readFileSync(sourcePath, 'utf-8');
    let htmlOutputFile = path.join(exdir, `${selector}.html`);
    fs.writeFileSync(htmlOutputFile, htmlTmp);
  }
};

task();
