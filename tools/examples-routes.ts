import frontmatter from '@github-docs/frontmatter';
import fs from 'fs';
import { sync as glob } from 'glob';
import HLJS, { HLJSApi } from 'highlight.js';
import Markdown from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import Container from 'markdown-it-container';
import taskLists from 'markdown-it-task-lists';
import path from 'path';
import { Application, TSConfigReader } from 'typedoc';
import { BullhornFlavoredMarkdownPlugin } from './markdown/bfm-blocks';
import { DoListPlugin } from './markdown/dos-list';

// Typedefs are not valid
const hljs = HLJS as unknown as HLJSApi;

interface PageMetadata {
  id: string;
  section: string;
  page: string;
  name: string;
  title: string;
  template: string;
  route: string;
  order: number;
  tag: string;
}

interface PageTree {
  [page: string]: PageMetadata[];
}

interface SectionTree {
  [section: string]: PageTree;
}

const md = new Markdown({
  html: true,
  highlight: (str: string, lang: string) => {
    try {
      if (lang) {
        return hljs.highlight(str, { language: lang }).value;
      } else {
        return hljs.highlightAuto(str).value;
      }
    } catch (e) {
      console.log('err hljs', e);
    }

    return ''; // use external default escaping
  },
});

md.use(markdownItAttrs);
md.use(taskLists);
md.use(DoListPlugin);
md.use(BullhornFlavoredMarkdownPlugin);
md.use(Container, 'grid', {
  validate: (params) => params.trim().match(/^grid\s+(.*)$/),
  render: (tokens, idx) => {
    const m = tokens[idx].info.trim().match(/^grid\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      return '<novo-grid columns="' + md.utils.escapeHtml(m[1]) + '">\n'; // opening tag
    } else {
      return '</novo-grid>\n'; // closing tag
    }
  },
});

md.use(Container, 'figure', {
  validate: (params) => params.trim().match(/^figure\s*(.*)$/),
  render: (tokens, idx) => {
    const m = tokens[idx].info.trim().match(/^figure\s*(.*)$/);
    if (tokens[idx].nesting === 1) {
      return '<figure-example theme="' + md.utils.escapeHtml(m[1]) + '">\n'; // opening tag
    } else {
      return '</figure-example>\n'; // closing tag
    }
  },
});

md.use(Container, 'box', {
  validate: (params) => params.trim().match(/^box\s*(.*)$/),
  render: (tokens, idx) => {
    const m = tokens[idx].info.trim().match(/^box\s*(.*)$/);
    if (tokens[idx].nesting === 1) {
      return '<novo-box>\n'; // opening tag
    } else {
      return '</novo-box>\n'; // closing tag
    }
  },
});

md.use(Container, 'do', {
  validate: (params) => params.trim().match(/^do\s+(.*)$/),
  render: (tokens, idx) => {
    const m = tokens[idx].info.trim().match(/^do\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      return (
        '<novo-text color="grass"><novo-icon mr="1rem">check</novo-icon><strong>' +
        md.utils.escapeHtml(m[1]) +
        '</strong></novo-text>\n<novo-text>'
      ); // opening tag
    } else {
      return '</novo-text>\n'; // closing tag
    }
  },
});

md.use(Container, 'dont', {
  validate: (params) => params.trim().match(/^dont\s+(.*)$/),
  render: (tokens, idx) => {
    const m = tokens[idx].info.trim().match(/^dont\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      return (
        '<novo-text color="grapefruit"><novo-icon mr="1rem">times</novo-icon><strong>' +
        md.utils.escapeHtml(m[1]) +
        '</strong></novo-text>\n<novo-text>'
      ); // opening tag
    } else {
      return '</novo-text>\n'; // closing tag
    }
  },
});

/** Path to find the elements */
const elementsPath = path.join('./projects/', 'novo-elements', 'src');
/** Path to find the examples */
const examplesPath = path.join('./projects/', 'novo-examples', 'src');

/** Output path of the module that is being created */
const outputSourceFilename = path.join(examplesPath, 'examples.routes.ts');

let _pageOrder = 0;

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
  template: \`${metadata.template}\`,
  host: { class: 'markdown-page' }
})
export class ${metadata.name}Page {
  public params: any = {};
}
`;
}

/**
 * Builds the template for the examples module
 */
