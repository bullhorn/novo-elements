import { asyncForEach } from "utils/AutomationHelpers";
import { click, scrollIntoView } from "utils/ElementActionUtil";
import { examplesUrl, URLS } from "utils/EnvironmentUtil";
import { getAllElements } from "utils/GetElementUtil";
import { codeExample, elements } from "utils/SelectorUtil";
import { verifyPresent, verifyText } from "utils/VerifyUtil";

describe('Button Demo Page', () => {
    const url = examplesUrl('button');

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(URLS.HOME);
    });

    it('should display page title and examples', async () => {
        await verifyPresent(elements.title);
        await verifyText(elements.title, 'Button', 'Button example page title');
        await verifyPresent('button-examples-page');
    });

    describe('Colors', () => {
        it('should display example section', async () => {
            await verifyPresent(codeExample('button-overview'));
        });
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

    describe('Primary', () => {
        it('should display example section', async () => {
            await verifyPresent(codeExample('button-primary'));
        });
    });

    describe('Secondary', () => {
        it('should display example section', async () => {
            await verifyPresent(codeExample('button-secondary'));
        });
    });

    describe('Inverse', () => {
        it('should display example section', async () => {
            await verifyPresent(codeExample('button-inverse'));
        });
    });

    describe('Dialogue', () => {
        it('should display example section', async () => {
            await verifyPresent(codeExample('button-dialogue'));
        });
    });

    describe('Standard', () => {
        it('should display example section', async () => {
            await verifyPresent(codeExample('button-primary'));
        });
    });

    describe('Icon', () => {
        it('should display example section', async () => {
            await verifyPresent(codeExample('button-icon'));
        });
    });

    describe('Fab', () => {
        it('should display example section', async () => {
            await verifyPresent(codeExample('button-fab'));
        });
    });

    describe('Dynamic', () => {
        it('should display example section', async () => {
            await verifyPresent(codeExample('button-dynamic'));
        });
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
        it('should display example section', async () => {
            await verifyPresent(codeExample('button-loading'));
        });
    });

    describe('Two Icon', () => {
        it('should display example section', async () => {
            await verifyPresent(codeExample('button-two-icon'));
        });
    });
});