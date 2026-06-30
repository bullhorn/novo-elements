import { automationId } from './SelectorUtil';
import { getElementWithTextValue } from './GetElementUtil';

export const basicPicker = {
    component: automationId('picker-basic-input'),
    value: automationId('picker-basic-value'),
};

export const asyncPicker = {
    component: automationId('picker-async-input'),
    value: automationId('picker-async-value'),
};

export const formattedPicker = {
    component: automationId('picker-formatted-input'),
    value: automationId('picker-formatted-value'),
};

export const entityPicker = {
    component: automationId('picker-entity-input'),
    value: automationId('picker-entity-value'),
};

export const defaultArrayPicker = {
    component: automationId('picker-default-array-input'),
    value: automationId('picker-default-array-value'),
};

export const pickerResultItems = '[data-automation-id="picker-result-list-item"]';
export const entityPickerResultItems = 'entity-picker-results novo-list-item';

export function pickerInput(componentSelector: string): string {
    return `${componentSelector} input`;
}

export function clearButtonIn(componentSelector: string): string {
    return `${componentSelector} i.bhi-times`;
}

export async function clickPickerItemByLabel(label: string): Promise<void> {
    const item = await getElementWithTextValue(pickerResultItems, label);
    if (!item) {
        throw new Error(`Picker item with label '${label}' not found`);
    }
    await item.click();
}
