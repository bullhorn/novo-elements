import { Editor, InclusionSuggestionArgs } from '../../editor-types';

export function init(editor: Editor): void {
  // we don't necessarily want a command, we want an event listener to listen for new words
  // when we get a new document, we need to run it through retext to give us back
  // a list of words or phrases with the means to locate their specific occurence in the dom
  // then we need to add squiggly styling & a tooltip

  // editor.addContentsCss('projects/novo-elements/src/elements/ckeditor/plugins/inclusion-helper/styles/inclusion-helper.scss');

  editor.on('change', () => {
    // const msgs = alex.html(editor.getData()).messages;
    const body = editor.document.$.body;
    walk(body, editor);
  });
}

function walk(element: HTMLElement, editor: Editor): void {
  flattenChildNodes(element)
    .filter((node: Node) => node.nodeType === Node.TEXT_NODE)
    .forEach((item) => parseAndAddSuggestions(item, editor));
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

function parseAndAddSuggestions(element: HTMLElement | Node, editor: Editor): void {
  const doc = element.ownerDocument;
  const text = element.textContent;
  const wordToReplace = 'poop';
  const parent = element.parentNode;

  if (text.includes(wordToReplace) && !(parent as HTMLElement).className.includes('inclusion-helper-warning')) {
    parent.removeChild(element);
    const [leftText, rightText] = text.split(wordToReplace);
    [doc.createTextNode(leftText), makeWarningElement(doc, wordToReplace, editor), doc.createTextNode(rightText)].forEach((item) =>
      parent.appendChild(item),
    );
  }
}

function makeWarningElement(document: Document, word: string, editor: Editor): HTMLElement {
  const span = document.createElement('span');
  const textNodeForMatchedWord = document.createTextNode(word);

  span.appendChild(textNodeForMatchedWord);

  const inclusionArgs: InclusionSuggestionArgs = {
    offset: 50,
    suggestions: 'something other than poop',
    word: 'poop',
  };

  span.onclick = () => {
    editor.fire('inclusion', inclusionArgs, editor);
  };
  const spanStyles = {
    display: 'inline-block',
    'border-bottom': '2px dashed gold',
    'border-right': '2px dashed gold',
    background: '#ffef94',
    padding: '0px 4px',
  };
  const style = Object.entries(spanStyles).map(property => property.join(' : ')).join(';');

  const spanAttributes = {
    style,
    class: 'inclusion-helper-warning',
  };
  Object.entries(spanAttributes).forEach(([key, value]) => {
    span.setAttribute(key, value);
  });

  return span;
}

function parse(editor: Editor) {
  const html = editor.document.getBody().getHtml();
  console.log(html);
}

function exec(editor: Editor): boolean {
  const now = new Date();
  editor.insertHtml('The current date and time is: <em>' + now.toString() + '</em>');
  return true;
}
