import { asyncForEach } from 'utils/AutomationHelpers';
import { click, scrollIntoView } from 'utils/ElementActionUtil';
import { COMPONENT_URLS, examplesUrl, URLS } from 'utils/EnvironmentUtil';
import { getAllElements } from 'utils/GetElementUtil';
import { codeExample, elements } from 'utils/SelectorUtil';
import { verifyPresent, verifyText } from 'utils/VerifyUtil';

describe('Button Demo Page', () => {
    const url = examplesUrl(COMPONENT_URLS.BUTTON);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(URLS.HOME);
    });

    describe('Page Elements', () => {
        it('should display page title and examples', async () => {
            await verifyPresent(elements.title);
            await verifyText(elements.title, 'Button', 'Button example page title');
            await verifyPresent('button-examples-page');
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
        it('should have labels for all main types of buttons', async () => {
            const buttonTypes = ['Basic', 'Primary', 'Secondary', 'Icon', 'Fab'];
            const allButtonTypeLabels = await getAllElements('button-overview-example div.example-label');

            await asyncForEach(allButtonTypeLabels, async (label, index) => {
                await verifyText(label, buttonTypes[index], 'button type label');
            });
        });
        it('should have a row of buttons with the correct theme', async () => {
            const buttonThemes = ['dialogue', 'primary', 'secondary', 'icon', 'fab'];
            const buttonExampleRows = await getAllElements('button-overview-example div.example-button-row');
            await asyncForEach(buttonExampleRows, async (row, index) => {
                const buttons = await row.$$(`button.novo-button.novo-theme-${buttonThemes[index]}`);
                await expect(buttons.length).toEqual(5);
            });
        });
    });

    describe('Dynamic', () => {
        it('should disable the button', async () => {
            await scrollIntoView('button-dynamic-example');
            await verifyPresent('button-dynamic-example button.novo-button.novo-theme-primary');
            await click('i.bhi-checkbox-empty');
            await verifyPresent('button-dynamic-example button.novo-button.novo-theme-primary.novo-button-disabled');
        });
        it('should re-enable the button', async () => {
            await click('i.bhi-checkbox-filled');
            await verifyPresent('button-dynamic-example button.novo-button.novo-theme-primary');
        });
    });

    describe('Loading', () => {
        it('should make the button enter a loading state', async () => {
            await scrollIntoView('button-loading-example');
            await verifyPresent('button-loading-example button.novo-button.novo-theme-primary');
            await click('button-loading-example button.novo-button.novo-theme-primary');
            await verifyPresent('button-loading-example button.novo-button[loading="true"]');
        });
    });
});
