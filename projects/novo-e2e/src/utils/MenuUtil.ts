import { automationId, codeExample } from './SelectorUtil';
import { clickOutsideOfElement } from './ElementActionUtil';

export const menu = {
    basicMenu: automationId('basic-menu'),
    basicMenuButton: automationId('menu-actions-button'),
    basicMenuPreview: automationId('menu-preview'),
    basicMenuEdit: automationId('menu-edit'),
    basicMenuDisabled: automationId('menu-disabled'),
    basicMenuDelete: automationId('menu-delete'),
    iconMenu: automationId('icon-menu'),
    iconMenuButton: automationId('menu-icon-button'),
    iconMenuPreview: automationId('menu-icon-preview'),
    iconMenuEdit: automationId('menu-icon-edit'),
    iconMenuDelete: automationId('menu-icon-delete'),
    basicMenuExample: codeExample('basic-menu'),
    nestedMenuButton: automationId('nested-menu-button'),
    nestedMenu: automationId('nested-menu'),
    nestedMenuPreview: automationId('nested-menu-preview'),
    nestedMenuEdit: automationId('nested-menu-edit'),
    nestedMenuChoose: automationId('nested-menu-choose'),
    nestedSubmenu: automationId('nested-submenu'),
    nestedMenuAvailable: automationId('nested-menu-available'),
    nestedMenuNotAvailable: automationId('nested-menu-not-available'),
    nestedMenuExample: codeExample('nested-menu'),
    contextMenuButton: (fruit: string) => automationId(`menu-context-${fruit}s-button`),
    contextMenu: automationId('context-menu'),
    contextMenuPreview: automationId('menu-context-preview'),
    contextMenuEdit: automationId('menu-context-edit'),
    contextMenuDelete: automationId('menu-context-delete'),
    contextMenuDisabled: automationId('menu-context-disabled'),
    contextMenuVisible: automationId('menu-context-visible'),
    contextMenuExample: codeExample('menu-context'),
};

export async function closeMenu(): Promise<void> {
    await clickOutsideOfElement(menu.basicMenuExample, -100, -100);
}
