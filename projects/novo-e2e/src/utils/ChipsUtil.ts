import { automationId } from './SelectorUtil';

export const chipsSelectors = {
    // Basic Chips
    basicInput: automationId('chips-basic-input'),
    basicValue: automationId('chips-basic-value'),
    basicFirstChip: `${automationId('chips-basic-input')} novo-chip`,
    basicSecondChip: `${automationId('chips-basic-input')} novo-chip:nth-of-type(2)`,
    basicThirdChip: `${automationId('chips-basic-input')} novo-chip:nth-of-type(3)`,
    basicChipRemove: (nth: number) => `${automationId('chips-basic-input')} novo-chip:nth-of-type(${nth}) .novo-chip-remove`,
    pickerResultItem: (nth: number) => `[data-automation-id="picker-result-list-item"]:nth-of-type(${nth})`,

    // Chip Usage
    chipUsageSizeGroup: automationId('chip-usage-size-group'),
    chipUsageStandard: automationId('chip-usage-standard'),
    chipUsageIcon: automationId('chip-usage-icon'),
    chipUsageRemovable: automationId('chip-usage-removable'),
    chipUsageDisabled: automationId('chip-usage-disabled'),
};

export function chipUsageSizeSelector(size: string): string {
    return automationId(`chip-usage-size-${size}`);
}

export function chipUsageColorSelector(color: string): string {
    return automationId(`chip-usage-${color}`);
}

export function chipUsageAccentSelector(accent: string): string {
    return automationId(`chip-usage-accent-${accent}`);
}

export function chipUsageSizeRadio(size: string): string {
    return `${chipUsageSizeSelector(size)} i`;
}
