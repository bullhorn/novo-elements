import { automationId } from './SelectorUtil';

export const radioSelectors = {
    basicGroup: automationId('radio-basic-group'),
    buttonGroup: automationId('radio-button-group'),
    iconGroup: automationId('radio-icon-group'),
    verticalGroup: automationId('radio-vertical-group'),
};

function radioItem(group: string, value: string): string {
    return automationId(`radio-${group}-${value}`);
}

export function basicRadio(value: string): string {
    return radioItem('basic', value);
}

export function basicRadioIcon(value: string): string {
    return `${radioItem('basic', value)} i`;
}

export function basicRadioLabel(value: string): string {
    return `${radioItem('basic', value)} label`;
}

export function buttonRadio(value: string): string {
    return radioItem('button', value);
}

export function buttonRadioControl(value: string): string {
    return `${radioItem('button', value)} novo-button`;
}

export function buttonRadioLabel(value: string): string {
    return `${radioItem('button', value)} label`;
}

export function iconRadio(icon: string): string {
    return radioItem('icon', icon);
}

export function iconRadioControl(icon: string): string {
    return `${radioItem('icon', icon)} novo-button`;
}

export function iconRadioLabel(icon: string): string {
    return `${radioItem('icon', icon)} label`;
}

export function verticalRadio(value: string): string {
    return radioItem('vertical', value);
}

export function verticalRadioIcon(value: string): string {
    return `${radioItem('vertical', value)} i`;
}

export function verticalRadioLabel(value: string): string {
    return `${radioItem('vertical', value)} label`;
}
