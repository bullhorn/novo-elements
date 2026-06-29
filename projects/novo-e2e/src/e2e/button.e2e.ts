import { asyncForEach } from '../utils/AutomationHelpers';
import { click, scrollIntoView } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, getURLs } from '../utils/EnvironmentUtil';
import { getAllElements } from '../utils/GetElementUtil';
import { automationId, codeExample, elements } from '../utils/SelectorUtil';
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

        it('should disable the button', async () => {
            await scrollIntoView('button-dynamic-example');
            await verifyPresent(automationId('disable-button-checkbox'), 'disable button checkbox');
            await click(`${automationId('disable-button-checkbox')} i`);
            await verifyDisabled(automationId('dynamic-button-example'));
        });

        it('should re-enable the button', async () => {
            await click(`${automationId('disable-button-checkbox')} i`);
            await verifyEnabled(automationId('dynamic-button-example'));
        });
    });

    describe('Loading', () => {
        before(async () => {
            await browser.refresh();
        });

        it('should make the button enter a loading state', async () => {
            await scrollIntoView('button-loading-example');
            await verifyPresent(automationId('button-loading-example'), 'button loading example');
            await click(automationId('button-loading-example'));
            await verifyPresent(`${automationId('button-loading-example')}[loading="true"]`, 'button in loading state');
        });
    });
});
