// Markdown-it plugin to render a Do's  lists; see

let disableCheckboxes = true;
let useLabelWrapper = false;
let useLabelAfter = false;

interface MarkdownToken {
  type: string;
  content: string;
}

interface PluginOptions {
  enabled: boolean;
  label: boolean;
  labelAfter: boolean;
}

export const DoListPlugin = (md: any, options: PluginOptions) => {
  if (options) {
    disableCheckboxes = !options.enabled;
    useLabelWrapper = !!options.label;
    useLabelAfter = !!options.labelAfter;
  }

  md.core.ruler.after('inline', 'bullhorn-do-lists', (state) => {
    let tokens = state.tokens;
    for (let i = 2; i < tokens.length; i++) {
      if (isTodoItem(tokens, i)) {
        createListItem(tokens[i], state.Token);
        attrSet(tokens[i - 2], 'class', 'bullhorn-do-item' + (!disableCheckboxes ? ' enabled' : ''));
        attrSet(tokens[parentToken(tokens, i - 2)], 'class', 'contains-do-list');
      }
    }
  });
};

function attrSet(token, name, value) {
  let index = token.attrIndex(name);
  let attr = [name, value];

  if (index < 0) {
    token.attrPush(attr);
  } else {
    token.attrs[index] = attr;
  }
}

function parentToken(tokens, index) {
  let targetLevel = tokens[index].level - 1;
  for (let i = index - 1; i >= 0; i--) {
    if (tokens[i].level === targetLevel) {
      return i;
    }
  }
  return -1;
}

function isTodoItem(tokens, index) {
  return (
    isInline(tokens[index]) && isParagraph(tokens[index - 1]) && isListItem(tokens[index - 2]) && startsWithDoListMarkdown(tokens[index])
  );
}

function createListItem(token, TokenConstructor) {
  token.children = [makeNode(token, TokenConstructor)];
}

function makeNode(token, TokenConstructor) {
  let node = new TokenConstructor('html_inline', '', 0);
  let content = token.content.slice(3);

  if (token.content.indexOf('(✓) ') === 0) {
    node.content = `<novo-icon color="grass" mr="md" size="md">check</novo-icon><novo-text color="grass">${content}</novo-text>`;
  } else if (token.content.indexOf('(x) ') === 0 || token.content.indexOf('(X) ') === 0) {
    node.content = `<novo-icon color="grapefruit" mr="md" size="md">times</novo-icon><novo-text color="grapefruit">${content}</novo-text>`;
  }
  return node;
}

function isInline(token: MarkdownToken) {
  return token.type === 'inline';
}
function isParagraph(token: MarkdownToken) {
  return token.type === 'paragraph_open';
}
function isListItem(token: MarkdownToken) {
  return token.type === 'list_item_open';
}

function startsWithDoListMarkdown(token: MarkdownToken) {
  // leading whitespace in a list item is already trimmed off by markdown-it
  return token.content.indexOf('(✓) ') === 0 || token.content.indexOf('(x) ') === 0 || token.content.indexOf('(X) ') === 0;
}
