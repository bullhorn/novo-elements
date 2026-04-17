import { click } from '../utils/ElementActionUtil';
import { COMPONENT_URLS, componentsUrl, getURLs } from '../utils/EnvironmentUtil';
import { verifyPresent, verifyText, verifyDisabled } from '../utils/VerifyUtil';
import { switchSelectors } from '../utils/SwitchUtil';
import { getElementText } from '../utils/ElementPropertiesUtil';

describe('Switch Demo Page', () => {
    const url = componentsUrl(COMPONENT_URLS.SWITCH);

    before(async () => {
        await browser.navigateTo(url);
    });

    after(async () => {
        await browser.navigateTo(getURLs().HOME);
    });


    describe('Switch Interactions', () => {
        it('should display switch label with value', async () => {
            await verifyPresent(switchSelectors.label());
            const labelText = await getElementText(switchSelectors.label());
            await expect(labelText).toContain('Toggled');
        });

        it('should display default switch', async () => {
            await verifyPresent(switchSelectors.defaultSwitch());
        });

        it('should display grapefruit themed switch', async () => {
            await verifyPresent(switchSelectors.grapefruitSwitch());
        });

        it('should display disabled switch with label text', async () => {
            await verifyPresent(switchSelectors.disabledSwitch());
            await verifyDisabled(switchSelectors.disabledSwitch(), 'disabled switch');
            await verifyText(switchSelectors.disabledSwitch(), 'THIS IS DISABLED', 'disabled switch text');
        });

        it('should toggle default switch and update value display', async () => {
            // Get initial state
            const initialText = await getElementText(switchSelectors.value());

            // Click to toggle
            await click(switchSelectors.defaultSwitch());
            await browser.pause(500);

            // Value should change
            const toggledText = await getElementText(switchSelectors.value());

            // Click again to toggle back
            await click(switchSelectors.defaultSwitch());
            await browser.pause(500);

            // Value should return to initial
            const finalText = await getElementText(switchSelectors.value());
            await expect(finalText).toBe(initialText);
        });

        it('should toggle grapefruit themed switch', async () => {
            await click(switchSelectors.grapefruitSwitch());
            await browser.pause(500);
            // Verify switch can be toggled multiple times
            await click(switchSelectors.grapefruitSwitch());
            await browser.pause(500);
            await verifyPresent(switchSelectors.grapefruitSwitch());
        });

        it('should not toggle disabled switch', async () => {
            const initialValue = await getElementText(switchSelectors.value());
            await click(switchSelectors.disabledSwitch());
            await browser.pause(500);
            const valueAfterClick = await getElementText(switchSelectors.value());
            // Value should not change when clicking disabled switch
            await expect(initialValue).toBe(valueAfterClick);
        });
    });
});
