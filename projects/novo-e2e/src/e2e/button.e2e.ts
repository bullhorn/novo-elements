import { asyncForEach } from '../utils/AutomationHelpers';
import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { getAllElements } from '../utils/GetElementUtil';
import { codeExample, elements } from '../utils/SelectorUtil';
import { verifyDisabled, verifyEnabled, verifyPresent, verifyText } from '../utils/VerifyUtil';
import { buttonSelectors } from '../utils/ButtonUtil';

describe('Button Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.BUTTON);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });

    describe('Page Elements', () => {
        it('should display page title and examples', async () => {
            await verifyPresent(elements.title, 'page title');
            await verifyText(elements.title, 'Button', 'Button example page title');
            await verifyPresent('button-examples-page', 'button examples page');
        });

        const buttonTypes = [
            'overview',
            'primary',
            'secondary',
            'inverse',
            'dialogue',
            'standard',
            'icon',
            'fab',
            'dynamic',
            'loading',
            'two-icon',
        ];
        buttonTypes.forEach(type => {
            it(`should display example section - ${type}`, async () => {
                await verifyPresent(codeExample(`button-${type}`));
            });
        });
    });

    describe('Colors', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should have labels for all main types of buttons', async () => {
            const buttonTypes = ['Basic', 'Primary', 'Secondary', 'Icon', 'Fab'];
            const allButtonTypeLabels = await getAllElements(buttonSelectors.overviewLabels);

            await asyncForEach(allButtonTypeLabels, async (label, index) => {
                await verifyText(label, buttonTypes[index], 'button type label');
            });
        });

        it('should have a row of buttons with the correct theme', async () => {
            const buttonThemes = ['dialogue', 'primary', 'secondary', 'icon', 'fab'];
            const buttonExampleRows = await getAllElements(buttonSelectors.overviewRows);
            await asyncForEach(buttonExampleRows, async (row, index) => {
                const buttons = await row.$$(buttonSelectors.overviewThemeRow(buttonThemes[index]));
                await expect(buttons.length).toEqual(5);
            });
        });
    });

    describe('Dynamic', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should toggle the button disabled state', async () => {
            await scrollIntoView(buttonSelectors.dynamicSection);
            await click(buttonSelectors.dynamicCheckbox);
            await verifyDisabled(buttonSelectors.dynamicExample);
            await click(buttonSelectors.dynamicCheckbox);
            await verifyEnabled(buttonSelectors.dynamicExample);
        });
    });

    describe('Loading', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should make the button enter a loading state', async () => {
            await scrollIntoView(buttonSelectors.loadingSection);
            await verifyPresent(buttonSelectors.loadingButton, 'button loading example');
            await click(buttonSelectors.loadingButton);
            await verifyPresent(buttonSelectors.loadingButtonActive, 'button in loading state');
        });
    });
});
