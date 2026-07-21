import { automationId } from './SelectorUtil';

export const ckEditorSelectors = {
    editor: (type: string): string => automationId(`ck-editor-${type}`),
    insertButton: (type: string): string => automationId(`ck-editor-${type}-insert`),
    valueDisplay: (type: string): string => automationId(`ck-editor-${type}-value`),
    htmlDisplay: (type: string): string => automationId(`ck-editor-${type}-html`),
};
