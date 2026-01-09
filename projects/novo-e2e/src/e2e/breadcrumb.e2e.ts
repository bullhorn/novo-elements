import { browser } from '@wdio/globals';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { verifyPresent, verifyText } from '../utils/VerifyUtil';
import { click } from '../utils/ElementActionUtil';
import { automationId, codeExample, elements } from '../utils/SelectorUtil';
import { getAllElements } from '../utils/GetElementUtil';

describe('Breadcrumbs Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.BREADCRUMB);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    async function verifyBreadcrumbCount(
        containerSelector: string,
        expectedCount: number,
    ): Promise<void> {
        const breadcrumbItems = await getAllElements(`${containerSelector} novo-breadcrumb-item`);
        expect(breadcrumbItems.length).toEqual(expectedCount);
    }

    it('should display page title and examples', async () => {
        await verifyPresent(elements.title);
        await verifyText(elements.title, 'Breadcrumbs', 'Breadcrumbs example page title');
        await verifyPresent('breadcrumb-examples-page');
    });

    describe('Static Example', () => {
        it('should display static section with correct breadcrumb structure', async () => {
            const exampleSelector = codeExample('breadcrumb-usage');
            await verifyPresent(exampleSelector);
            await verifyBreadcrumbCount(exampleSelector, 2);
        });

        it('should have static Home breadcrumb', async () => {
            await verifyText(automationId('breadcrumb-home'), 'Home');
        });

        it('should have static Components breadcrumb', async () => {
            await verifyText(automationId('breadcrumb-components'), 'Components');
        });
    });

    describe('Dynamic Example', () => {
        const exampleSelector = codeExample('breadcrumb-source-usage-example');
        it('should display dynamic section with correct breadcrumb structure', async () => {
            const usageSelector = codeExample('breadcrumb-source-usage');
            await verifyPresent(usageSelector);
            await verifyBreadcrumbCount(usageSelector, 2);
        });

        it('should have dynamic Home breadcrumb', async () => {
            await verifyText(`${exampleSelector} span.novo-breadcrumb-item a`, 'Home', 'First Dynamic Item');
        });

        it('should have dynamic Components breadcrumb', async () => {
            await verifyText(`${exampleSelector} span.novo-breadcrumb-item span`, 'Components', 'Second Dynamic Item');
        });
    });

    describe('Breadcrumb Dropdown', () => {
        const button = 'novo-breadcrumb-item novo-button';
        const dropdownOption = '.novo-option-text';
        it('should display dropdown button in breadcrumb', async () => {
            await verifyPresent(button);
        });

        it('should open dropdown menu and display all options', async () => {
            await click(button);
            await Promise.all([
                verifyPresent('.dropdown-container'),
                verifyText(dropdownOption, 'Colors', 'First dropdown option'),
                verifyText(dropdownOption, 'Composition', 'Second dropdown option', 1),
                verifyText(dropdownOption, 'Typography', 'Third dropdown option', 2),
            ]);
        });

        it('should be able to select a dropdown option', async () => {
            const dropdownOptions = await getAllElements('.novo-option-text');
            await expect(dropdownOptions.length).toBeGreaterThan(0);
            await click('.novo-option-text');
            await browser.waitUntil(async () => {
                const containers = await getAllElements('.dropdown-container');
                return containers.length === 0;
            }, { timeout: 5000, timeoutMsg: 'Dropdown did not close after selection' });
        });
    });
});
