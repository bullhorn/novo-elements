import { automationId } from './SelectorUtil';

export const selectSelectors = {
    basicField: automationId('select-basic-field-1'),
    basicInput: automationId('select-basic-options'),
    basicValueLabel: automationId('select-basic-value-1'),
    basicDisabled: automationId('select-basic-disabled'),

    searchField: automationId('select-search-field'),
    searchInput: automationId('select-search-input'),
    searchFilter: automationId('select-search-filter'),
    searchResult: automationId('select-search-result'),

    legacyField: automationId('select-legacy-field'),
    legacyInput: automationId('select-legacy-input'),
    legacyValueLabel: automationId('select-legacy-value'),

    longField: automationId('select-long-field'),
    longInput: automationId('select-long-input'),

    multipleField: automationId('select-multiple-field'),
    multipleInput: automationId('select-multiple-input'),
    multipleValueLabel: automationId('select-multiple-value'),

    multiSearchField: automationId('select-multi-search-field'),
    multiSearchInput: automationId('select-multi-search-input'),
    multiSearchFilter: automationId('select-multi-search-filter'),
    multiSearchResultsHeading: automationId('select-multi-search-results-heading'),
};

export function selectBasicOption(index: number): string {
    return automationId(`select-basic-option-${index}`);
}

export function selectLegacyOption(index: number): string {
    return automationId(`select-legacy-option-${index}`);
}

export function selectMultipleOption(index: number): string {
    return automationId(`select-multiple-option-${index}`);
}

export function selectMultiSearchResult(index: number): string {
    return automationId(`select-multi-search-result-${index}`);
}
