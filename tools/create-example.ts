import * as fs from 'fs';
import * as path from 'path';

/** Path to find the examples */
const examplesPath = path.join('./projects/', 'examples');

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
  let section = process.argv[2];
  let example = process.argv[3];
  let selector = `${example}-example`;
  let dir = path.join(examplesPath, section, example);
  fs.mkdirSync(dir);

  const tsTmp = generateTSTemplate(selector);
  let tsOutputFile = path.join(dir, `${selector}.ts`);
  fs.writeFileSync(tsOutputFile, tsTmp);

  const cssTmp = generateCSSTemplate(selector);
  let cssOutputFile = path.join(dir, `${selector}.css`);
  fs.writeFileSync(cssOutputFile, cssTmp);

  const htmlTmp = generateHTMLTemplate(selector);
  let htmlOutputFile = path.join(dir, `${selector}.html`);
  fs.writeFileSync(htmlOutputFile, htmlTmp);
};

task();
