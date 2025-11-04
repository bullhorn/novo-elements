import fs from 'fs';
import { sync as glob } from 'glob';
import path from 'path';

const srcPath = path.posix.join('./demo/', 'app/pages/elements');
/** Path to find the examples */
const examplesPath = path.posix.join('./projects/', 'novo-examples/src');

/**
 * Builds the template for the examples module
 */
function generateTSTemplate(selector: string): string {
  const description = convertToSentence(selector);
  const name = convertToCamelCase(selector);
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
    .replace(/(\b[a-z]+\b)/g, function (a, b) {
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
    .replace(/(\b[a-z]+\b)/g, function (a, b) {
      return b[0].toUpperCase() + b.slice(1);
    })
    .replace(/-/g, ' ');
}

/**
 * Creates the examples files
 */
const task = () => {
  const example = process.argv[2];
  console.log(example);

  const matchedFiles = glob(path.posix.join(srcPath, example, 'templates/**/*.html'), { posix: true });

  const dir = path.posix.join(examplesPath, example);
  fs.mkdirSync(dir);

  const mdTmp = generateMDTemplate(example);
  const mdOutputFile = path.posix.join(dir, `${example}.md`);
  fs.writeFileSync(mdOutputFile, mdTmp);

  for (const sourcePath of matchedFiles) {
    console.log('source', sourcePath);
    const fileName = path.basename(sourcePath, '.html');
    const name = convertToDashCase(fileName.replace('Demo', ''));
    const exdir = path.posix.join(dir, `${name}`);
    fs.mkdirSync(exdir);

    const selector = `${name}-example`;
    const tsTmp = generateTSTemplate(selector);
    const tsOutputFile = path.posix.join(exdir, `${selector}.ts`);
    fs.writeFileSync(tsOutputFile, tsTmp);

    const cssTmp = generateCSSTemplate(selector);
    const cssOutputFile = path.posix.join(exdir, `${selector}.css`);
    fs.writeFileSync(cssOutputFile, cssTmp);

    const htmlTmp = fs.readFileSync(sourcePath, 'utf-8');
    const htmlOutputFile = path.posix.join(exdir, `${selector}.html`);
    fs.writeFileSync(htmlOutputFile, htmlTmp);
  }
};

task();
