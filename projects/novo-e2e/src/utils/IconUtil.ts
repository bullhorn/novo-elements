import { automationId, codeExample } from './SelectorUtil';

export const iconSections = {
    basicUsage: codeExample('basic-icons'),
    themedColors: codeExample('themed-icons'),
    raisedIcons: codeExample('raised-icons'),
};

export function basicIcon(name: string): string {
    return `${iconSections.basicUsage} ${automationId(`basic-icon-${name}`)}`;
}

export function basicIconClass(name: string): string {
    return `${iconSections.basicUsage} ${automationId(`basic-icon-class-${name}`)}`;
}

export function themedIconColor(name: string): string {
    return `${iconSections.themedColors} ${automationId(`themed-icon-color-${name}`)}`;
}

export function themedIconTheme(name: string): string {
    return `${iconSections.themedColors} ${automationId(`themed-icon-theme-${name}`)}`;
}

export function raisedIcon(name: string): string {
    return `${iconSections.raisedIcons} ${automationId(`raised-icon-${name}`)}`;
}
