import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { formControlsUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample, Classes } from '../utils/SelectorUtil';
import { verifyPresent, verifyClassPresent, verifyTextIncludes } from '../utils/VerifyUtil';
import { selectSelectors, selectBasicOption, selectLegacyOption, selectMultipleOption } from '../utils/SelectUtil';

describe('Select Demo Page', () => {
    const url = formControlsUrl('select');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        const exampleSections = ['basic-select', 'basic-select-with-search', 'legacy-select-option', 'long-select', 'multiple-select', 'multiple-select-with-search'];
        exampleSections.forEach((section) => {
            it(`should display example section - ${section}`, async () => {
                await verifyPresent(codeExample(section));
            });
        });
    });

    describe('Basic Select', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(selectSelectors.basicField);
        });

        it('should display the basic select field', async () => {
            await verifyPresent(selectSelectors.basicField);
        });

        it('should show initial selected value Bravo in the label', async () => {
            await verifyTextIncludes(selectSelectors.basicValueLabel, 'Bravo', 'basic select value label');
        });

        it('should have disabled class on the disabled select', async () => {
            await verifyClassPresent(selectSelectors.basicDisabled, Classes.novoSelectDisabled, 'disabled select');
        });

        it('should open dropdown and select an option', async () => {
            await click(selectSelectors.basicInput);
            await verifyPresent(selectBasicOption(0), 'first option in dropdown');
            await click(selectBasicOption(0));
            await verifyTextIncludes(selectSelectors.basicValueLabel, 'Alpha', 'basic select value label after selection');
        });
    });

    describe('Basic Select with Search', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(selectSelectors.searchField);
        });

        it('should display the select with search field', async () => {
            await verifyPresent(selectSelectors.searchField);
        });

        it('should show the initial selected state Georgia in the result', async () => {
            await verifyTextIncludes(selectSelectors.searchResult, 'Georgia', 'search select result');
        });

        it('should open dropdown and display the search filter', async () => {
            await click(selectSelectors.searchInput);
            await verifyPresent(selectSelectors.searchFilter, 'search filter input');
        });
    });

    describe('Legacy Select Option', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(selectSelectors.legacyField);
        });

        it('should display the legacy select field', async () => {
            await verifyPresent(selectSelectors.legacyField);
        });

        it('should show the initial value Delta in the label', async () => {
            await verifyTextIncludes(selectSelectors.legacyValueLabel, 'Delta', 'legacy select value label');
        });

        it('should open dropdown and select an option', async () => {
            await click(selectSelectors.legacyInput);
            await verifyPresent(selectLegacyOption(0), 'first option in legacy dropdown');
            await click(selectLegacyOption(0));
            await verifyTextIncludes(selectSelectors.legacyValueLabel, 'Alpha', 'legacy select value label after selection');
        });
    });

    describe('Long Select', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(selectSelectors.longField);
        });

        it('should display the long select field and input', async () => {
            for (const selector of [selectSelectors.longField, selectSelectors.longInput]) {
                await verifyPresent(selector);
            }
        });
    });

    describe('Multiple Select', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(selectSelectors.multipleField);
        });

        it('should display the multiple select field', async () => {
            await verifyPresent(selectSelectors.multipleField);
        });

        it('should show the initial selected value Missouri in the label', async () => {
            await verifyTextIncludes(selectSelectors.multipleValueLabel, 'Missouri', 'multiple select value label');
        });

        it('should open dropdown and add a selection', async () => {
            await click(selectSelectors.multipleInput);
            await verifyPresent(selectMultipleOption(0), 'first option in multiple select dropdown');
            await click(selectMultipleOption(0));
            await verifyTextIncludes(selectSelectors.multipleValueLabel, 'Alabama', 'multiple select value label after adding Alabama');
        });
    });

    describe('Multiple Select with Search', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(selectSelectors.multiSearchField);
        });

        it('should display the field and selected states heading', async () => {
            for (const selector of [selectSelectors.multiSearchField, selectSelectors.multiSearchResultsHeading]) {
                await verifyPresent(selector);
            }
        });

        it('should open dropdown and display the search filter', async () => {
            await click(selectSelectors.multiSearchInput);
            await verifyPresent(selectSelectors.multiSearchFilter, 'multi-search filter input');
        });
    });
});
