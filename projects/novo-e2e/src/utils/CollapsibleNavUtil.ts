import { automationId } from './SelectorUtil';

export const collapsibleNav = {
    nav: automationId('collapsible-nav'),
    toggle: automationId('collapsible-nav-toggle'),
    tab: automationId('collapsible-nav-tab'),
};

export const COLLAPSED_CLASS = 'novo-collapsible-nav-collapsed';

export function navTabLabel(): string {
    return `${collapsibleNav.nav} novo-text`;
}

export function navTabCloseButton(): string {
    return `${collapsibleNav.nav} novo-action`;
}
