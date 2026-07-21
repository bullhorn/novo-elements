import { browser } from '@wdio/globals';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { verifyPresent, verifyText } from '../utils/VerifyUtil';
import { click } from '../utils/ElementActionUtil';
import { elements } from '../utils/SelectorUtil';
import { waitForElementToBeAbsent } from '../utils/WaitUtil';
import { breadcrumbSelectors, dynamicItemLink, dynamicItemSpan } from '../utils/BreadcrumbUtil';

describe('Breadcrumbs Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.BREADCRUMB);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Title and Layout', () => {
        it('should display page title and examples', async () => {
            await verifyPresent(elements.title, 'page title');
            await verifyText(elements.title, 'Breadcrumbs', 'Breadcrumbs example page title');
            await verifyPresent(breadcrumbSelectors.page, 'breadcrumb examples page');
        });
    });

    describe('Static Example', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display static section', async () => {
            await verifyPresent(breadcrumbSelectors.staticExample, 'static breadcrumb example');
        });

        it('should have static Home breadcrumb', async () => {
            await verifyText(breadcrumbSelectors.staticHomeLink, 'Home', 'static Home breadcrumb link');
        });

        it('should have static Components breadcrumb', async () => {
            await verifyText(breadcrumbSelectors.staticComponentsSpan, 'Components', 'static Components breadcrumb');
        });
    });

    describe('Dynamic Example', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display dynamic section', async () => {
            await verifyPresent(breadcrumbSelectors.dynamicExample, 'dynamic breadcrumb example');
        });

        it('should have dynamic Home breadcrumb', async () => {
            await verifyText(dynamicItemLink(breadcrumbSelectors.dynamicExample), 'Home', 'First Dynamic Item');
        });

        it('should have dynamic Components breadcrumb', async () => {
            await verifyText(dynamicItemSpan(breadcrumbSelectors.dynamicExample), 'Components', 'Second Dynamic Item');
        });
    });

    describe('Breadcrumb Dropdown', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should display dropdown button in breadcrumb', async () => {
            await verifyPresent(breadcrumbSelectors.dropdownButton, 'breadcrumb dropdown button');
        });

        it('should open dropdown menu and display all options', async () => {
            await click(breadcrumbSelectors.dropdownButton);
            await Promise.all([
                verifyPresent(breadcrumbSelectors.dropdownContainer, 'dropdown container'),
                verifyText(breadcrumbSelectors.dropdownOption, 'Colors', 'First dropdown option'),
                verifyText(breadcrumbSelectors.dropdownOption, 'Composition', 'Second dropdown option', 1),
                verifyText(breadcrumbSelectors.dropdownOption, 'Typography', 'Third dropdown option', 2),
            ]);
            await click(breadcrumbSelectors.dropdownButton);
            await waitForElementToBeAbsent(breadcrumbSelectors.dropdownContainer);
        });

        it('should be able to select a dropdown option', async () => {
            await click(breadcrumbSelectors.dropdownButton);
            await verifyPresent(breadcrumbSelectors.dropdownContainer, 'dropdown container');
            await click(breadcrumbSelectors.dropdownOption);
            await waitForElementToBeAbsent(breadcrumbSelectors.dropdownContainer);
        });
    });
});
