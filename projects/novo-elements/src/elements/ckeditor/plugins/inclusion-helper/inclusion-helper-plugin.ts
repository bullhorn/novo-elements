import { Editor, InclusionSuggestionArgs, Suggestion } from '../../editor-types';
// import * as unifiedProxy from 'unified';
// const unified = (<any>unifiedProxy).default || unifiedProxy; // workaround for a delightfully terrible rollup issue
// const unified = require('unified');
import * as retextProxy from 'retext';
const retext = (<any>retextProxy).default || retextProxy; // workaround for a delightfully terrible rollup issue
import * as english from 'retext-english';
import * as equality from 'retext-equality';
import * as stringify from 'retext-stringify';
import { VFile } from 'vfile';
import { Processor } from 'unified';
import { debounceTime, throttleTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

export function init(editor: Editor): void {
  const processor = retext()
    .use(english)
    .use(equality)
    .use(stringify);

  const changeSubject = new Subject();
  changeSubject
    .pipe(
      throttleTime(1000),
      debounceTime(200),
    )
    .subscribe((event) => {
      console.log('change event', event);
      const body = editor.document.$.body;
      walk(body, editor, processor);
    });

  editor.on('change', (event) => {
    // fromEvent on editor or document doesn't work /shrug emoji
    changeSubject.next(event);
  });
}

async function walk(element: HTMLElement, editor: Editor, processor: Processor) {
  await verifyExistingWarnings(element.ownerDocument, processor);

  flattenChildNodes(element, 'inclusion-helper-warning')
    .filter((node: Node) => node.nodeType === Node.TEXT_NODE)
    .forEach((item) => parseAndAddSuggestions(item, editor, processor));
}

async function verifyExistingWarnings(document: Document, processor: Processor) {
  await Promise.all(
    Array.from(document.getElementsByClassName('inclusion-helper-warning')).map(async (element) => {
      const text = element.textContent;
      const vfile: VFile = await processor.process(text);
      if (vfile.messages.length !== 1 || vfile.messages[0].location.end.offset !== text.length) {
        removeWarning(element, document);
      }
      return;
    }),
  );
}

function removeWarning(element: Element, document: Document) {
  const parent = element.parentNode;
  parent.replaceChild(document.createTextNode(element.textContent), element);
}

function flattenChildNodes(parent: Node | HTMLElement, filter?: string): Node[] {
  const children = Array.from(parent.childNodes).filter((child: Node | HTMLElement) => {
    if ({}.hasOwnProperty.call(child, 'className') && filter) {
      return !(child as HTMLElement).className.includes(filter);
    } else {
      return true;
    }
  });
  if (children.length === 0) {
    return [parent];
  } else {
    return [parent, ...flatten(children.map((n) => flattenChildNodes(n, 'inclusion-helper-warning')))];
  }
}

function flatten<T>(a: T[][]): T[] {
  return a.reduce((prev, next) => [...(Array.isArray(prev) ? prev : [prev]), ...(Array.isArray(next) ? next : [next])]);
}

function getSuggestions(vfile: VFile, text): Suggestion[] {
  if (!vfile.messages && vfile.messages.length) {
    return [];
  }
  return vfile.messages
    .map((vmessage) => {
      const suggestedReplacements = vmessage.message.match(/`([^`]*)`/g).map((s) => s.replace(/`/g, ''));
      const problematicTerm = suggestedReplacements.shift();
      return {
        start: vmessage.location.start.offset,
        stop: vmessage.location.end.offset,
        id: vmessage.name + problematicTerm,
        problematicTerm,
        suggestedReplacements,
        explanation: makeExplanation(suggestedReplacements, problematicTerm),
      };
    })
    .concat(getCustomSuggestions(text));
}

function makeExplanation(suggestedReplacements: string[], problematicTerm: string): string {
  let replacements;
  if (suggestedReplacements.length === 1) {
    replacements = suggestedReplacements.map((t) => `"${t}"`).pop();
  } else if (suggestedReplacements.length === 2) {
    replacements = suggestedReplacements.map((t) => `"${t}"`).join(' or ');
  } else if (suggestedReplacements.length > 2) {
    replacements = `${suggestedReplacements
      .slice(0, -1)
      .map((t) => `"${t}"`)
      .join(', ')}, or ${suggestedReplacements.slice(-1).map((t) => `"${t}"`)}`;
  }
  return `"${problematicTerm}" is potentially a less inclusive term than ${replacements}`;
}

