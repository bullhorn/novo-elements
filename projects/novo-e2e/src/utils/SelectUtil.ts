import { automationId } from './SelectorUtil';

export const selectSelectors = {
    basicField: automationId('select-basic-field-1'),
    basicInput: automationId('select-basic-options'),
    basicValueLabel: automationId('select-basic-value-1'),
    basicOption: (index: number): string => automationId(`select-basic-option-${index}`),
    basicDisabled: automationId('select-basic-disabled'),

    searchField: automationId('select-search-field'),
    searchInput: automationId('select-search-input'),
    searchFilter: automationId('select-search-filter'),
    searchResult: automationId('select-search-result'),

    legacyField: automationId('select-legacy-field'),
    legacyInput: automationId('select-legacy-input'),
    legacyValueLabel: automationId('select-legacy-value'),
    legacyOption: (index: number): string => automationId(`select-legacy-option-${index}`),

    longField: automationId('select-long-field'),
    longInput: automationId('select-long-input'),

    multipleField: automationId('select-multiple-field'),
    multipleInput: automationId('select-multiple-input'),
    multipleValueLabel: automationId('select-multiple-value'),
    multipleOption: (index: number): string => automationId(`select-multiple-option-${index}`),

    multiSearchField: automationId('select-multi-search-field'),
    multiSearchInput: automationId('select-multi-search-input'),
    multiSearchFilter: automationId('select-multi-search-filter'),
    multiSearchResultsHeading: automationId('select-multi-search-results-heading'),
    multiSearchResult: (index: number): string => automationId(`select-multi-search-result-${index}`),
};
