import { browser } from '@wdio/globals';
import { examplesUrl, URLS } from '../utils/EnvironmentUtil';
import { verifyNotActive, verifyPresent, verifyText } from '../utils/VerifyUtil';
import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { getAllElements } from '../utils/GetElementUtil';
import { elements } from '../utils/SelectorUtil';

describe('Non Ideal State Demo Page', () => {
    const url = examplesUrl('non ideal state');
    const searchSelector = 'code-example[example="non-ideal-state-search-usage"]';
    const loadingSelector = 'code-example[example="non-ideal-state-loading-usage"]';
    let buttons;

    before(async () => {
        await browser.navigateTo(url);
        buttons = await getAllElements(elements.primaryButton);
    });

    after(async () => {
        await browser.navigateTo(URLS.HOME);
    });

    it('should display page title', async () => {
        await verifyPresent(elements.title);
        await verifyText(elements.title, 'Non Ideal State', 'Non Ideal State example page title');
        await verifyPresent('non-ideal-state-examples-page');
    });

    describe('Basic Button Usage', () => {
        it('should display basic usage section', async () => {
            await verifyText('non-ideal-state-examples-page h2', 'Basic Usage', 'Basic Usage section title');
        });

        it('should have non-ideal-state-usage section', async () => {
            await verifyPresent('code-example[example="non-ideal-state-usage"]');
        });

        it('should have 3 upload buttons', async () => {
            expect(buttons.length).toEqual(3);
        })

        it('should display "This folder is empty" title', async () => {
            await verifyText('novo-title.novo-non-ideal-state-title', 'This folder is empty', 'Non ideal state title');
        });

        it('should display upload description text', async () => {
            const exampleSelector = 'code-example[example="non-ideal-state-usage"] non-ideal-state-usage-example novo-non-ideal-state:nth-of-type(1)';
            await verifyText(`${exampleSelector} novo-text`, 'Upload a new file to populate the folder.', 'Upload description');
        });

        it('should display tip-well "Ok, Got it" button and hide section when clicked', async () => {
            const tipwell = 'novo-tip-well';
            await verifyText(`${tipwell} ${elements.novoButton}`, 'Ok, Got it', 'Tip well button');
            await click(`${tipwell} ${elements.novoButton}`);
            await verifyNotActive(tipwell);
        });
    });

    describe('Search Usage Example', () => {
        it('should display search usage example', async () => {
            await scrollIntoView(searchSelector);
            await verifyPresent(searchSelector);
        });

        it('should display "No results found" title', async () => {
            await verifyText(`${searchSelector} ${elements.title}`, 'No results found.', 'Search no results title');
        });

        it('should display search description text', async () => {
            await verifyText(`${searchSelector} ${elements.text}`, 'Your search didn\'t match any files.\\nTry searching for something else.');
        });

        it('should display search input field', async () => {
            const searchInputs = await getAllElements(`${searchSelector} ${elements.search} input[type="text"]`);
            expect(searchInputs.length).toBeGreaterThan(0);
        });
    });

    describe('Loading Usage Example', () => {
        it('should display loading usage example', async () => {
            await scrollIntoView(loadingSelector);
            await verifyPresent(loadingSelector);
        });

        it('should display loading spinner', async () => {
            await verifyPresent(`${loadingSelector} ${elements.loading}`);
        });

        it('should display loading message', async () => {
            await verifyText(`${loadingSelector} ${elements.text}`, 'We are currently experiencing technical difficulites and your wait time is taking a bit longer than expected. Thank you for your patience.'); // todo fix spelling when code is fixed
        });

        it('should display Refresh button', async () => {
            await verifyText(`${loadingSelector} ${elements.novoButton}`, 'Refresh', 'Refresh button');
        });
    });
});
