import { automationId } from './SelectorUtil';
import { getElementWithTextValue } from './GetElementUtil';

export const basicMultiPicker = {
    component: automationId('multi-picker-basic'),
};

export const nestedMultiPicker = {
    component: automationId('multi-picker-nested'),
};

export const checklistResults = 'checklist-picker-results';
export const checklistSectionHeaders = 'checklist-picker-results li.header.caption';

export function basicSelectedState(index: number): string {
    return automationId(`multi-picker-basic-state-${index}`);
}

export function nestedSelectedDept(index: number): string {
    return automationId(`multi-picker-nested-dept-${index}`);
}

export function nestedSelectedUser(index: number): string {
    return automationId(`multi-picker-nested-user-${index}`);
}

export function multiPickerInput(componentSelector: string): string {
    return `${componentSelector} input`;
}

export function clearAllButtonIn(componentSelector: string): string {
    return `${componentSelector} label.clear-all`;
}

export function chipsIn(componentSelector: string): string {
    return `${componentSelector} novo-chip`;
}

export async function clickChecklistItemByLabel(label: string): Promise<void> {
    const item = await getElementWithTextValue('checklist-picker-results li:not(.header)', label);
    if (!item) {
        throw new Error(`Checklist item with label '${label}' not found`);
    }
    await item.click();
}
