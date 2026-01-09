import { COMPONENT_URLS, examplesUrl, URLS } from "utils/EnvironmentUtil";
import { codeExample, elements } from "utils/SelectorUtil";
import { verifyPresent, verifyText } from "utils/VerifyUtil";

describe('Dropdown Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.DROPDOWN);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(URLS.HOME);
    });

    describe('Page Elements', () => {
        it('should display page title and examples', async () => {
            await verifyPresent(elements.title);
            await verifyText(elements.title, 'Dropdown', 'Dropdown example page title');
            await verifyPresent('dropdown-examples-page');
        });

        const dropdownTypes = [
            'basic',
            'position',
            'large',
            'scrollable',
            'custom',
            'multi',
            'scroll-to-item',
        ];
        dropdownTypes.forEach(type => {
            it(`should display example section - ${type}`, async () => {
                await verifyPresent(codeExample(`${type}-drop-down`));
            });
        });
    });
});