import { sync as glob } from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

interface ExampleMetadata {
  component: string;
  sourcePath: string;
  id: string;
  title: string;
  additionalComponents: string[];
  additionalFiles: string[];
  selectorName: string[];
}

interface ParsedMetadata {
  primary: boolean;
  component: string;
  title: string;
  templateUrl: string;
}

interface ParsedMetadataResults {
  primaryComponent: ParsedMetadata;
  secondaryComponents: ParsedMetadata[];
}

/** Path to find the examples */
const examplesPath = path.join('./projects/', 'novo-examples', 'src');

/** Output path of the module that is being created */
const outputModuleFilename = path.join(examplesPath, 'examples.module.ts');

/** Build ES module import statements for the examples. */
function buildImportsTemplate(metadata: ExampleMetadata): string {
  const components = metadata.additionalComponents.concat(metadata.component);

  // Create a relative path to the source file of the current example.
  // The relative path will be used inside of a TypeScript import statement.
  const relativeSrcPath = path
    .relative(examplesPath, metadata.sourcePath)
    .replace(/\\/g, '/')
    .replace('.ts', '');

  return `import {${components.join(',')}} from './${relativeSrcPath}';
`;
}

/**
 * Builds the examples metadata including title, component, etc.
 */
function buildExamplesTemplate(metadata: ExampleMetadata): string {
  const tsSource = fs.existsSync(metadata.sourcePath) ? fs.readFileSync(metadata.sourcePath, 'utf-8') : '';
  const cssSource = fs.existsSync(metadata.sourcePath.replace('.ts', '.css'))
    ? fs.readFileSync(metadata.sourcePath.replace('.ts', '.css'), 'utf-8')
    : '';
  const htmlSource = fs.existsSync(metadata.sourcePath.replace('.ts', '.html'))
    ? fs.readFileSync(metadata.sourcePath.replace('.ts', '.html'), 'utf-8')
    : '';

  const fields = [
    `title: '${metadata.title.trim()}'`,
    `component: ${metadata.component}`,
    `tsSource: \`${encodeURIComponent(tsSource)}\``,
    `cssSource: \`${encodeURIComponent(cssSource)}\``,
    `htmlSource: \`${encodeURIComponent(htmlSource)}\``,
  ];

  // if no additional files or selectors were provided,
  // return null since we don't care about if these were not found
  if (metadata.additionalFiles.length) {
    fields.push(`additionalFiles: ${JSON.stringify(metadata.additionalFiles)}`);
  }

  if (metadata.selectorName.length) {
    fields.push(`selectorName: '${metadata.selectorName.join(', ')}'`);
  }

  const data = '\n' + fields.map((field) => '    ' + field).join(',\n');

  return `'${metadata.id}': {${data}
  },
  `;
}

/**
 * Build the list of components template
 */
function buildListTemplate(metadata: ExampleMetadata): string {
  const components = metadata.additionalComponents.concat(metadata.component);
  return `${components.join(',')},
  `;
}

/**
 * Builds the template for the examples module
 */
function generateExampleNgModule(extractedMetadata: ExampleMetadata[]): string {
  return `
/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED VIA GULP 'build-examples-module' */
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NovoElementsModule} from 'novo-elements';
import { ChomskyModule } from 'chomsky';

// Examples
${extractedMetadata
    .map((r) => buildImportsTemplate(r))
    .join('')
    .trim()}

export interface LiveExample {
  title: string;
  component: any;
  additionalFiles?: string[];
  selectorName?: string;
  tsSource?: string;
  cssSource?: string;
  htmlSource?: string;
}

export const EXAMPLE_COMPONENTS: {[key: string]: LiveExample} = {
  ${extractedMetadata
    .map((r) => buildExamplesTemplate(r))
    .join('')
    .trim()}
};

export const EXAMPLE_LIST = [
  ${extractedMetadata
    .map((r) => buildListTemplate(r))
    .join('')
    .trim()}
];

@NgModule({
  declarations: EXAMPLE_LIST,
  entryComponents: EXAMPLE_LIST,
  exports: EXAMPLE_LIST,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NovoElementsModule,
    ChomskyModule
  ]
})
export class NovoExamplesModule { }
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
 * Parse the AST of a file and get metadata about it
 */
function parseExampleMetadata(fileName: string, sourceContent: string): ParsedMetadataResults {
  const sourceFile = ts.createSourceFile(fileName, sourceContent, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);

  const metas = [];

  const visit = (node: any): void => {
    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      const meta: any = {
        component: node.name.text,
      };

      if (node.jsDoc && node.jsDoc.length) {
        for (const doc of node.jsDoc) {
          if (doc.tags && doc.tags.length) {
            for (const tag of doc.tags) {
              const tagValue = tag.comment;
              const tagName = tag.tagName.text;
              if (tagName === 'title') {
                meta.title = tagValue;
                meta.primary = true;
              }
            }
          }
        }
      }

      if (node.decorators && node.decorators.length) {
        for (const decorator of node.decorators) {
          if (decorator.expression.expression.text === 'Component') {
            for (const arg of decorator.expression.arguments) {
              for (const prop of arg.properties) {
                const name = prop.name.text;
                const value = prop.initializer.text;
                meta[name] = value;
              }
            }

            metas.push(meta);
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return {
    primaryComponent: metas.find((m) => m.primary),
    secondaryComponents: metas.filter((m) => !m.primary),
  };
}

/**
 * Creates the examples module and metadata
 */
const task = () => {
  const results: ExampleMetadata[] = [];
  const matchedFiles = glob(path.join(examplesPath, '**/*-example.ts'));

  for (const sourcePath of matchedFiles) {
    if (sourcePath === outputModuleFilename) {
      continue;
    }

    const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
    const { primaryComponent, secondaryComponents } = parseExampleMetadata(sourcePath, sourceContent);

    if (primaryComponent) {
      // Generate a unique id for the component by converting the class name to dash-case.
      const id = convertToDashCase(primaryComponent.component.replace('Example', ''));

      const example: ExampleMetadata = {
        sourcePath,
        id,
        component: primaryComponent.component,
        title: primaryComponent.title,
        additionalComponents: [],
        additionalFiles: [],
        selectorName: [],
      };

      if (secondaryComponents.length) {
        example.selectorName.push(example.component);

        for (const meta of secondaryComponents) {
          example.additionalComponents.push(meta.component);
          if (meta.templateUrl) {
            example.additionalFiles.push(meta.templateUrl);
          }
          example.selectorName.push(meta.component);
        }
      }

      results.push(example);
    }
  }

  const generatedModuleFile = generateExampleNgModule(results);
  fs.writeFileSync(outputModuleFilename, generatedModuleFile);
};

task();
