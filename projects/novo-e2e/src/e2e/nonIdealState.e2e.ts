import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { verifyNotActive, verifyPresent, verifyText, verifyElementCountEquals } from '../utils/VerifyUtil';
import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { getAllElements } from '../utils/GetElementUtil';
import { elements } from '../utils/SelectorUtil';
import { nonIdealStateSelectors } from '../utils/NonIdealStateUtil';

describe('Non Ideal State Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.NON_IDEAL_STATE);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Title and Layout', () => {
        it('should display page title', async () => {
            await verifyPresent(elements.title, 'page title');
            await verifyText(elements.title, 'Non Ideal State', 'Non Ideal State example page title');
            await verifyPresent(nonIdealStateSelectors.page, 'non-ideal-state examples page');
        });
    });

    describe('Basic Button Usage', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display basic usage section', async () => {
            await verifyText(nonIdealStateSelectors.basicUsageSectionHeading, 'Basic Usage', 'Basic Usage section title');
        });

        it('should have non-ideal-state-usage section', async () => {
            await verifyPresent(nonIdealStateSelectors.basicUsageExample, 'basic usage example');
        });

        it('should have 3 upload buttons', async () => {
            await verifyElementCountEquals(elements.primaryButton, 3, 'upload buttons');
        });

        it('should display "This folder is empty" title', async () => {
            await verifyText(nonIdealStateSelectors.basicUsageTitle, 'This folder is empty', 'Non ideal state title');
        });

        it('should display upload description text', async () => {
            await verifyText(nonIdealStateSelectors.folderEmptyText, 'Upload a new file to populate the folder.', 'Upload description');
        });

        it('should display tip-well "Ok, Got it" button and hide section when clicked', async () => {
            await verifyText(nonIdealStateSelectors.tipWellButton, 'Ok, Got it', 'Tip well button');
            await click(nonIdealStateSelectors.tipWellButton);
            await verifyNotActive(nonIdealStateSelectors.tipWell, 'tip well');
        });
    });

    describe('Search Usage Example', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display search usage example', async () => {
            await scrollIntoView(nonIdealStateSelectors.searchExample);
            await verifyPresent(nonIdealStateSelectors.searchExample, 'search usage example');
        });

        it('should display "No results found" title', async () => {
            await verifyText(nonIdealStateSelectors.searchTitle, 'No results found.', 'Search no results title');
        });

        it('should display search description text', async () => {
            await verifyText(nonIdealStateSelectors.searchText, 'Your search didn\'t match any files.\\nTry searching for something else.');
        });

        it('should display search input field', async () => {
            const searchInputs = await getAllElements(nonIdealStateSelectors.searchInput);
            expect(searchInputs.length).toBeGreaterThan(0);
        });
    });

    describe('Loading Usage Example', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display loading usage example', async () => {
            await scrollIntoView(nonIdealStateSelectors.loadingExample);
            await verifyPresent(nonIdealStateSelectors.loadingExample, 'loading usage example');
        });

        it('should display loading spinner', async () => {
            await verifyPresent(nonIdealStateSelectors.loadingSpinner, 'loading spinner');
        });

        it('should display loading message', async () => {
            await verifyText(nonIdealStateSelectors.loadingText, 'We are currently experiencing technical difficulties and your wait time is taking a bit longer than expected. Thank you for your patience.');
        });

        it('should display Refresh button', async () => {
            await verifyText(nonIdealStateSelectors.loadingButton, 'Refresh', 'Refresh button');
        });
    });
});