function generatePageRoute(metadata: PageMetadata[]): string {
  const sections = aggregatePages(metadata);
  const chooseLayout = (section: string, page: string, comps: PageMetadata[]) => {
    const pathRoot = convertToDashCase(section);
    const route = `${pathRoot}/${page}`.replace('src/', '');
    const tabs = comps.filter((it) => it.order !== -1);
    const subs = `[${tabs.map((it) => `{ title: '${it.title}', route: './${it.route}'}`).join()}]`;
    const hasDesc = comps.filter((it) => it.order === -1);
    const tags = comps.reduce((agg, it) => [...agg, it.tag], []).filter(Boolean);
    const tag = tags.length ? `, tag: '${tags[0]}'` : '';
    let desc = 'null';
    if (hasDesc.length) {
      desc = `${hasDesc[0].name}Page`;
    }
    return tabs.length > 1
      ? `  {
    path: '${route}',
    component: TabsLayout,
    data: { title: '${convertToSentence(page)}', section: '${pathRoot}', pages: ${subs}, description: ${desc}${tag} },
    children: [
${tabs.map((comp) => `      { path: '${comp.route}', component: ${comp.name}Page }`).join(',\n')},
      { path: '', redirectTo: '/${pathRoot}/${page}/${tabs[0].route}', pathMatch: 'full' },
    ]
  }`
      : `  { path: '${route}', component: ${tabs[0].name}Page, data: { title: '${tabs[0].title}', section: '${tabs[0].section}'${tag} } }`;
  };

  return Object.entries(sections)
    .map(([section, pages]) => {
      return Object.entries(pages)
        .map(([page, comps]) => {
          return chooseLayout(section, page, comps);
        })
        .join(',\n');
    })
    .join(',\n');

  // return `  { path: '${metadata.route}', component: ${metadata.name}Page, data: { title: '${metadata.title}', section: '${metadata.section}' } },`
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
import { NovoExamplesSharedModule, TabsLayout, DefaultLayout } from './_shared';
import { NovoElementsModule } from 'novo-elements';

${extractedMetadata
  .map((r) => generatePageComponent(r))
  .join('\n')
  .trim()}

const routes: Routes = [
  //{ path: '', component: Home, data: {} },
${generatePageRoute(extractedMetadata)},
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
  imports: [RouterModule.forRoot(routes, { useHash: true, anchorScrolling: 'enabled' }), NovoElementsModule, NovoExamplesModule, NovoExamplesSharedModule],
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
  name = name.replace(/[A-Z-]/g, ' $&');
  name = name.toLowerCase().trim();
  return name.split(' ').join('-').replace('--', '-');
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
 * Parse the AST of a file and get metadata about it
 */
function parsePageMetadata(filePath: string, sourceContent: string): PageMetadata {
  const { data, content } = frontmatter(sourceContent);
  const markup = md.render(content).replace(/<pre[^<>]*>(.*?)<\/pre>/gs, '<pre>$1</pre>'.replace(/\n/g, '\\n'));
  // .replace(/\n/g, '');
  const fileName = path.basename(filePath, '.md');

  // let template = markup;

  // if (data.layout === 'usage') {
  //   const parser = new DOMParser();
  //   const serializer = new XMLSerializer();
  //   const htmlDoc = parser.parseFromString(markup, 'text/html');
  //   const sections = Array.from(htmlDoc.getElementsByTagName('h2')).map((it: any) => it.textContent);
  //   Array.from(htmlDoc.getElementsByTagName('h2')).forEach((it: any) => it.setAttribute('id', convertToDashCase(it.textContent)));

  //   template = [
  //     `<header><novo-flex><h1>${convertToSentence(fileName)}</h1><novo-nav theme="white">`,
  //     ...sections.map((it) => `<novo-tab-link spy="${convertToDashCase(it)}">${it}</novo-tab-link>`),
  //     `</novo-nav></novo-flex></header>`,
  //     serializer.serializeToString(htmlDoc),
  //   ].join('');
  // }

  const [root = 'root', parent = 'parent'] = path.dirname(filePath).split('/').slice(-2);
  const { section = root, page = parent, title = convertToSentence(fileName), order = ++_pageOrder, tag = null } = data;

  return {
    id: fileName,
    name: convertToCamelCase(fileName),
    title: title,
    section: section.toLowerCase(),
    page: page.toLowerCase(),
    template: markup.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;'),
    route: convertToDashCase(title).replace('src/', ''),
    order: order,
    tag: tag,
  };
}

async function generateApiDocs() {
  const app = new Application();

  // If you want TypeDoc to load tsconfig.json / typedoc.json files
  app.options.addReader(new TSConfigReader());
  // app.options.addReader(new TypeDoc.TypeDocReader());

  app.bootstrap({
    // typedoc options here
    entryPoints: [`${elementsPath}/index.ts`],
    excludeExternals: true,
    excludePrivate: true,
  });

  const project = app.convert();

  if (project) {
    // Project may not have converted correctly
    const outputDir = 'projects/demo/assets';

    // Alternatively generate JSON output
    await app.generateJson(project, outputDir + '/documentation.json');
  }
}

/**
 * Aggregate multiple markdown files in same directory
 * to be parsed as single page metadata.
 */
function aggregatePages(metadata: PageMetadata[]): SectionTree {
  return metadata.reduce((pages, meta) => {
    const { section, page, name, title } = meta;
    const root = pages[section] || {};
    const existing: PageMetadata[] = root[page] || [];
    existing.push(meta);
    root[page] = existing.sort((a, b) => a.order - b.order);
    pages[section] = root;
    return pages;
  }, {});
}

/**
 * Creates the examples module and metadata
 */
const task = async () => {
  await generateApiDocs();

  const results: PageMetadata[] = [];
  const matchedFiles = glob(path.join(examplesPath, '**/*.md'));

  for (const sourcePath of matchedFiles) {
    const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
    const metadata = parsePageMetadata(sourcePath, sourceContent);
    results.push(metadata);
  }

  const generatedModuleFile = generatePageModule(results);

  fs.writeFileSync(outputSourceFilename, generatedModuleFile);
};

task();
