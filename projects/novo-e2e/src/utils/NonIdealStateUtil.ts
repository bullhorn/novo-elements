import { codeExample, elements } from './SelectorUtil';

const page = 'non-ideal-state-examples-page';
const searchExample = codeExample('non-ideal-state-search-usage');
const loadingExample = codeExample('non-ideal-state-loading-usage');
const tipWell = 'novo-tip-well';

export const nonIdealStateSelectors = {
    page,
    basicUsageExample: codeExample('non-ideal-state-usage'),
    searchExample,
    loadingExample,
    basicUsageSectionHeading: `${page} h2`,
    basicUsageTitle: 'novo-title.novo-non-ideal-state-title',
    folderEmptyTitle: '[title="This folder is empty"]',
    folderEmptyText: '[title="This folder is empty"] novo-text',
    tipWell,
    tipWellButton: `${tipWell} ${elements.novoButton}`,
    searchTitle: `${searchExample} ${elements.title}`,
    searchText: `${searchExample} ${elements.text}`,
    searchInput: `${searchExample} ${elements.search} input[type="text"]`,
    loadingSpinner: `${loadingExample} ${elements.loading}`,
    loadingText: `${loadingExample} ${elements.text}`,
    loadingButton: `${loadingExample} ${elements.novoButton}`,
};
