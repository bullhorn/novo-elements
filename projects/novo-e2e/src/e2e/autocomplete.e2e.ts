import { clearInputAndSendKeys, click, scrollIntoView } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { codeExample, elements } from '../utils/SelectorUtil';
import { verifyAbsent, verifyElementCountEquals, verifyInputValue, verifyPresent, verifyText, verifyTextIncludes } from '../utils/VerifyUtil';
import { autocompleteTextarea, basicUsage, stackedChips, withChips } from '../utils/AutocompleteUtil';

describe('Autocomplete Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.AUTOCOMPLETE);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display the page title', async () => {
            await verifyPresent(elements.title, 'page title');
            await verifyText(elements.title, 'Autocomplete', 'autocomplete page title');
        });

        const exampleSections = [
            'autocomplete-usage',
            'autocomplete-with-chips',
            'autocomplete-textarea',
            'autocomplete-stacked-chips',
        ];
        exampleSections.forEach((section) => {
            it(`should display example section - ${section}`, async () => {
                await verifyPresent(codeExample(section), section);
            });
        });
    });

    describe('Basic Autocomplete Usage', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(basicUsage.field);
        });

        it('should display the input field', async () => {
            await Promise.all([
                verifyPresent(basicUsage.field, 'basic usage field'),
                verifyPresent(basicUsage.input, 'basic usage input'),
            ]);
        });
    });

    describe('Basic Autocomplete Usage - Dropdown', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(basicUsage.field);
            await click(basicUsage.input);
        });

        it('should display all options when the input is focused', async () => {
            await Promise.all([
                verifyPresent(basicUsage.option(0), 'option One'),
                verifyPresent(basicUsage.option(1), 'option Two'),
                verifyPresent(basicUsage.option(2), 'option Three'),
            ]);
        });

        it('should filter options based on typed text', async () => {
            await clearInputAndSendKeys(basicUsage.input, 'thr');
            await verifyPresent(basicUsage.option(0), 'filtered option Three');
            await verifyText(basicUsage.option(0), 'Three', 'filtered option text');
            await verifyAbsent(basicUsage.option(1), 'second option after filtering');
        });

        it('should update the input value when an option is selected', async () => {
            await clearInputAndSendKeys(basicUsage.input, 'one');
            await click(basicUsage.option(0));
            await verifyInputValue(basicUsage.input, 'One', 'selected option value');
        });
    });

    describe('Autocomplete With Chips', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(withChips.field);
        });

        it('should display the pre-selected Lemon chip', async () => {
            await verifyPresent(withChips.chip(0), 'Lemon chip');
            await verifyTextIncludes(withChips.chip(0), 'Lemon', 'Lemon chip text');
        });
    });

    describe('Autocomplete With Chips - Dropdown', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(withChips.field);
            await click(withChips.searchInput);
        });

        it('should display all fruit options when the input is focused', async () => {
            await verifyElementCountEquals(withChips.allOptions, 5, 'fruit options');
        });

        it('should filter options based on typed text', async () => {
            await clearInputAndSendKeys(withChips.searchInput, 'ap');
            await verifyPresent(withChips.option(0), 'Apple option');
            await verifyText(withChips.option(0), 'Apple', 'Apple option text');
            await verifyAbsent(withChips.option(1), 'second option after filtering');
        });
    });

    describe('Autocomplete Textarea', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(autocompleteTextarea.field);
        });

        it('should display the textarea field and input', async () => {
            await Promise.all([
                verifyPresent(autocompleteTextarea.field, 'textarea field'),
                verifyPresent(autocompleteTextarea.input, 'textarea input'),
            ]);
        });

        it('should display the toppings select field', async () => {
            await verifyPresent(autocompleteTextarea.toppingsField, 'toppings select field');
        });
    });

    describe('Autocomplete Stacked Chips', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(stackedChips.field);
        });

        it('should display the three pre-selected shift chips', async () => {
            await Promise.all([
                verifyPresent(stackedChips.chip(0), 'stacked chip 0'),
                verifyPresent(stackedChips.chip(1), 'stacked chip 1'),
                verifyPresent(stackedChips.chip(2), 'stacked chip 2'),
            ]);
        });
    });

    describe('Autocomplete Stacked Chips - Dropdown', () => {
        before(async () => {
            await browser.refresh();
            await scrollIntoView(stackedChips.field);
            await click(stackedChips.searchInput);
        });

        it('should display all shift options when the input is focused', async () => {
            await verifyElementCountEquals(stackedChips.allOptions, 6, 'shift options');
        });

        it('should filter shift options based on typed text', async () => {
            await clearInputAndSendKeys(stackedChips.searchInput, '2021-02-28');
            await verifyElementCountEquals(stackedChips.allOptions, 1, 'filtered shift options');
            await verifyPresent(stackedChips.option(0), 'filtered shift option');
        });
    });
});
