import { browser } from '@wdio/globals';
import { examplesUrl, URLS } from '../utils/EnvironmentUtil';
import { verifyPresent, verifyText } from '../utils/VerifyUtil';
import { click } from '../utils/ElementActionUtil';
import { codeExample, elements } from '../utils/SelectorUtil';
import { getAllElements } from '../utils/GetElementUtil';

describe('Breadcrumbs Demo Page', () => {
    const url = examplesUrl('breadcrumbs');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(URLS.HOME);
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
            const exampleSelector = codeExample('breadcrumb-usage');
            await verifyText(`${exampleSelector} a[routerlink="/components/get-start"]`, 'Home', 'First Static Item');
        });

        it('should have static Components breadcrumb', async () => {
            const exampleSelector = codeExample('breadcrumb-usage');
            await verifyText(`${exampleSelector} novo-breadcrumb-item span.novo-breadcrumb-item`, 'Components', 'Second Static Item', 1);
        });
    });

    describe('Dynamic Example', () => {
        it('should display dynamic section with correct breadcrumb structure', async () => {
            const exampleSelector = codeExample('breadcrumb-source-usage');
            await verifyPresent(exampleSelector);
            await verifyBreadcrumbCount(exampleSelector, 2);
        });

        it('should have dynamic Home breadcrumb', async () => {
            const exampleSelector = codeExample('breadcrumb-source-usage');
            await verifyText(`${exampleSelector} novo-breadcrumb-item:nth-of-type(1) span.novo-breadcrumb-item a`, 'Home', 'First Dynamic Item');
        });

        it('should have dynamic Components breadcrumb', async () => {
            const exampleSelector = codeExample('breadcrumb-source-usage');
            await verifyText(`${exampleSelector} novo-breadcrumb-item:nth-of-type(2) span.novo-breadcrumb-item span`, 'Components', 'Second Dynamic Item');
        });
    });

    describe('Breadcrumb Dropdown', () => {
        it('should display dropdown button in breadcrumb', async () => {
            await verifyPresent('novo-breadcrumb-item novo-button');
        });

        it('should open dropdown menu and display all options', async () => {
            await click('novo-breadcrumb-item novo-button');
            await Promise.all([
                verifyPresent('.dropdown-container'),
                verifyText('.novo-option-text', 'Colors', 'First dropdown option'),
                verifyText('.novo-option-text', 'Composition', 'Second dropdown option', 1),
                verifyText('.novo-option-text', 'Typography', 'Second dropdown option', 2),
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
