import { componentsUrl, URLS } from '../utils/EnvironmentUtil';
import {
    verifyAbsent,
    verifyElementCountEquals,
    verifyPresent,
    verifyText
} from '../utils/VerifyUtil';
import { automationId, elements } from '../utils/SelectorUtil';
import { testElements, testFiltering, testSorting } from './common/table.common';
import { click } from '../utils/ElementActionUtil';
import { sleep } from '../utils/SleepUtil';

describe('Data Table Demo Tests', () => {
    const dataTable = 'data-table-page';
    const url = componentsUrl('data-table');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(URLS.HOME);
    });

    it('should display page title and examples', async () => {
        await verifyText(`${dataTable} h1`, 'Data Table (source)', 'Data Table example page title');
        await verifyPresent(dataTable);
    });

    describe('Array of Rows section', () => {
        it('should display Change Dataset buttons', async () => {
            await verifyText(automationId("Dataset #1"), 'Dataset #1');
            await verifyText(automationId("Dataset #2"), 'Dataset #2');
            await verifyText(automationId("Dataset #3"), 'Dataset #3');
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
            await verifyText(elements.primary, 'Configure Columns', 'Configure Columns button');
        });
        it('should display Row Details buttons', async () => {
            await verifyText(elements.primary, 'Show Row Details (first table)', 'Show Row Details (first table) button', 1);
            await verifyText(elements.primary, 'Hide Row Details (first table)', 'Hide Row Details (first table) button', 2);
        });
        it('should display 3 options in the Actions dropdown', async () => {
            await click(`${elements.actions} button`, 1);
            await verifyText(elements.dropdownOptions, 'Action 1', 'First Action');
            await verifyText(elements.dropdownOptions, 'Action 2', 'Second Action', 1);
            await verifyText(elements.dropdownOptions, 'Action 3', 'Third Action', 2);
        });
        it('should show no records when Dataset #3 is selected', async () => {
            await verifyPresent(`${automationId('Dataset #1')}${elements.buttonThemes.primary}`);
            await verifyPresent(`${automationId('Dataset #3')}${elements.buttonThemes.dialogue}`);
            await click(automationId('Dataset #3'));
            await verifyPresent(`${automationId('Dataset #3')}${elements.buttonThemes.primary}`);
            await verifyPresent(`${automationId('Dataset #1')}${elements.buttonThemes.dialogue}`);
            await verifyText('.novo-data-table-empty-message', 'Yo! No Records!');
            await click(automationId('Dataset #1'));
        });
        it('should change pagination style', async () => {
            await verifyPresent(`${automationId('Standard')}${elements.buttonThemes.primary}`);
            await verifyPresent(`${automationId('Basic')}${elements.buttonThemes.dialogue}`);
            await verifyElementCountEquals(automationId(elements.paginationDropdown), 2);
            await verifyElementCountEquals(automationId('novo-data-table-pagination-tiles'), 1);
            await click(automationId('Basic'));
            await verifyPresent(`${automationId('Basic')}${elements.buttonThemes.primary}`);
            await verifyPresent(`${automationId('Standard')}${elements.buttonThemes.dialogue}`);
            await verifyElementCountEquals(automationId(elements.paginationDropdown), 1);
            await verifyElementCountEquals(automationId('novo-data-table-pagination-tiles'), 2);
        });
        it('should change pagination placement', async () => {
            await verifyPresent(`${automationId('Top')}${elements.buttonThemes.primary}`);
            await verifyPresent(`${automationId('Bottom')}${elements.buttonThemes.dialogue}`);
            await verifyPresent(`header ${elements.pagination}`);
            await verifyElementCountEquals(`header ${elements.pagination}`, 3);
            await verifyElementCountEquals(`footer ${elements.pagination}`, 0);
            await click(automationId('Bottom'));
            await verifyPresent(`${automationId('Bottom')}${elements.buttonThemes.primary}`);
            await verifyPresent(`${automationId('Top')}${elements.buttonThemes.dialogue}`);
            await verifyPresent(`footer ${elements.pagination}`);
            await verifyElementCountEquals(`header ${elements.pagination}`, 2);
            await verifyElementCountEquals(`footer ${elements.pagination}`, 1);
        });
        it('should toggle global search', async () => {
            await verifyPresent(`${automationId('Hide')}${elements.buttonThemes.primary}`);
            await verifyPresent(`${automationId('Show')}${elements.buttonThemes.dialogue}`);
            await verifyAbsent('header novo-search');
            await click(automationId('Show'));
            await verifyPresent(`${automationId('Show')}${elements.buttonThemes.primary}`);
            await verifyPresent(`${automationId('Hide')}${elements.buttonThemes.dialogue}`);
            await verifyPresent('header novo-search');
        });
        it('should open a Configure Columns modal', async () => {
            await click(elements.primary);
            await verifyPresent('novo-modal [title="Configure Columns"]');
            await verifyText('novo-modal [title="Configure Columns"] novo-title', 'Configure Columns');
            await click(`button${elements.buttonThemes.standard}`);
            await verifyAbsent('novo-modal [title="Configure Columns"]');
        });
        it('should show and hide row details', async () => {
            await click(elements.primary, 1);
            await verifyPresent('.novo-data-table-detail-row');
            await click(elements.primary, 2);
            await sleep(500);
            await verifyAbsent('.novo-data-table-detail-row');
        });
    });
    describe('Test elements', async () => {
        await testElements(['id', 'date', 'status', 'percent']);
    });

    describe('Test filtering', async () => {
        before(async () => {
            await click(automationId('50'));
            await sleep(500);
        });
        await testFiltering(['id', 'bigdecimal']);
    });

    describe('Test sorting', async () => {
        before(async () => {
            await click(automationId('25'));
            await sleep(500);
        });
        await testSorting(['id', 'date', 'status', 'percent']);
    });
});
