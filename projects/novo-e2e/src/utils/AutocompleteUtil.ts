import { AttributeSelectors, automationId } from './SelectorUtil';

export const basicUsage = {
    field: automationId('autocomplete-usage-field'),
    input: automationId('autocomplete-usage-input'),
    option: (index: number) => automationId(`autocomplete-usage-option-${index}`),
    allOptions: automationId('autocomplete-usage-option-', AttributeSelectors.beginsWith),
};

export const withChips = {
    field: automationId('chips-with-autocomplete-field'),
    chip: (index: number) => automationId(`chips-with-autocomplete-chip-${index}`),
    searchInput: automationId('chips-with-autocomplete-input'),
    option: (index: number) => automationId(`chips-with-autocomplete-option-${index}`),
    allOptions: automationId('chips-with-autocomplete-option-', AttributeSelectors.beginsWith),
};

export const autocompleteTextarea = {
    field: automationId('textarea-field'),
    input: automationId('textarea-input'),
    toppingsField: automationId('toppings-field'),
};

export const stackedChips = {
    field: automationId('stacked-chips-field'),
    chip: (index: number) => automationId(`stacked-chip-${index}`),
    searchInput: automationId('stacked-chips-input'),
    option: (index: number) => automationId(`stacked-chips-option-${index}`),
    allOptions: automationId('stacked-chips-option-', AttributeSelectors.beginsWith),
};