function getCustomSuggestions(text: string): Suggestion[] {
  const customList = [
    { term: 'self-sufficient', replacement: 'responsible' },
    { term: 'superior', replacement: 'excellent' },
    { term: 'boasts', replacement: 'has' },
    { term: ' courageously', replacement: ', with pluck and grit,' },
  ];
  return customList
    .filter(({ term }) => text.includes(term))
    .map(({ term, replacement }) => {
      return {
        start: text.indexOf(term),
        stop: text.indexOf(term) + term.length,
        id: term,
        problematicTerm: term,
        suggestedReplacements: [replacement],
        explanation: makeExplanation([replacement], term),
      };
    });
}

async function parseAndAddSuggestions(element: HTMLElement | Node, editor: Editor, processor: Processor): Promise<void> {
  const doc = element.ownerDocument;
  const text = element.textContent;
  const parent = element.parentNode;

  const vfile: VFile = await processor.process(text);
  // console.log(vfile);
  const suggestions: Suggestion[] = getSuggestions(vfile, text).filter((suggestion) => {
    if (!Array.isArray(editor.dismissedTerms) || editor.dismissedTerms.length === 0) {
      return true;
    }
    return !editor.dismissedTerms.find((term) => {
      return term === suggestion.problematicTerm;
    });
  });

  if (suggestions.length && !(parent as HTMLElement).className.includes('inclusion-helper-warning')) {
    // for reach suggestion, splice it into the thing
    const offset: number | undefined = getSelection(doc, element);

    splitIntoNodes(suggestions, text, doc, editor).forEach((node) => parent.insertBefore(node, element as ChildNode));
    if (Number.isInteger(offset)) {
      setSelection(doc, offset, parent);
    }
    parent.removeChild(element);
  }
}

function getSelection(doc: Document, element): number | undefined {
  const selection: Selection = doc.getSelection();
  if (selection.focusNode === element || selection.anchorNode === element) {
    return selection.focusOffset;
  }
}

function setSelection(doc: Document, location: number, parent: Node & ParentNode) {
  const selection = doc.getSelection();
  selection.removeAllRanges();

  const range = document.createRange();
  range.selectNode(parent);

  selection.addRange(range);
  selection.collapseToEnd();
}

function splitIntoNodes(suggestions: Suggestion[], text: string, doc, editor): (Node | HTMLElement)[] {
  const nodes = [];
  let index = 0;
  suggestions.sort(suggestionSorter).forEach((suggestion) => {
    if (index < suggestion.start) {
      nodes.push(doc.createTextNode(text.slice(index, suggestion.start)));
    }
    nodes.push(makeWarningElement(doc, suggestion, editor));
    index = suggestion.stop;
  });

  if (index < text.length) {
    nodes.push(doc.createTextNode(text.slice(index)));
  }

  return nodes;
}

function suggestionSorter(a: Suggestion, b: Suggestion): number {
  if (a.start < b.start) {
    return -1;
  }
  if (a.start > b.start) {
    return 1;
  }
  return 0;
}

function makeWarningElement(document: Document, suggestion: Suggestion, editor: Editor): HTMLElement {
  const warning = document.createElement('span');
  const textNodeForMatchedWord = document.createTextNode(suggestion.problematicTerm);

  warning.appendChild(textNodeForMatchedWord);

  const inclusionArgs: InclusionSuggestionArgs = {
    offset: 50,
    suggestion,
  };

  warning.onclick = () => {
    editor.fire('inclusion', inclusionArgs, editor);
  };
  const spanStyles = {
    display: 'inline-block',
    cursor: 'pointer',
    'border-bottom': '2px dashed gold',
    'border-right': '2px dashed gold',
    'font-style': 'normal',
    background: '#ffef94',
    padding: '0px 4px',
  };
  const style = Object.entries(spanStyles)
    .map((property) => property.join(' : '))
    .join(';');

  const spanAttributes = {
    style,
    id: suggestion.id,
    class: 'inclusion-helper-warning',
  };
  Object.entries(spanAttributes).forEach(([key, value]) => {
    warning.setAttribute(key, value);
  });

  return warning;
}
