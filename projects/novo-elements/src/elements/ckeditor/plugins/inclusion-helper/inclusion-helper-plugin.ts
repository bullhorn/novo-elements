import { Editor, InclusionSuggestionArgs } from '../../editor-types';
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

export function init(editor: Editor): void {
  editor.on('change', () => {
    // const msgs = alex.html(editor.getData()).messages;
    const body = editor.document.$.body;
    walk(body, editor);
  });
}

function walk(element: HTMLElement, editor: Editor): void {
  const processor = retext()
    .use(english)
    .use(equality)
    .use(stringify);

  flattenChildNodes(element)
    .filter((node: Node) => node.nodeType === Node.TEXT_NODE)
    .forEach((item) => parseAndAddSuggestions(item, editor, processor));
}

function flattenChildNodes(parent: Node | HTMLElement): Node[] {
  const children = Array.from(parent.childNodes).filter((child: Node | HTMLElement) => {
    if ({}.hasOwnProperty.call(child, 'className')) {
      return !(child as HTMLElement).className.includes('inclusion-helper-warning');
    } else {
      return true;
    }
  });
  if (children.length === 0) {
    return [parent];
  } else {
    return [parent, ...flatten(children.map(flattenChildNodes))];
  }
}

function flatten<T>(a: T[][]): T[] {
  return a.reduce((prev, next) => [...(Array.isArray(prev) ? prev : [prev]), ...(Array.isArray(next) ? next : [next])]);
}

async function parseAndAddSuggestions(element: HTMLElement | Node, editor: Editor, processor: Processor): Promise<void> {
  const doc = element.ownerDocument;
  const text = element.textContent;
  const wordToReplace = 'poop';
  const parent = element.parentNode;

  const messages: VFile = await processor.process(text);
  console.log(messages);

  if (text.includes(wordToReplace) && !(parent as HTMLElement).className.includes('inclusion-helper-warning')) {
    parent.removeChild(element);
    const [leftText, rightText] = text.split(wordToReplace);
    if (leftText) {
      parent.appendChild(doc.createTextNode(leftText));
    }
    parent.appendChild(makeWarningElement(doc, wordToReplace, editor));
    if (rightText) {
      parent.appendChild(doc.createTextNode(rightText));
    }
  }
}

function makeWarningElement(document: Document, word: string, editor: Editor): HTMLElement {
  const warning = document.createElement('span');
  const textNodeForMatchedWord = document.createTextNode(word);

  warning.appendChild(textNodeForMatchedWord);

  const inclusionArgs: InclusionSuggestionArgs = {
    offset: 50,
    suggestions: 'something other than poop',
    word: 'poop',
  };

  warning.onclick = () => {
    editor.fire('inclusion', inclusionArgs, editor);
  };
  const spanStyles = {
    display: 'inline-block',
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
    class: 'inclusion-helper-warning',
  };
  Object.entries(spanAttributes).forEach(([key, value]) => {
    warning.setAttribute(key, value);
  });

  return warning;
}
