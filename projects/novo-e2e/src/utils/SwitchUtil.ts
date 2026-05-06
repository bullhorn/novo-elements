import { automationId } from './SelectorUtil';

export const switchSelectors = {
    label: automationId('switch-label'),
    value: automationId('switch-value'),
    defaultSwitch: `${automationId('switch-default')} > div`,
    grapefruitSwitch: `${automationId('switch-grapefruit')} > div`,
    disabledSwitch: automationId('switch-disabled'),
};

export function switchIcon(switchSelector: string, checked: boolean): string {
    const icon = checked ? 'check' : 'x';
    return `${switchSelector} i.bhi-${icon}`;
}

export function isSwitchChecked(labelText: string): boolean {
    return labelText.includes('true');
}
