import { automationId } from './SelectorUtil';

export const checkboxSelectors = {
    basicCheckbox: (index: number): string => automationId(`checkbox-basic-${index}`),
    basicCheckboxGroup: (index: number): string => `${automationId(`checkbox-basic-${index}`)} .novo-checkbox-group`,
    basicCheckboxIcon: (index: number): string => `${automationId(`checkbox-basic-${index}`)} i`,
    listEnabled: automationId('checkbox-list-enabled'),
    listDisabled: automationId('checkbox-list-disabled'),
    listDisabledGroup: `${automationId('checkbox-list-disabled')} .novo-checkbox-group`,
};
