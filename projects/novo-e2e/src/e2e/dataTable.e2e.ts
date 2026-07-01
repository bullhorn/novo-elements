import { COMPONENT_URLS, componentsUrl, getURLs } from '../utils/EnvironmentUtil';
import {
    verifyAbsent,
    verifyElementCountEquals,
    verifyPresent,
    verifyText,
} from '../utils/VerifyUtil';
import { automationId, elements, themedButton } from '../utils/SelectorUtil';
import { testElements, testFiltering, testSorting } from './common/table.common';
import { click } from '../utils/ElementActionUtil';
import { sleep } from '../utils/SleepUtil';
import { dataTableSelectors } from '../utils/TableUtil';

describe('Data Table Demo Tests', () => {
    const url = componentsUrl(COMPONENT_URLS.DATA_TABLE);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Title and Layout', () => {
        it('should display page title and examples', async () => {
            await verifyText(dataTableSelectors.pageTitle, 'Data Table (source)', 'Data Table example page title');
            await verifyPresent(dataTableSelectors.page, 'data table page');
        });
    });

    describe('Array of Rows section', () => {
        it('should display Change Dataset buttons', async () => {
            await verifyText(automationId('Dataset #1'), 'Dataset #1');
            await verifyText(automationId('Dataset #2'), 'Dataset #2');
            await verifyText(automationId('Dataset #3'), 'Dataset #3');
        });
        it('should display Change Pagination Style buttons', async () => {
            await verifyText(automationId('Standard'), 'Standard');
            await verifyText(automationId('Basic'), 'Basic');
        });
        it('should display Change Pagination Placement buttons', async () => {
            await verifyText(automationId('Top'), 'Top');
            await verifyText(automationId('Bottom'), 'Bottom');
        });
        it('should display Toggle Global Search buttons', async () => {
            await verifyText(automationId('Show'), 'Show');
            await verifyText(automationId('Hide'), 'Hide');
        });
        it('should display Configure Columns buttons', async () => {
            await verifyText(elements.primaryButton, 'Configure Columns', 'Configure Columns button');
        });
        it('should display Row Details buttons', async () => {
            await verifyText(elements.primaryButton, 'Show Row Details (first table)', 'Show Row Details (first table) button', 1);
            await verifyText(elements.primaryButton, 'Hide Row Details (first table)', 'Hide Row Details (first table) button', 2);
        });
        it('should display 3 options in the Actions dropdown', async () => {
            await click(dataTableSelectors.actionsButton, 1);
            await verifyText(elements.dropdownOptions, 'Action 1', 'First Action');
            await verifyText(elements.dropdownOptions, 'Action 2', 'Second Action', 1);
            await verifyText(elements.dropdownOptions, 'Action 3', 'Third Action', 2);
        });
        it('should show no records when Dataset #3 is selected', async () => {
            await verifyPresent(themedButton('Dataset #1', elements.buttonThemes.primary));
            await verifyPresent(themedButton('Dataset #3', elements.buttonThemes.dialogue));
            await click(automationId('Dataset #3'));
            await verifyPresent(themedButton('Dataset #3', elements.buttonThemes.primary));
            await verifyPresent(themedButton('Dataset #1', elements.buttonThemes.dialogue));
            await verifyText(dataTableSelectors.emptyMessage, 'Yo! No Records!');
            await click(automationId('Dataset #1'));
        });
        it('should change pagination style', async () => {
            await verifyPresent(themedButton('Standard', elements.buttonThemes.primary));
            await verifyPresent(themedButton('Basic', elements.buttonThemes.dialogue));
            await verifyElementCountEquals(automationId(elements.paginationDropdown), 2);
            await verifyElementCountEquals(dataTableSelectors.paginationTiles, 1);
            await click(automationId('Basic'));
            await verifyPresent(themedButton('Basic', elements.buttonThemes.primary));
            await verifyPresent(themedButton('Standard', elements.buttonThemes.dialogue));
            await verifyElementCountEquals(automationId(elements.paginationDropdown), 1);
            await verifyElementCountEquals(dataTableSelectors.paginationTiles, 2);
        });
        it('should change pagination placement', async () => {
            await verifyPresent(themedButton('Top', elements.buttonThemes.primary));
            await verifyPresent(themedButton('Bottom', elements.buttonThemes.dialogue));
            await verifyPresent(dataTableSelectors.headerPagination);
            await verifyElementCountEquals(dataTableSelectors.headerPagination, 3);
            await verifyElementCountEquals(dataTableSelectors.footerPagination, 0);
            await click(automationId('Bottom'));
            await verifyPresent(themedButton('Bottom', elements.buttonThemes.primary));
            await verifyPresent(themedButton('Top', elements.buttonThemes.dialogue));
            await verifyPresent(dataTableSelectors.footerPagination);
            await verifyElementCountEquals(dataTableSelectors.headerPagination, 2);
            await verifyElementCountEquals(dataTableSelectors.footerPagination, 1);
        });
        it('should toggle global search', async () => {
            await verifyPresent(themedButton('Hide', elements.buttonThemes.primary));
            await verifyPresent(themedButton('Show', elements.buttonThemes.dialogue));
            await verifyAbsent(dataTableSelectors.headerSearch);
            await click(automationId('Show'));
            await verifyPresent(themedButton('Show', elements.buttonThemes.primary));
            await verifyPresent(themedButton('Hide', elements.buttonThemes.dialogue));
            await verifyPresent(dataTableSelectors.headerSearch);
        });
        it('should open a Configure Columns modal', async () => {
            await click(elements.primaryButton);
            await verifyPresent(dataTableSelectors.configureColumnsModal, 'configure columns modal');
            await verifyText(dataTableSelectors.configureColumnsModalTitle, 'Configure Columns');
            await click(dataTableSelectors.configureColumnsModalClose);
            await verifyAbsent(dataTableSelectors.configureColumnsModal, 'configure columns modal');
        });
        it('should show and hide row details', async () => {
            await click(elements.primaryButton, 1);
            await verifyPresent(dataTableSelectors.detailRow, 'row detail row');
            await click(elements.primaryButton, 2);
            await sleep(500);
            await verifyAbsent(dataTableSelectors.detailRow, 'row detail row');
        });
    });

    describe('Test elements', () => {
        testElements(['id', 'date', 'status', 'percent']);
    });

    describe('Test filtering', () => {
        before(async () => {
            await click(automationId('50'));
            await sleep(500);
        });
        testFiltering(['id', 'bigdecimal']);
    });

    describe('Test sorting', () => {
        before(async () => {
            await click(automationId('25'));
            await sleep(500);
        });
        testSorting(['id', 'date', 'status', 'percent']);
    });
});
